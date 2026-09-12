'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, PerspectiveCamera, AdaptiveDpr, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// ─── Particles ───────────────────────────────────────────────────────────────
function Particles({ count = 150 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null)

  const { positions } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 35
      positions[i * 3 + 1] = Math.random() * 20 - 2
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return { positions }
  }, [count])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.005
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#A85A18" transparent opacity={0.3} sizeAttenuation />
    </points>
  )
}

// ─── Procedural Skyscraper ──────────────────────────────────────────────────
function Skyscraper() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Very slow, majestic rotation
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.03
    }
  })

  // Precompute floors
  const floors = 18
  const floorHeight = 0.5
  
  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.1}>
      <group ref={groupRef} position={[0, -4.5, 0]}>
        
        {/* Core structural shaft */}
        <mesh position={[0, (floors * floorHeight) / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, floors * floorHeight + 0.5, 3]} />
          <meshStandardMaterial color="#2a2522" roughness={0.9} metalness={0.1} />
        </mesh>

        {/* Generate Floors */}
        {Array.from({ length: floors }).map((_, i) => (
          <group key={i} position={[0, i * floorHeight, 0]}>
            {/* Concrete Slab */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[4.8, 0.06, 4.8]} />
              <meshStandardMaterial color="#d4c9bd" roughness={0.8} metalness={0.05} />
            </mesh>
            
            {/* Glass Facades */}
            <mesh position={[0, floorHeight / 2, 2.35]} castShadow>
              <boxGeometry args={[4.6, floorHeight - 0.06, 0.1]} />
              <meshPhysicalMaterial 
                color="#0f171e"
                metalness={0.9}
                roughness={0.05}
                transmission={0.95} // glass-like
                ior={1.5}
                thickness={0.5}
                envMapIntensity={2.0}
                transparent
              />
            </mesh>
            <mesh position={[0, floorHeight / 2, -2.35]} castShadow>
              <boxGeometry args={[4.6, floorHeight - 0.06, 0.1]} />
              <meshPhysicalMaterial 
                color="#0f171e" metalness={0.9} roughness={0.05} transmission={0.95} ior={1.5} thickness={0.5} envMapIntensity={2.0} transparent
              />
            </mesh>
            <mesh position={[2.35, floorHeight / 2, 0]} castShadow rotation={[0, Math.PI/2, 0]}>
              <boxGeometry args={[4.6, floorHeight - 0.06, 0.1]} />
              <meshPhysicalMaterial 
                color="#0f171e" metalness={0.9} roughness={0.05} transmission={0.95} ior={1.5} thickness={0.5} envMapIntensity={2.0} transparent
              />
            </mesh>
            <mesh position={[-2.35, floorHeight / 2, 0]} castShadow rotation={[0, Math.PI/2, 0]}>
              <boxGeometry args={[4.6, floorHeight - 0.06, 0.1]} />
              <meshPhysicalMaterial 
                color="#0f171e" metalness={0.9} roughness={0.05} transmission={0.95} ior={1.5} thickness={0.5} envMapIntensity={2.0} transparent
              />
            </mesh>

            {/* Glowing Interior Lights (Warm copper tone) */}
            {(i % 3 === 0 || i % 5 === 0) && (
              <mesh position={[0, floorHeight / 2, 0]}>
                <boxGeometry args={[2.5, floorHeight - 0.1, 2.5]} />
                <meshBasicMaterial color="#A85A18" />
                <pointLight color="#A85A18" intensity={0.8} distance={6} />
              </mesh>
            )}
            
            {/* Corner Pillars (Copper Accents) */}
            {[-2.4, 2.4].map(x => 
              [-2.4, 2.4].map(z => (
                <mesh key={`pillar-${x}-${z}`} position={[x, floorHeight / 2, z]} castShadow>
                  <boxGeometry args={[0.08, floorHeight, 0.08]} />
                  <meshStandardMaterial color="#A85A18" metalness={0.8} roughness={0.2} envMapIntensity={1.5} />
                </mesh>
              ))
            )}
          </group>
        ))}
      </group>
    </Float>
  )
}

// ─── Camera Rig with Parallax ────────────────────────────────────────────────
function CameraRig({
  mouseX,
  mouseY,
  progress,
}: {
  mouseX: React.MutableRefObject<number>
  mouseY: React.MutableRefObject<number>
  progress: React.MutableRefObject<number>
}) {
  const { camera } = useThree()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    
    // Smooth cinematic intro
    const introT = Math.min(t / 4, 1)
    const eased = 1 - Math.pow(1 - introT, 4)

    const baseZ = 16 - eased * 4
    const baseY = 5 - eased * 1.5

    // Mouse parallax
    const targetX = mouseX.current * 1.5
    const targetY = baseY + mouseY.current * 1.0
    const scrollZ = baseZ - progress.current * 2.5

    camera.position.x += (targetX - camera.position.x) * 0.05
    camera.position.y += (targetY - camera.position.y) * 0.05
    camera.position.z += (scrollZ - camera.position.z) * 0.05

    camera.lookAt(0, 2, 0)
  })

  return null
}

// ─── Main Scene ───────────────────────────────────────────────────────────────
interface ArchitecturalSceneProps {
  mouseX: React.MutableRefObject<number>
  mouseY: React.MutableRefObject<number>
  scrollProgress: React.MutableRefObject<number>
  enableParticles?: boolean
}

export function ArchitecturalScene({
  mouseX,
  mouseY,
  scrollProgress,
  enableParticles = true,
}: ArchitecturalSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.3 }}
      camera={{ position: [0, 5, 18], fov: 40 }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <AdaptiveDpr pixelated />
        <PerspectiveCamera makeDefault position={[0, 5, 18]} fov={40} />
        <CameraRig mouseX={mouseX} mouseY={mouseY} progress={scrollProgress} />

        {/* Warm architectural lighting */}
        <Environment preset="sunset" />
        <ambientLight intensity={0.9} color="#f5ede2" />
        <directionalLight position={[8, 16, 6]} intensity={3.5} color="#ffede0" castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-10, 8, -4]} intensity={1.2} color="#e8d5c0" />

        <Skyscraper />
        {enableParticles && <Particles count={120} />}

        {/* Soft contact shadow */}
        <ContactShadows position={[0, -4.5, 0]} opacity={0.25} scale={20} blur={2.5} far={10} color="#8b7355" />

        {/* Warm fog matching brand background */}
        <fog attach="fog" args={['#F2ECE4', 14, 40]} />
      </Suspense>
    </Canvas>
  )
}
