import { motion } from "framer-motion";

interface LevelIndicatorProps {
  level: number;
}

export function LevelIndicator({ level }: LevelIndicatorProps) {
  return (
    <motion.div 
      className="absolute top-6 left-6 flex items-center gap-4 bg-black/60 backdrop-blur border border-primary/20 p-2 pr-6 rounded-full"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <div className="relative w-16 h-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-full h-full"
        >
           <img 
            src="/assets/level_green.jpg" 
            alt="Level Stone"
            className="w-full h-full object-cover rounded-full border-2 border-primary/50 shadow-[0_0_15px_rgba(74,222,128,0.3)]"
          />
        </motion.div>
        <div className="absolute -bottom-1 -right-1 bg-black border border-primary text-primary font-display text-xs px-1.5 py-0.5 rounded">
          LVL
        </div>
      </div>
      
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-display">Current Protocol</span>
        <span className="text-xl font-bold font-display text-white">
          Level 0{level}
        </span>
      </div>
    </motion.div>
  );
}
