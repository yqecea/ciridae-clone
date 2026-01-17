"use client";

import { Logo } from "../ui/Logo";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Blog", href: "#blog" },
];

export function Footer() {
    return (
        <footer
            className="relative py-16 md:py-24 overflow-hidden"
            style={{
                background: "#0B0B0B",
            }}
        >
            {/* Nebula background effect */}
            <div
                className="absolute inset-0 opacity-60"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(30, 80, 120, 0.3) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />

            {/* Blue border frame */}
            <div
                className="absolute inset-4 md:inset-8 pointer-events-none"
                style={{
                    border: "1px solid rgba(59, 130, 246, 0.3)",
                    borderRadius: "4px",
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6">
                {/* Star icon and Logo */}
                <div className="flex flex-col items-center mb-12">
                    {/* Four-star icon arrangement */}
                    <div className="relative w-16 h-16 mb-4">
                        <svg
                            viewBox="0 0 64 64"
                            fill="none"
                            className="w-full h-full"
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
                        style={{
                            fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                            fontSize: "clamp(28px, 5vw, 40px)",
                            fontWeight: 400,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#FFFFFF",
                        }}
                    >
                        CIRIDAE
                    </div>
                </div>

                {/* Main layout with side labels */}
                <div className="relative flex items-center justify-center mb-12">
                    {/* Left side label */}
                    <div
                        className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2"
                        style={{
                            fontFamily: '"Roboto Mono", monospace',
                            fontSize: "10px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "rgba(255, 255, 255, 0.4)",
                        }}
                    >
                        San Francisco
                    </div>

                    {/* Center CTA */}
                    <a
                        href="#contact"
                        className="inline-block"
                        style={{
                            padding: "16px 40px",
                            border: "1px solid rgba(255, 255, 255, 0.4)",
                            borderRadius: "999px",
                            fontFamily: '"Roboto Mono", monospace',
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            color: "#FFFFFF",
                            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    >
                        Begin the Transformation
                    </a>

                    {/* Right side label */}
                    <div
                        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2"
                        style={{
                            fontFamily: '"Roboto Mono", monospace',
                            fontSize: "10px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "rgba(255, 255, 255, 0.4)",
                        }}
                    >
                        Est. 2025
                    </div>
                </div>

                {/* Centered navigation */}
                <nav className="flex flex-col items-center gap-3 mb-16">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            style={{
                                fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                                fontSize: "14px",
                                color: "rgba(255, 255, 255, 0.6)",
                                transition: "color 0.2s",
                            }}
                            className="hover:text-white"
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
                            style={{
                                fontFamily: '"Roboto Mono", monospace',
                                fontSize: "10px",
                                letterSpacing: "0.05em",
                                textTransform: "uppercase",
                                color: "rgba(255, 255, 255, 0.4)",
                                transition: "color 0.2s",
                            }}
                            className="hover:text-white/60"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#terms"
                            style={{
                                fontFamily: '"Roboto Mono", monospace',
                                fontSize: "10px",
                                letterSpacing: "0.05em",
                                textTransform: "uppercase",
                                color: "rgba(255, 255, 255, 0.4)",
                                transition: "color 0.2s",
                            }}
                            className="hover:text-white/60"
                        >
                            Terms and Conditions
                        </a>
                    </div>
                    <p
                        style={{
                            fontFamily: '"Roboto Mono", monospace',
                            fontSize: "10px",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            color: "rgba(255, 255, 255, 0.3)",
                        }}
                    >
                        All Rights Reserved 2024
                    </p>
                </div>
            </div>
        </footer>
    );
}
