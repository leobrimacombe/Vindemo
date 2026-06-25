import { useLang } from '../i18n/LanguageContext.jsx'
import { domaine } from '../data/domaine.js'
import { useReveal } from '../hooks/useReveal.js'
import SectionHeading from './SectionHeading.jsx'

/** Un sol / un principe de culture. */
function TerroirPoint({ point, index }) {
  const { t } = useLang()
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 100}ms` : '0ms' }}
      className={`reveal ${visible ? 'is-visible' : ''} bg-cream-50 p-8`}
    >
      <span className="font-serif text-3xl text-copper">0{index + 1}</span>
      <h3 className="mt-4 font-serif text-xl text-ink">{t(point.titre)}</h3>
      <p className="mt-3 text-[0.95rem] font-light leading-relaxed text-ink/70">{t(point.texte)}</p>
    </div>
  )
}

/**
 * Terroir — présentation des sols et de la philosophie de culture du domaine.
 */
export default function Terroir() {
  const { terroir } = domaine

  return (
    <section className="bg-cream-50 py-24 sm:py-32 lg:py-36 scroll-mt-20">
      <div className="section-shell">
        <SectionHeading eyebrow={terroir.eyebrow} title={terroir.titre} intro={terroir.intro} />

        <div className="mt-16 grid gap-px overflow-hidden rounded-[3px] bg-ink/10 sm:grid-cols-3 lg:mt-20">
          {terroir.points.map((p, i) => (
            <TerroirPoint key={i} point={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
