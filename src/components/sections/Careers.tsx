"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

const DECORATIVE_LABELS = [
    "BUILD THE FUTURE",
    "FORTITUDINE VINCIMUS",
    "JOIN US",
];

export function Careers() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const labelsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax text effect
            gsap.from(textRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "center center",
                    scrub: 1,
                },
                y: 60,
                opacity: 0.6,
            });

            // Animate decorative labels
            const labels = labelsRef.current?.querySelectorAll(".decorative-label");
            if (labels) {
                labels.forEach((label, i) => {
                    gsap.from(label, {
                        scrollTrigger: {
                            trigger: label,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                        opacity: 0,
                        y: 20,
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: "power3.out",
                    });
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-24 md:py-32 overflow-hidden"
            style={{ background: "#0B0B0B" }}
        >
            <div className="w-full max-w-7xl mx-auto px-6" style={{ margin: '0 auto' }}>
                {/* Section label */}
                <div
                    className="text-center mb-6"
                    style={{
                        fontFamily: '"Roboto Mono", monospace',
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#888888",
                    }}
                >
                    Careers
                </div>

                {/* Large gradient text */}
                <h2
                    ref={textRef}
                    className="text-center mb-16 md:mb-24"
                    style={{
                        fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                        fontSize: "clamp(32px, 7vw, 80px)",
                        fontWeight: 400,
                        letterSpacing: "-0.03em",
                        textTransform: "uppercase",
                        lineHeight: 1.05,
                        background: "linear-gradient(180deg, #FFFFFF 0%, rgba(206, 206, 206, 0.5) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    Join a Team Shaping
                    <br />
                    the Future of
                    <br />
                    Intelligent Systems.
                </h2>

                {/* Decorative vertical labels */}
                <div
                    ref={labelsRef}
                    className="flex flex-col items-center gap-12 mb-16"
                >
                    {DECORATIVE_LABELS.map((label, index) => (
                        <div
                            key={label}
                            className="decorative-label"
                            style={{
                                fontFamily: '"Roboto Mono", monospace',
                                fontSize: "10px",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: "rgba(255, 255, 255, 0.4)",
                                writingMode: index === 1 ? "vertical-rl" : "horizontal-tb",
                                transform: index === 1 ? "rotate(180deg)" : "none",
                            }}
                        >
                            {label}
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="flex justify-center">
                    <a
                        href="#careers"
                        className="group inline-flex items-center gap-3"
                        style={{
                            padding: "16px 32px",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                            borderRadius: "999px",
                            fontFamily: '"Roboto Mono", monospace',
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            color: "#FFFFFF",
                            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    >
                        Work With Us
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="transition-transform group-hover:translate-x-1"
                        >
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
