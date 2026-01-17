"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo, LogoConstellation } from "../ui/Logo";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const leftTextRef = useRef<HTMLDivElement>(null);
    const rightTextRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial animation on load
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(logoRef.current, {
                scale: 0.8,
                opacity: 0,
                duration: 1.2,
            })
                .from(
                    leftTextRef.current,
                    {
                        x: -50,
                        opacity: 0,
                        duration: 0.8,
                    },
                    "-=0.6"
                )
                .from(
                    rightTextRef.current,
                    {
                        x: 50,
                        opacity: 0,
                        duration: 0.8,
                    },
                    "-=0.6"
                )
                .from(
                    taglineRef.current,
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                    },
                    "-=0.4"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "#0B0B0B" }}
        >
            {/* Background gradient effect */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(80, 60, 40, 0.15) 0%, transparent 60%)",
                }}
            />

            {/* Main content grid - matches original .future_grid */}
            <div className="relative z-10 w-full h-screen flex">
                {/* Left side text */}
                <div
                    ref={leftTextRef}
                    className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2"
                    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                >
                    <span
                        style={{
                            fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                            fontSize: "16px",
                            lineHeight: "17.6px",
                            letterSpacing: "-0.32px",
                            textTransform: "uppercase",
                            color: "#FFFFFF",
                            transform: "rotate(180deg)",
                            display: "block",
                        }}
                    >
                        Automate the Mundane
                    </span>
                </div>

                {/* Center content */}
                <div className="flex-1 flex flex-col items-center justify-center">
                    {/* Logo and CIRIDAE text */}
                    <div ref={logoRef} className="flex flex-col items-center gap-4">
                        <LogoConstellation className="w-24 h-24 md:w-32 md:h-32" />
                        <h1
                            style={{
                                fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                                fontSize: "clamp(48px, 10vw, 120px)",
                                fontWeight: 400,
                                letterSpacing: "-0.03em",
                                lineHeight: 0.9,
                                textTransform: "uppercase",
                                color: "#FFFFFF",
                            }}
                        >
                            CIRIDAE
                        </h1>
                    </div>
                </div>

                {/* Right side text */}
                <div
                    ref={rightTextRef}
                    className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2"
                    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                >
                    <span
                        style={{
                            fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                            fontSize: "16px",
                            lineHeight: "17.6px",
                            letterSpacing: "-0.32px",
                            textTransform: "uppercase",
                            color: "#FFFFFF",
                        }}
                    >
                        Unleash the Remarkable
                    </span>
                </div>
            </div>

            {/* Bottom tagline */}
            <div
                ref={taglineRef}
                className="absolute bottom-12 left-0 right-0 text-center px-4"
            >
                <p
                    style={{
                        fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                        fontSize: "16px",
                        lineHeight: "14.4px",
                        letterSpacing: "-0.32px",
                        textTransform: "uppercase",
                        color: "#FFFFFF",
                        maxWidth: "600px",
                        margin: "0 auto",
                    }}
                >
                    We are re-architecting the businesses of today for a faster, smarter
                    tomorrow
                </p>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border border-white/30 rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-2 bg-white/50 rounded-full" />
                </div>
            </div>
        </section>
    );
}
