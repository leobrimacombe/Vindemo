import { useLang } from '../i18n/LanguageContext.jsx'
import { domaine } from '../data/domaine.js'

/**
 * Footer — discret : nom, mention sanitaire obligatoire, liens légaux,
 * réseaux et crédit.
 */
export default function Footer() {
  const { t } = useLang()
  const { footer, reseaux, nom, tagline, village } = domaine
  const year = new Date().getFullYear()

  return (
    <footer className="bg-bordeaux-deep text-cream-100">
      <div className="section-shell py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          {/* Identité */}
          <div>
            <p className="font-serif text-2xl text-cream-50">{nom}</p>
            <p className="mt-2 font-serif text-lg italic text-copper-light">{t(tagline)}</p>
            <p className="mt-1 font-sans text-xs uppercase tracking-widest text-cream-100/50">
              {village} · {t(domaine.region)}
            </p>
          </div>

          {/* Réseaux + ancre haut de page */}
          <div className="flex items-center gap-6">
            {reseaux.map((r) => (
              <a
                key={r.nom}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-cream-100/70 transition-colors hover:text-copper-light"
              >
                {r.nom}
              </a>
            ))}
          </div>
        </div>

        {/* Mention sanitaire — obligatoire en France */}
        <p className="mt-12 border-t border-cream-100/10 pt-8 text-center font-sans text-xs uppercase tracking-widest text-copper-light/80">
          {t(footer.accroche)}
        </p>

        {/* Bas de page */}
        <div className="mt-8 flex flex-col items-center gap-4 text-center text-xs text-cream-100/45 sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {year} {nom}. {t(footer.credit)}
          </p>
          <nav className="flex gap-5" aria-label="Liens légaux">
            {footer.legalLinks.map((l, i) => (
              <a key={i} href={l.url} className="transition-colors hover:text-cream-50">
                {t(l.label)}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
