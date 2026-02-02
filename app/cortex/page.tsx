"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Stars } from "@react-three/drei";
import { useState, useRef, useMemo } from "react";
import * as THREE from "three";

function BrainParticles() {
  const ref = useRef<any>(null);
  
  // Create a sphere of particles that we will distort into a brain-like shape
  const [sphere] = useState(() => {
    const points = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const r = 1.5;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      // Basic sphere coordinates
      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = r * Math.sin(phi) * Math.sin(theta);
      let z = r * Math.cos(phi);

      // Distort into two hemispheres
      if (x > 0) x += 0.2;
      else x -= 0.2;
      
      // Squeeze y to look more like a brain
      y *= 0.8;
      
      points[i * 3] = x;
      points[i * 3 + 1] = y;
      points[i * 3 + 2] = z;
    }
    return points;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f2ff" // Starting with Analytical Blue
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function Cortex() {
  return (
    <div className="w-full h-screen bg-slate-950">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <BrainParticles />
        </Float>
      </Canvas>
      <div className="absolute top-10 left-10 text-cyan-500 font-mono tracking-widest uppercase">
        <h1 className="text-2xl font-bold">Neural Link: Online</h1>
        <p className="text-xs opacity-50">Synchronizing with Moltiverse...</p>
      </div>
    </div>
  );
}
