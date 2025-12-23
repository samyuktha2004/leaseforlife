import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

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
    <>
      {/* Status Text - Top Left */}
      <div className="absolute top-8 left-8 flex items-center gap-2 text-sm font-mono tracking-wider z-40">
        <motion.div 
          animate={{ scale: isConnected ? [1, 1.2, 1] : 1 }}
          transition={{ repeat: isConnected ? Infinity : 0, duration: 1.5 }}
          className={`w-2 h-2 rounded-full ${isConnected ? "bg-primary" : "bg-red-500"}`} 
        />
        <span className={`${isConnected ? "text-primary text-glow" : "text-muted-foreground"}`}>
          {status === "connected" ? "UPLINK ACTIVE" : status === "connecting" ? "CONNECTING..." : "OFFLINE"}
        </span>
      </div>

      {/* Main Interaction Button - Bottom Left Corner */}
      <motion.div
        className="absolute bottom-12 left-12 z-50"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Button
          onClick={isConnected ? onDisconnect : onConnect}
          disabled={isConnecting}
          className={`
            relative h-14 px-8 rounded-full text-base font-display tracking-wider uppercase transition-all duration-300
            flex items-center gap-3
            ${isConnected 
              ? "bg-gradient-to-r from-destructive/40 to-destructive/20 hover:from-destructive/60 hover:to-destructive/40 text-destructive border-2 border-destructive/60 shadow-[0_0_20px_rgba(239,68,68,0.3)]" 
              : "bg-gradient-to-r from-primary/40 to-primary/20 hover:from-primary/60 hover:to-primary/40 text-primary border-2 border-primary/60 hover:shadow-[0_0_30px_rgba(74,222,128,0.5)]"
            }
          `}
        >
          {isConnected ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                <MicOff className="w-5 h-5" />
              </motion.div>
              <span>TERMINATE</span>
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              <span>START TRANSMISSION</span>
            </>
          )}
        </Button>

        {/* Connecting spinner */}
        {isConnecting && (
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.div>

      {/* Visualization Bars (Decorative) - Below Button */}
      {isConnected && (
        <div className="absolute bottom-4 left-8 flex gap-1 h-6 items-end w-32 z-40">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-gradient-to-t from-primary to-primary/40 rounded-t-sm"
              animate={{
                height: isSpeaking ? [Math.random() * 24, Math.random() * 24, Math.random() * 24] : 4
              }}
              transition={{
                duration: 0.2,
                repeat: isSpeaking ? Infinity : 0,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
