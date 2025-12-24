import { useCallback, useEffect } from "react";
import { useConversation } from "@elevenlabs/react";
import { useGameState } from "@/hooks/use-game-state";
import { useCreateSession } from "@/hooks/use-sessions";
import { BackgroundContainer } from "@/components/BackgroundContainer";
import { CharacterDisplay } from "@/components/CharacterDisplay";
import { LevelIndicator } from "@/components/LevelIndicator";
import { VoiceControls } from "@/components/VoiceControls";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Game() {
  const { 
    level, 
    persona, 
    objective, 
    hook, 
    characterImage, 
    backgroundImage, 
    completeLevel 
  } = useGameState();

  const { toast } = useToast();
  const createSession = useCreateSession();

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs");
      toast({
        title: "Connection Established",
        description: "Voice uplink secure. Character active.",
      });
      
      // Log session start
      createSession.mutate({
        level,
        persona,
        objective
      });
    },
    onDisconnect: () => {
      console.log("Disconnected");
    },
    onError: (error) => {
      console.error("ElevenLabs Error:", error);
      toast({
        title: "Transmission Error",
        description: error.message || "Failed to connect to voice server.",
        variant: "destructive",
      });
    },
    onModeChange: (mode) => {
      console.log("Mode changed to:", mode);
    },
    // Define the tool callback
    clientTools: {
      complete_level: async (params: { target_level: number }) => {
        completeLevel(params.target_level);
        return `Level completed. Transitioning to level ${params.target_level}.`;
      }
    }
  });

  const handleStart = useCallback(async () => {
    try {
      const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID;
      
      if (!agentId) {
        toast({
          title: "Configuration Error",
          description: "ElevenLabs Agent ID not configured. Please set VITE_ELEVENLABS_AGENT_ID.",
          variant: "destructive"
        });
        return;
      }

      // IMPORTANT: Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start the conversation with dynamic variables
      await conversation.startSession({
        agentId,
        dynamicVariables: {
          persona,
          objective,
          hook
        }
      });
    } catch (err) {
      console.error("Failed to start:", err);
      toast({
        title: "Microphone Access Required",
        description: "Please allow microphone access to play.",
        variant: "destructive"
      });
    }
  }, [conversation, persona, objective, hook, toast]);

  const handleStop = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <BackgroundContainer backgroundImage={backgroundImage}>
      
      {/* HUD Header */}
      <div className="absolute top-0 w-full p-4 flex justify-between items-start pointer-events-none z-20">
        <LevelIndicator level={level} />
        
        {/* Objective Card */}
        <Card className="bg-black/50 backdrop-blur border-primary/20 text-white p-4 max-w-sm pointer-events-auto mr-4 mt-2">
          <h3 className="text-primary text-xs uppercase tracking-widest mb-1">Current Objective</h3>
          <p className="font-mono text-sm leading-relaxed opacity-90">{objective}</p>
        </Card>
      </div>

      {/* Main Character Area */}
      <CharacterDisplay 
        imageSrc={characterImage}
        name={level <= 4 ? "Xylax" : "Unit T-045"}
        isSpeaking={conversation.isSpeaking}
      />

      {/* Controls */}
      <VoiceControls 
        status={conversation.status}
        isSpeaking={conversation.isSpeaking}
        onConnect={handleStart}
        onDisconnect={handleStop}
      />

    </BackgroundContainer>
  );
}
