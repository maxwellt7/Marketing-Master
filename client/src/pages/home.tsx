import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const loadChat = async () => {
      try {
        const { createChat } = await import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js');
        
        createChat({
          webhookUrl: 'https://growthgod.app.n8n.cloud/webhook/82b00b4f-3af7-4d27-8130-427db82147c8/chat',
          mode: 'fullscreen',
          loadPreviousSession: true,
          showWelcomeScreen: false,
          enableStreaming: true,
          initialMessages: [
            'Welcome to Marketing Master',
            'How can I help grow your business today?'
          ],
          i18n: {
            en: {
              title: 'Marketing Master',
              subtitle: "AI-Powered Marketing Intelligence",
              footer: '',
              getStarted: 'Start Conversation',
              inputPlaceholder: 'Type your message...',
            },
          },
        });
      } catch (error) {
        console.error('Failed to load n8n chat:', error);
      }
    };

    loadChat();
  }, []);

  return (
    <div className="h-full bg-background relative overflow-hidden flex flex-col">
      {/* Header with gradient headline */}
      <div className="flex-shrink-0 p-3 md:p-4 border-b border-primary/20 bg-card/50 backdrop-blur-sm">
        <h1 
          className="text-2xl md:text-4xl font-bold tracking-tight text-center"
          style={{
            background: 'linear-gradient(135deg, hsl(170, 100%, 50%), hsl(280, 100%, 65%), hsl(330, 100%, 60%))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Marketing Master
        </h1>
      </div>

      {/* Chat container - fullscreen */}
      <div id="n8n-chat" data-testid="chat-container" className="flex-1 w-full" />
    </div>
  );
}
