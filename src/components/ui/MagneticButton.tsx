"use client";

import { useRef, useCallback, ReactNode, ButtonHTMLAttributes } from "react";
import gsap from "gsap";

interface MagneticButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'as'> {
    children: ReactNode;
    strength?: number;
    className?: string;
}

/**
 * MagneticButton Component - A button that "attracts" to cursor on hover
 * 
 * Creates the premium awwwards effect where buttons seem to follow
 * your cursor slightly when you hover near them.
 */
export function MagneticButton({
    children,
    strength = 0.4,
    className = "",
    ...props
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLSpanElement>(null);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Move button container
            gsap.to(ref.current, {
                x: x * strength,
                y: y * strength,
                duration: 0.4,
                ease: "power2.out",
            });

            // Move content slightly more for depth
            if (contentRef.current) {
                gsap.to(contentRef.current, {
                    x: x * strength * 0.3,
                    y: y * strength * 0.3,
                    duration: 0.4,
                    ease: "power2.out",
                });
            }
        },
        [strength]
    );

    const handleMouseLeave = useCallback(() => {
        if (!ref.current) return;

        // Elastic snap back
        gsap.to(ref.current, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
        });

        if (contentRef.current) {
            gsap.to(contentRef.current, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)",
            });
        }
    }, []);

    return (
        <button
            ref={ref}
            className={`${className} will-change-transform`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <span ref={contentRef} className="inline-block">
                {children}
            </span>
        </button>
    );
}

/**
 * MagneticLink - Same magnetic effect for anchor tags
 */
interface MagneticLinkProps {
    children: ReactNode;
    href: string;
    strength?: number;
    className?: string;
}

export function MagneticLink({
    children,
    href,
    strength = 0.4,
    className = "",
}: MagneticLinkProps) {
    const ref = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(ref.current, {
                x: x * strength,
                y: y * strength,
                duration: 0.4,
                ease: "power2.out",
            });
        },
        [strength]
    );

    const handleMouseLeave = useCallback(() => {
        if (!ref.current) return;

        gsap.to(ref.current, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
        });
    }, []);

    return (
        <a
            ref={ref}
            href={href}
            className={`${className} will-change-transform inline-block`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </a>
    );
}

/**
 * MagneticWrapper - Magnetic effect for wrapping any child element
 * 
 * Use this when you need to wrap interactive elements like buttons or
 * links without creating invalid HTML (nested buttons).
 */
interface MagneticWrapperProps {
    children: ReactNode;
    strength?: number;
    className?: string;
}

export function MagneticWrapper({
    children,
    strength = 0.4,
    className = "",
}: MagneticWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Move wrapper
            gsap.to(ref.current, {
                x: x * strength,
                y: y * strength,
                duration: 0.4,
                ease: "power2.out",
            });

            // Move content slightly more for depth
            if (contentRef.current) {
                gsap.to(contentRef.current, {
                    x: x * strength * 0.3,
                    y: y * strength * 0.3,
                    duration: 0.4,
                    ease: "power2.out",
                });
            }
        },
        [strength]
    );

    const handleMouseLeave = useCallback(() => {
        if (!ref.current) return;

        // Elastic snap back
        gsap.to(ref.current, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
        });

        if (contentRef.current) {
            gsap.to(contentRef.current, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)",
            });
        }
    }, []);

    return (
        <div
            ref={ref}
            className={`${className} will-change-transform inline-block`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div ref={contentRef} className="inline-block">
                {children}
            </div>
        </div>
    );
}
