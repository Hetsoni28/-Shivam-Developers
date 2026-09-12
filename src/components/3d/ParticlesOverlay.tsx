'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingParticles({ count = 180 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null)

  const { positions } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = Math.random() * 22 - 4
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return { positions }
  }, [count])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.004
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.15
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#d4956a"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

export function ParticlesOverlay() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      camera={{ position: [0, 3, 14], fov: 50 }}
      style={{ background: 'transparent' }}
    >
      <FloatingParticles count={180} />
    </Canvas>
  )
}
