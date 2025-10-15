import { 
  type ChatSession, 
  type InsertChatSession,
  type ChatMessage,
  type InsertChatMessage,
  type ChatAnalytics,
  type InsertChatAnalytics,
  chatSessions,
  chatMessages,
  chatAnalytics
} from "@shared/schema";
import { db, isDatabaseAvailable } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Chat Sessions
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  getChatSession(sessionId: string): Promise<ChatSession | undefined>;
  updateSessionLastMessage(sessionId: string): Promise<void>;
  
  // Chat Messages
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getSessionMessages(sessionId: string): Promise<ChatMessage[]>;
  
  // Chat Analytics
  createOrUpdateAnalytics(sessionId: string, messageCount: number, duration: number): Promise<ChatAnalytics>;
  getAllAnalytics(): Promise<ChatAnalytics[]>;
  getSessionAnalytics(sessionId: string): Promise<ChatAnalytics | undefined>;
  getAggregatedAnalytics(): Promise<{
    totalSessions: number;
    totalMessages: number;
    avgSessionDuration: number;
    avgResponseTime: number;
    messagesByHour: Array<{ hour: number; count: number }>;
    sessionsByDate: Array<{ date: string; count: number }>;
  }>;
}

export class MockStorage implements IStorage {
  private sessions: Map<string, ChatSession> = new Map();
  private messages: Map<string, ChatMessage[]> = new Map();
  private analytics: Map<string, ChatAnalytics> = new Map();

  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const session: ChatSession = {
      id: Math.random().toString(36).substring(7),
      sessionId: insertSession.sessionId,
      createdAt: new Date(),
      lastMessageAt: new Date(),
    };
    this.sessions.set(insertSession.sessionId, session);
    return session;
  }

  async getChatSession(sessionId: string): Promise<ChatSession | undefined> {
    return this.sessions.get(sessionId);
  }

  async updateSessionLastMessage(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.lastMessageAt = new Date();
    }
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const message: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      sessionId: insertMessage.sessionId,
      role: insertMessage.role,
      content: insertMessage.content,
      timestamp: new Date(),
    };
    
    const messages = this.messages.get(insertMessage.sessionId) || [];
    messages.push(message);
    this.messages.set(insertMessage.sessionId, messages);
    
    return message;
  }

  async getSessionMessages(sessionId: string): Promise<ChatMessage[]> {
    return this.messages.get(sessionId) || [];
  }

  async createOrUpdateAnalytics(sessionId: string, messageCount: number, duration: number): Promise<ChatAnalytics> {
    const existing = this.analytics.get(sessionId);
    
    const analyticsData: ChatAnalytics = {
      id: existing?.id || Math.random().toString(36).substring(7),
      sessionId,
      messageCount,
      sessionDuration: duration,
      createdAt: existing?.createdAt || new Date(),
    };
    
    this.analytics.set(sessionId, analyticsData);
    return analyticsData;
  }

  async getAllAnalytics(): Promise<ChatAnalytics[]> {
    return Array.from(this.analytics.values());
  }

  async getSessionAnalytics(sessionId: string): Promise<ChatAnalytics | undefined> {
    return this.analytics.get(sessionId);
  }

  async getAggregatedAnalytics() {
    const allSessions = Array.from(this.sessions.values());
    const allMessages = Array.from(this.messages.values()).flat();
    const allAnalytics = Array.from(this.analytics.values());

    return {
      totalSessions: allSessions.length,
      totalMessages: allMessages.length,
      avgSessionDuration: allAnalytics.length > 0 
        ? allAnalytics.reduce((sum, a) => sum + a.sessionDuration, 0) / allAnalytics.length 
        : 0,
      avgResponseTime: 0,
      messagesByHour: Array.from({ length: 24 }, (_, hour) => ({ hour, count: 0 })),
      sessionsByDate: [],
    };
  }
}

