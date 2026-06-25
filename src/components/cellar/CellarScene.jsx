import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Barrels from './Barrels.jsx'

/**
 * CellarScene — l'intérieur du chai : voûte en berceau, sol de pierre,
 * lanternes chaudes et rangées de fûts. Volontairement stylisé (pas
 * photoréaliste) pour rester fluide.
 */

const VAULT_RADIUS = 4.2
const TUNNEL_DEPTH = 34

// Une lanterne : petite sphère émissive + halo lumineux chaud.
function Lantern({ position }) {
  const light = useRef()
  // Léger scintillement pour donner vie à la flamme
  useFrame(({ clock }) => {
    if (light.current) {
      const t = clock.elapsedTime
      light.current.intensity = 7 + Math.sin(t * 6 + position[2]) * 0.6 + Math.sin(t * 11) * 0.3
    }
  })
  return (
    <group position={position}>
      <pointLight ref={light} color="#ff9b4d" intensity={7} distance={11} decay={2} />
      <mesh>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color="#ffd9a0" emissive="#ffb155" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      {/* fil de suspension discret */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 1.2, 4]} />
        <meshStandardMaterial color="#1a120c" />
      </mesh>
    </group>
  )
}

export default function CellarScene() {
  // Voûte en berceau : cylindre ouvert, axe le long de Z, vu de l'intérieur.
  const vaultGeom = useMemo(() => {
    const g = new THREE.CylinderGeometry(VAULT_RADIUS, VAULT_RADIUS, TUNNEL_DEPTH, 48, 1, true)
    g.rotateX(Math.PI / 2) // axe Y → Z
    return g
  }, [])

  const lanterns = useMemo(() => {
    const arr = []
    for (let d = 0; d < 4; d++) {
      arr.push([0, VAULT_RADIUS - 1.6, -2 - d * 7])
    }
    return arr
  }, [])

  return (
    <>
      {/* Atmosphère : brouillard chaud qui noie le fond de l'allée */}
      <color attach="background" args={['#160d09']} />
      <fog attach="fog" args={['#160d09', 7, 26]} />

      {/* Lumière d'ambiance très basse, teintée chaud */}
      <ambientLight intensity={0.18} color="#5a3a22" />
      {/* Légère lueur rasante venant de l'entrée (derrière la caméra) */}
      <directionalLight position={[3, 5, 12]} intensity={0.35} color="#ffb877" />

      {lanterns.map((p, i) => (
        <Lantern key={i} position={p} />
      ))}

      {/* Voûte / murs */}
      <mesh geometry={vaultGeom} position={[0, 0, -TUNNEL_DEPTH / 2 + 6]}>
        <meshStandardMaterial color="#4a3b30" roughness={0.95} metalness={0} side={THREE.BackSide} />
      </mesh>

      {/* Sol de pierre (corde de la voûte) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -TUNNEL_DEPTH / 2 + 6]}>
        <planeGeometry args={[VAULT_RADIUS * 2, TUNNEL_DEPTH]} />
        <meshStandardMaterial color="#2c2118" roughness={1} />
      </mesh>

      {/* Mur du fond qui ferme le tunnel */}
      <mesh position={[0, VAULT_RADIUS * 0.2, -TUNNEL_DEPTH / 2 + 6.5]}>
        <circleGeometry args={[VAULT_RADIUS, 48, 0, Math.PI]} />
        <meshStandardMaterial color="#3a2d24" roughness={1} side={THREE.DoubleSide} />
      </mesh>

      <Barrels />

      {/* Contrôles : on tourne autour de l'allée, sans passer sous le sol */}
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={3.5}
        maxDistance={13}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.49}
        target={[0, 1.1, -3]}
        autoRotate
        autoRotateSpeed={0.45}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  )
}
