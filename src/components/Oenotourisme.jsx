import { useLang } from '../i18n/LanguageContext.jsx'
import { domaine } from '../data/domaine.js'
import { useReveal } from '../hooks/useReveal.js'
import SectionHeading from './SectionHeading.jsx'
import CalEmbed from './CalEmbed.jsx'

/**
 * Carte d'une formule de dégustation.
 */
function FormuleCard({ formule, index }) {
  const { t } = useLang()
  const { ref, visible } = useReveal()
  const featured = formule.featured

  return (
    <article
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 100}ms` : '0ms' }}
      className={`reveal ${visible ? 'is-visible' : ''} relative flex flex-col rounded-[3px] p-8 transition-transform duration-500 ${
        featured
          ? 'bg-bordeaux text-cream-50 lg:-translate-y-3 lg:scale-[1.02]'
          : 'border border-ink/10 bg-cream-50 text-ink'
      }`}
    >
      {featured && (
        <span className="absolute right-6 top-6 rounded-full bg-copper px-3 py-1 font-sans text-[0.65rem] uppercase tracking-widest text-cream-50">
          ★
        </span>
      )}

      <header>
        <h3 className={`font-serif text-2xl ${featured ? 'text-cream-50' : 'text-ink'}`}>
          {t(formule.nom)}
        </h3>
        <p className={`mt-1 font-sans text-xs uppercase tracking-widest ${featured ? 'text-copper-light' : 'text-copper'}`}>
          {t(formule.duree)}
        </p>
      </header>

      <p className={`mt-5 text-[0.95rem] font-light leading-relaxed ${featured ? 'text-cream-100/85' : 'text-ink/70'}`}>
        {t(formule.description)}
      </p>

      <ul className="mt-6 space-y-2.5">
        {t(formule.inclus).map((item, i) => (
          <li
            key={i}
            className={`flex items-start gap-2.5 text-sm font-light ${featured ? 'text-cream-100/90' : 'text-ink/75'}`}
          >
            <span className={`mt-1.5 h-1 w-1 flex-shrink-0 rounded-full ${featured ? 'bg-copper-light' : 'bg-copper'}`} />
            {item}
          </li>
        ))}
      </ul>

      <div className={`mt-8 flex items-baseline gap-2 border-t pt-6 ${featured ? 'border-cream-50/15' : 'border-ink/10'}`}>
        <span className={`font-serif text-3xl ${featured ? 'text-cream-50' : 'text-bordeaux'}`}>
          {formule.prix}
        </span>
        <span className={`font-sans text-xs ${featured ? 'text-cream-100/60' : 'text-ink/50'}`}>
          / pers.
        </span>
      </div>
    </article>
  )
}

/**
 * Œnotourisme — formules de dégustation + réservation Cal.com.
 */
export default function Oenotourisme() {
  const { oenotourisme } = domaine

  return (
    <section id="reserver" className="bg-cream-100 py-24 sm:py-32 lg:py-40 scroll-mt-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow={oenotourisme.eyebrow}
          title={oenotourisme.titre}
          intro={oenotourisme.intro}
        />

        {/* Formules */}
        <div className="mt-16 grid items-stretch gap-6 lg:mt-20 lg:grid-cols-3">
          {oenotourisme.formules.map((f, i) => (
            <FormuleCard key={i} formule={f} index={i} />
          ))}
        </div>

        {/* Réservation */}
        <div className="mt-20 lg:mt-28">
          <CalEmbed />
        </div>
      </div>
    </section>
  )
}
