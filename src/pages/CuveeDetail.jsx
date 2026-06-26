import { Link, useParams } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { domaine, getCuvee } from '../data/domaine.js'
import Seo from '../components/Seo.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { useSolidHeader } from '../components/HeaderContext.jsx'
import NotFound from './NotFound.jsx'

/**
 * Ligne d'une caractéristique « En bref » (libellé + valeur).
 * N'affiche rien si la valeur est absente — la fiche s'adapte aux champs
 * réellement renseignés dans domaine.js.
 */
function SpecRow({ label, children }) {
  if (children == null || children === '') return null
  return (
    <div className="flex flex-col gap-1 border-t border-ink/10 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <dt className="font-sans text-xs font-medium uppercase tracking-widest text-copper">{label}</dt>
      <dd className="font-light text-ink/80 sm:text-right">{children}</dd>
    </div>
  )
}

/**
 * CuveeDetail — page template « fiche produit » d'un vin.
 *
 * Une seule page paramétrée par le slug (route /nos-cuvees/:slug) sert toutes
 * les cuvées : on lit la cuvée dans domaine.js via getCuvee(). Atteinte depuis
 * la grille Nos cuvées ET depuis les cartes de la Boutique (même fiche).
 *
 * Affiche : appellation (AOC/AOP/IGP), cépage(s), millésime, description
 * organoleptique (robe / nez / bouche), accords mets-vins, température de
 * service et médailles & distinctions.
 */
