import { motion } from "framer-motion";

interface LevelIndicatorProps {
  level: number;
}

export function LevelIndicator({ level }: LevelIndicatorProps) {
  const stoneCount = Math.min(level, 4);
  
  // Zig-zag pattern positions for stones on the grey carpet
  const positions = [
    { x: 0, y: 0 },      // Level 1 - center
    { x: -80, y: -80 },   // Level 2 - top-left
    { x: 80, y: 0 },      // Level 3 - bottom-right
    { x: -80, y: 80 },    // Level 4 - bottom-left
  ];

  return (
    <>
      {/* Level Stones on Grey Carpet */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`stone-${i}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: i < stoneCount ? 1 : 0.4,
              opacity: i < stoneCount ? 1 : 0.2,
              x: positions[i].x,
              y: positions[i].y
            }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative w-20 h-20">
              <img 
                src="/assets/level_green.png" 
                alt={`Level ${i + 1}`}
                className={`w-full h-full object-contain transition-all ${
                  i < stoneCount 
                    ? 'filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)]' 
                    : 'filter drop-shadow-[0_0_5px_rgba(74,222,128,0.2)]'
                }`}
              />
              {/* Level Number */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
                  {i + 1}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Level 5 - Toaster in center */}
        {level === 5 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative w-20 h-20">
              <img 
                src="/assets/toaster.png" 
                alt="Level 5 - Toaster"
                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(74,222,128,0.8)]"
              />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-primary font-display text-xs uppercase tracking-widest text-glow">
                Final Stage
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
