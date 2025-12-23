import { useState, useMemo } from "react";

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
  const [level, setLevel] = useState<Level>(1);

  const gameState = useMemo<GameState>(() => {
    if (level <= 4) {
      return {
        level,
        persona: "Xylax the Landlord Audit",
        objective: `Level ${level}: Inspect the kitchen facilities. Standards must be maintained.`,
        hook: "The blueprints are filed. Don't smudge the assets. I expect operational perfection.",
        characterImage: "/assets/xylax.png",
        backgroundImage: "/assets/kitchen_bg.png",
      };
    } else {
      return {
        level,
        persona: "Sentient Toaster Unit T-045",
        objective: "Level 5: Bread awaits inspection. Warm up to your new role.",
        hook: "I've been waiting for this moment. Let's get toasty.",
        characterImage: "/assets/toaster.png",
        backgroundImage: "/assets/kitchen_bg.png",
      };
    }
  }, [level]);

  const completeLevel = async (targetLevel: number) => {
    console.log(`Level Complete! Transitioning to level ${targetLevel}`);
    setLevel(targetLevel);
  };

  return {
    ...gameState,
    completeLevel,
    setLevel
  };
}
