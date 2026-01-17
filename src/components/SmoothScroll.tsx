"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin once
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
    children: React.ReactNode;
}

/**
 * SmoothScroll Provider using Lenis + GSAP Integration
 * 
 * Based on official Lenis documentation from Context7:
 * - Uses ReactLenis component for React integration
 * - Disables autoRaf and syncs with GSAP ticker for perfect animation coordination
 * - ScrollTrigger.update is called on each scroll event
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<LenisRef>(null);

    useEffect(() => {
        // GSAP Ticker integration - drives Lenis animation frame
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        // Add to GSAP ticker for smooth sync
        gsap.ticker.add(update);

        // Disable lag smoothing for immediate responsiveness
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
        };
    }, []);

    return (
        <ReactLenis
            root
            ref={lenisRef}
            options={{
                autoRaf: false,           // We use GSAP ticker instead
                duration: 1.2,            // Scroll animation duration (higher = smoother)
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
                orientation: "vertical",
                gestureOrientation: "vertical",
                smoothWheel: true,        // Smooth mouse wheel scrolling
                touchMultiplier: 2,       // Touch device sensitivity
            }}
        >
            {children}
        </ReactLenis>
    );
}

