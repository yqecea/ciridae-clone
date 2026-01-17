"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealOptions {
    y?: number;           // Vertical offset to animate from
    opacity?: number;     // Starting opacity
    blur?: number;        // Starting blur in pixels
    duration?: number;    // Animation duration
    delay?: number;       // Delay before animation
    start?: string;       // ScrollTrigger start position
    stagger?: number;     // Stagger delay for multiple elements
}

/**
 * Scroll Reveal Hook - Reveals elements as they enter viewport
 * 
 * Usage:
 * ```tsx
 * const containerRef = useScrollReveal({ y: 100, blur: 10 });
 * <div ref={containerRef}>
 *   <div className="reveal-item">Content</div>
 * </div>
 * ```
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
    options: ScrollRevealOptions = {}
) {
    const {
        y = 60,
        opacity = 0,
        blur = 8,
        duration = 1,
        delay = 0,
        start = "top 85%",
        stagger = 0.1,
    } = options;

    const containerRef = useRef<T>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const items = containerRef.current.querySelectorAll(".reveal-item");
        const targets = items.length > 0 ? items : [containerRef.current];

        const ctx = gsap.context(() => {
            gsap.from(targets, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start,
                    toggleActions: "play none none reverse",
                },
                y,
                opacity,
                filter: blur > 0 ? `blur(${blur}px)` : undefined,
                duration,
                delay,
                stagger,
                ease: "power3.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, [y, opacity, blur, duration, delay, start, stagger]);

    return containerRef;
}

/**
 * Parallax Hook - Creates depth effect where element moves slower/faster than scroll
 * 
 * Usage:
 * ```tsx
 * const parallaxRef = useParallax({ speed: 0.5 });
 * <div ref={parallaxRef}>Background image</div>
 * ```
 */
interface ParallaxOptions {
    speed?: number;      // Movement speed (0.5 = half speed, 2 = double)
    direction?: "y" | "x";
}

export function useParallax<T extends HTMLElement = HTMLElement>(
    options: ParallaxOptions = {}
) {
    const { speed = 0.3, direction = "y" } = options;
    const ref = useRef<T>(null);

    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            gsap.to(ref.current, {
                [direction === "y" ? "yPercent" : "xPercent"]: speed * 100,
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
    }, [speed, direction]);

    return ref;
}
