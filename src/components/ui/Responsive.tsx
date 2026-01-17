"use client";

import { useEffect, useRef, ReactNode, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface AdaptiveAnimationProps {
    children: ReactNode;
    /** Animation to apply on desktop */
    desktopAnimation?: gsap.TweenVars;
    /** Animation to apply on mobile (or null to disable) */
    mobileAnimation?: gsap.TweenVars | null;
    /** Breakpoint in px (default: 768) */
    breakpoint?: number;
    className?: string;
}

/**
 * AdaptiveAnimation - Responsive animations using gsap.matchMedia()
 * 
 * Based on Context7 GSAP docs: Uses matchMedia() for responsivity
 * and prefers-reduced-motion for accessibility.
 */
export function AdaptiveAnimation({
    children,
    desktopAnimation = { opacity: 0, y: 50, duration: 1 },
    mobileAnimation = { opacity: 0, duration: 0.5 },
    breakpoint = 768,
    className = "",
}: AdaptiveAnimationProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            // No animation for reduced motion
            gsap.set(element, { opacity: 1 });
            return;
        }

        // Use GSAP matchMedia for responsive animations
        const mm = gsap.matchMedia();

        mm.add(`(min-width: ${breakpoint}px)`, () => {
            gsap.from(element, {
                ...desktopAnimation,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });
        });

        if (mobileAnimation !== null) {
            mm.add(`(max-width: ${breakpoint - 1}px)`, () => {
                gsap.from(element, {
                    ...mobileAnimation,
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                });
            });
        }

        return () => {
            mm.revert();
        };
    }, [desktopAnimation, mobileAnimation, breakpoint]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

interface PerformanceGateProps {
    children: ReactNode;
    /** Fallback for low-end devices */
    fallback?: ReactNode;
    /** Min CPU cores required (default: 4) */
    minCores?: number;
    className?: string;
}

/**
 * PerformanceGate - Disable effects on low-end devices
 * 
 * Based on awwwards-patterns.md: navigator.hardwareConcurrency
 */
export function PerformanceGate({
    children,
    fallback,
    minCores = 4,
    className = "",
}: PerformanceGateProps) {
    const [isHighEnd, setIsHighEnd] = useState(true);

    useEffect(() => {
        // Check hardware capability
        const cores = navigator.hardwareConcurrency || 2;
        const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;

        // Consider high-end if has enough cores and memory
        setIsHighEnd(cores >= minCores && memory >= 4);
    }, [minCores]);

    return (
        <div className={className}>
            {isHighEnd ? children : (fallback || children)}
        </div>
    );
}

interface TouchGestureProps {
    children: ReactNode;
    /** Callback on swipe left */
    onSwipeLeft?: () => void;
    /** Callback on swipe right */
    onSwipeRight?: () => void;
    /** Callback on swipe up */
    onSwipeUp?: () => void;
    /** Callback on swipe down */
    onSwipeDown?: () => void;
    /** Min swipe distance in px (default: 50) */
    threshold?: number;
    className?: string;
}

/**
 * TouchGesture - Swipe gesture detection
 * 
 * Based on awwwards-patterns.md: Native touch gestures
 */
export function TouchGesture({
    children,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
    className = "",
}: TouchGestureProps) {
    const ref = useRef<HTMLDivElement>(null);
    const startX = useRef(0);
    const startY = useRef(0);

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;

        const handleTouchStart = (e: TouchEvent) => {
            startX.current = e.touches[0].clientX;
            startY.current = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;

            const diffX = endX - startX.current;
            const diffY = endY - startY.current;

            const absX = Math.abs(diffX);
            const absY = Math.abs(diffY);

            // Determine swipe direction
            if (absX > absY && absX > threshold) {
                if (diffX > 0) {
                    onSwipeRight?.();
                } else {
                    onSwipeLeft?.();
                }
            } else if (absY > absX && absY > threshold) {
                if (diffY > 0) {
                    onSwipeDown?.();
                } else {
                    onSwipeUp?.();
                }
            }
        };

        element.addEventListener("touchstart", handleTouchStart, { passive: true });
        element.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
            element.removeEventListener("touchstart", handleTouchStart);
            element.removeEventListener("touchend", handleTouchEnd);
        };
    }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
