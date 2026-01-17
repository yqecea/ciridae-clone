"use client";

import { useRef, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const logoGroupRef = useRef<SVGGElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const leftTextRef = useRef<HTMLDivElement>(null);
    const rightTextRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLDivElement>(null);

    // Using official useGSAP hook for automatic cleanup (Context7 best practice)
    const { contextSafe } = useGSAP(() => {
        // Staggered Entrance Animation
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // 1. Logo pieces assemble
        tl.from(logoGroupRef.current?.querySelectorAll("path") || [], {
            opacity: 0,
            scale: 0,
            y: 50,
            duration: 1.2,
            stagger: 0.05,
            ease: "back.out(1.7)",
        })
            // 2. Title reveals with blur removal
            .from(titleRef.current, {
                opacity: 0,
                scale: 1.1,
                filter: "blur(20px)",
                duration: 1.5,
                ease: "power4.out",
            }, "-=0.8")
            // 3. Side texts
            .from([leftTextRef.current, rightTextRef.current], {
                opacity: 0,
                y: 20,
                duration: 1,
                stagger: 0.2,
            }, "-=1")
            // 4. Tagline
            .from(taglineRef.current, {
                opacity: 0,
                y: 20,
                filter: "blur(10px)",
                duration: 1,
            }, "-=0.8");
    }, { scope: sectionRef });

    // Mouse movement handler wrapped in contextSafe for proper cleanup
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!logoGroupRef.current || !sectionRef.current) return;

        const { clientX, clientY } = e;
        const rect = sectionRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const moveX = (clientX - centerX) * 0.05;
        const moveY = (clientY - centerY) * 0.05;

        // Move entire logo group slightly
        gsap.to(logoGroupRef.current, {
            x: moveX,
            y: moveY,
            duration: 1,
            ease: "power2.out",
        });

        // Parallax stars within the logo
        const stars = logoGroupRef.current.querySelectorAll(".star");
        stars.forEach((star, i) => {
            const depth = 1 + (i % 3) * 0.5;
            gsap.to(star, {
                x: moveX * depth,
                y: moveY * depth,
                duration: 1.2,
                ease: "power2.out",
            });
        });
    }, []);

    // Separate effect for mouse listener with proper cleanup
    useGSAP(() => {
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, { dependencies: [handleMouseMove] });

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "#050505" }}
        >
            {/* ===== CINEMATIC BACKGROUND LAYERS ===== */}

            {/* Layer 1: Cinematic Background Image */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: "url('/images/hero-background.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.7,
                    filter: "blur(2px) saturate(1.2)",
                }}
            />

            {/* Layer 2: Primary warm light leak (center-left) */}
            <div
                className="absolute inset-0 pointer-events-none light-leak-animated"
                style={{
                    background: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(204, 100, 55, 0.25) 0%, rgba(180, 80, 40, 0.1) 40%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />

            {/* Layer 3: Secondary cool undertone */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 100% 80% at 70% 60%, rgba(40, 60, 100, 0.15) 0%, transparent 60%)",
                    filter: "blur(80px)",
                }}
            />

            {/* Layer 4: Vignette overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(5, 5, 5, 0.8) 100%)",
                }}
            />

            {/* Layer 5: Top gradient fade */}
            <div
                className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
                style={{
                    background: "linear-gradient(to bottom, rgba(5, 5, 5, 0.9) 0%, transparent 100%)",
                }}
            />

            {/* ===== MAIN CONTENT ===== */}
            <div className="relative z-10 w-full h-screen flex flex-col md:flex-row items-center justify-center">

                {/* Left side vertical text */}
                <div
                    ref={leftTextRef}
                    className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden md:block"
                    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                >
                    <span className="text-mono text-xs tracking-[0.15em] opacity-35 rotate-180">
                        Automate the Mundane
                    </span>

                </div>

                {/* Center Core */}
                <div className="flex flex-col items-center z-10">
                    {/* Interactive Constellation SVG */}
                    <div className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] flex items-center justify-center mb-6">
                        <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 200 200"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="overflow-visible"
                        >
                            <defs>
                                <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="white" stopOpacity="1" />
                                    <stop offset="50%" stopColor="white" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                                </radialGradient>
                                <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <filter id="soft-glow" x="-100%" y="-100%" width="300%" height="300%">
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            <g ref={logoGroupRef} filter="url(#glow-strong)">
                                {/* Connecting Lines (Static base) */}
                                <g stroke="rgba(255,255,255,0.12)" strokeWidth="0.5">
                                    <line x1="100" y1="40" x2="100" y2="160" />
                                    <line x1="40" y1="100" x2="160" y2="100" />
                                    <path d="M100 40 L40 100 L100 160 L160 100 Z" fill="none" />
                                </g>

                                {/* Stars (Animated) */}
                                <g className="stars-group">
                                    {/* Center Key Star - 8-point star */}
                                    <path
                                        className="star"
                                        d="M100 80 L103 94 L100 88 L97 94 L100 80 M120 100 L106 103 L112 100 L106 97 L120 100 M100 120 L97 106 L100 112 L103 106 L100 120 M80 100 L94 97 L88 100 L94 103 L80 100"
                                        fill="white"
                                        filter="url(#soft-glow)"
                                    />
                                    {/* Simpler center star */}
                                    <path className="star" d="M100 88 L103 97 L112 100 L103 103 L100 112 L97 103 L88 100 L97 97 Z" fill="white" />

                                    {/* Orbital Stars - Cardinal points */}
                                    <circle className="star" cx="100" cy="40" r="2.5" fill="white" opacity="0.95" />
                                    <circle className="star" cx="160" cy="100" r="2.5" fill="white" opacity="0.95" />
                                    <circle className="star" cx="100" cy="160" r="2.5" fill="white" opacity="0.95" />
                                    <circle className="star" cx="40" cy="100" r="2.5" fill="white" opacity="0.95" />

                                    {/* Floating Particles */}
                                    <circle className="star" cx="130" cy="70" r="1.2" fill="white" opacity="0.5" />
                                    <circle className="star" cx="70" cy="130" r="1.2" fill="white" opacity="0.5" />
                                    <circle className="star" cx="140" cy="140" r="0.8" fill="white" opacity="0.35" />
                                    <circle className="star" cx="60" cy="60" r="0.8" fill="white" opacity="0.35" />
                                </g>
                            </g>
                        </svg>
                    </div>

                    <h1
                        ref={titleRef}
                        className="text-display text-center mix-blend-difference text-white"
                        style={{
                            fontSize: "clamp(48px, 10vw, 120px)",
                        }}
                    >
                        CIRIDAE
                    </h1>
                </div>

                {/* Right side vertical text */}
                <div
                    ref={rightTextRef}
                    className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden md:block"
                    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                >
                    <span className="text-mono text-xs tracking-[0.15em] opacity-35">
                        Unleash the Remarkable
                    </span>
                </div>
            </div>

            {/* Bottom tagline - Matching original text */}
            <div
                ref={taglineRef}
                className="absolute bottom-12 left-0 right-0 text-center px-4"
            >
                <div className="flex flex-col items-center gap-2">
                    <p className="max-w-lg mx-auto text-mono text-xs tracking-[0.08em] uppercase opacity-50 leading-relaxed">
                        We are re-architecting the<br />
                        businesses of today for a faster,<br />
                        smarter tomorrow
                    </p>
                </div>
            </div>
        </section>
    );
}
