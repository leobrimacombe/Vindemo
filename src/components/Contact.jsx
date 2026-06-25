import { Suspense, lazy } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { domaine } from '../data/domaine.js'
import { useReveal } from '../hooks/useReveal.js'
import SectionHeading from './SectionHeading.jsx'

// La carte (et leaflet) ne sont chargées qu'à l'approche de la section.
const ContactMap = lazy(() => import('./ContactMap.jsx'))

export default function Contact() {
  const { t } = useLang()
  const { contact } = domaine
  const map = useReveal({ threshold: 0.05 })

  const telHref = `tel:${contact.telephone.replace(/\s/g, '')}`

  return (
    <section id="contact" className="bg-cream-50 py-24 sm:py-32 lg:py-40 scroll-mt-20">
      <div className="section-shell">
        <SectionHeading eyebrow={contact.eyebrow} title={contact.titre} intro={contact.intro} />

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          {/* Coordonnées + horaires */}
          <div className="space-y-10">
            {/* Adresse & contact direct */}
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-sans text-xs uppercase tracking-widest text-copper">
                  {t({ fr: 'Adresse', de: 'Adresse', en: 'Address' })}
                </h3>
                <address className="mt-3 not-italic leading-relaxed text-ink/80">
                  {contact.adresse.ligne1}
                  <br />
                  {contact.adresse.ligne2}
                  <br />
                  {t(contact.adresse.pays)}
                </address>
              </div>

              <div>
                <h3 className="font-sans text-xs uppercase tracking-widest text-copper">
                  {t({ fr: 'Nous joindre', de: 'Kontakt', en: 'Get in touch' })}
                </h3>
                <div className="mt-3 space-y-1.5">
                  <a href={telHref} className="block text-ink/80 transition-colors hover:text-bordeaux">
                    {contact.telephone}
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="block break-all text-ink/80 transition-colors hover:text-bordeaux"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Horaires */}
            <div>
              <h3 className="font-sans text-xs uppercase tracking-widest text-copper">
                {t(contact.horaires.titre)}
              </h3>
              <dl className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                {contact.horaires.jours.map((j, i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <dt className="text-ink/80">{t(j.jour)}</dt>
                    <dd className={`font-medium ${j.ferme ? 'text-ink/40' : 'text-ink'}`}>
                      {t(j.heures)}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm font-light italic text-ink/55">{t(contact.horaires.note)}</p>
            </div>
          </div>

          {/* Carte */}
          <div
            ref={map.ref}
            className="relative min-h-[360px] overflow-hidden rounded-[3px] border border-ink/10 shadow-xl shadow-ink/5 lg:min-h-full"
          >
            {map.visible ? (
              <Suspense
                fallback={<div className="absolute inset-0 animate-pulse bg-stone-warm" />}
              >
                <ContactMap />
              </Suspense>
            ) : (
              <div className="absolute inset-0 bg-stone-warm" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
