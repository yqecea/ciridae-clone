"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
    /** Minimum display time in ms (default: 2000) */
    minDuration?: number;
    /** Callback when preloader completes */
    onComplete?: () => void;
}

/**
 * Preloader - Animated loading screen with logo reveal
 * 
 * Creates premium awwwards-style loading experience:
 * - Animated logo/text reveal
 * - Progress simulation
 * - Smooth exit transition
 */
export function Preloader({
    minDuration = 2000,
    onComplete,
}: PreloaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        const logo = logoRef.current;
        const progress = progressRef.current;

        if (!container || !logo || !progress) return;

        // Lock body scroll during preload
        document.body.style.overflow = "hidden";

        const tl = gsap.timeline({
            onComplete: () => {
                // Exit animation
                gsap.to(container, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: "power4.inOut",
                    onComplete: () => {
                        setIsComplete(true);
                        document.body.style.overflow = "";
                        onComplete?.();
                    },
                });
            },
        });

        // Logo entrance
        tl.from(logo, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        });

        // Progress bar fill
        tl.to(progress, {
            width: "100%",
            duration: minDuration / 1000,
            ease: "power1.inOut",
        }, "-=0.4");

        // Logo exit prep
        tl.to(logo, {
            y: -30,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
        }, "-=0.2");

        return () => {
            tl.kill();
            document.body.style.overflow = "";
        };
    }, [minDuration, onComplete]);

    if (isComplete) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100000] flex flex-col items-center justify-center"
            style={{ background: "var(--bg-primary)" }}
        >
            {/* Logo / Brand Mark */}
            <div ref={logoRef} className="text-center">
                <h1
                    className="text-display"
                    style={{
                        fontSize: "clamp(32px, 8vw, 72px)",
                        color: "var(--fg-primary)",
                    }}
                >
                    CIRIDAE
                </h1>
                <p
                    className="text-mono mt-4"
                    style={{ color: "var(--fg-muted)" }}
                >
                    THE NEW INTELLIGENCE
                </p>
            </div>

            {/* Progress Bar */}
            <div
                className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-px"
                style={{ background: "var(--glass-border)" }}
            >
                <div
                    ref={progressRef}
                    className="h-full"
                    style={{
                        width: "0%",
                        background: "var(--accent)",
                    }}
                />
            </div>
        </div>
    );
}
