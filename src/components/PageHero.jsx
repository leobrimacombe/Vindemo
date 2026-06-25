import { useLang } from '../i18n/LanguageContext.jsx'

/**
 * PageHero — bannière d'en-tête des pages internes : image sombre plein
 * largeur, sur-titre, titre et sous-titre. Assez haute pour que le header
 * transparent reste lisible par-dessus.
 */
export default function PageHero({ eyebrow, title, subtitle, image, imageAlt }) {
  const { t } = useLang()

  return (
    <header className="relative flex min-h-[52vh] items-end overflow-hidden sm:min-h-[60vh]">
      <div className="absolute inset-0">
        <img
          src={image}
          alt={t(imageAlt)}
          className="h-full w-full animate-slow-zoom object-cover"
          loading="eager"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/45 to-ink/55" />
      </div>

      <div className="section-shell relative z-10 pb-14 pt-32">
        {eyebrow && (
          <p className="eyebrow mb-4 animate-fade-in text-copper-light opacity-0 [animation-delay:150ms]">
            {t(eyebrow)}
          </p>
        )}
        <h1 className="max-w-4xl animate-fade-up text-balance font-serif text-[clamp(2.6rem,7vw,5rem)] font-medium leading-[0.98] text-cream-50 opacity-0 [animation-delay:250ms]">
          {t(title)}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-xl animate-fade-up text-lg font-light italic leading-relaxed text-cream-100/85 opacity-0 [animation-delay:400ms]">
            {t(subtitle)}
          </p>
        )}
      </div>
    </header>
  )
}
