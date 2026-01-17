"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

// Company logos from the original site
const COMPANY_LOGOS = [
    { name: "Stanford University", width: 140 },
    { name: "Meta", width: 100 },
    { name: "Citadel", width: 120 },
    { name: "KKR", width: 80 },
    { name: "Goldman Sachs", width: 120 },
    { name: "MongoDB", width: 140 },
    { name: "Palantir", width: 120 },
];

const BACKED_BY = [
    { name: "General Catalyst", width: 140 },
    { name: "Andreessen Horowitz", width: 160 },
];

function LogoPlaceholder({ name, width }: { name: string; width: number }) {
    return (
        <div
            className="flex items-center justify-center px-6"
            style={{
                fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                fontSize: "18px",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
                opacity: 0.8,
                whiteSpace: "nowrap",
            }}
        >
            {name}
        </div>
    );
}

export function Team() {
    const sectionRef = useRef<HTMLElement>(null);
    const logosRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate section in
            gsap.from(sectionRef.current?.querySelectorAll(".animate-in") || [], {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
            });

            // Infinite logo scroll
            const logos = logosRef.current;
            if (logos) {
                const logoWidth = logos.scrollWidth / 2;
                gsap.to(logos, {
                    x: -logoWidth,
                    duration: 30,
                    ease: "none",
                    repeat: -1,
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-32 overflow-hidden"
            style={{ background: "#0B0B0B" }}
        >
            <div className="w-full max-w-7xl mx-auto px-6">
                {/* Section header */}
                <div className="flex flex-col items-center text-center mb-16 animate-in">
                    <div
                        className="mb-4"
                        style={{
                            fontFamily: '"Roboto Mono", monospace',
                            fontSize: "11px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#888888",
                        }}
                    >
                        Our Team
                    </div>
                    <h2
                        style={{
                            fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                            fontSize: "clamp(32px, 5vw, 48px)",
                            fontWeight: 400,
                            letterSpacing: "-0.02em",
                            textTransform: "uppercase",
                            color: "#FFFFFF",
                            lineHeight: 1.1,
                        }}
                    >
                        We&apos;re AI Experts From the
                        <br />
                        World&apos;s Leading Organizations
                    </h2>
                    <p
                        className="mt-6 max-w-md text-center"
                        style={{
                            fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                            fontSize: "16px",
                            lineHeight: 1.6,
                            color: "rgba(255, 255, 255, 0.6)",
                        }}
                    >
                        Now, we&apos;re helping the next generation of category leaders
                        build with the same edge.
                    </p>
                </div>

                {/* Company logos marquee */}
                <div className="relative w-full overflow-hidden mb-24 animate-in">
                    <div ref={logosRef} className="flex items-center justify-center gap-16 px-4">
                        {/* Double the logos for infinite scroll */}
                        {[...COMPANY_LOGOS, ...COMPANY_LOGOS].map((logo, i) => (
                            <LogoPlaceholder key={i} name={logo.name} width={logo.width} />
                        ))}
                    </div>
                </div>

                {/* Backed by section */}
                <div className="text-center animate-in">
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
                        Our Work is Backed By
                    </div>
                    <div className="flex items-center justify-center gap-12">
                        {BACKED_BY.map((investor) => (
                            <LogoPlaceholder
                                key={investor.name}
                                name={investor.name}
                                width={investor.width}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
