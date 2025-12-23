import { motion } from "framer-motion";

interface LevelIndicatorProps {
  level: number;
}

export function LevelIndicator({ level }: LevelIndicatorProps) {
  const stoneCount = Math.min(level, 4);
  
  return (
    <motion.div 
      className="absolute top-6 right-6 flex flex-col items-center gap-3 bg-black/60 backdrop-blur border border-primary/20 p-4 rounded-lg"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <span className="text-xs text-muted-foreground uppercase tracking-widest font-display">Progress</span>
      
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: i < stoneCount ? 1 : 0.7 }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            <img 
              src="/assets/level_green.png" 
              alt={`Level ${i + 1}`}
              className={`w-12 h-12 object-contain transition-all ${
                i < stoneCount 
                  ? 'opacity-100 filter drop-shadow-[0_0_10px_rgba(74,222,128,0.6)]' 
                  : 'opacity-30'
              }`}
            />
          </motion.div>
        ))}
      </div>
      
      {level === 5 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-primary uppercase tracking-widest font-display text-glow"
        >
          FINAL STAGE
        </motion.div>
      )}
    </motion.div>
  );
}
