import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { domaine } from '../data/domaine.js'

/**
 * CalEmbed — widget de réservation Cal.com.
 *
 * ⚠️  Pour brancher le vrai calendrier : remplacez `oenotourisme.calLink`
 *     dans src/data/domaine.js par l'identifiant Cal.com du domaine
 *     (ex. "domaine-vogel-stein/degustation").
 *
 * L'iframe n'est chargée qu'au clic, pour ne pas ralentir la page ni poser
 * un cookie tiers avant consentement de l'utilisateur.
 */
export default function CalEmbed() {
  const { t, lang } = useLang()
  const { oenotourisme } = domaine
  const [loaded, setLoaded] = useState(false)

  const calUrl = `https://cal.com/${oenotourisme.calLink}?embed=true&theme=light&layout=month_view`

  return (
    <div className="relative w-full overflow-hidden rounded-[3px] border border-ink/10 bg-cream-50">
      {loaded ? (
        <iframe
          title={t(oenotourisme.reserverTitre)}
          src={`${calUrl}&locale=${lang}`}
          loading="lazy"
          className="h-[640px] w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="flex min-h-[320px] w-full flex-col items-center justify-center gap-5 px-6 py-16 text-center transition-colors hover:bg-cream-100"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-copper/40 text-copper">
            {/* icône calendrier minimaliste */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <rect x="3" y="4.5" width="18" height="16" rx="2" />
              <path d="M3 9h18M8 2.5v4M16 2.5v4" strokeLinecap="round" />
            </svg>
          </span>
          <span className="max-w-sm">
            <span className="block font-serif text-2xl text-ink">{t(oenotourisme.reserverTitre)}</span>
            <span className="mt-2 block text-sm font-light text-ink/60">
              {t(oenotourisme.reserverIntro)}
            </span>
          </span>
          <span className="btn-primary">{t(oenotourisme.calLabel)}</span>
        </button>
      )}
    </div>
  )
}
