import { Suspense, lazy } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { domaine } from '../data/domaine.js'
import { useReveal } from '../hooks/useReveal.js'
import SectionHeading from './SectionHeading.jsx'

// Tout le moteur 3D (Canvas + three.js) est chargé en lazy : le bundle initial
// reste léger, la scène ne se télécharge qu'à l'approche de la section.
const CellarCanvas = lazy(() => import('./cellar/CellarCanvas.jsx'))

/**
 * Chai3D — section immersive : visite du chai en 3D.
 * Le <Canvas> n'est monté que lorsque la section approche du viewport, pour
 * ne pas pénaliser le chargement initial de la page.
 */
export default function Chai3D() {
  const { t } = useLang()
  const { chai } = domaine
  const { ref, visible } = useReveal({ threshold: 0.05, rootMargin: '0px 0px 10% 0px' })

  return (
    <section
      id="chai"
      ref={ref}
      className="relative bg-[#160d09] py-24 text-cream-50 sm:py-32 lg:py-40 scroll-mt-20"
    >
      <div className="section-shell">
        <SectionHeading
          eyebrow={chai.eyebrow}
          title={chai.titre}
          intro={chai.intro}
          align="center"
          tone="light"
        />
      </div>

      {/* Vitre 3D */}
      <div className="section-shell mt-12 lg:mt-16">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3px] border border-copper/20 bg-[#0d0805] shadow-2xl shadow-black/50 sm:aspect-video">
          {visible ? (
            <Suspense fallback={<SceneLoader label={t(chai.titre)} />}>
              <CellarCanvas />
            </Suspense>
          ) : (
            <SceneLoader label={t(chai.titre)} />
          )}

          {/* Indice de contrôles, en surimpression */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-4 py-2 backdrop-blur-sm">
            <p className="font-sans text-[0.7rem] uppercase tracking-widest text-cream-100/80">
              {t(chai.controlsHint)}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Écran d'attente pendant le chargement de la scène
function SceneLoader({ label }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#160d09]">
      <span className="h-8 w-8 animate-spin rounded-full border border-copper/30 border-t-copper" />
      <p className="font-serif text-lg italic text-copper-light/70">{label}…</p>
    </div>
  )
}
