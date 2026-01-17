"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = timelineRef.current?.querySelectorAll(".timeline-item");
            const lines = timelineRef.current?.querySelectorAll(".timeline-line");

            if (items && lines) {
                // Animate items on scroll
                items.forEach((item, i) => {
                    gsap.from(item, {
                        scrollTrigger: {
                            trigger: item,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                        opacity: 0,
                        y: 30,
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: "power3.out",
                    });
                });

                // Animate connecting lines
                lines.forEach((line) => {
                    gsap.from(line, {
                        scrollTrigger: {
                            trigger: line,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                        scaleY: 0,
                        duration: 0.8,
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
            className="relative py-32"
            style={{ background: "#0B0B0B" }}
        >
            <div className="max-w-3xl mx-auto px-6">
                {/* Section header */}
                <div className="text-center mb-20">
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
                        Security
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
                        Enterprise Grade
                        <br />
                        Security
                    </h2>
                </div>

                {/* Vertical timeline */}
                <div ref={timelineRef} className="relative">
                    {SECURITY_ITEMS.map((item, index) => (
                        <div key={item.id} className="relative">
                            {/* Timeline item */}
                            <div
                                className="timeline-item flex items-start gap-8 pb-16"
                                style={{
                                    flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                                }}
                            >
                                {/* Content side */}
                                <div
                                    className="flex-1"
                                    style={{ textAlign: index % 2 === 0 ? "right" : "left" }}
                                >
                                    <h3
                                        className="mb-2"
                                        style={{
                                            fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                                            fontSize: "20px",
                                            fontWeight: 400,
                                            letterSpacing: "-0.02em",
                                            textTransform: "uppercase",
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                                            fontSize: "14px",
                                            lineHeight: 1.5,
                                            color: "rgba(255, 255, 255, 0.6)",
                                            maxWidth: "300px",
                                            marginLeft: index % 2 === 0 ? "auto" : 0,
                                        }}
                                    >
                                        {item.description}
                                    </p>
                                </div>

                                {/* Center node */}
                                <div className="relative flex flex-col items-center">
                                    {/* Node pill */}
                                    <div
                                        className="relative z-10"
                                        style={{
                                            padding: "8px 16px",
                                            background: "#CC6437",
                                            borderRadius: "999px",
                                            fontFamily: '"Roboto Mono", monospace',
                                            fontSize: "14px",
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        {item.id} — SC
                                    </div>

                                    {/* Connecting line */}
                                    {index < SECURITY_ITEMS.length - 1 && (
                                        <div
                                            className="timeline-line absolute top-full w-px h-20 origin-top"
                                            style={{ background: "rgba(255, 255, 255, 0.2)" }}
                                        />
                                    )}
                                </div>

                                {/* Empty side */}
                                <div className="flex-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
