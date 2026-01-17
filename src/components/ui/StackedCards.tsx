"use client";

import { ReactNode, Children, cloneElement, isValidElement, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface StackedCardsProps {
    children: ReactNode;
    /** Gap between stacked cards when overlapped (default: 20) */
    stackOffset?: number;
    /** Top position for sticky cards (default: 100) */
    stickyTop?: number;
    className?: string;
}

/**
 * StackedCards - Cards that stack on top of each other on scroll
 * 
 * Creates the premium effect where cards appear to stack up
 * as user scrolls, each one slightly offset.
 */
export function StackedCards({
    children,
    stackOffset = 20,
    stickyTop = 100,
    className = "",
}: StackedCardsProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const cards = containerRef.current.querySelectorAll(".stacked-card-item");

        const ctx = gsap.context(() => {
            cards.forEach((card, i) => {
                gsap.to(card, {
                    scale: 1 - (cards.length - i - 1) * 0.05,
                    y: (cards.length - i - 1) * stackOffset,
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: `top ${stickyTop}px`,
                        end: `+=${window.innerHeight}`,
                        scrub: true,
                        pin: true,
                        pinSpacing: false,
                    },
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, [stackOffset, stickyTop]);

    return (
        <div ref={containerRef} className={className}>
            {Children.map(children, (child, index) => {
                if (isValidElement(child)) {
                    return cloneElement(child as React.ReactElement<{ className?: string }>, {
                        className: `${(child.props as { className?: string }).className || ""} stacked-card-item`,
                    });
                }
                return child;
            })}
        </div>
    );
}

interface PinnedSectionProps {
    children: ReactNode;
    /** Duration of pin as multiplier of viewport height (default: 1) */
    pinDuration?: number;
    className?: string;
}

/**
 * PinnedSection - Section that stays pinned during scroll
 * 
 * Creates ScrollTrigger pin effect where section sticks
 * in place while content scrolls.
 */
export function PinnedSection({
    children,
    pinDuration = 1,
    className = "",
}: PinnedSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${window.innerHeight * pinDuration}`,
                pin: true,
                pinSpacing: true,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [pinDuration]);

    return (
        <div ref={sectionRef} className={className}>
            {children}
        </div>
    );
}
