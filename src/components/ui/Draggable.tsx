"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

// Register Draggable
if (typeof window !== "undefined") {
    gsap.registerPlugin(Draggable);
}

interface DraggableElementProps {
    children: ReactNode;
    /** Drag type: x, y, or both (default: x,y) */
    type?: "x" | "y" | "x,y" | "rotation";
    /** Bounds container selector or element */
    bounds?: string | HTMLElement | { minX?: number; maxX?: number; minY?: number; maxY?: number };
    /** Enable momentum after release (default: true) */
    inertia?: boolean;
    /** Snap to values or function */
    snap?: number[] | ((value: number) => number);
    /** Callback on drag start */
    onDragStart?: () => void;
    /** Callback on drag end */
    onDragEnd?: () => void;
    className?: string;
}

/**
 * DraggableElement - GSAP-powered draggable wrapper
 * 
 * Based on Context7 GSAP Draggable docs:
 * - Supports bounds, inertia, and snapping
 * - Works with touch and mouse
 */
export function DraggableElement({
    children,
    type = "x,y",
    bounds,
    inertia = true,
    snap,
    onDragStart,
    onDragEnd,
    className = "",
}: DraggableElementProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const draggable = Draggable.create(ref.current, {
            type,
            bounds,
            inertia,
            snap,
            onDragStart,
            onDragEnd,
        });

        return () => {
            draggable[0].kill();
        };
    }, [type, bounds, inertia, snap, onDragStart, onDragEnd]);

    return (
        <div ref={ref} className={`cursor-grab active:cursor-grabbing ${className}`}>
            {children}
        </div>
    );
}

interface DraggableCarouselProps {
    children: ReactNode;
    /** Gap between items in px (default: 16) */
    gap?: number;
    className?: string;
}

/**
 * DraggableCarousel - Horizontally draggable carousel
 */
export function DraggableCarousel({
    children,
    gap = 16,
    className = "",
}: DraggableCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !trackRef.current) return;

        const container = containerRef.current;
        const track = trackRef.current;
        const maxX = 0;
        const minX = -(track.scrollWidth - container.offsetWidth);

        const draggable = Draggable.create(track, {
            type: "x",
            bounds: { minX, maxX },
            inertia: true,
            edgeResistance: 0.65,
            throwResistance: 0.9,
        });

        return () => {
            draggable[0].kill();
        };
    }, []);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <div
                ref={trackRef}
                className="flex cursor-grab active:cursor-grabbing"
                style={{ gap }}
            >
                {children}
            </div>
        </div>
    );
}
