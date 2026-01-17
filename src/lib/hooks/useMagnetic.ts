"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";

interface MagneticOptions {
    strength?: number;  // How much the element moves (0-1)
    ease?: number;      // Animation ease duration in seconds
}

/**
 * Magnetic Effect Hook - Makes elements "attract" to cursor on hover
 * 
 * Usage:
 * ```tsx
 * const { ref, onMouseMove, onMouseLeave } = useMagnetic();
 * <button ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
 *   Click me
 * </button>
 * ```
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(
    options: MagneticOptions = {}
) {
    const { strength = 0.3, ease = 0.3 } = options;
    const ref = useRef<T>(null);

    const onMouseMove = useCallback(
        (e: React.MouseEvent<T>) => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(ref.current, {
                x: x * strength,
                y: y * strength,
                duration: ease,
                ease: "power2.out",
            });
        },
        [strength, ease]
    );

    const onMouseLeave = useCallback(() => {
        if (!ref.current) return;

        gsap.to(ref.current, {
            x: 0,
            y: 0,
            duration: ease * 1.5,
            ease: "elastic.out(1, 0.3)",
        });
    }, [ease]);

    return { ref, onMouseMove, onMouseLeave };
}
