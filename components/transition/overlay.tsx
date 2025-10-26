'use client';

import { motion } from "framer-motion";

const overlayVariants = {
    initial: { height: "0%", bottom: 0 },
    animate: {
        height: ["0%", "100%", "0%"],
        bottom: ["0", "0", "100%"],
        transition: {
            duration: 1.2,
            times: [0, 0.5, 1],
            ease: "easeInOut",
        },
    },
};

interface TransitionOverlayProps {
    onAnimationComplete?: () => void;
}

export default function TransitionOverlay({ onAnimationComplete }: TransitionOverlayProps) {
    return (
        <motion.div
            className="fixed left-0 w-full bg-black z-[9999]"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            onAnimationComplete={onAnimationComplete}
        />
    );
}
