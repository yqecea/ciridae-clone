"use client";

// Hoisted constant - prevents recreation on every render
const SIZES = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 80, height: 80 },
} as const;

export function Logo({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
    const { width, height } = SIZES[size];

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Ciridae Logo"
        >
            {/* Central star */}
            <path
                d="M50 10 L53 47 L90 50 L53 53 L50 90 L47 53 L10 50 L47 47 Z"
                fill="currentColor"
            />

            {/* Top-left diamond */}
            <path
                d="M25 20 L28 27 L35 30 L28 33 L25 40 L22 33 L15 30 L22 27 Z"
                fill="currentColor"
                opacity="0.8"
            />

            {/* Top-right diamond */}
            <path
                d="M75 20 L78 27 L85 30 L78 33 L75 40 L72 33 L65 30 L72 27 Z"
                fill="currentColor"
                opacity="0.8"
            />

            {/* Bottom-left diamond */}
            <path
                d="M25 60 L28 67 L35 70 L28 73 L25 80 L22 73 L15 70 L22 67 Z"
                fill="currentColor"
                opacity="0.8"
            />

            {/* Bottom-right diamond */}
            <path
                d="M75 60 L78 67 L85 70 L78 73 L75 80 L72 73 L65 70 L72 67 Z"
                fill="currentColor"
                opacity="0.8"
            />

            {/* Connecting lines - subtle */}
            <line x1="28" y1="33" x2="47" y2="47" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            <line x1="72" y1="33" x2="53" y2="47" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            <line x1="28" y1="67" x2="47" y2="53" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            <line x1="72" y1="67" x2="53" y2="53" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        </svg>
    );
}

export function LogoConstellation({ className = "" }: { className?: string }) {
    return (
        <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Ciridae Constellation"
        >
            {/* Glow effect */}
            <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Background glow */}
            <circle cx="100" cy="100" r="60" fill="url(#centerGlow)" />

            {/* Main constellation */}
            <g filter="url(#glow)">
                {/* Central large star */}
                <path
                    d="M100 40 L106 94 L160 100 L106 106 L100 160 L94 106 L40 100 L94 94 Z"
                    fill="white"
                />

                {/* Top star */}
                <path
                    d="M100 10 L102 18 L110 20 L102 22 L100 30 L98 22 L90 20 L98 18 Z"
                    fill="white"
                    opacity="0.9"
                />

                {/* Top-left star */}
                <path
                    d="M50 40 L53 48 L61 51 L53 54 L50 62 L47 54 L39 51 L47 48 Z"
                    fill="white"
                    opacity="0.8"
                />

                {/* Top-right star */}
                <path
                    d="M150 40 L153 48 L161 51 L153 54 L150 62 L147 54 L139 51 L147 48 Z"
                    fill="white"
                    opacity="0.8"
                />

                {/* Bottom-left star */}
                <path
                    d="M50 140 L53 148 L61 151 L53 154 L50 162 L47 154 L39 151 L47 148 Z"
                    fill="white"
                    opacity="0.8"
                />

                {/* Bottom-right star */}
                <path
                    d="M150 140 L153 148 L161 151 L153 154 L150 162 L147 154 L139 151 L147 148 Z"
                    fill="white"
                    opacity="0.8"
                />

                {/* Bottom star */}
                <path
                    d="M100 170 L102 178 L110 180 L102 182 L100 190 L98 182 L90 180 L98 178 Z"
                    fill="white"
                    opacity="0.9"
                />
            </g>

            {/* Connecting lines */}
            <g stroke="white" strokeWidth="0.5" opacity="0.2">
                <line x1="100" y1="30" x2="94" y2="94" />
                <line x1="50" y1="62" x2="94" y2="94" />
                <line x1="150" y1="62" x2="106" y2="94" />
                <line x1="50" y1="140" x2="94" y2="106" />
                <line x1="150" y1="140" x2="106" y2="106" />
                <line x1="100" y1="170" x2="100" y2="160" />
            </g>
        </svg>
    );
}
