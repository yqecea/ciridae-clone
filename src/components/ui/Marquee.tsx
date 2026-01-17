"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";

interface MarqueeProps {
    children: ReactNode;
    /** Speed in pixels per second (default: 100) */
    speed?: number;
    /** Direction of scroll (default: left) */
    direction?: "left" | "right";
    /** Pause on hover (default: true) */
    pauseOnHover?: boolean;
    className?: string;
}

/**
 * Marquee - Infinite scrolling text/content
 * 
 * Creates the classic awwwards infinite horizontal scroll effect
 * commonly used for partner logos, testimonials, or decorative text.
 */
export function Marquee({
    children,
    speed = 100,
    direction = "left",
    pauseOnHover = true,
    className = "",
}: MarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const track1Ref = useRef<HTMLDivElement>(null);
    const track2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !track1Ref.current || !track2Ref.current) return;

        const tracks = [track1Ref.current, track2Ref.current];
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = track1Ref.current.offsetWidth;

        // Calculate duration based on speed
        const duration = trackWidth / speed;

        const ctx = gsap.context(() => {
            // Set initial positions
            gsap.set(track2Ref.current, { x: direction === "left" ? trackWidth : -trackWidth });

            // Animate both tracks
            const tl = gsap.timeline({ repeat: -1 });

            if (direction === "left") {
                tracks.forEach((track) => {
                    gsap.to(track, {
                        x: `-=${trackWidth}`,
                        duration,
                        ease: "none",
                        repeat: -1,
                        modifiers: {
                            x: gsap.utils.unitize((x: number) => {
                                const val = parseFloat(String(x)) % trackWidth;
                                return val < -trackWidth ? val + trackWidth * 2 : val;
                            }),
                        },
                    });
                });
            } else {
                tracks.forEach((track) => {
                    gsap.to(track, {
                        x: `+=${trackWidth}`,
                        duration,
                        ease: "none",
                        repeat: -1,
                        modifiers: {
                            x: gsap.utils.unitize((x: number) => {
                                const val = parseFloat(String(x)) % trackWidth;
                                return val > trackWidth ? val - trackWidth * 2 : val;
                            }),
                        },
                    });
                });
            }
        }, containerRef);

        // Pause on hover
        if (pauseOnHover) {
            const handleEnter = () => gsap.globalTimeline.pause();
            const handleLeave = () => gsap.globalTimeline.resume();

            containerRef.current.addEventListener("mouseenter", handleEnter);
            containerRef.current.addEventListener("mouseleave", handleLeave);

            return () => {
                ctx.revert();
                containerRef.current?.removeEventListener("mouseenter", handleEnter);
                containerRef.current?.removeEventListener("mouseleave", handleLeave);
            };
        }

        return () => ctx.revert();
    }, [speed, direction, pauseOnHover]);

    return (
        <div
            ref={containerRef}
            className={`overflow-hidden ${className}`}
        >
            <div className="flex w-fit">
                <div ref={track1Ref} className="flex shrink-0 gap-8">
                    {children}
                </div>
                <div ref={track2Ref} className="flex shrink-0 gap-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
