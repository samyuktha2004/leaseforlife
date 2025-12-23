import { useState, useMemo, useEffect } from "react";
import { api } from "@shared/routes";

export type Level = number;

interface GameState {
  level: Level;
  persona: string;
  objective: string;
  hook: string;
  characterImage: string;
  backgroundImage: string;
}

export function useGameState() {
  // Start at Level 1
  const [level, setLevel] = useState<Level>(1);

  const gameState = useMemo<GameState>(() => {
    // Level 1-4: Xylax in Apartment
    if (level <= 4) {
      return {
        level,
        persona: "Xylax the Alien Landlord",
        objective: "Audit the tenant's living compliance.",
        hook: "The rent is late and the gravity stabilizer is broken.",
        characterImage: "/assets/xylax.jpg",
        backgroundImage: "/assets/apartment_path.jpg",
      };
    } 
    // Level 5+: Toaster in Kitchen
    else {
      return {
        level,
        persona: "Sentient Toaster",
        objective: "Convince the human to make perfect toast.",
        hook: "I require bread to fulfill my destiny.",
        characterImage: "/assets/toaster.jpg",
        backgroundImage: "/assets/kitchen_bg.jpg",
      };
    }
  }, [level]);

  // Handler for the 'complete_level' tool call
  const completeLevel = async (targetLevel: number) => {
    console.log(`Level Complete! Transitioning to level ${targetLevel}`);
    // Artificial delay for dramatic effect if needed, but instant is snappier
    setLevel(targetLevel);
  };

  return {
    ...gameState,
    completeLevel,
    setLevel // Exposed for debug/testing
  };
}
