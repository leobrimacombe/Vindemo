import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LanguageContext.jsx'
import { domaine } from '../../data/domaine.js'
import { useCart } from '../../cart/CartContext.jsx'
import { formatPrice } from '../../lib/shopify.js'

const FOCUSABLE = 'button:not([disabled]), [href], input, [tabindex]:not([tabindex="-1"])'

/**
 * CartDrawer — mini-panier en panneau latéral droit.
 *
 * Monté une seule fois dans le Layout (recouvre toutes les pages). Accessible :
 * role="dialog" + aria-modal, fermeture Échap / clic backdrop, focus déplacé
 * et piégé dans le panneau quand il est ouvert, scroll du body bloqué, et
 * `inert` quand fermé (le contenu hors-écran sort de l'ordre de tabulation).
 */
export default function CartDrawer() {
  const { t, lang } = useLang()
  const ui = domaine.boutique.ui
  const { lines, subtotal, currency, drawerOpen, close, removeItem, setQty, checkout, checkoutStatus, count } = useCart()

  const wrapRef = useRef(null)
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)
  const lastFocused = useRef(null)

  // Scroll du body bloqué + `inert` hors-écran (même esprit que le menu mobile)
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    if (wrapRef.current) wrapRef.current.inert = !drawerOpen
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  // Focus : à l'ouverture on mémorise l'élément actif et on entre dans le panneau ;
  // à la fermeture on rend le focus à l'élément d'origine (ex. l'icône panier).
  useEffect(() => {
    if (drawerOpen) {
      lastFocused.current = document.activeElement
      // microtâche : le panneau vient de devenir focusable
      requestAnimationFrame(() => closeBtnRef.current?.focus())
    } else if (lastFocused.current instanceof HTMLElement) {
      lastFocused.current.focus()
    }
  }, [drawerOpen])

  // Échap pour fermer + piège à focus (Tab cyclique dans le panneau)
  function onKeyDown(e) {
    if (e.key === 'Escape') {
      close()
      return
    }
    if (e.key !== 'Tab') return
    const nodes = panelRef.current?.querySelectorAll(FOCUSABLE)
    if (!nodes || nodes.length === 0) return
    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    // Conteneur plein écran qui CLIPPE le panneau hors-champ (translate-x-full) :
    // évite toute scrollbar horizontale parasite quand le panier est fermé.
    <div
      ref={wrapRef}
      aria-hidden={!drawerOpen}
      className={`fixed inset-0 z-[60] overflow-hidden ${drawerOpen ? '' : 'pointer-events-none'}`}
    >
      {/* Voile */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-ink/50 backdrop-blur-[2px] transition-opacity duration-500 ease-smooth ${
          drawerOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panneau */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t(ui.panier)}
        onKeyDown={onKeyDown}
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream-50 shadow-2xl transition-transform duration-500 ease-smooth ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="font-serif text-2xl text-ink">
            {t(ui.panier)}
            {count > 0 && <span className="ml-2 text-base text-ink/40">({count})</span>}
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            aria-label={t(ui.fermer)}
            className="-mr-2 flex h-9 w-9 items-center justify-center rounded-full text-ink/60 transition-colors hover:text-bordeaux"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Corps */}
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="font-light text-ink/60">{t(ui.panierVide)}</p>
            <Link to="/boutique" onClick={close} className="btn-primary">
              {t(ui.continuer)}
            </Link>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
            {lines.map((line) => (
              <li key={line.key} className="flex gap-4 py-5">
                {line.image?.url && (
                  <img
                    src={line.image.url}
                    alt={t(line.image.alt)}
                    loading="lazy"
                    className="h-20 w-16 flex-shrink-0 bg-stone-warm/40 object-cover"
                  />
                )}

                <div className="flex flex-1 flex-col">
                  <p className="font-serif text-lg leading-snug text-ink">{t(line.title)}</p>
                  <p className="mt-0.5 font-sans text-sm text-bordeaux">
                    {formatPrice(line.price?.amount, line.price?.currency, lang)}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    {/* Sélecteur de quantité */}
                    <div className="inline-flex items-center rounded-full border border-ink/15" role="group" aria-label={t(ui.quantite)}>
                      <button
                        type="button"
                        onClick={() => setQty(line.key, line.quantity - 1)}
                        aria-label={t({ fr: 'Diminuer la quantité', de: 'Menge verringern', en: 'Decrease quantity' })}
                        className="flex h-8 w-8 items-center justify-center text-ink/60 transition-colors hover:text-bordeaux"
                      >
                        −
                      </button>
                      <span className="min-w-[1.5rem] text-center font-sans text-sm tabular-nums text-ink">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(line.key, line.quantity + 1)}
                        aria-label={t({ fr: 'Augmenter la quantité', de: 'Menge erhöhen', en: 'Increase quantity' })}
                        className="flex h-8 w-8 items-center justify-center text-ink/60 transition-colors hover:text-bordeaux"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(line.key)}
                      className="font-sans text-xs uppercase tracking-wider text-ink/40 transition-colors hover:text-bordeaux"
                    >
                      {t(ui.retirer)}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Pied : total + checkout */}
        {lines.length > 0 && (
          <div className="border-t border-ink/10 px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="font-sans text-sm uppercase tracking-widest text-ink/60">{t(ui.sousTotal)}</span>
              <span className="font-serif text-2xl text-ink">{formatPrice(subtotal, currency, lang)}</span>
            </div>
            <p className="mt-1 font-sans text-xs text-ink/45">{t(ui.taxesNote)}</p>

            {/* Messages de checkout */}
            {checkoutStatus === 'demo' && (
              <p className="mt-4 rounded-lg border border-copper/30 bg-copper/5 px-4 py-3 font-sans text-sm leading-relaxed text-copper">
                {t(ui.demoCheckout)}
              </p>
            )}
            {checkoutStatus === 'error' && (
              <p className="mt-4 rounded-lg border border-bordeaux/30 bg-bordeaux/5 px-4 py-3 font-sans text-sm leading-relaxed text-bordeaux">
                {t(ui.checkoutErreur)}
              </p>
            )}

            <button
              type="button"
              onClick={checkout}
              disabled={checkoutStatus === 'loading'}
              className="btn-primary mt-4 w-full disabled:cursor-wait disabled:opacity-70"
            >
              {t(checkoutStatus === 'loading' ? ui.redirection : ui.commander)}
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
