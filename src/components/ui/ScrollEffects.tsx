"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalScrollProps {
    children: ReactNode;
    /** Speed multiplier (default: 1) */
    speed?: number;
    className?: string;
}

/**
 * HorizontalScroll - Horizontal scrolling section
 * 
 * Creates the awwwards effect where vertical scroll is converted
 * to horizontal scroll within a section.
 */
export function HorizontalScroll({
    children,
    speed = 1,
    className = "",
}: HorizontalScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !trackRef.current) return;

        const track = trackRef.current;
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;

        const ctx = gsap.context(() => {
            gsap.to(track, {
                x: -(trackWidth - viewportWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${trackWidth * speed}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [speed]);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <div ref={trackRef} className="flex w-fit">
                {children}
            </div>
        </div>
    );
}

interface ParallaxLayerProps {
    children: ReactNode;
    /** Speed multiplier - negative for opposite direction (default: 0.5) */
    speed?: number;
    className?: string;
}

/**
 * ParallaxLayer - Element that moves at different speed on scroll
 * 
 * Wraps content to move at a different rate than normal scroll,
 * creating depth and dimension.
 */
export function ParallaxLayer({
    children,
    speed = 0.5,
    className = "",
}: ParallaxLayerProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            gsap.to(ref.current, {
                y: () => window.innerHeight * speed * -1,
                ease: "none",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, ref);

        return () => ctx.revert();
    }, [speed]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
