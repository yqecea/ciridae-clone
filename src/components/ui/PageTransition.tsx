"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

/**
 * Page Transitions using Framer Motion AnimatePresence
 * 
 * Based on Context7 Motion docs: Uses AnimatePresence with
 * exit animations for smooth page transitions.
 */

// Transition variants with proper typing
const pageVariants: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    enter: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: -20,
    },
};

// Reveal transition (curtain effect)
const revealVariants: Variants = {
    initial: {
        scaleY: 1,
    },
    enter: {
        scaleY: 0,
    },
    exit: {
        scaleY: 1,
    },
};

interface PageTransitionProps {
    children: ReactNode;
    /** Unique key for AnimatePresence (usually pathname) */
    transitionKey: string;
    /** Transition type (default: fade) */
    type?: "fade" | "slide" | "reveal";
    className?: string;
}

/**
 * PageTransition - Wrap page content for animated transitions
 */
export function PageTransition({
    children,
    transitionKey,
    type = "fade",
    className = "",
}: PageTransitionProps) {
    const variants = type === "reveal" ? revealVariants : pageVariants;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={transitionKey}
                variants={variants}
                initial="initial"
                animate="enter"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={className}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

interface RevealTransitionProps {
    children: ReactNode;
    /** Color of the reveal curtain (default: accent) */
    curtainColor?: string;
    transitionKey: string;
}

/**
 * RevealTransition - Curtain/mask page reveal effect
 */
export function RevealTransition({
    children,
    curtainColor = "var(--accent)",
    transitionKey,
}: RevealTransitionProps) {
    return (
        <AnimatePresence mode="wait">
            <motion.div key={transitionKey} className="relative">
                {/* Curtain overlay */}
                <motion.div
                    variants={revealVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 origin-top z-50"
                    style={{ background: curtainColor }}
                />
                {/* Page content */}
                <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

/**
 * LayoutTransition - Shared element transitions via layoutId
 */
interface LayoutTransitionProps {
    children: ReactNode;
    layoutId: string;
    className?: string;
}

export function LayoutTransition({
    children,
    layoutId,
    className = "",
}: LayoutTransitionProps) {
    return (
        <motion.div
            layoutId={layoutId}
            className={className}
            transition={{
                type: "spring",
                stiffness: 350,
                damping: 30,
            }}
        >
            {children}
        </motion.div>
    );
}

