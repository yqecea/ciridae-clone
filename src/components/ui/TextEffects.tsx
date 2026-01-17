"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface ScrambleTextProps {
    /** Final text to display */
    text: string;
    /** Trigger animation on mount (default: true) */
    autoPlay?: boolean;
    /** Characters to use for scramble (default: uppercase + numbers) */
    chars?: string;
    /** Animation duration in seconds (default: 1) */
    duration?: number;
    /** Reveal delay (default: 0.5) */
    revealDelay?: number;
    className?: string;
}

/**
 * ScrambleText - Text scrambles then reveals
 * 
 * Based on Context7 GSAP ScrambleTextPlugin docs.
 * Note: ScrambleTextPlugin is a GSAP Club plugin.
 * This is a pure JS implementation for similar effect.
 */
export function ScrambleText({
    text,
    autoPlay = true,
    chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    duration = 1,
    revealDelay = 0.5,
    className = "",
}: ScrambleTextProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const originalText = text;

    useEffect(() => {
        if (!ref.current || !autoPlay) return;

        const element = ref.current;
        const finalText = originalText;
        const textLength = finalText.length;
        let frame = 0;
        const totalFrames = duration * 60; // 60fps
        const revealFrame = revealDelay * 60;

        const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];

        const animate = () => {
            frame++;

            // Calculate how many characters should be revealed
            const revealProgress = Math.max(0, (frame - revealFrame) / (totalFrames - revealFrame));
            const revealedCount = Math.floor(revealProgress * textLength);

            // Build the display text
            let displayText = "";
            for (let i = 0; i < textLength; i++) {
                if (i < revealedCount) {
                    displayText += finalText[i];
                } else if (finalText[i] === " ") {
                    displayText += " ";
                } else {
                    displayText += getRandomChar();
                }
            }

            element.textContent = displayText;

            if (frame < totalFrames) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = finalText;
            }
        };

        // Start with scrambled text
        element.textContent = Array(textLength)
            .fill(0)
            .map((_, i) => (originalText[i] === " " ? " " : getRandomChar()))
            .join("");

        requestAnimationFrame(animate);
    }, [autoPlay, chars, duration, originalText, revealDelay]);

    return (
        <span ref={ref} className={className}>
            {text}
        </span>
    );
}

interface KineticTypographyProps {
    children: string;
    /** Animation type */
    type?: "wave" | "bounce" | "rotate" | "scale";
    /** Duration per character (default: 0.5) */
    duration?: number;
    /** Stagger delay (default: 0.05) */
    stagger?: number;
    /** Repeat animation (default: -1 for infinite) */
    repeat?: number;
    className?: string;
}

/**
 * KineticTypography - Continuously animated text
 * 
 * Based on Context7 GSAP SplitText patterns.
 */
export function KineticTypography({
    children,
    type = "wave",
    duration = 0.5,
    stagger = 0.05,
    repeat = -1,
    className = "",
}: KineticTypographyProps) {
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const chars = containerRef.current.querySelectorAll(".kinetic-char");

        const animations: Record<string, gsap.TweenVars> = {
            wave: { y: -20, ease: "sine.inOut" },
            bounce: { y: -30, ease: "bounce.out" },
            rotate: { rotation: 360, ease: "power1.inOut" },
            scale: { scale: 1.3, ease: "power2.inOut" },
        };

        const tl = gsap.timeline({ repeat, yoyo: true });

        tl.to(chars, {
            ...animations[type],
            duration,
            stagger: {
                each: stagger,
                from: "start",
            },
        });

        return () => {
            tl.kill();
        };
    }, [type, duration, stagger, repeat]);

    const splitChars = children.split("").map((char, i) => (
        <span
            key={i}
            className="kinetic-char inline-block"
            style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
            {char === " " ? "\u00A0" : char}
        </span>
    ));

    return (
        <span ref={containerRef} className={`inline-block ${className}`}>
            {splitChars}
        </span>
    );
}
