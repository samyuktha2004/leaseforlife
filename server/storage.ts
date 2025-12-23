import { gameSessions, type InsertGameSession, type GameSession } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createSession(session: InsertGameSession): Promise<GameSession>;
}

export class DatabaseStorage implements IStorage {
  async createSession(session: InsertGameSession): Promise<GameSession> {
    const [newSession] = await db.insert(gameSessions).values(session).returning();
    return newSession;
  }
}

export const storage = new DatabaseStorage();
