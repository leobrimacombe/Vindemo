import { useLang } from '../i18n/LanguageContext.jsx'
import { domaine } from '../data/domaine.js'
import { useReveal } from '../hooks/useReveal.js'
import SectionHeading from './SectionHeading.jsx'

/**
 * Carte cuvée — pastille de couleur du cépage, nom, notes de dégustation,
 * millésime. Mise en page sobre, sans ombre lourde.
 */
function CuveeCard({ cuvee, index }) {
  const { t } = useLang()
  const { ref, visible } = useReveal()

  return (
    <article
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 90}ms` : '0ms' }}
      className={`reveal ${visible ? 'is-visible' : ''} group relative flex flex-col border-t border-ink/15 pt-8 transition-colors duration-500 hover:border-copper`}
    >
      {/* En-tête : cépage + pastille couleur */}
      <div className="flex items-center justify-between">
        <span className="font-sans text-xs font-medium uppercase tracking-widest text-copper">
          {cuvee.cepage}
        </span>
        <span
          aria-hidden="true"
          className="h-3 w-3 rounded-full ring-1 ring-inset ring-ink/10 transition-transform duration-500 group-hover:scale-125"
          style={{ backgroundColor: cuvee.couleur }}
        />
      </div>

      <h3 className="mt-4 font-serif text-2xl leading-snug text-ink sm:text-[1.65rem]">
        {cuvee.nom}
      </h3>

      <p className="mt-4 flex-1 text-[0.975rem] font-light leading-relaxed text-ink/70">
        {t(cuvee.notes)}
      </p>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="font-serif text-lg italic text-bordeaux">{cuvee.millesime}</span>
        <span className="h-px flex-1 bg-ink/10" />
      </div>
    </article>
  )
}

/**
 * Cuvées — grille de cartes par cépage alsacien.
 */
export default function Cuvees() {
  const { t } = useLang()
  const { cuvees } = domaine

  return (
    <section id="cuvees" className="bg-cream-50 py-24 sm:py-32 lg:py-40 scroll-mt-20">
      <div className="section-shell">
        <SectionHeading eyebrow={cuvees.eyebrow} title={cuvees.titre} intro={cuvees.intro} />

        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {cuvees.liste.map((cuvee, i) => (
            <CuveeCard key={cuvee.nom} cuvee={cuvee} index={i} />
          ))}
        </div>

        {cuvees.cartePdf && (
          <div className="mt-16 text-center">
            <a
              href={cuvees.cartePdf}
              className="group inline-flex items-center gap-2 font-sans text-sm font-medium tracking-wide text-bordeaux"
            >
              {t(cuvees.carteLabel)}
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
