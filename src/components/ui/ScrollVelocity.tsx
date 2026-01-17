"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollVelocityTextProps {
    children: string;
    /** Base speed (default: 100) */
    baseSpeed?: number;
    className?: string;
}

/**
 * ScrollVelocityText - Text that speeds up based on scroll velocity
 * 
 * Based on GSAP Context7 docs: Uses ScrollTrigger.getVelocity()
 * to create speed-reactive marquee text.
 */
export function ScrollVelocityText({
    children,
    baseSpeed = 100,
    className = "",
}: ScrollVelocityTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const velocityRef = useRef(0);

    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;

        const text = textRef.current;
        let xPos = 0;

        // Track scroll velocity
        ScrollTrigger.create({
            onUpdate: (self) => {
                velocityRef.current = self.getVelocity();
            },
        });

        // Animation loop
        const animate = () => {
            // Base speed + velocity boost
            const velocityFactor = Math.abs(velocityRef.current) * 0.01;
            const speed = baseSpeed + velocityFactor;

            xPos -= speed * 0.016; // 60fps assumed

            // Reset position when one copy has fully scrolled
            const textWidth = text.offsetWidth / 2;
            if (Math.abs(xPos) >= textWidth) {
                xPos = 0;
            }

            gsap.set(text, { x: xPos });
            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [baseSpeed]);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <div ref={textRef} className="flex whitespace-nowrap">
                <span className="pr-8">{children}</span>
                <span className="pr-8">{children}</span>
            </div>
        </div>
    );
}

interface SkewOnScrollProps {
    children: ReactNode;
    /** Max skew angle in degrees (default: 10) */
    maxSkew?: number;
    className?: string;
}

/**
 * SkewOnScroll - Elements skew based on scroll velocity
 * 
 * Creates the premium effect where elements tilt in the
 * direction of scroll based on speed.
 */
export function SkewOnScroll({
    children,
    maxSkew = 10,
    className = "",
}: SkewOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;

        ScrollTrigger.create({
            onUpdate: (self) => {
                const velocity = self.getVelocity();
                // Clamp velocity to reasonable range
                const clampedVelocity = gsap.utils.clamp(-2000, 2000, velocity);
                // Map to skew range
                const skew = (clampedVelocity / 2000) * maxSkew;

                gsap.to(element, {
                    skewY: skew,
                    duration: 0.3,
                    ease: "power2.out",
                });
            },
        });

        // Reset skew when scroll stops
        ScrollTrigger.create({
            onUpdate: () => {
                // Debounced reset
                gsap.to(element, {
                    skewY: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)",
                    delay: 0.1,
                });
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, [maxSkew]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
