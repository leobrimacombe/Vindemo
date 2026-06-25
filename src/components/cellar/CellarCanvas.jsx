import { Canvas } from '@react-three/fiber'
import CellarScene from './CellarScene.jsx'

/**
 * CellarCanvas — isole le <Canvas> R3F dans son propre module afin que tout
 * three.js soit chargé en lazy (code-split) et n'alourdisse pas le bundle
 * initial de la page.
 */
export default function CellarCanvas() {
  return (
    <Canvas
      camera={{ position: [5.5, 2.4, 6.5], fov: 42, near: 0.1, far: 60 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      className="!absolute inset-0"
    >
      <CellarScene />
    </Canvas>
  )
}
