import { useEffect, useRef, useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import type { ChatMessage } from '@shared/schema';

export function useChatPersistence() {
  const [sessionId] = useState(() => {
    const stored = localStorage.getItem('chat-session-id');
    if (stored) return stored;
    const newId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('chat-session-id', newId);
    return newId;
  });

  const sessionStartTime = useRef(Date.now());
  const messageCount = useRef(0);

  useEffect(() => {
    const initSession = async () => {
      try {
        const existingSession = await fetch(`/api/chat/sessions/${sessionId}`);
        
        if (!existingSession.ok) {
          await apiRequest('POST', '/api/chat/sessions', { sessionId });
        }
      } catch (error) {
        console.error('Failed to initialize session:', error);
      }
    };

    initSession();
  }, [sessionId]);

  const saveMessage = async (role: 'user' | 'assistant', content: string) => {
    try {
      await apiRequest('POST', '/api/chat/messages', {
        sessionId,
        role,
        content,
      });

      messageCount.current += 1;

      await updateAnalytics();
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  };

  const updateAnalytics = async () => {
    try {
      const sessionDuration = Math.floor((Date.now() - sessionStartTime.current) / 1000);
      
      await apiRequest('POST', '/api/analytics', {
        sessionId,
        messageCount: messageCount.current,
        sessionDuration,
      });
    } catch (error) {
      console.error('Failed to update analytics:', error);
    }
  };

  const loadPreviousMessages = async (): Promise<ChatMessage[]> => {
    try {
      const response = await fetch(`/api/chat/sessions/${sessionId}/messages`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Failed to load previous messages:', error);
      return [];
    }
  };

  return {
    sessionId,
    saveMessage,
    loadPreviousMessages,
    updateAnalytics,
  };
}
