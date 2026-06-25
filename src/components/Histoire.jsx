import { useLang } from '../i18n/LanguageContext.jsx'
import { domaine } from '../data/domaine.js'
import { useReveal } from '../hooks/useReveal.js'
import { onImgError } from '../utils/imageFallback.js'
import SectionHeading from './SectionHeading.jsx'

/**
 * Histoire — récit du domaine sur plusieurs générations + portrait de la
 * vigneronne et chiffres-clés. Ton chaleureux, mise en page éditoriale.
 */
export default function Histoire() {
  const { t } = useLang()
  const { histoire } = domaine
  const text = useReveal()
  const photo = useReveal()

  return (
    <section id="histoire" className="bg-cream-100 py-24 sm:py-32 lg:py-40 scroll-mt-20">
      <div className="section-shell">
        <SectionHeading eyebrow={histoire.eyebrow} title={histoire.titre} />

        <div className="mt-16 grid items-start gap-12 lg:mt-20 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          {/* Récit */}
          <div
            ref={text.ref}
            className={`reveal ${text.visible ? 'is-visible' : ''} space-y-6`}
          >
            {t(histoire.recit).map((para, i) => (
              <p
                key={i}
                className={`max-w-prose leading-relaxed text-ink/80 ${
                  i === 0 ? 'text-xl font-light first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:font-medium first-letter:leading-[0.8] first-letter:text-bordeaux' : 'text-lg font-light'
                }`}
              >
                {para}
              </p>
            ))}

            {/* Signature */}
            <div className="flex items-center gap-4 pt-4">
              <span className="rule" />
              <div>
                <p className="font-serif text-2xl text-bordeaux">{histoire.signature}</p>
                <p className="font-sans text-xs uppercase tracking-widest text-ink/50">
                  {t(histoire.signatureRole)}
                </p>
              </div>
            </div>
          </div>

          {/* Portrait */}
          <figure
            ref={photo.ref}
            className={`reveal ${photo.visible ? 'is-visible' : ''} relative`}
          >
            <div className="overflow-hidden rounded-[2px] shadow-2xl shadow-ink/20">
              <img
                src={histoire.portrait}
                alt={t(histoire.portraitAlt)}
                loading="lazy"
                onError={onImgError('/placeholder.svg')}
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] ease-smooth hover:scale-[1.04]"
              />
            </div>
            {/* Cadre décoratif cuivre décalé */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-[2px] border border-copper/40" />
          </figure>
        </div>

        {/* Chiffres-clés */}
        <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-ink/10 pt-12 sm:grid-cols-4 lg:mt-28">
          {histoire.chiffres.map((c) => (
            <div key={c.valeur} className="text-center sm:text-left">
              <dt className="font-serif text-4xl text-bordeaux sm:text-5xl">{c.valeur}</dt>
              <dd className="mt-2 font-sans text-xs uppercase tracking-widest text-ink/50">
                {t(c.label)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
