"use client";

import { useEffect, useRef, useCallback } from "react";

type MouseMoveCallback = (e: MouseEvent) => void;

// Shared listener pool for deduplication
const listeners = new Set<MouseMoveCallback>();
let sharedHandler: MouseMoveCallback | null = null;

function subscribeMouseMove(callback: MouseMoveCallback): () => void {
    listeners.add(callback);

    if (!sharedHandler) {
        sharedHandler = (e: MouseEvent) => {
            listeners.forEach((cb) => cb(e));
        };
        window.addEventListener("mousemove", sharedHandler, { passive: true });
    }

    return () => {
        listeners.delete(callback);
        if (listeners.size === 0 && sharedHandler) {
            window.removeEventListener("mousemove", sharedHandler);
            sharedHandler = null;
        }
    };
}

interface MouseParallaxOptions {
    intensity?: number;
    ease?: number;
}

/**
 * Hook for mouse-based parallax effects with automatic listener deduplication
 * @param onMove - Callback receiving normalized mouse position (-1 to 1)
 * @param options - Configuration options
 */
export function useMouseParallax(
    onMove: (x: number, y: number) => void,
    options: MouseParallaxOptions = {}
) {
    const { intensity = 0.05 } = options;
    const containerRef = useRef<HTMLElement | null>(null);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const moveX = (e.clientX - centerX) * intensity;
            const moveY = (e.clientY - centerY) * intensity;

            onMove(moveX, moveY);
        },
        [intensity, onMove]
    );

    useEffect(() => {
        const unsubscribe = subscribeMouseMove(handleMouseMove);
        return unsubscribe;
    }, [handleMouseMove]);

    return containerRef;
}

export { subscribeMouseMove };
