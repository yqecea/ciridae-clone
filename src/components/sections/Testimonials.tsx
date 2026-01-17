"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

const TESTIMONIALS = [
    {
        id: 1,
        quote:
            "Ciridae shipped high-impact solutions quickly and helped architect our long-term AI strategy. They're simply the best; true partners every step of the way.",
        author: "Francesco Boccardo",
        role: "Head of Gen AI at BV Tech",
        company: "BV•TECH",
    },
    {
        id: 2,
        quote:
            "Ciridae was so good we wanted them on our cap table. In just one month, Ciridae quickly understood our business, identified the biggest GenAI opportunities and risks, and gave us a clear path toward becoming an AI-first company.",
        author: "Factual Labs",
        role: "",
        company: "Factual Labs",
    },
];

export function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
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
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-24 sm:py-32 overflow-hidden"
            style={{ background: "#0B0B0B" }}
        >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
                {/* Section header */}
                <div className="flex flex-col items-center text-center mb-16 animate-in">
                    <div className="section-label mb-4">
                        Testimonials
                    </div>
                    <h2 className="text-heading-xl text-white leading-[1.1] text-uppercase tracking-[-0.02em]"
                        style={{
                            fontSize: "clamp(32px, 5vw, 48px)",
                        }}
                    >
                        What Our Partners Say
                    </h2>
                </div>

                {/* Testimonials grid - Two columns on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in">
                    {TESTIMONIALS.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="p-6 sm:p-8 md:p-10"
                            style={{
                                background: "rgba(20, 20, 20, 0.6)",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                borderRadius: "12px",
                            }}
                        >
                            {/* Orange quote mark */}
                            <div className="quote-mark mb-6">
                                &ldquo;
                            </div>

                            <p className="mb-8 text-lg leading-relaxed text-white">
                                {testimonial.quote}
                            </p>

                            {/* Author info */}
                            <div className="pt-6 border-t border-white/10">
                                {testimonial.author && (
                                    <div className="text-mono text-xs text-accent uppercase tracking-[0.05em]">
                                        {testimonial.author}
                                    </div>
                                )}
                                {testimonial.role && (
                                    <div className="mt-1 text-mono text-xs text-white/50 uppercase">
                                        {testimonial.role}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA link */}
                <div className="flex justify-center mt-12 animate-in">
                    <a
                        href="#contact"
                        className="hover:text-white text-mono text-xs tracking-[0.1em] uppercase text-white/50 transition-colors duration-300"
                    >
                        Contact Us — Discover
                    </a>
                </div>
            </div>
        </section>
    );
}