export class DbStorage implements IStorage {
  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    if (!db) throw new Error('Database not available');
    const [session] = await db.insert(chatSessions).values(insertSession).returning();
    return session;
  }

  async getChatSession(sessionId: string): Promise<ChatSession | undefined> {
    if (!db) throw new Error('Database not available');
    const [session] = await db.select().from(chatSessions).where(eq(chatSessions.sessionId, sessionId));
    return session;
  }

  async updateSessionLastMessage(sessionId: string): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.update(chatSessions)
      .set({ lastMessageAt: new Date() })
      .where(eq(chatSessions.sessionId, sessionId));
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    if (!db) throw new Error('Database not available');
    const [message] = await db.insert(chatMessages).values(insertMessage).returning();
    return message;
  }

  async getSessionMessages(sessionId: string): Promise<ChatMessage[]> {
    if (!db) throw new Error('Database not available');
    return await db.select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(chatMessages.timestamp);
  }

  async createOrUpdateAnalytics(sessionId: string, messageCount: number, duration: number): Promise<ChatAnalytics> {
    if (!db) throw new Error('Database not available');
    const existing = await this.getSessionAnalytics(sessionId);
    
    if (existing) {
      const [updated] = await db.update(chatAnalytics)
        .set({ messageCount, sessionDuration: duration })
        .where(eq(chatAnalytics.sessionId, sessionId))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(chatAnalytics)
        .values({ sessionId, messageCount, sessionDuration: duration })
        .returning();
      return created;
    }
  }

  async getAllAnalytics(): Promise<ChatAnalytics[]> {
    if (!db) throw new Error('Database not available');
    return await db.select()
      .from(chatAnalytics)
      .orderBy(desc(chatAnalytics.createdAt));
  }

  async getSessionAnalytics(sessionId: string): Promise<ChatAnalytics | undefined> {
    if (!db) throw new Error('Database not available');
    const [analytics] = await db.select()
      .from(chatAnalytics)
      .where(eq(chatAnalytics.sessionId, sessionId));
    return analytics;
  }

  async getAggregatedAnalytics() {
    if (!db) throw new Error('Database not available');
    const allSessions = await db.select().from(chatSessions);
    const allMessages = await db.select().from(chatMessages);
    const allAnalytics = await db.select().from(chatAnalytics);

    const totalSessions = allSessions.length;
    const totalMessages = allMessages.length;
    const avgSessionDuration = allAnalytics.length > 0 
      ? allAnalytics.reduce((sum: number, a: ChatAnalytics) => sum + a.sessionDuration, 0) / allAnalytics.length 
      : 0;
    
    let totalResponseTime = 0;
    let responseCount = 0;
    
    const messagesBySession: { [sessionId: string]: ChatMessage[] } = {};
    allMessages.forEach((m: ChatMessage) => {
      if (!messagesBySession[m.sessionId]) {
        messagesBySession[m.sessionId] = [];
      }
      messagesBySession[m.sessionId].push(m);
    });
    
    Object.values(messagesBySession).forEach((messages: ChatMessage[]) => {
      const sortedMessages = messages.sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      
      const pendingUserTimestamps: Date[] = [];
      
      for (const message of sortedMessages) {
        if (message.role === 'user') {
          pendingUserTimestamps.push(new Date(message.timestamp));
        } else if (message.role === 'assistant' && pendingUserTimestamps.length > 0) {
          const userTimestamp = pendingUserTimestamps.shift()!;
          const responseTime = (new Date(message.timestamp).getTime() - userTimestamp.getTime()) / 1000;
          if (responseTime >= 0) {
            totalResponseTime += responseTime;
            responseCount++;
          }
        }
      }
    });
    
    const avgResponseTime = responseCount > 0 ? totalResponseTime / responseCount : 0;

    const messagesByHour = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      count: allMessages.filter((m: ChatMessage) => new Date(m.timestamp).getHours() === hour).length
    }));

    const sessionsByDate: { [date: string]: number } = {};
    allSessions.forEach((s: ChatSession) => {
      const date = new Date(s.createdAt).toISOString().split('T')[0];
      sessionsByDate[date] = (sessionsByDate[date] || 0) + 1;
    });

    const sessionsByDateArray = Object.entries(sessionsByDate)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-7);

    return {
      totalSessions,
      totalMessages,
      avgSessionDuration,
      avgResponseTime,
      messagesByHour,
      sessionsByDate: sessionsByDateArray
    };
  }
}

export const storage: IStorage = isDatabaseAvailable ? new DbStorage() : new MockStorage();
