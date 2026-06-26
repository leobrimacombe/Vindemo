import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { domaine } from '../data/domaine.js'

/**
 * AgeGate — modal de vérification d'âge affiché à la première visite.
 *
 * Demande simplement si le visiteur a l'âge légal (18 ans). Le « oui » est
 * mémorisé en localStorage pour ne plus réapparaître ; le « non » affiche un
 * message de refus (non mémorisé → la question revient au rechargement).
 *
 * Volontairement simple : pas une barrière légale infranchissable, juste la
 * confirmation d'usage des sites de vins. Accessible (role="dialog", focus,
 * scroll du body bloqué) et multilingue via t().
 */
const STORAGE_KEY = 'domaine.ageok'

export default function AgeGate() {
  const { t } = useLang()
  const g = domaine.ageGate

  // 'ok' (déjà confirmé) → rien ; 'asking' → question ; 'declined' → refus.
  const [status, setStatus] = useState(() => {
    if (typeof window === 'undefined') return 'asking'
    return window.localStorage.getItem(STORAGE_KEY) === 'true' ? 'ok' : 'asking'
  })

  const confirmRef = useRef(null)

  const visible = status !== 'ok'

  // Bloque le scroll du body tant que le modal est visible (comme le menu/panier)
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  // Place le focus sur le bouton principal à l'apparition de la question
  useEffect(() => {
    if (status === 'asking') confirmRef.current?.focus()
  }, [status])

  if (!visible) return null

  function accept() {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // localStorage indisponible (mode privé strict) → on laisse passer quand même.
    }
    setStatus('ok')
  }

  const declined = status === 'declined'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-titre"
      className="fixed inset-0 z-[120] flex items-center justify-center bg-bordeaux-deep/95 px-6 backdrop-blur-sm"
    >
      <div className="w-full max-w-lg text-center text-cream-50">
        {declined ? (
          <>
            <h2 id="age-gate-titre" className="font-serif text-3xl sm:text-4xl">
              {t(g.refusTitre)}
            </h2>
            <div className="rule mx-auto mt-6 bg-copper-light/70" />
            <p className="mt-6 text-lg font-light leading-relaxed text-cream-100/85">
              {t(g.refusTexte)}
            </p>
            <button
              type="button"
              onClick={() => setStatus('asking')}
              className="mt-10 inline-flex items-center justify-center rounded-full border border-cream-50/40 px-8 py-4 font-sans text-sm font-medium tracking-wide text-cream-50 transition-colors duration-500 hover:border-cream-50"
            >
              {t(g.retour)}
            </button>
          </>
        ) : (
          <>
            <p className="eyebrow mb-4 text-copper-light">{t(g.eyebrow)}</p>
            <p className="font-serif text-xl font-medium tracking-wide text-cream-50/90">
              {domaine.nom}
            </p>
            <h2 id="age-gate-titre" className="mt-6 text-balance font-serif text-3xl leading-tight sm:text-4xl">
              {t(g.titre)}
            </h2>
            <div className="rule mx-auto mt-6 bg-copper-light/70" />
            <p className="mt-6 text-lg font-light leading-relaxed text-cream-100/85">
              {t(g.texte)}
            </p>

            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
              <button
                ref={confirmRef}
                type="button"
                onClick={accept}
                className="inline-flex items-center justify-center rounded-full bg-cream-50 px-8 py-4 font-sans text-sm font-medium tracking-wide text-bordeaux transition-colors duration-500 hover:bg-copper-light hover:text-ink"
              >
                {t(g.oui)}
              </button>
              <button
                type="button"
                onClick={() => setStatus('declined')}
                className="inline-flex items-center justify-center rounded-full border border-cream-50/40 px-8 py-4 font-sans text-sm font-medium tracking-wide text-cream-50 transition-colors duration-500 hover:border-cream-50"
              >
                {t(g.non)}
              </button>
            </div>
          </>
        )}

        <p className="mt-12 font-sans text-xs leading-relaxed text-cream-100/55">{t(g.rappel)}</p>
      </div>
    </div>
  )
}
