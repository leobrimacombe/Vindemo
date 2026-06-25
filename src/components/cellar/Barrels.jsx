import { useMemo, useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'

/**
 * Barrels — fûts de chêne rendus en instancing pour rester fluides (60fps)
 * même sur mobile. Un seul draw-call pour tous les corps de fûts, et un par
 * cerclage métallique.
 *
 * Les fûts sont empilés en pyramide le long d'une allée centrale, des deux
 * côtés, l'axe orienté vers l'allée (on voit les faces rondes en perspective).
 */

// Profil du tonneau (rayon le long de l'axe) → LatheGeometry.
// Léger renflement au centre, faces presque fermées aux extrémités.
function makeBarrelProfile(length, bellyRadius, endRadius, segments = 14) {
  const pts = []
  const half = length / 2
  for (let i = 0; i <= segments; i++) {
    const tn = i / segments // 0 → 1
    const y = -half + tn * length
    // courbe sinusoïdale pour le galbe des douelles
    const bulge = Math.sin(tn * Math.PI) // 0 aux bouts, 1 au centre
    const r = endRadius + (bellyRadius - endRadius) * bulge
    pts.push(new THREE.Vector2(r, y))
  }
  return pts
}

// Disposition des fûts : pyramides de chaque côté, répétées en profondeur.
function buildLayout({ rows, depthCount, barrelLen, bellyR, spacingZ, aisle }) {
  const items = []
  const stepX = bellyR * 2.05
  const stepY = bellyR * 1.78
  for (let side = -1; side <= 1; side += 2) {
    for (let d = 0; d < depthCount; d++) {
      const z = -d * spacingZ
      // pyramide : base de `rows`, puis rangées décroissantes
      for (let level = 0; level < rows; level++) {
        const inThisRow = rows - level
        const rowWidth = (inThisRow - 1) * stepX
        for (let k = 0; k < inThisRow; k++) {
          const localX = -rowWidth / 2 + k * stepX
          const baseX = side * (aisle + barrelLen / 2)
          items.push({
            x: baseX,
            y: bellyR + level * stepY,
            z: z + localX, // empilement le long de Z derrière l'allée
            side,
          })
        }
      }
    }
  }
  return items
}

export default function Barrels() {
  const barrelLen = 1.5
  const bellyR = 0.62
  const endR = 0.46

  const layout = useMemo(
    () => buildLayout({ rows: 3, depthCount: 5, barrelLen, bellyR, spacingZ: 2.6, aisle: 1.55 }),
    [],
  )

  // Géométrie du corps (lathe)
  const bodyGeom = useMemo(() => {
    const profile = makeBarrelProfile(barrelLen, bellyR, endR, 16)
    const g = new THREE.LatheGeometry(profile, 20)
    g.computeVertexNormals()
    return g
  }, [])

  // Géométrie d'un cerclage (torus fin)
  const hoopGeom = useMemo(() => new THREE.TorusGeometry(1, 0.035, 8, 24), [])

  // Cerclages le long de l'axe : offset (en X après rotation) + rayon ajusté
  // au galbe du fût à cet endroit (légèrement débordant pour bien se voir).
  const hoopDefs = useMemo(() => {
    const radiusAt = (offset) => {
      const tn = (offset + barrelLen / 2) / barrelLen
      const bulge = Math.sin(tn * Math.PI)
      return endR + (bellyR - endR) * bulge + 0.012
    }
    const o = barrelLen * 0.32
    return [
      { offset: 0, radius: radiusAt(0) },
      { offset: o, radius: radiusAt(o) },
      { offset: -o, radius: radiusAt(-o) },
    ]
  }, [])

  const bodyRef = useRef()
  const hoopRefs = [useRef(), useRef(), useRef()]

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D()
    // Rotation pour coucher le fût : axe (Y du lathe) → aligné sur X (vers l'allée)
    const lay = new THREE.Euler(0, 0, Math.PI / 2)

    // Corps
    layout.forEach((it, i) => {
      dummy.position.set(it.x, it.y, it.z)
      dummy.rotation.copy(lay)
      dummy.updateMatrix()
      bodyRef.current.setMatrixAt(i, dummy.matrix)
    })
    bodyRef.current.instanceMatrix.needsUpdate = true

    // Cerclages : chaque set d'instances correspond à une position le long de l'axe
    hoopDefs.forEach((def, h) => {
      const mesh = hoopRefs[h].current
      layout.forEach((it, i) => {
        // l'axe du fût pointe en X (après rotation), on décale donc en X
        dummy.position.set(it.x + def.offset, it.y, it.z)
        // torus est dans le plan XY → on l'oriente perpendiculaire à X
        dummy.rotation.set(0, Math.PI / 2, 0)
        const s = def.radius
        dummy.scale.set(s, s, 1)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
      })
      mesh.instanceMatrix.needsUpdate = true
      dummy.scale.set(1, 1, 1)
    })
  }, [layout, hoopDefs])

  return (
    <group>
      {/* Corps des fûts — chêne */}
      <instancedMesh ref={bodyRef} args={[bodyGeom, undefined, layout.length]}>
        <meshStandardMaterial color="#7a4a28" roughness={0.78} metalness={0.05} />
      </instancedMesh>

      {/* Cerclages métalliques */}
      {hoopDefs.map((_, h) => (
        <instancedMesh key={h} ref={hoopRefs[h]} args={[hoopGeom, undefined, layout.length]}>
          <meshStandardMaterial color="#3a2f28" roughness={0.5} metalness={0.7} />
        </instancedMesh>
      ))}
    </group>
  )
}
