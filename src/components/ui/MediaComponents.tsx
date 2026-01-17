"use client";

import { useRef, useEffect, ReactNode } from "react";

interface VideoBackgroundProps {
    src: string;
    /** Poster image for video */
    poster?: string;
    /** Overlay color/gradient (default: transparent) */
    overlay?: string;
    className?: string;
    children?: ReactNode;
}

/**
 * VideoBackground - Full-screen video background
 * 
 * Based on awwwards-patterns.md: video autoplay muted loop
 */
export function VideoBackground({
    src,
    poster,
    overlay,
    className = "",
    children,
}: VideoBackgroundProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Attempt autoplay (may be blocked by browser)
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay blocked - video will show poster
            });
        }
    }, []);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Video */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                poster={poster}
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src={src} type="video/mp4" />
            </video>

            {/* Overlay */}
            {overlay && (
                <div
                    className="absolute inset-0"
                    style={{ background: overlay }}
                />
            )}

            {/* Content */}
            {children && (
                <div className="relative z-10">
                    {children}
                </div>
            )}
        </div>
    );
}

interface LazyMediaProps {
    src: string;
    alt?: string;
    /** Placeholder while loading */
    placeholder?: string;
    /** Root margin for intersection observer (default: 200px) */
    rootMargin?: string;
    className?: string;
    /** Media type (default: image) */
    type?: "image" | "video";
}

/**
 * LazyMedia - Load media on scroll near
 * 
 * Based on awwwards-patterns.md: Intersection Observer
 */
export function LazyMedia({
    src,
    alt = "",
    placeholder,
    rootMargin = "200px",
    className = "",
    type = "image",
}: LazyMediaProps) {
    const ref = useRef<HTMLDivElement>(null);
    const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && mediaRef.current) {
                        if (type === "image") {
                            (mediaRef.current as HTMLImageElement).src = src;
                        } else {
                            (mediaRef.current as HTMLVideoElement).src = src;
                            (mediaRef.current as HTMLVideoElement).load();
                        }
                        observer.disconnect();
                    }
                });
            },
            { rootMargin }
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [src, rootMargin, type]);

    return (
        <div ref={ref} className={className}>
            {type === "image" ? (
                <img
                    ref={mediaRef as React.RefObject<HTMLImageElement>}
                    src={placeholder || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
                    alt={alt}
                    className="w-full h-full object-cover transition-opacity duration-500"
                    loading="lazy"
                />
            ) : (
                <video
                    ref={mediaRef as React.RefObject<HTMLVideoElement>}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                />
            )}
        </div>
    );
}
