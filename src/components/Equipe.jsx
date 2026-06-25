import { useLang } from '../i18n/LanguageContext.jsx'
import { domaine } from '../data/domaine.js'
import { useReveal } from '../hooks/useReveal.js'
import { onImgError } from '../utils/imageFallback.js'
import SectionHeading from './SectionHeading.jsx'

/** Carte d'un membre de la famille / de l'équipe. */
function MembreCard({ membre, index }) {
  const { t } = useLang()
  const { ref, visible } = useReveal()
  return (
    <figure
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 110}ms` : '0ms' }}
      className={`reveal ${visible ? 'is-visible' : ''} group`}
    >
      <div className="overflow-hidden rounded-[3px]">
        <img
          src={membre.photo}
          alt={`${membre.nom} — ${t(membre.role)}`}
          loading="lazy"
          onError={onImgError('/placeholder.svg')}
          className="aspect-[4/5] w-full object-cover transition-transform duration-[1.1s] ease-smooth group-hover:scale-105"
        />
      </div>
      <figcaption className="mt-5">
        <p className="font-serif text-xl text-ink">{membre.nom}</p>
        <p className="mt-1 font-sans text-xs uppercase tracking-widest text-copper">
          {t(membre.role)}
        </p>
        <p className="mt-3 text-[0.95rem] font-light leading-relaxed text-ink/70">{t(membre.bio)}</p>
      </figcaption>
    </figure>
  )
}

/**
 * Equipe — les visages du domaine.
 */
export default function Equipe() {
  const { equipe } = domaine

  return (
    <section className="bg-cream-100 py-24 sm:py-32 lg:py-36 scroll-mt-20">
      <div className="section-shell">
        <SectionHeading eyebrow={equipe.eyebrow} title={equipe.titre} />

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {equipe.membres.map((m, i) => (
            <MembreCard key={m.nom} membre={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
