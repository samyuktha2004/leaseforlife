import { motion, AnimatePresence } from "framer-motion";

interface BackgroundContainerProps {
  backgroundImage: string;
  children: React.ReactNode;
}

export function BackgroundContainer({ backgroundImage, children }: BackgroundContainerProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={backgroundImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-linear hover:scale-105"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {/* Overlay for readability and atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
          <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
