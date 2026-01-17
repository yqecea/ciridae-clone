"use client";

import { Logo } from "../ui/Logo";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Blog", href: "#blog" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X", href: "https://x.com" },
];

export function Footer() {
    return (
        <footer
            className="relative py-20"
            style={{
                background: "#0B0B0B",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Main CTA */}
                <div className="text-center mb-20">
                    <a
                        href="#contact"
                        className="inline-block"
                        style={{
                            padding: "20px 48px",
                            border: "1px solid #FFFFFF",
                            borderRadius: "999px",
                            fontFamily: '"Roboto Mono", monospace',
                            fontSize: "14px",
                            letterSpacing: "-0.02em",
                            textTransform: "uppercase",
                            color: "#FFFFFF",
                            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    >
                        Begin the Transformation
                    </a>
                </div>

                {/* Footer grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Logo column */}
                    <div>
                        <Logo size="sm" className="text-white mb-4" />
                        <p
                            style={{
                                fontFamily: '"Roboto Mono", monospace',
                                fontSize: "11px",
                                letterSpacing: "-0.02em",
                                color: "rgba(255, 255, 255, 0.5)",
                                textTransform: "uppercase",
                            }}
                        >
                            The New Intelligence
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4
                            className="mb-4"
                            style={{
                                fontFamily: '"Roboto Mono", monospace',
                                fontSize: "11px",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "#888888",
                            }}
                        >
                            Navigation
                        </h4>
                        <nav className="flex flex-col gap-2">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    style={{
                                        fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                                        fontSize: "14px",
                                        color: "rgba(255, 255, 255, 0.7)",
                                        transition: "color 0.2s",
                                    }}
                                    className="hover:text-white"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Social */}
                    <div>
                        <h4
                            className="mb-4"
                            style={{
                                fontFamily: '"Roboto Mono", monospace',
                                fontSize: "11px",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "#888888",
                            }}
                        >
                            Connect
                        </h4>
                        <nav className="flex flex-col gap-2">
                            {SOCIAL_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                                        fontSize: "14px",
                                        color: "rgba(255, 255, 255, 0.7)",
                                        transition: "color 0.2s",
                                    }}
                                    className="hover:text-white"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4
                            className="mb-4"
                            style={{
                                fontFamily: '"Roboto Mono", monospace',
                                fontSize: "11px",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "#888888",
                            }}
                        >
                            Contact
                        </h4>
                        <a
                            href="mailto:contact@ciridae.com"
                            style={{
                                fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                                fontSize: "14px",
                                color: "rgba(255, 255, 255, 0.7)",
                                transition: "color 0.2s",
                            }}
                            className="hover:text-white"
                        >
                            contact@ciridae.com
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
                    style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
                >
                    <p
                        style={{
                            fontFamily: '"Roboto Mono", monospace',
                            fontSize: "11px",
                            color: "rgba(255, 255, 255, 0.4)",
                        }}
                    >
                        © {new Date().getFullYear()} Ciridae. All rights reserved.
                    </p>

                    <div className="flex gap-6">
                        <a
                            href="#privacy"
                            style={{
                                fontFamily: '"Roboto Mono", monospace',
                                fontSize: "11px",
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
                                fontSize: "11px",
                                color: "rgba(255, 255, 255, 0.4)",
                                transition: "color 0.2s",
                            }}
                            className="hover:text-white/60"
                        >
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
