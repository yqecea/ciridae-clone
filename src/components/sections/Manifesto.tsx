"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { LogoConstellation } from "../ui/Logo";

const MANIFESTO_TEXT =
    "WE REDESIGN COMPLEX WORKFLOWS AROUND AI, BUILD THE SYSTEMS THAT EXECUTE THEM, AND OPERATE THOSE SYSTEMS IN PRODUCTION.";

export function Manifesto() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Light Leak Animation
            gsap.to(".light-leak", {
                y: -50,
                opacity: 0.6,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });

            // Blur-to-Focus Typography Animation
            const words = textRef.current?.querySelectorAll(".word");

            if (words) {
                gsap.fromTo(
                    words,
                    {
                        filter: "blur(15px)",
                        opacity: 0,
                        y: 30
                    },
                    {
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                        stagger: 0.05,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: "top 75%",
                            end: "center center",
                            scrub: 1,
                        },
                    }
                );
            }

            // Logo rotation and fade
            gsap.from(logoRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "60% center",
                    end: "80% center",
                    scrub: 1,
                },
                opacity: 0,
                scale: 0.8,
                rotation: -30,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[150vh] flex flex-col items-center"
            style={{ background: "#050505" }}
        >
            {/* Cinematic Light Leak Atmosphere */}
            <div className="light-leak absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none opacity-30 mix-blend-screen"
                style={{
                    background: "var(--gradient-light-leak)",
                    filter: "blur(100px)",
                    transform: "translate(30%, -30%)"
                }}
            />

            {/* Sticky container */}
            <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center py-20 px-6">
                {/* Section label */}
                <div className="section-label mb-12">
                    Ciridae Builds
                </div>

                {/* Main text with blur-focus effect */}
                <div
                    ref={textRef}
                    className="text-center max-w-6xl mx-auto mb-24 px-4"
                >
                    {MANIFESTO_TEXT.split(" ").map((word, i) => (
                        <span
                            key={i}
                            className="word inline-block mr-[0.25em] text-heading-xl leading-none text-white mix-blend-difference"
                        >
                            {word}
                        </span>
                    ))}
                </div>

                {/* Constellation logo */}
                <div ref={logoRef} className="opacity-50 mix-blend-overlay">
                    <LogoConstellation className="w-40 h-40 md:w-52 md:h-52" />
                </div>
            </div>
        </section>
    );
}
