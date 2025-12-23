import { motion, AnimatePresence } from "framer-motion";

interface CharacterDisplayProps {
  imageSrc: string;
  name: string;
  isSpeaking: boolean;
}

export function CharacterDisplay({ imageSrc, name, isSpeaking }: CharacterDisplayProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={imageSrc}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-8 right-8 z-30 w-64 h-auto flex flex-col items-center gap-3"
      >
        <div className={`relative transition-all duration-300 ${isSpeaking ? "scale-[1.05]" : "scale-100"}`}>
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-auto object-contain drop-shadow-[0_0_20px_rgba(74,222,128,0.4)]"
          />
          
          {isSpeaking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute -inset-4 bg-primary/10 mix-blend-screen rounded-full blur-2xl pointer-events-none"
            />
          )}
        </div>

        {/* Character Nameplate */}
        <motion.div 
          className="bg-black/80 backdrop-blur border border-primary/30 px-4 py-2 w-full text-center"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h3 className="text-sm text-primary font-display tracking-widest uppercase text-glow">
            {name}
          </h3>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
