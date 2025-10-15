import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertChatSessionSchema, 
  insertChatMessageSchema, 
  insertChatAnalyticsSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat Session Routes
  app.post("/api/chat/sessions", async (req, res) => {
    try {
      const session = insertChatSessionSchema.parse(req.body);
      const created = await storage.createChatSession(session);
      res.json(created);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/chat/sessions/:sessionId", async (req, res) => {
    try {
      const session = await storage.getChatSession(req.params.sessionId);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
      res.json(session);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Chat Message Routes
  app.post("/api/chat/messages", async (req, res) => {
    try {
      const message = insertChatMessageSchema.parse(req.body);
      const created = await storage.createChatMessage(message);
      await storage.updateSessionLastMessage(message.sessionId);
      res.json(created);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/chat/sessions/:sessionId/messages", async (req, res) => {
    try {
      const messages = await storage.getSessionMessages(req.params.sessionId);
      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Analytics Routes
  app.post("/api/analytics", async (req, res) => {
    try {
      const validated = insertChatAnalyticsSchema.parse(req.body);
      const analytics = await storage.createOrUpdateAnalytics(
        validated.sessionId, 
        validated.messageCount ?? 0, 
        validated.sessionDuration ?? 0
      );
      res.json(analytics);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/analytics", async (req, res) => {
    try {
      const analytics = await storage.getAggregatedAnalytics();
      res.json(analytics);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/:sessionId", async (req, res) => {
    try {
      const analytics = await storage.getSessionAnalytics(req.params.sessionId);
      if (!analytics) {
        return res.status(404).json({ error: "Analytics not found" });
      }
      res.json(analytics);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
