import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles() {
  const mesh = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const count = 1500

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      velocities[i * 3] = (Math.random() - 0.5) * 0.002
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002
    }
    return [positions, velocities]
  }, [])

  useFrame((state) => {
    if (!mesh.current) return
    const time = state.clock.getElapsedTime()
    const posAttr = mesh.current.geometry.attributes.position
    const posArray = posAttr.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      posArray[i3] += velocities[i3] + Math.sin(time * 0.1 + i) * 0.0005
      posArray[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.1 + i) * 0.0005
      posArray[i3 + 2] += velocities[i3 + 2]

      if (posArray[i3] > 10) posArray[i3] = -10
      if (posArray[i3] < -10) posArray[i3] = 10
      if (posArray[i3 + 1] > 10) posArray[i3 + 1] = -10
      if (posArray[i3 + 1] < -10) posArray[i3 + 1] = 10
      if (posArray[i3 + 2] > 10) posArray[i3 + 2] = -10
      if (posArray[i3 + 2] < -10) posArray[i3 + 2] = 10
    }
    posAttr.needsUpdate = true

    mesh.current.rotation.y = mouseRef.current.x * 0.05
    mesh.current.rotation.x = mouseRef.current.y * 0.05
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#39ff14"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingSpheres() {
  const group = useRef<THREE.Group>(null)

  const spheres = useMemo(() => {
    return Array.from({ length: 8 }, () => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8 - 3,
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.3 + 0.1,
      offset: Math.random() * Math.PI * 2,
    }))
  }, [])

  useFrame((state) => {
    if (!group.current) return
    const time = state.clock.getElapsedTime()
    group.current.children.forEach((child, i) => {
      const s = spheres[i]
      child.position.y = s.position[1] + Math.sin(time * s.speed + s.offset) * 0.5
      child.rotation.x = time * 0.1 + s.offset
      child.rotation.y = time * 0.15 + s.offset
    })
  })

  return (
    <group ref={group}>
      {spheres.map((s, i) => (
        <mesh key={i} position={s.position} scale={s.scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color="#39ff14"
            transparent
            opacity={0.08}
            wireframe
          />
        </mesh>
      ))}
    </group>
  )
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.1} />
        <Particles />
        <FloatingSpheres />
        <fog attach="fog" args={['#050505', 5, 20]} />
      </Canvas>
    </div>
  )
}
