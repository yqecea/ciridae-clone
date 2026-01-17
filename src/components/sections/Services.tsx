"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LogoConstellation } from "../ui/Logo";

const SERVICES = [
    {
        id: "01",
        total: "03",
        title: "WORKFLOW REDESIGN",
        description:
            "We map how work actually happens across people, systems, and handoffs. We redesign those workflows around AI as software — with human oversight — can execute the work end-to-end.",
        icon: "workflow",
    },
    {
        id: "02",
        total: "03",
        title: "SYSTEM CONSTRUCTION",
        description:
            "We build the software that runs the redesigned workflow in production. This includes unified data, encoded business logic, AI reasoning, and integration with existing systems of record.",
        icon: "system",
    },
    {
        id: "03",
        total: "03",
        title: "COMMAND AND CONTROL",
        description:
            "We operate the system and take responsibility for their performance over time. Software executes the work continuously; humans oversee exceptions and approvals.",
        icon: "control",
    },
];

function ServiceIcon({ type }: { type: string }) {
    return (
        <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
            <LogoConstellation className="w-12 h-12 md:w-16 md:h-16 opacity-80" />
        </div>
    );
}

export function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsRef.current?.querySelectorAll(".service-card");

            if (cards) {
                // Initial setup
                gsap.set(cards, { opacity: 0, y: 100 });

                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    pin: ".cards-container",
                    onUpdate: (self) => {
                        const progress = self.progress;
                        cards.forEach((card, i) => {
                            // Sophisticated staggering logic
                            const start = i * 0.2;
                            const end = start + 0.4;

                            // Fade in and move up
                            if (progress >= start && progress < end) {
                                const localProgress = (progress - start) / (end - start);
                                gsap.to(card, {
                                    opacity: localProgress,
                                    y: 100 * (1 - localProgress),
                                    scale: 0.9 + (0.1 * localProgress),
                                    duration: 0,
                                    overwrite: true
                                });
                            } else if (progress >= end) {
                                gsap.to(card, { opacity: 1, y: 0, scale: 1, duration: 0, overwrite: true });
                            } else {
                                gsap.to(card, { opacity: 0, y: 100, scale: 0.9, duration: 0, overwrite: true });
                            }
                        });
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[300vh]"
            style={{
                background: "#050505",
            }}
        >
            {/* Background image - stars/mountains */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "url('/images/services-background.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.6,
                }}
            />

            {/* Gradient overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(180deg, #050505 0%, transparent 20%, transparent 80%, #050505 100%)",
                }}
            />

            {/* Cards container */}
            <div className="cards-container sticky top-0 min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
                <div
                    ref={cardsRef}
                    className="flex flex-col md:flex-row items-stretch justify-center gap-8 max-w-[1680px]"
                >
                    {SERVICES.map((service, index) => (
                        <div
                            key={service.id}
                            className="service-card glass-panel flex flex-col p-10 md:p-12"
                            style={{
                                width: "100%",
                                maxWidth: "542px",
                                minHeight: "720px",
                            }}
                        >
                            {/* Tag pill */}
                            <div className="btn-pill self-start mb-12 border-white/20">
                                {service.id} — {service.total}
                            </div>

                            {/* Title */}
                            <h3 className="text-heading-lg mb-8 text-white">
                                {service.title}
                            </h3>

                            {/* Icon */}
                            <div className="flex-1 flex items-center justify-center my-12">
                                <ServiceIcon type={service.icon} />
                            </div>

                            {/* Description */}
                            <p className="text-subheading leading-relaxed text-white/60">
                                {service.description}
                            </p>

                            {/* Bottom aesthetic line */}
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-12" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
