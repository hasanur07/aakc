'use client';

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";

interface TransitionLayoutProps {
  children: ReactNode;
}

export default function TransitionLayout({ children }: TransitionLayoutProps) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState<ReactNode>(children);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [overlayPhase, setOverlayPhase] = useState<'idle' | 'cover' | 'reveal'>('idle');

  useEffect(() => {
    // Start overlay only if the pathname changes
    setIsTransitioning(true);
    setOverlayPhase('cover');
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="overlay"
            initial={{ height: 0 }}
            animate={{ height: overlayPhase === 'cover' ? '100vh' : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full bg-black z-50"
            onAnimationComplete={() => {
              if (overlayPhase === 'cover') {
                // Swap content after overlay fully covers screen
                setDisplayChildren(children);
                setOverlayPhase('reveal'); // start hiding overlay
              } else if (overlayPhase === 'reveal') {
                setIsTransitioning(false); // overlay removed
              }
            }}
          />
        )}
      </AnimatePresence>

      {/* Page content */}
      <div className="relative">
        {displayChildren}
      </div>
    </>
  );
}
