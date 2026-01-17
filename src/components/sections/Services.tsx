"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LogoConstellation } from "../ui/Logo";

gsap.registerPlugin(ScrollTrigger);

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
        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            <LogoConstellation className="w-full h-full opacity-80" />
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
                // Stagger cards horizontally as you scroll
                gsap.set(cards, { xPercent: 0 });

                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    pin: ".cards-container",
                    onUpdate: (self) => {
                        const progress = self.progress;
                        cards.forEach((card, i) => {
                            const cardProgress = Math.max(
                                0,
                                Math.min(1, (progress - i * 0.25) * 4)
                            );
                            gsap.set(card, {
                                opacity: 1 - Math.abs(cardProgress - 0.5) * 0.5,
                            });
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
                background: "#0B0B0B",
            }}
        >
            {/* Background image - stars/mountains */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "url('https://cdn.prod.website-files.com/68532a35829494931a29b25b/68b0a06762f9bbbda09e68a5_Hero.webp')",
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
                        "linear-gradient(180deg, #0B0B0B 0%, transparent 20%, transparent 80%, #0B0B0B 100%)",
                }}
            />

            {/* Cards container */}
            <div className="cards-container sticky top-0 min-h-screen flex items-center justify-center py-20 px-4">
                <div
                    ref={cardsRef}
                    className="flex flex-col md:flex-row items-stretch justify-center gap-6 max-w-[1680px]"
                >
                    {SERVICES.map((service, index) => (
                        <div
                            key={service.id}
                            className="service-card glass-card flex flex-col p-8"
                            style={{
                                width: "100%",
                                maxWidth: "542px",
                                minHeight: "712px",
                                background: "rgba(173, 173, 173, 0.2)",
                                backdropFilter: "blur(50px)",
                                WebkitBackdropFilter: "blur(50px)",
                                borderRadius: "10px",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                        >
                            {/* Tag pill */}
                            <div
                                className="inline-flex self-start mb-6"
                                style={{
                                    padding: "5px 11px",
                                    border: "1px solid rgba(255, 255, 255, 0.8)",
                                    borderRadius: "999px",
                                    fontFamily: '"Roboto Mono", monospace',
                                    fontSize: "14px",
                                    letterSpacing: "-0.02em",
                                    color: "#FFFFFF",
                                }}
                            >
                                {service.id} — {service.total}
                            </div>

                            {/* Title */}
                            <h3
                                className="mb-6"
                                style={{
                                    fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                                    fontSize: "24px",
                                    fontWeight: 400,
                                    letterSpacing: "-0.02em",
                                    textTransform: "uppercase",
                                    color: "#FFFFFF",
                                }}
                            >
                                {service.title}
                            </h3>

                            {/* Icon */}
                            <div className="flex-1 flex items-center justify-center my-8">
                                <ServiceIcon type={service.icon} />
                            </div>

                            {/* Description */}
                            <p
                                style={{
                                    fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                                    fontSize: "14px",
                                    lineHeight: "1.5",
                                    color: "rgba(255, 255, 255, 0.7)",
                                }}
                            >
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
