"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { MagneticButton } from "../ui/MagneticButton";

export function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate text reveal
            const words = textRef.current?.querySelectorAll(".word");

            if (words) {
                gsap.fromTo(
                    words,
                    {
                        opacity: 0.2,
                        y: 20,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.03,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 70%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            // Parallax for side images
            gsap.to(".contact-image-left", {
                y: -80,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });

            gsap.to(".contact-image-right", {
                y: -120,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const headingText = "JOIN A TEAM SHAPING THE FUTURE OF INTELLIGENT SYSTEMS.";

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-32 overflow-hidden"
            style={{
                background: "#0A0A0A",
                minHeight: "80vh",
            }}
        >
            {/* Left side image - Sculpture */}
            <div
                className="contact-image-left absolute left-0 top-1/4 hidden lg:block"
                style={{ width: "380px", height: "480px" }}
                data-cursor-text="Art"
            >
                <div
                    className="relative w-full h-full overflow-hidden"
                    style={{
                        borderRadius: "0 8px 8px 0",
                        boxShadow: "20px 20px 60px rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <Image
                        src="/images/contact-left.webp"
                        alt="Modern sculpture"
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes="280px"
                    />
                </div>
            </div>

            {/* Right side image - Architecture */}
            <div
                className="contact-image-right absolute right-0 top-1/3 hidden lg:block"
                style={{ width: "420px", height: "520px" }}
                data-cursor-text="Design"
            >
                <div
                    className="relative w-full h-full overflow-hidden"
                    style={{
                        borderRadius: "8px 0 0 8px",
                        boxShadow: "-20px 20px 60px rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <Image
                        src="/images/contact-right.webp"
                        alt="Modern architecture"
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes="320px"
                    />
                </div>
            </div>

            {/* Center content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] px-6">
                {/* Main heading */}
                <div
                    ref={textRef}
                    className="text-center max-w-4xl mx-auto mb-12"
                >
                    <h2
                        style={{
                            fontSize: "clamp(32px, 6vw, 72px)",
                        }}
                        className="text-heading-xl font-bold tracking-[-0.02em] uppercase text-white leading-[1.1]"
                    >
                        {headingText.split(" ").map((word, i) => (
                            <span key={i} className="word inline-block mr-[0.25em]">
                                {word}
                            </span>
                        ))}
                    </h2>
                </div>

                {/* CTA Button - Now with magnetic effect */}
                <MagneticButton strength={0.3}>
                    <a
                        href="#careers"
                        className="btn-pill btn-hover-scale"
                        style={{
                            padding: "18px 48px",
                            borderColor: "rgba(255, 255, 255, 0.4)",
                            fontSize: "12px",
                        }}
                        data-cursor-text="Apply"
                    >
                        Work With Us
                    </a>
                </MagneticButton>
            </div>

            {/* Decorative elements - Light leak */}
            <div
                className="absolute inset-0 pointer-events-none light-leak"
                style={{
                    background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(204, 100, 55, 0.08) 0%, transparent 60%)",
                }}
            />
        </section>
    );
}

