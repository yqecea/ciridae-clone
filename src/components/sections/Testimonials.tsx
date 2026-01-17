"use client";

import { useRef, useState, useEffect } from "react";
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
            "Ciridae was so good we wanted them at the table. In just one month, Ciridae quickly understood our business, identified the biggest GenAI opportunities and risks, and gave us a clear path toward becoming an AI-first company.",
        author: "Factual Labs",
        role: "",
        company: "Factual Labs",
    },
    {
        id: 3,
        quote:
            "Working with Ciridae transformed how we think about AI integration. Their systematic approach to workflow redesign delivered measurable results within weeks.",
        author: "Enterprise Partner",
        role: "CTO",
        company: "Fortune 500",
    },
];

export function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
        );
    };

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
            className="relative w-full py-32"
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
                        Testimonials
                    </div>
                    <h2
                        style={{
                            fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                            fontSize: "clamp(32px, 5vw, 48px)",
                            fontWeight: 400,
                            letterSpacing: "-0.02em",
                            textTransform: "uppercase",
                            color: "#FFFFFF",
                        }}
                    >
                        What Our Partners Say
                    </h2>
                </div>

                {/* Testimonials grid/slider */}
                <div className="relative w-full animate-in">
                    {/* Desktop: Grid Layout (Perfectly Centered) */}
                    <div className="hidden md:grid grid-cols-3 gap-6">
                        {TESTIMONIALS.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="h-full"
                            >
                                <div
                                    className="p-8 h-full flex flex-col"
                                    style={{
                                        background: "rgba(30, 30, 30, 0.5)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        borderRadius: "10px",
                                    }}
                                >
                                    {/* Quote mark */}
                                    <div
                                        className="text-4xl mb-6"
                                        style={{ color: "rgba(255, 255, 255, 0.3)" }}
                                    >
                                        &ldquo;
                                    </div>

                                    {/* Quote */}
                                    <p
                                        className="mb-8"
                                        style={{
                                            fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                                            fontSize: "18px",
                                            lineHeight: 1.5,
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        {testimonial.quote}
                                    </p>

                                    {/* Author info */}
                                    <div className="mt-auto">
                                        {testimonial.author && (
                                            <div
                                                style={{
                                                    fontFamily: '"Roboto Mono", monospace',
                                                    fontSize: "12px",
                                                    color: "#CC6437",
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                {testimonial.author}
                                            </div>
                                        )}
                                        {testimonial.role && (
                                            <div
                                                className="mt-1"
                                                style={{
                                                    fontFamily: '"Roboto Mono", monospace',
                                                    fontSize: "11px",
                                                    color: "rgba(255, 255, 255, 0.6)",
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                {testimonial.role}
                                            </div>
                                        )}
                                        <div
                                            className="mt-4"
                                            style={{
                                                fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                                                fontSize: "16px",
                                                color: "rgba(255, 255, 255, 0.8)",
                                            }}
                                        >
                                            {testimonial.company}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile: Slider (kept for responsiveness) */}
                    <div className="md:hidden relative">
                        <div className="flex gap-6 overflow-hidden">
                            {TESTIMONIALS.map((testimonial, index) => (
                                <div
                                    key={testimonial.id}
                                    className="flex-shrink-0 w-full transition-all duration-500"
                                    style={{
                                        transform: `translateX(-${currentIndex * 100}%)`,
                                    }}
                                >
                                    <div
                                        className="p-8 h-full"
                                        style={{
                                            background: "rgba(30, 30, 30, 0.5)",
                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                            borderRadius: "10px",
                                            minHeight: "300px",
                                        }}
                                    >
                                        {/* Quote mark */}
                                        <div
                                            className="text-4xl mb-6"
                                            style={{ color: "rgba(255, 255, 255, 0.3)" }}
                                        >
                                            &ldquo;
                                        </div>

                                        {/* Quote */}
                                        <p
                                            className="mb-8"
                                            style={{
                                                fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                                                fontSize: "18px",
                                                lineHeight: 1.5,
                                                color: "#FFFFFF",
                                            }}
                                        >
                                            {testimonial.quote}
                                        </p>

                                        {/* Author info */}
                                        <div className="mt-auto">
                                            {testimonial.author && (
                                                <div
                                                    style={{
                                                        fontFamily: '"Roboto Mono", monospace',
                                                        fontSize: "12px",
                                                        color: "#CC6437",
                                                        textTransform: "uppercase",
                                                    }}
                                                >
                                                    {testimonial.author}
                                                </div>
                                            )}
                                            {testimonial.role && (
                                                <div
                                                    className="mt-1"
                                                    style={{
                                                        fontFamily: '"Roboto Mono", monospace',
                                                        fontSize: "11px",
                                                        color: "rgba(255, 255, 255, 0.6)",
                                                        textTransform: "uppercase",
                                                    }}
                                                >
                                                    {testimonial.role}
                                                </div>
                                            )}
                                            <div
                                                className="mt-4"
                                                style={{
                                                    fontFamily: '"Pragmatica Cond", Arial, sans-serif',
                                                    fontSize: "16px",
                                                    color: "rgba(255, 255, 255, 0.8)",
                                                }}
                                            >
                                                {testimonial.company}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Navigation */}
                        <div className="flex items-center justify-between mt-8">
                            <div
                                style={{
                                    fontFamily: '"Roboto Mono", monospace',
                                    fontSize: "14px",
                                    color: "rgba(255, 255, 255, 0.6)",
                                }}
                            >
                                {currentIndex + 1} / {TESTIMONIALS.length}
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={prevSlide}
                                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 hover:border-white/60 transition-colors"
                                    aria-label="Previous testimonial"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 hover:border-white/60 transition-colors"
                                    aria-label="Next testimonial"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
