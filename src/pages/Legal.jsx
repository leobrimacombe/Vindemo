import { domaine } from '../data/domaine.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import Seo from '../components/Seo.jsx'

/**
 * Legal — vue générique pour les pages légales (mentions légales,
 * confidentialité), pilotée par la route. Contenu dans domaine.legal[route].
 *
 * Démarre par un bandeau sombre pour que le header transparent reste lisible.
 */
export default function Legal({ route }) {
  const { t } = useLang()
  const page = domaine.legal[route]
  if (!page) return null

  return (
    <>
      <Seo title={page.titre} description={page.titre} />

      {/* Bandeau d'en-tête sombre */}
      <div className="bg-bordeaux-deep pb-14 pt-36 text-cream-50">
        <div className="section-shell">
          <h1 className="font-serif text-4xl sm:text-5xl">{t(page.titre)}</h1>
          <p className="mt-3 font-sans text-xs uppercase tracking-widest text-copper-light/80">
            {t(page.maj)}
          </p>
        </div>
      </div>

      {/* Corps */}
      <div className="bg-cream-50 py-16 sm:py-24">
        <article className="section-shell max-w-3xl space-y-12">
          {page.blocs.map((bloc, i) => (
            <section key={i}>
              <h2 className="font-serif text-2xl text-bordeaux">{t(bloc.titre)}</h2>
              <div className="mt-4 space-y-3">
                {t(bloc.corps).map((para, j) => (
                  <p key={j} className="font-light leading-relaxed text-ink/80">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>
      </div>
    </>
  )
}
