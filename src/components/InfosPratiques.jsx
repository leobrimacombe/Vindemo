import { useLang } from '../i18n/LanguageContext.jsx'
import { domaine } from '../data/domaine.js'
import { useReveal } from '../hooks/useReveal.js'

/**
 * InfosPratiques — petite grille « bon à savoir » pour la page œnotourisme.
 */
export default function InfosPratiques() {
  const { t } = useLang()
  const { infosPratiques } = domaine
  const { ref, visible } = useReveal()

  return (
    <section className="bg-cream-50 py-20 sm:py-24 scroll-mt-20">
      <div className="section-shell">
        <h2 className="font-serif text-3xl text-ink sm:text-4xl">{t(infosPratiques.titre)}</h2>
        <div className="rule mt-6" />

        <dl
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4`}
        >
          {infosPratiques.items.map((item, i) => (
            <div key={i} className="border-t border-ink/10 pt-5">
              <dt className="font-sans text-xs uppercase tracking-widest text-copper">
                {t(item.titre)}
              </dt>
              <dd className="mt-2 text-[0.95rem] font-light leading-relaxed text-ink/75">
                {t(item.texte)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
