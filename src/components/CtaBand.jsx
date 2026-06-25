import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { domaine } from '../data/domaine.js'
import { useReveal } from '../hooks/useReveal.js'

/**
 * CtaBand — bandeau d'appel à l'action sur fond bordeaux, posé avant le footer
 * sur la page d'accueil.
 */
export default function CtaBand() {
  const { t } = useLang()
  const { ctaBand } = domaine.home
  const { ref, visible } = useReveal()

  return (
    <section className="bg-bordeaux">
      <div
        ref={ref}
        className={`reveal ${visible ? 'is-visible' : ''} section-shell flex flex-col items-center gap-8 py-20 text-center sm:py-28`}
      >
        <h2 className="max-w-2xl text-balance font-serif text-4xl leading-tight text-cream-50 sm:text-5xl">
          {t(ctaBand.titre)}
        </h2>
        <p className="max-w-xl text-lg font-light leading-relaxed text-cream-100/80">
          {t(ctaBand.texte)}
        </p>
        <Link
          to="/oenotourisme"
          className="inline-flex items-center justify-center rounded-full bg-cream-50 px-8 py-4 font-sans text-sm font-medium tracking-wide text-bordeaux transition-all duration-500 ease-smooth hover:bg-copper-light hover:text-ink"
        >
          {t(ctaBand.cta)}
        </Link>
      </div>
    </section>
  )
}
