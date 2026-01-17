"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Careers() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax text effect
            gsap.from(textRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
                y: 100,
                opacity: 0.5,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-32 overflow-hidden"
            style={{ background: "#0B0B0B" }}
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Section label */}
                <div
                    className="text-center mb-8"
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
                    className="text-center"
                    style={{
                        fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                        fontSize: "clamp(40px, 8vw, 100px)",
                        fontWeight: 400,
                        letterSpacing: "-0.03em",
                        textTransform: "uppercase",
                        lineHeight: 1,
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
                    Intelligent Systems
                </h2>

                {/* CTA Button */}
                <div className="flex justify-center mt-12">
                    <a
                        href="#careers"
                        className="btn-accent inline-flex items-center gap-3"
                        style={{
                            padding: "16px 32px",
                            background: "#CC6437",
                            borderRadius: "999px",
                            fontFamily: '"Roboto Mono", monospace',
                            fontSize: "12px",
                            letterSpacing: "-0.02em",
                            textTransform: "uppercase",
                            color: "#FFFFFF",
                            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    >
                        See Open Roles
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
