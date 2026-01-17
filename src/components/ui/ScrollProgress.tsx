"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollProgressProps {
    /** Position: top or bottom (default: top) */
    position?: "top" | "bottom";
    /** Height of the progress bar (default: 3) */
    height?: number;
    /** Color of the progress bar (default: accent color) */
    color?: string;
}

/**
 * ScrollProgress - Progress bar showing scroll position
 * 
 * Creates a thin progress bar at top/bottom of viewport that 
 * fills as user scrolls down the page.
 */
export function ScrollProgress({
    position = "top",
    height = 3,
    color = "var(--accent)",
}: ScrollProgressProps) {
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!progressRef.current) return;

        const ctx = gsap.context(() => {
            gsap.to(progressRef.current, {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.3,
                },
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={progressRef}
            className="fixed left-0 right-0 origin-left"
            style={{
                [position]: 0,
                height,
                background: color,
                transform: "scaleX(0)",
                zIndex: 99998,
            }}
        />
    );
}
