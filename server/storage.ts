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
import { db } from "./db";
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
}

export class DbStorage implements IStorage {
  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const [session] = await db.insert(chatSessions).values(insertSession).returning();
    return session;
  }

  async getChatSession(sessionId: string): Promise<ChatSession | undefined> {
    const [session] = await db.select().from(chatSessions).where(eq(chatSessions.sessionId, sessionId));
    return session;
  }

  async updateSessionLastMessage(sessionId: string): Promise<void> {
    await db.update(chatSessions)
      .set({ lastMessageAt: new Date() })
      .where(eq(chatSessions.sessionId, sessionId));
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db.insert(chatMessages).values(insertMessage).returning();
    return message;
  }

  async getSessionMessages(sessionId: string): Promise<ChatMessage[]> {
    return await db.select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(chatMessages.timestamp);
  }

  async createOrUpdateAnalytics(sessionId: string, messageCount: number, duration: number): Promise<ChatAnalytics> {
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
    return await db.select()
      .from(chatAnalytics)
      .orderBy(desc(chatAnalytics.createdAt));
  }

  async getSessionAnalytics(sessionId: string): Promise<ChatAnalytics | undefined> {
    const [analytics] = await db.select()
      .from(chatAnalytics)
      .where(eq(chatAnalytics.sessionId, sessionId));
    return analytics;
  }
}

export const storage = new DbStorage();
