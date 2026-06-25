import { useLang } from '../../i18n/LanguageContext.jsx'
import { domaine } from '../../data/domaine.js'
import { useCart } from '../../cart/CartContext.jsx'

/**
 * CartButton — icône panier du header avec compteur d'articles.
 * `tone` suit la même convention que LanguageSwitcher (header transparent vs opaque).
 */
export default function CartButton({ tone = 'dark' }) {
  const { t } = useLang()
  const { count, open } = useCart()
  const label = t(domaine.boutique.ui.panier)

  const color = tone === 'light' ? 'text-cream-50/85 hover:text-cream-50' : 'text-ink/70 hover:text-bordeaux'

  return (
    <button
      type="button"
      onClick={open}
      aria-label={count > 0 ? `${label} (${count})` : label}
      className={`relative inline-flex h-9 w-9 items-center justify-center transition-colors duration-300 ${color}`}
    >
      {/* Icône panier (currentColor → suit le ton du header) */}
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M3 4h2l2.4 12.3a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 8H6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9.5" cy="20" r="1.3" fill="currentColor" />
        <circle cx="17.5" cy="20" r="1.3" fill="currentColor" />
      </svg>

      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-bordeaux px-1 font-sans text-[0.65rem] font-semibold leading-none text-cream-50">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  )
}
