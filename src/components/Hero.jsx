import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { domaine } from '../data/domaine.js'

/**
 * Hero — plein écran, image vignoble en fond avec léger zoom lent,
 * nom du domaine, tagline et deux CTA.
 */
export default function Hero() {
  const { t } = useLang()
  const { hero, nomLignes, tagline, village, region } = domaine

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <img
          src={hero.image}
          alt={t(hero.imageAlt)}
          className="h-full w-full animate-slow-zoom object-cover"
          loading="eager"
          fetchpriority="high"
        />
        {/* Voiles dégradés pour la lisibilité du texte */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/30 to-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 to-transparent" />
      </div>

      {/* Contenu */}
      <div className="section-shell relative z-10 pb-24 pt-32">
        <p className="eyebrow mb-6 animate-fade-in text-copper-light opacity-0 [animation-delay:200ms]">
          {village} — {t(region)}
        </p>

        <h1 className="max-w-4xl text-balance font-serif text-[clamp(3rem,9vw,7rem)] font-medium leading-[0.95] text-cream-50">
          <span className="block animate-fade-up opacity-0 [animation-delay:300ms]">
            {nomLignes[0]}
          </span>
          <span className="block animate-fade-up text-copper-light opacity-0 [animation-delay:450ms]">
            {nomLignes[1]}
          </span>
        </h1>

        <p className="mt-8 max-w-xl animate-fade-up text-xl font-light italic leading-relaxed text-cream-100/90 opacity-0 [animation-delay:600ms] sm:text-2xl">
          {t(tagline)}
        </p>

        <div className="mt-12 flex animate-fade-up flex-col gap-4 opacity-0 [animation-delay:750ms] sm:flex-row sm:items-center">
          <Link to="/oenotourisme" className="btn-primary">
            {t(hero.ctaPrimary)}
          </Link>
          <Link
            to="/le-domaine"
            className="btn-ghost text-cream-50 hover:!bg-cream-50 hover:!text-ink"
          >
            {t(hero.ctaSecondary)}
          </Link>
        </div>
      </div>

      {/* Indice de scroll vers la suite de la page d'accueil */}
      <a
        href="#decouvrir"
        aria-label={t(hero.scrollHint)}
        className="absolute inset-x-0 bottom-8 z-10 mx-auto flex w-fit flex-col items-center gap-2 text-cream-50/70 transition-colors hover:text-cream-50"
      >
        <span className="text-[0.65rem] uppercase tracking-widest">{t(hero.scrollHint)}</span>
        <span className="h-10 w-px animate-pulse bg-cream-50/50" />
      </a>
    </section>
  )
}
