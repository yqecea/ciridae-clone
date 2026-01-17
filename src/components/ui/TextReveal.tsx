"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
    children: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    /** Trigger when element enters viewport (default: true) */
    triggerOnScroll?: boolean;
    /** Delay before animation starts */
    delay?: number;
}

/**
 * TextReveal - Text revealed with clip-path mask animation
 * 
 * Creates the premium text reveal effect where text appears
 * to slide up from behind a mask.
 */
export function TextReveal({
    children,
    className = "",
    as: Component = "span",
    triggerOnScroll = true,
    delay = 0,
}: TextRevealProps) {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;

        const ctx = gsap.context(() => {
            const baseAnimation = {
                y: "100%",
                opacity: 0,
            };

            const animationConfig = {
                y: 0,
                opacity: 1,
                duration: 1,
                delay,
                ease: "power3.out",
            };

            if (triggerOnScroll) {
                gsap.fromTo(textRef.current, baseAnimation, {
                    ...animationConfig,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                });
            } else {
                gsap.fromTo(textRef.current, baseAnimation, animationConfig);
            }
        }, containerRef);

        return () => ctx.revert();
    }, [triggerOnScroll, delay]);

    return (
        <Component
            ref={containerRef as React.RefObject<HTMLHeadingElement>}
            className={`${className} overflow-hidden inline-block`}
        >
            <span
                ref={textRef}
                className="inline-block"
            >
                {children}
            </span>
        </Component>
    );
}

interface BlurRevealProps {
    children: ReactNode;
    className?: string;
    /** Starting blur amount (default: 20) */
    blurAmount?: number;
}

/**
 * BlurReveal - Content unblurs on scroll
 * 
 * Elements start blurred and gradually come into focus as
 * user scrolls them into view.
 */
export function BlurReveal({
    children,
    className = "",
    blurAmount = 20,
}: BlurRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            gsap.from(ref.current, {
                filter: `blur(${blurAmount}px)`,
                opacity: 0.5,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 80%",
                    end: "top 30%",
                    scrub: 1,
                },
            });
        }, ref);

        return () => ctx.revert();
    }, [blurAmount]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
