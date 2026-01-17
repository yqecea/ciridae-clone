"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

interface CustomCursorProps {
    /** Size of the outer ring (default: 40) */
    size?: number;
    /** Size of the inner dot (default: 8) */
    dotSize?: number;
    /** Color of the cursor (default: white) */
    color?: string;
}

/**
 * CustomCursor - Replaces default cursor with animated circle/dot
 * SSR-safe: only renders after mount on non-touch devices
 */
export function CustomCursor({
    size = 40,
    dotSize = 8,
    color = "rgba(255, 255, 255, 0.9)",
}: CustomCursorProps) {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const cursorPos = useRef({ x: 0, y: 0 });
    const dotPos = useRef({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState("");
    const [mounted, setMounted] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(true); // Start true to avoid SSR flash

    // Handle mount and touch detection
    useEffect(() => {
        // Check if the device has a FINE pointer (mouse/trackpad)
        // This is more reliable than blocking on touch because touchscreen laptops
        // have BOTH fine (mouse) and coarse (touch) pointers
        const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
        const hasAnyPointer = window.matchMedia("(any-pointer: fine)").matches;

        // If the device has any fine pointer capability, show the cursor
        // This ensures touchscreen laptops with mice still get the custom cursor
        const shouldHideCursor = !hasFinePointer && !hasAnyPointer;

        console.log("[CustomCursor] Mount check:", {
            hasFinePointer,
            hasAnyPointer,
            shouldHideCursor,
            maxTouchPoints: navigator.maxTouchPoints
        });

        setIsTouchDevice(shouldHideCursor);
        setMounted(true);
    }, []);

    useEffect(() => {
        // Wait for mount and ensure not touch device
        if (!mounted || isTouchDevice) return;

        // Mouse move handler - update target position
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        // Hover detection for interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.hasAttribute("data-cursor-hover");

            const cursorTextEl = target.closest("[data-cursor-text]") as HTMLElement;
            if (cursorTextEl) {
                setCursorText(cursorTextEl.dataset.cursorText || "");
                setIsHovering(true);
            } else {
                setCursorText("");
                setIsHovering(!!isInteractive);
            }
        };

        // Animation loop for smooth following
        let animationId: number;
        const animate = () => {
            // Smooth interpolation (lerp)
            const lerpFactor = 0.15;
            const dotLerpFactor = 0.3;

            cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * lerpFactor;
            cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * lerpFactor;

            dotPos.current.x += (mousePos.current.x - dotPos.current.x) * dotLerpFactor;
            dotPos.current.y += (mousePos.current.y - dotPos.current.y) * dotLerpFactor;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${cursorPos.current.x - size / 2}px, ${cursorPos.current.y - size / 2}px)`;
            }
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${dotPos.current.x - dotSize / 2}px, ${dotPos.current.y - dotSize / 2}px)`;
            }

            animationId = requestAnimationFrame(animate);
        };

        // Start animation loop
        animationId = requestAnimationFrame(animate);

        // Add event listeners
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseOver);

        // Hide default cursor
        document.body.style.cursor = "none";
        document.documentElement.style.cursor = "none";

        return () => {
            cancelAnimationFrame(animationId);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.body.style.cursor = "";
            document.documentElement.style.cursor = "";
        };
    }, [size, dotSize, mounted, isTouchDevice]);

    // Scale animation on hover
    useEffect(() => {
        if (!cursorRef.current || !dotRef.current || isTouchDevice) return;

        const hasText = cursorText.length > 0;

        gsap.to(cursorRef.current, {
            scale: hasText ? 2.5 : isHovering ? 1.5 : 1,
            duration: 0.3,
            ease: "power2.out",
        });

        gsap.to(dotRef.current, {
            scale: hasText || isHovering ? 0 : 1,
            duration: 0.3,
            ease: "power2.out",
        });
    }, [isHovering, cursorText, isTouchDevice, mounted]);

    // Don't render on touch devices or before mount
    if (!mounted || isTouchDevice) return null;

    return (
        <>
            {/* Outer Ring */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 rounded-full border pointer-events-none mix-blend-difference flex items-center justify-center will-change-transform"
                style={{
                    width: size,
                    height: size,
                    borderColor: color,
                    borderWidth: 2,
                    zIndex: 99999,
                }}
            >
                {cursorText && (
                    <span className="text-[8px] font-mono uppercase tracking-wider text-white whitespace-nowrap">
                        {cursorText}
                    </span>
                )}
            </div>
            {/* Inner Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
                style={{
                    width: dotSize,
                    height: dotSize,
                    backgroundColor: color,
                    zIndex: 99999,
                }}
            />
        </>
    );
}

