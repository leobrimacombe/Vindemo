import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { domaine } from '../data/domaine.js'
import { useReveal } from '../hooks/useReveal.js'

/**
 * HomeUnivers — section d'accueil : courte intro + trois cartes "univers"
 * qui mènent vers les pages dédiées (domaine, cuvées, œnotourisme).
 */
function UniversCard({ item, index }) {
  const { t } = useLang()
  const { ref, visible } = useReveal()

  return (
    <Link
      to={item.to}
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 110}ms` : '0ms' }}
      className={`reveal ${visible ? 'is-visible' : ''} group flex flex-col overflow-hidden rounded-[3px] bg-cream-50 ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-xl hover:shadow-ink/10`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={t(item.imageAlt)}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.1s] ease-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-60" />
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-serif text-2xl text-ink">{t(item.titre)}</h3>
        <p className="mt-3 flex-1 text-[0.95rem] font-light leading-relaxed text-ink/70">
          {t(item.texte)}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 font-sans text-sm font-medium tracking-wide text-bordeaux">
          {t(item.cta)}
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </Link>
  )
}

export default function HomeUnivers() {
  const { t } = useLang()
  const { home } = domaine
  const intro = useReveal()

  return (
    <section id="decouvrir" className="bg-cream-100 py-24 sm:py-32 lg:py-40 scroll-mt-20">
      <div className="section-shell">
        <div ref={intro.ref} className={`reveal ${intro.visible ? 'is-visible' : ''} max-w-2xl`}>
          <p className="eyebrow mb-4">{t(home.introEyebrow)}</p>
          <h2 className="text-balance text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-[3.4rem]">
            {t(home.introTitre)}
          </h2>
          <div className="rule mt-6" />
          <p className="mt-6 max-w-prose text-lg font-light leading-relaxed text-ink/70">
            {t(home.introTexte)}
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {home.univers.map((item, i) => (
            <UniversCard key={item.to} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
