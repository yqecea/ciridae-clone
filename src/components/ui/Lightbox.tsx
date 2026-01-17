"use client";

import { useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps {
    children: ReactNode;
    /** Content to show in lightbox (usually larger image) */
    lightboxContent: ReactNode;
    className?: string;
}

/**
 * Lightbox - Click to expand content in overlay
 * 
 * Based on Context7 Framer Motion AnimatePresence patterns.
 */
export function Lightbox({
    children,
    lightboxContent,
    className = "",
}: LightboxProps) {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    return (
        <>
            {/* Trigger */}
            <div
                onClick={open}
                className={`cursor-zoom-in ${className}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && open()}
            >
                {children}
            </div>

            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 cursor-zoom-out p-8"
                        onClick={close}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-[90vw] max-h-[90vh]"
                        >
                            {lightboxContent}
                        </motion.div>

                        {/* Close button */}
                        <button
                            onClick={close}
                            className="absolute top-6 right-6 text-white/80 hover:text-white text-2xl"
                            aria-label="Close lightbox"
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

interface ImageGalleryProps {
    images: { src: string; alt: string; thumbnail?: string }[];
    columns?: number;
    gap?: number;
    className?: string;
}

/**
 * ImageGallery - Grid gallery with lightbox
 */
export function ImageGallery({
    images,
    columns = 3,
    gap = 16,
    className = "",
}: ImageGalleryProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const next = useCallback(() => {
        setActiveIndex((i) => (i !== null ? (i + 1) % images.length : 0));
    }, [images.length]);

    const prev = useCallback(() => {
        setActiveIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : images.length - 1));
    }, [images.length]);

    return (
        <>
            {/* Grid */}
            <div
                className={`grid ${className}`}
                style={{
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap,
                }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className="cursor-zoom-in overflow-hidden rounded-lg"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && setActiveIndex(index)}
                    >
                        <img
                            src={image.thumbnail || image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {activeIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 p-8"
                        onClick={() => setActiveIndex(null)}
                    >
                        <motion.img
                            key={activeIndex}
                            src={images[activeIndex].src}
                            alt={images[activeIndex].alt}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="max-w-full max-h-full object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Navigation */}
                        <button
                            onClick={(e) => { e.stopPropagation(); prev(); }}
                            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl"
                            aria-label="Previous image"
                        >
                            ←
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); next(); }}
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl"
                            aria-label="Next image"
                        >
                            →
                        </button>

                        {/* Close */}
                        <button
                            onClick={() => setActiveIndex(null)}
                            className="absolute top-6 right-6 text-white/80 hover:text-white text-2xl"
                            aria-label="Close gallery"
                        >
                            ✕
                        </button>

                        {/* Counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-mono">
                            {activeIndex + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
