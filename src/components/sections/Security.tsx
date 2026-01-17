"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

const SECURITY_ITEMS = [
    {
        id: "01",
        title: "DATA ENCRYPTION",
        description:
            "Information is encrypted in transit and at rest with industry-leading standards.",
    },
    {
        id: "02",
        title: "ACCESS CONTROL",
        description:
            "Only the right people can access the right data, at the right time.",
    },
    {
        id: "03",
        title: "INFRASTRUCTURE PROTECTION",
        description: "Built on secure cloud architecture with 24/7 monitoring.",
    },
];

export function Security() {
    const sectionRef = useRef<HTMLElement>(null);
    const itemsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = itemsRef.current?.querySelectorAll(".security-item");
            const lines = itemsRef.current?.querySelectorAll(".timeline-line");

            if (items) {
                items.forEach((item, i) => {
                    gsap.from(item, {
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                        opacity: 0,
                        y: 40,
                        duration: 0.7,
                        delay: i * 0.15,
                        ease: "power3.out",
                    });
                });
            }

            if (lines) {
                lines.forEach((line) => {
                    gsap.from(line, {
                        scrollTrigger: {
                            trigger: line,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                        scaleY: 0,
                        duration: 0.6,
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
            className="relative w-full py-20 sm:py-24 md:py-32 overflow-hidden"
            style={{ background: "#0B0B0B" }}
        >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6" style={{ margin: '0 auto' }}>
                {/* Section header */}
                <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
                    <div className="mb-4 section-label text-[#888888]">
                        Security
                    </div>
                    <h2
                        className="text-heading-xl text-white leading-[1.1] text-uppercase tracking-[-0.02em]"
                        style={{
                            fontSize: "clamp(28px, 5vw, 48px)",
                        }}
                    >
                        Enterprise Grade
                        <br />
                        Security
                    </h2>
                </div>

                {/* Timeline - stacked on mobile, alternating on desktop */}
                <div ref={itemsRef} className="relative max-w-5xl mx-auto">
                    {/* Central vertical line - hidden on mobile */}
                    <div
                        className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
                        style={{ background: "rgba(255, 255, 255, 0.15)" }}
                    />

                    {SECURITY_ITEMS.map((item, index) => (
                        <div
                            key={item.id}
                            className="security-item relative mb-12 md:mb-16 last:mb-0"
                        >
                            {/* Mobile: stacked layout */}
                            <div className="md:hidden flex flex-col items-center text-center">
                                {/* Node */}
                                <div className="flex items-center gap-2 mb-4 text-mono text-[13px] tracking-[0.05em] text-white">
                                    <span style={{ color: "#CC6437" }}>{item.id}</span>
                                    <span style={{ color: "rgba(255,255,255,0.3)" }}>—</span>
                                    <span>{item.title}</span>
                                </div>
                                <p className="text-mono text-sm leading-relaxed text-white/60 max-w-[280px]">
                                    {item.description}
                                </p>
                                {/* Connecting line */}
                                {index < SECURITY_ITEMS.length - 1 && (
                                    <div
                                        className="timeline-line w-px h-8 mt-6 origin-top"
                                        style={{ background: "rgba(255, 255, 255, 0.15)" }}
                                    />
                                )}
                            </div>

                            {/* Desktop: alternating layout */}
                            <div
                                className="hidden md:grid"
                                style={{
                                    gridTemplateColumns: "1fr auto 1fr",
                                    gap: "48px",
                                    alignItems: "start",
                                }}
                            >
                                {/* Left content - shown on even items */}
                                <div
                                    className={`${index % 2 === 0 ? "text-right flex flex-col items-end" : "invisible"}`}
                                >
                                    {index % 2 === 0 && (
                                        <>
                                            <div className="mb-2 text-mono text-[13px] tracking-[0.05em] text-white">
                                                <span style={{ color: "#CC6437" }}>{item.id}</span>
                                                <span style={{ color: "rgba(255,255,255,0.3)" }}> — </span>
                                                <span>{item.title}</span>
                                            </div>
                                            <p className="text-mono text-sm leading-relaxed text-white/60 max-w-[280px]">
                                                {item.description}
                                            </p>
                                        </>
                                    )}
                                </div>

                                {/* Center node */}
                                <div className="relative flex flex-col items-center">
                                    <div
                                        className="w-3 h-3 rounded-full z-10"
                                        style={{ background: "#CC6437", boxShadow: "0 0 10px rgba(204, 100, 55, 0.5)" }}
                                    />
                                    {index < SECURITY_ITEMS.length - 1 && (
                                        <div
                                            className="timeline-line w-px h-32 origin-top bg-white/10"
                                            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.05))" }}
                                        />
                                    )}
                                </div>

                                {/* Right content - shown on odd items */}
                                <div
                                    className={`${index % 2 === 1 ? "text-left flex flex-col items-start" : "invisible"}`}
                                >
                                    {index % 2 === 1 && (
                                        <>
                                            <div className="mb-2 text-mono text-[13px] tracking-[0.05em] text-white">
                                                <span style={{ color: "#CC6437" }}>{item.id}</span>
                                                <span style={{ color: "rgba(255,255,255,0.3)" }}> — </span>
                                                <span>{item.title}</span>
                                            </div>
                                            <p className="text-mono text-sm leading-relaxed text-white/60 max-w-[280px]">
                                                {item.description}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
