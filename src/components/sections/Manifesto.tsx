"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LogoConstellation } from "../ui/Logo";

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO_TEXT =
    "WE REDESIGN COMPLEX WORKFLOWS AROUND AI, BUILD THE SYSTEMS THAT EXECUTE THEM, AND OPERATE THOSE SYSTEMS IN PRODUCTION.";

export function Manifesto() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text decode animation on scroll
            const chars = textRef.current?.querySelectorAll(".char");

            if (chars) {
                gsap.set(chars, { opacity: 0.2 });

                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "center center",
                    scrub: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        chars.forEach((char, i) => {
                            const charProgress = i / chars.length;
                            if (progress > charProgress) {
                                gsap.to(char, { opacity: 1, duration: 0.1 });
                            }
                        });
                    },
                });
            }

            // Logo fade in
            gsap.from(logoRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "40% center",
                    end: "60% center",
                    scrub: 1,
                },
                opacity: 0,
                scale: 0.8,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[200vh] flex flex-col items-center"
            style={{ background: "#0B0B0B" }}
        >
            {/* Sticky container */}
            <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center py-20 px-6">
                {/* Section label */}
                <div
                    className="mb-8"
                    style={{
                        fontFamily: '"Roboto Mono", monospace',
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#888888",
                    }}
                >
                    Ciridae Builds
                </div>

                {/* Main text with decode effect */}
                <div
                    ref={textRef}
                    className="text-center max-w-5xl mx-auto mb-16"
                    style={{
                        fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                        fontSize: "32px",
                        lineHeight: "33.6px",
                        letterSpacing: "-0.64px",
                        textTransform: "uppercase",
                        color: "#FFFFFF",
                    }}
                >
                    {MANIFESTO_TEXT.split("").map((char, i) => (
                        <span key={i} className="char inline-block">
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </div>

                {/* Constellation logo */}
                <div ref={logoRef}>
                    <LogoConstellation className="w-40 h-40 md:w-52 md:h-52" />
                </div>
            </div>
        </section>
    );
}