export default function CuveeDetail() {
  const { slug } = useParams()
  const { t } = useLang()
  const cuvee = getCuvee(slug)
  const f = domaine.cuvees.fiche

  // Pas de bannière sombre pleine largeur ici → header opaque dès le départ,
  // sinon le menu (texte clair) serait illisible sur la colonne crème.
  useSolidHeader()

  // Slug inconnu → 404 standard du site (cohérent avec le reste du routage).
  if (!cuvee) return <NotFound />

  const cepages = cuvee.cepages?.length ? cuvee.cepages : [cuvee.cepage].filter(Boolean)
  const appellation = cuvee.appellation
    ? [cuvee.appellation.type, cuvee.appellation.nom].filter(Boolean).join(' ')
    : null

  const seoTitle = {
    fr: `${cuvee.nom} — ${domaine.nom}`,
    de: `${cuvee.nom} — ${domaine.nom}`,
    en: `${cuvee.nom} — ${domaine.nom}`,
  }
  const seoDesc = {
    fr: `${t(f.seoDescPrefix)} : ${cuvee.nom}. ${t(cuvee.notes)}`,
    de: `${t(f.seoDescPrefix)}: ${cuvee.nom}. ${t(cuvee.notes)}`,
    en: `${t(f.seoDescPrefix)}: ${cuvee.nom}. ${t(cuvee.notes)}`,
  }

  return (
    <>
      <Seo title={seoTitle} description={seoDesc} />

      <article className="bg-cream-50">
        {/* En-tête : visuel + identité de la cuvée */}
        <header className="grid lg:grid-cols-2">
          <div className="relative min-h-[42vh] overflow-hidden bg-stone-warm/40 lg:min-h-[78vh]">
            {cuvee.image && (
              <img
                src={cuvee.image}
                alt={t(cuvee.imageAlt)}
                className="h-full w-full animate-slow-zoom object-cover"
                loading="eager"
                fetchpriority="high"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent lg:bg-gradient-to-r" />
          </div>

          <div className="section-shell flex flex-col justify-center py-16 lg:py-24">
            <Link
              to="/nos-cuvees"
              className="group inline-flex items-center gap-2 self-start font-sans text-sm font-medium tracking-wide text-bordeaux"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true">
                ←
              </span>
              {t(f.retour)}
            </Link>

            <div className="mt-8 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-3 w-3 rounded-full ring-1 ring-inset ring-ink/10"
                style={{ backgroundColor: cuvee.couleur }}
              />
              <span className="font-sans text-xs font-medium uppercase tracking-widest text-copper">
                {cepages.join(' · ')}
              </span>
            </div>

            <h1 className="mt-4 text-balance font-serif text-[clamp(2.2rem,5vw,3.4rem)] font-medium leading-[1.02] text-ink">
              {cuvee.nom}
            </h1>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-serif text-xl italic text-bordeaux">{cuvee.millesime}</span>
              {appellation && (
                <>
                  <span className="h-px w-8 bg-ink/15" />
                  <span className="font-sans text-sm text-ink/60">{appellation}</span>
                </>
              )}
            </div>

            <p className="mt-6 max-w-prose text-lg font-light leading-relaxed text-ink/70">
              {t(cuvee.notes)}
            </p>

            <Link to="/boutique" className="btn-primary mt-9 self-start">
              {t(f.commander)}
            </Link>
          </div>
        </header>

        {/* Corps : caractéristiques + dégustation */}
        <div className="section-shell grid gap-x-16 gap-y-16 py-16 lg:grid-cols-[1fr_1.3fr] lg:py-24">
          {/* Colonne « En bref » — caractéristiques techniques */}
          <aside>
            <h2 className="font-serif text-2xl text-ink">{t(f.enBref)}</h2>
            <div className="rule mt-4" />
            <dl className="mt-6">
              <SpecRow label={t(f.appellation)}>{appellation}</SpecRow>
              <SpecRow label={t(f.origine)}>{t(cuvee.origine)}</SpecRow>
              <SpecRow label={t(f.cepages)}>{cepages.join(', ')}</SpecRow>
              <SpecRow label={t(f.millesime)}>{cuvee.millesime}</SpecRow>
              <SpecRow label={t(f.contenance)}>{cuvee.contenance}</SpecRow>
              <SpecRow label={t(f.degre)}>{cuvee.degre}</SpecRow>
              <SpecRow label={t(f.service)}>{cuvee.service}</SpecRow>
              <SpecRow label={t(f.allergenes)}>{t(cuvee.allergenes)}</SpecRow>
              <SpecRow label={t(f.garde)}>{t(cuvee.garde)}</SpecRow>
            </dl>

            {/* Mentions légales obligatoires sur la fiche produit */}
            <p className="mt-6 border-t border-ink/10 pt-4 font-sans text-xs leading-relaxed text-ink/55">
              {t(domaine.mentions.mineurs)} {t(domaine.mentions.sante)}{' '}
              {t(domaine.mentions.moderation)}
            </p>
          </aside>

          {/* Colonne principale — organoleptique + accords + médailles */}
          <div className="flex flex-col gap-14">
            {/* Description organoleptique */}
            {cuvee.degustation && (
              <section>
                <h2 className="font-serif text-2xl text-ink">{t(f.degustation)}</h2>
                <div className="rule mt-4" />
                <dl className="mt-6 space-y-6">
                  {['robe', 'nez', 'bouche'].map((key) =>
                    cuvee.degustation[key] ? (
                      <div key={key}>
                        <dt className="font-sans text-xs font-medium uppercase tracking-widest text-copper">
                          {t(f[key])}
                        </dt>
                        <dd className="mt-1.5 text-[0.975rem] font-light leading-relaxed text-ink/75">
                          {t(cuvee.degustation[key])}
                        </dd>
                      </div>
                    ) : null,
                  )}
                </dl>
              </section>
            )}

            {/* Vinification & élevage (optionnel) */}
            {cuvee.elevage && (
              <section>
                <h2 className="font-serif text-2xl text-ink">{t(f.elevage)}</h2>
                <div className="rule mt-4" />
                <p className="mt-6 text-[0.975rem] font-light leading-relaxed text-ink/75">
                  {t(cuvee.elevage)}
                </p>
              </section>
            )}

            {/* Accords mets-vins */}
            {(cuvee.accords?.length || cuvee.accord) && (
              <section>
                <h2 className="font-serif text-2xl text-ink">{t(f.accords)}</h2>
                <div className="rule mt-4" />
                {cuvee.accords?.length ? (
                  <ul className="mt-6 flex flex-wrap gap-3">
                    {cuvee.accords.map((a, i) => (
                      <li
                        key={i}
                        className="rounded-full border border-copper/30 bg-copper/5 px-4 py-2 text-sm font-light text-ink/80"
                      >
                        {t(a)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-6 text-[0.975rem] font-light leading-relaxed text-ink/75">
                    {t(cuvee.accord)}
                  </p>
                )}
              </section>
            )}

            {/* Médailles & distinctions */}
            {cuvee.medailles?.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl text-ink">{t(f.medailles)}</h2>
                <div className="rule mt-4" />
                <ul className="mt-6 space-y-4">
                  {cuvee.medailles.map((m, i) => (
                    <li key={i} className="flex items-baseline gap-4 border-t border-ink/10 pt-4">
                      <span aria-hidden="true" className="font-serif text-lg text-copper">
                        ✦
                      </span>
                      <span className="flex-1">
                        <span className="font-medium text-ink">{t(m.recompense)}</span>
                        <span className="mt-0.5 block font-sans text-sm text-ink/60">
                          {m.concours}
                          {m.annee ? ` · ${m.annee}` : ''}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </article>

      <CtaBand />
    </>
  )
}
