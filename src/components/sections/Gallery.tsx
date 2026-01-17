"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Image from "next/image";

interface GalleryImage {
    id: number;
    title: string;
    subtitle?: string;
    imageSrc: string;
    position: {
        top?: string;
        bottom?: string;
        left?: string;
        right?: string;
    };
    size: {
        width: string;
        height: string;
    };
    zIndex: number;
}

const GALLERY_IMAGES: GalleryImage[] = [
    {
        id: 1,
        title: "Strategic Vision",
        subtitle: "Defining the future",
        imageSrc: "/images/gallery-texture.webp",
        position: { top: "5%", left: "3%" },
        size: { width: "420px", height: "300px" },
        zIndex: 2,
    },
    {
        id: 2,
        title: "Interior Digital Experience",
        subtitle: "Reimagined interfaces",
        imageSrc: "/images/gallery-globe.webp",
        position: { top: "20%", left: "28%" },
        size: { width: "550px", height: "400px" },
        zIndex: 3,
    },
    {
        id: 3,
        title: "System Architecture",
        subtitle: "Building foundations",
        imageSrc: "/images/gallery-celestial.webp",
        position: { bottom: "10%", right: "5%" },
        size: { width: "380px", height: "280px" },
        zIndex: 1,
    },
];

function GalleryCard({ image, index }: { image: GalleryImage; index: number }) {
    return (
        <div
            className="gallery-card absolute"
            style={{
                ...image.position,
                width: image.size.width,
                height: image.size.height,
                zIndex: image.zIndex,
            }}
        >
            {/* Actual Image */}
            <div
                className="relative w-full h-full rounded-lg overflow-hidden"
                style={{
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                }}
            >
                <Image
                    src={image.imageSrc}
                    alt={image.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 420px"
                />
                {/* Overlay gradient */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                    }}
                />
            </div>

            {/* Text overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
                <div
                    className="section-label mb-1"
                    style={{ color: "rgba(255, 255, 255, 0.5)" }}
                >
                    {image.subtitle}
                </div>
                <h4
                    className="text-lg font-normal tracking-[-0.01em] uppercase text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    {image.title}
                </h4>
            </div>
        </div>
    );
}

export function Gallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Using useGSAP hook for proper cleanup (Context7 best practice)
    useGSAP(() => {
        // Parallax effect on scroll
        const cards = containerRef.current?.querySelectorAll(".gallery-card");

        if (cards) {
            cards.forEach((card, i) => {
                const depth = 0.1 + (i * 0.05);

                gsap.to(card, {
                    y: () => -100 * depth,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5,
                    },
                });
            });
        }

        // Fade in animation
        gsap.from(".gallery-card", {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 60,
            scale: 0.95,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-32 overflow-hidden"
            style={{
                background: "#0B0B0B",
                minHeight: "100vh",
            }}
        >
            {/* Section Header */}
            <div className="w-full max-w-7xl mx-auto px-6 mb-16">
                <div className="flex flex-col items-center text-center">
                    <div className="section-label mb-4">
                        Portfolio
                    </div>
                    <h2
                        style={{
                            fontSize: "clamp(56px, 9vw, 80px)",
                        }}
                        className="text-heading-xl text-white font-normal tracking-[-0.02em] uppercase"
                    >
                        Behind Our Work
                    </h2>
                </div>
            </div>

            {/* Gallery Container */}
            <div
                ref={containerRef}
                className="relative w-full max-w-6xl mx-auto px-6"
                style={{ height: "600px" }}
            >
                {GALLERY_IMAGES.map((image, index) => (
                    <GalleryCard key={image.id} image={image} index={index} />
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="w-full max-w-7xl mx-auto px-6 mt-16">
                <div className="flex justify-center">
                    <a
                        href="#contact"
                        className="btn-pill"
                        style={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
                    >
                        View All
                    </a>
                </div>
            </div>
        </section>
    );
}
