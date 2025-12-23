import { motion, AnimatePresence } from "framer-motion";

interface CharacterDisplayProps {
  imageSrc: string;
  name: string;
  isSpeaking: boolean;
}

export function CharacterDisplay({ imageSrc, name, isSpeaking }: CharacterDisplayProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-8 relative">
      {/* Holographic Base Effect */}
      <div className="absolute bottom-0 w-64 h-8 bg-primary/20 blur-xl rounded-[100%] animate-pulse" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={imageSrc}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8 }}
          className="relative max-w-2xl w-full aspect-square md:aspect-[4/3] flex items-center justify-center"
        >
          <div className={`relative w-full h-full transition-all duration-300 ${isSpeaking ? "scale-[1.02]" : "scale-100"}`}>
            <img
              src={imageSrc}
              alt={name}
              className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            />
            
            {/* Speaking Glow Effect */}
            {isSpeaking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 bg-primary/10 mix-blend-screen rounded-full blur-2xl pointer-events-none"
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nameplate */}
      <motion.div 
        className="absolute bottom-12 bg-black/80 backdrop-blur-md border border-primary/30 px-8 py-3 rounded-none skew-x-[-10deg]"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-2xl text-primary font-display tracking-widest uppercase skew-x-[10deg] text-glow">
          {name}
        </h2>
      </motion.div>
    </div>
  );
}
