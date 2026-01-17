"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const logoGroupRef = useRef<SVGGElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const leftTextRef = useRef<HTMLDivElement>(null);
    const rightTextRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Mouse movement magnetic effect
            const onMouseMove = (e: MouseEvent) => {
                if (!logoGroupRef.current) return;

                const { clientX, clientY } = e;
                const { left, top, width, height } = sectionRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
                const centerX = left + width / 2;
                const centerY = top + height / 2;

                const moveX = (clientX - centerX) * 0.05;
                const moveY = (clientY - centerY) * 0.05;

                // Move entire logo group slightly
                gsap.to(logoGroupRef.current, {
                    x: moveX,
                    y: moveY,
                    duration: 1,
                    ease: "power2.out",
                });

                // Parallax starts within the logo
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
            };

            window.addEventListener("mousemove", onMouseMove);

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

            return () => window.removeEventListener("mousemove", onMouseMove);
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "#050505" }}
        >
            {/* Cinematic Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none opacity-40"
                style={{ background: "var(--gradient-void)" }} />

            <div className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(204, 100, 55, 0.1) 0%, transparent 60%)",
                    filter: "blur(80px)"
                }} />

            {/* Main content grid */}
            <div className="relative z-10 w-full h-screen flex flex-col md:flex-row items-center justify-center">

                {/* Left side vertical text */}
                <div
                    ref={leftTextRef}
                    className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden md:block"
                    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                >
                    <span className="text-mono tracking-widest text-white/40 rotate-180">
                        Automate the Mundane
                    </span>
                </div>

                {/* Center Core */}
                <div className="flex flex-col items-center z-10">
                    {/* Interactive Constellation SVG */}
                    <div className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] flex items-center justify-center mb-8">
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
                                    <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                                </radialGradient>
                                <filter id="glow-strong">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            <g ref={logoGroupRef} filter="url(#glow-strong)">
                                {/* Connecting Lines (Static base) */}
                                <g stroke="rgba(255,255,255,0.15)" strokeWidth="0.5">
                                    <line x1="100" y1="40" x2="100" y2="160" />
                                    <line x1="40" y1="100" x2="160" y2="100" />
                                    <path d="M100 40 L40 100 L100 160 L160 100 Z" fill="none" />
                                </g>

                                {/* Stars (Animated) */}
                                <g className="stars-group">
                                    {/* Center Key Star */}
                                    <path className="star" d="M100 85 L104 96 L115 100 L104 104 L100 115 L96 104 L85 100 L96 96 Z" fill="white" />

                                    {/* Orbital Stars */}
                                    <circle className="star" cx="100" cy="40" r="3" fill="white" opacity="0.9" />
                                    <circle className="star" cx="160" cy="100" r="3" fill="white" opacity="0.9" />
                                    <circle className="star" cx="100" cy="160" r="3" fill="white" opacity="0.9" />
                                    <circle className="star" cx="40" cy="100" r="3" fill="white" opacity="0.9" />

                                    {/* Floating Particles */}
                                    <circle className="star" cx="130" cy="70" r="1.5" fill="white" opacity="0.6" />
                                    <circle className="star" cx="70" cy="130" r="1.5" fill="white" opacity="0.6" />
                                    <circle className="star" cx="140" cy="140" r="1" fill="white" opacity="0.4" />
                                    <circle className="star" cx="60" cy="60" r="1" fill="white" opacity="0.4" />
                                </g>
                            </g>
                        </svg>
                    </div>

                    <h1
                        ref={titleRef}
                        className="text-display text-center mix-blend-difference"
                        style={{ color: "#FFFFFF" }}
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
                    <span className="text-mono tracking-widest text-white/40">
                        Unleash the Remarkable
                    </span>
                </div>
            </div>

            {/* Bottom tagline - Floating */}
            <div
                ref={taglineRef}
                className="absolute bottom-16 left-0 right-0 text-center px-4"
            >
                <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <p className="text-mono tracking-widest text-white/70">
                        Re-Architecting Business Logic for the AI Age
                    </p>
                </div>
            </div>
        </section>
    );
}
