import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const gameSessions = pgTable("game_sessions", {
  id: serial("id").primaryKey(),
  level: integer("level").notNull().default(1),
  persona: text("persona").notNull(),
  objective: text("objective").notNull(),
});

export const insertSessionSchema = createInsertSchema(gameSessions);
export type GameSession = typeof gameSessions.$inferSelect;
export type InsertGameSession = z.infer<typeof insertSessionSchema>;
