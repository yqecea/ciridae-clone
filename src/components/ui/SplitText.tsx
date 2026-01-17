"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";

interface SplitTextProps {
    children: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "p" | "span";
    delay?: number;
    stagger?: number;
    duration?: number;
    animateOnScroll?: boolean;
}

/**
 * SplitText Component - Animates text by splitting into characters
 * 
 * Creates the classic awwwards text reveal effect where each letter
 * animates in with stagger timing.
 */
export function SplitText({
    children,
    className = "",
    as: Component = "span",
    delay = 0,
    stagger = 0.03,
    duration = 0.8,
    animateOnScroll = false,
}: SplitTextProps) {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const chars = containerRef.current.querySelectorAll(".split-char");

        const ctx = gsap.context(() => {
            if (animateOnScroll) {
                gsap.from(chars, {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                    opacity: 0,
                    y: 40,
                    rotateX: -90,
                    duration,
                    delay,
                    stagger,
                    ease: "back.out(1.7)",
                });
            } else {
                gsap.from(chars, {
                    opacity: 0,
                    y: 40,
                    rotateX: -90,
                    duration,
                    delay,
                    stagger,
                    ease: "back.out(1.7)",
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, [delay, stagger, duration, animateOnScroll]);

    // Split text into characters, preserving spaces
    const chars = children.split("").map((char, i) => (
        <span
            key={i}
            className="split-char inline-block"
            style={{
                transformStyle: "preserve-3d",
                whiteSpace: char === " " ? "pre" : undefined,
            }}
        >
            {char === " " ? "\u00A0" : char}
        </span>
    ));

    return (
        <Component
            ref={containerRef as React.RefObject<HTMLHeadingElement>}
            className={`${className} inline-block`}
            style={{ perspective: "1000px" }}
        >
            {chars}
        </Component>
    );
}
