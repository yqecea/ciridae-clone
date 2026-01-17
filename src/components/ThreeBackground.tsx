"use client";

import dynamic from "next/dynamic";

// Dynamic import for Three.js - prevents ~500KB+ from being in initial bundle
// SSR disabled because Three.js requires browser APIs
const ThreeBackgroundClient = dynamic(
    () => import("./ThreeBackgroundClient").then((mod) => mod.ThreeBackground),
    {
        ssr: false,
        loading: () => (
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{ background: "#050505" }}
            />
        ),
    }
);

export function ThreeBackground() {
    return <ThreeBackgroundClient />;
}
