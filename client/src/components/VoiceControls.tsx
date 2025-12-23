import { Button } from "@/components/ui/button";
import { Mic, MicOff, Radio } from "lucide-react";

interface VoiceControlsProps {
  status: "connected" | "connecting" | "disconnected";
  isSpeaking: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function VoiceControls({ status, isSpeaking, onConnect, onDisconnect }: VoiceControlsProps) {
  const isConnected = status === "connected";
  const isConnecting = status === "connecting";

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md flex flex-col items-center gap-4 z-50">
      
      {/* Status Text */}
      <div className="flex items-center gap-2 text-sm font-mono tracking-wider">
        <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-primary animate-pulse" : "bg-red-500"}`} />
        <span className={`${isConnected ? "text-primary" : "text-muted-foreground"}`}>
          {status === "connected" ? "UPLINK ESTABLISHED" : status === "connecting" ? "ESTABLISHING UPLINK..." : "UPLINK OFFLINE"}
        </span>
      </div>

      {/* Main Interaction Button */}
      <Button
        size="lg"
        onClick={isConnected ? onDisconnect : onConnect}
        disabled={isConnecting}
        className={`
          relative h-16 px-10 rounded-full text-lg font-display tracking-widest uppercase transition-all duration-300
          ${isConnected 
            ? "bg-destructive/20 hover:bg-destructive/40 text-destructive border-2 border-destructive/50" 
            : "bg-primary/20 hover:bg-primary/30 text-primary border-2 border-primary/50 hover:shadow-[0_0_30px_rgba(74,222,128,0.4)]"
          }
        `}
      >
        {isConnected ? (
          <>
            <MicOff className="w-5 h-5 mr-3" />
            Terminate
          </>
        ) : (
          <>
            <Mic className="w-5 h-5 mr-3" />
            Start Transmission
          </>
        )}
      </Button>

      {/* Visualization Bars (Decorative) */}
      {isConnected && (
        <div className="flex gap-1 h-8 items-end justify-center w-full max-w-[200px]">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-primary/60 rounded-t"
              style={{
                height: isSpeaking ? `${Math.random() * 100}%` : "10%",
                transition: "height 0.1s ease-in-out"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
