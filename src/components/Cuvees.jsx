import { Link } from 'react-router-dom'
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
        {cuvee.slug ? (
          <Link
            to={`/nos-cuvees/${cuvee.slug}`}
            className="transition-colors duration-300 hover:text-bordeaux focus-visible:text-bordeaux"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            {cuvee.nom}
          </Link>
        ) : (
          cuvee.nom
        )}
      </h3>

      <p className="mt-4 text-[0.975rem] font-light leading-relaxed text-ink/70">
        {t(cuvee.notes)}
      </p>

      {/* Accord mets-vins (si renseigné dans les données) */}
      {cuvee.accord && (
        <p className="mt-4 flex-1 text-sm font-light leading-relaxed text-ink/55">
          <span className="font-medium uppercase tracking-wider text-copper">
            {t({ fr: 'À table', de: 'Zu Tisch', en: 'At the table' })} ·{' '}
          </span>
          {t(cuvee.accord)}
        </p>
      )}

      <div className="mt-6 flex items-baseline gap-3">
        <span className="font-serif text-lg italic text-bordeaux">{cuvee.millesime}</span>
        <span className="h-px flex-1 bg-ink/10" />
        {cuvee.service && (
          <span className="font-sans text-xs tracking-wide text-ink/45">{cuvee.service}</span>
        )}
      </div>

      {cuvee.slug && (
        <span className="mt-5 inline-flex items-center gap-2 font-sans text-sm font-medium tracking-wide text-bordeaux">
          {t(domaine.cuvees.fiche.voir)}
          <span
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </span>
      )}
    </article>
  )
}

/**
 * Cuvées — grille de cartes par cépage alsacien.
 *
 * `showHeading` : affiche le sur-titre + titre de section. À désactiver quand
 * la section est posée sous une bannière de page qui porte déjà le titre
 * (évite la répétition « Nos cuvées » deux fois).
 */
export default function Cuvees({ showHeading = true }) {
  const { t } = useLang()
  const { cuvees } = domaine

  return (
    <section id="cuvees" className="bg-cream-50 py-20 sm:py-28 lg:py-32 scroll-mt-20">
      <div className="section-shell">
        {showHeading ? (
          <SectionHeading eyebrow={cuvees.eyebrow} title={cuvees.titre} intro={cuvees.intro} />
        ) : (
          <p className="max-w-prose text-lg font-light leading-relaxed text-ink/70">
            {t(cuvees.intro)}
          </p>
        )}

        <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
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
