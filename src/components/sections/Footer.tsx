"use client";

import { MagneticButton } from "../ui/MagneticButton";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Blog", href: "#blog" },
];

export function Footer() {
    return (
        <footer
            className="relative w-full py-12 sm:py-16 md:py-24 overflow-hidden"
            style={{
                background: "#0B0B0B",
            }}
        >
            {/* Nebula background effect - Light leak from awwwards patterns */}
            <div
                className="absolute inset-0 opacity-60 pointer-events-none light-leak"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(30, 80, 120, 0.2) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />

            {/* Blue border frame */}
            <div
                className="absolute inset-4 md:inset-8 pointer-events-none z-0"
                style={{
                    border: "1px solid rgba(59, 130, 246, 0.25)",
                    borderRadius: "4px",
                }}
            />

            <div className="relative z-10 w-full px-8 md:px-12 h-full flex flex-col justify-between min-h-[400px]">

                {/* Left side label - San Francisco */}
                <div className="absolute top-1/2 -translate-y-1/2 left-8 md:left-16 hidden md:block">
                    <span className="text-mono text-[10px] tracking-[0.1em] uppercase text-white/35 vertical-rl rotate-180">
                        San Francisco
                    </span>
                </div>

                {/* Right side label - Fortitudine Vincimus */}
                <div className="absolute top-1/2 -translate-y-1/2 right-8 md:right-16 hidden md:flex flex-col items-center gap-8">
                    <span className="text-mono text-[10px] tracking-[0.1em] uppercase text-white/35 vertical-rl">
                        Est. 2025
                    </span>
                    <span className="text-mono text-[9px] tracking-[0.08em] uppercase text-white/25 vertical-rl">
                        Fortitudine Vincimus
                    </span>
                </div>

                {/* Main Centered Content */}
                <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center flex-1">
                    {/* Star icon and Logo */}
                    <div className="flex flex-col items-center mb-12">
                        {/* Constellation star icon with glow */}
                        <div className="relative w-16 h-16 mb-4 glow-text">
                            <svg
                                viewBox="0 0 64 64"
                                fill="none"
                                className="w-full h-full icon-animated"
                                style={{ filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))" }}
                            >
                                {/* Center star */}
                                <path
                                    d="M32 16L34 28L46 30L34 32L32 44L30 32L18 30L30 28L32 16Z"
                                    fill="white"
                                />
                                {/* Small stars around */}
                                <path d="M20 12L21 16L25 17L21 18L20 22L19 18L15 17L19 16L20 12Z" fill="white" opacity="0.6" />
                                <path d="M44 12L45 16L49 17L45 18L44 22L43 18L39 17L43 16L44 12Z" fill="white" opacity="0.6" />
                                <path d="M20 42L21 46L25 47L21 48L20 52L19 48L15 47L19 46L20 42Z" fill="white" opacity="0.4" />
                                <path d="M44 42L45 46L49 47L45 48L44 52L43 48L39 47L43 46L44 42Z" fill="white" opacity="0.4" />
                            </svg>
                        </div>
                        <div
                            className="text-[clamp(28px,5vw,40px)] font-normal tracking-[0.15em] text-uppercase text-white"
                        >
                            CIRIDAE
                        </div>
                    </div>

                    {/* CTA Button - Magnetic effect */}
                    <div className="mb-12">
                        <MagneticButton strength={0.4}>
                            <a
                                href="#contact"
                                className="inline-block btn-hover-scale ripple hover:shadow-[0_0_40px_rgba(204,100,55,0.6)] hover:border-[var(--accent)]! hover:bg-[var(--accent)]/20 hover:scale-110"
                                style={{
                                    padding: "16px 40px",
                                    border: "1px solid rgba(255, 255, 255, 0.35)",
                                    borderRadius: "999px",
                                    fontFamily: '"Roboto Mono", monospace',
                                    fontSize: "11px",
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    color: "#FFFFFF",
                                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                                }}
                                data-cursor-text="Start"
                            >
                                Begin the Transformation
                            </a>
                        </MagneticButton>
                    </div>

                    {/* Centered navigation - link underline animation */}
                    <nav className="flex flex-col items-center gap-3 mb-12">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="link-underline hover:text-white text-mono text-sm"
                                style={{
                                    color: "rgba(255, 255, 255, 0.5)",
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Bottom bar */}
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                            <a
                                href="#privacy"
                                className="link-underline hover:text-white/60 text-mono text-[10px] tracking-[0.05em] uppercase"
                                style={{
                                    color: "rgba(255, 255, 255, 0.35)",
                                }}
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#terms"
                                className="link-underline hover:text-white/60 text-mono text-[10px] tracking-[0.05em] uppercase"
                                style={{
                                    color: "rgba(255, 255, 255, 0.35)",
                                }}
                            >
                                Terms and Conditions
                            </a>
                        </div>
                        <p
                            style={{
                                color: "rgba(255, 255, 255, 0.25)",
                            }}
                            className="text-mono text-[10px] tracking-[0.05em] uppercase"
                        >
                            All Rights Reserved 2025
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

