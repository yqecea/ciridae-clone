"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AnimatedBlob({ position, scale, speed, color }: {
    position: [number, number, number];
    scale: number;
    speed: number;
    color: string;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2;
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.2) * 0.3;
        }
    });

    return (
        <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.1}
                    transparent
                    opacity={0.6}
                />
            </mesh>
        </Float>
    );
}

function Scene() {
    const blobs = useMemo(() => [
        { position: [-3, 0, -5] as [number, number, number], scale: 2.5, speed: 1.5, color: "#4a3728" },
        { position: [3, 1, -8] as [number, number, number], scale: 3, speed: 1, color: "#2a4a5a" },
        { position: [0, -2, -6] as [number, number, number], scale: 2, speed: 2, color: "#3a2a4a" },
    ], []);

    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <pointLight position={[-10, -10, -5]} intensity={0.3} color="#CC6437" />

            {blobs.map((blob, i) => (
                <AnimatedBlob key={i} {...blob} />
            ))}

            {/* Fog for depth */}
            <fog attach="fog" args={["#0B0B0B", 5, 20]} />
        </>
    );
}

export function ThreeBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
            >
                <Scene />
            </Canvas>

            {/* Overlay gradient for depth */}
            <div
                className="absolute inset-0"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 0%, #0B0B0B 70%)",
                    pointerEvents: "none",
                }}
            />
        </div>
    );
}
