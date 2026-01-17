"use client";

import { useState, useCallback } from "react";
import { Logo } from "./ui/Logo";
import { MagneticWrapper } from "./ui/MagneticButton";

export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    return (
        <>
            {/* Fixed Navigation Header */}
            <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6">
                <nav className="flex items-center justify-between">
                    {/* Start Now Button */}
                    <MagneticWrapper strength={0.3}>
                        <a href="#contact" className="btn-pill" data-cursor-text="→">
                            Start Now
                        </a>
                    </MagneticWrapper>

                    {/* Menu Toggle */}
                    <MagneticWrapper strength={0.3}>
                        <button
                            onClick={toggleMenu}
                            className="btn-pill flex items-center gap-2"
                            aria-expanded={isMenuOpen}
                            aria-controls="main-menu"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            data-cursor-text={isMenuOpen ? "×" : "≡"}
                        >
                            <span>{isMenuOpen ? "Close" : "Menu"}</span>
                            <span className="flex flex-col gap-[3px]" aria-hidden="true">
                                <span
                                    className={`w-4 h-[1px] bg-current transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-[4px]" : ""
                                        }`}
                                />
                                <span
                                    className={`w-4 h-[1px] bg-current transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""
                                        }`}
                                />
                                <span
                                    className={`w-4 h-[1px] bg-current transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""
                                        }`}
                                />
                            </span>
                        </button>
                    </MagneticWrapper>
                </nav>
            </header>

            {/* Full-Screen Menu Overlay */}
            <div
                id="main-menu"
                className={`fixed inset-0 z-40 bg-[#0B0B0B] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                    }`}
                aria-hidden={!isMenuOpen}
            >
                {/* Border effect */}
                <div className="absolute inset-4 border border-[rgba(255,255,255,0.1)] pointer-events-none" />

                {/* Menu Content */}
                <div className="h-full flex flex-col items-center justify-center">
                    {/* Logo */}
                    <Logo size="md" className="text-white mb-12" />

                    {/* Navigation Links */}
                    <nav className="flex flex-col items-center gap-4">
                        {["Home", "About", "Services", "Blog"].map((item, index) => (
                            <a
                                key={item}
                                href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                                className={`text-heading text-white hover:text-[#CC6437] transition-all duration-300 ${isMenuOpen
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-4"
                                    }`}
                                style={{
                                    transitionDelay: isMenuOpen ? `${index * 80 + 200}ms` : "0ms",
                                }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                    </nav>

                    {/* Footer Info */}
                    <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-8">
                        <span className="text-mono text-[#888]">The New Intelligence</span>
                        <div className="flex items-center gap-6">
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-mono text-white hover:text-[#CC6437] transition-colors"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="https://x.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-mono text-white hover:text-[#CC6437] transition-colors"
                            >
                                X
                            </a>
                        </div>
                        <span className="text-mono text-[#888]">
                            All Rights Reserved {new Date().getFullYear()}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
