import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { domaine } from '../data/domaine.js'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import CartButton from './boutique/CartButton.jsx'

/**
 * Header — fixe, transparent par-dessus la bannière (image sombre en tête de
 * chaque page), puis fond crème translucide au scroll. Navigation par routes
 * + menu mobile plein écran.
 */
export default function Header() {
  const { t } = useLang()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Ferme le menu mobile à chaque changement de page
  useEffect(() => setMenuOpen(false), [pathname])

  // Bloque le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const tone = scrolled || menuOpen ? 'dark' : 'light'
  const textColor = tone === 'light' ? 'text-cream-50' : 'text-ink'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth ${
        scrolled ? 'border-b border-ink/5 bg-cream-50/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="section-shell flex items-center justify-between py-5">
        {/* Logo / nom */}
        <Link
          to="/"
          className={`whitespace-nowrap font-serif text-base font-medium tracking-wide transition-colors duration-500 sm:text-xl ${textColor}`}
        >
          {domaine.nom}
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
          {domaine.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group relative font-sans text-sm tracking-wide transition-colors duration-300 ${
                  tone === 'light'
                    ? 'text-cream-50/85 hover:text-cream-50'
                    : 'text-ink/70 hover:text-bordeaux'
                } ${isActive ? '!text-copper' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  {t(item.label)}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-copper transition-all duration-300 ease-smooth ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <LanguageSwitcher tone={tone} />

          {/* Panier (desktop + mobile) */}
          <CartButton tone={tone} />

          {/* Bouton menu mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className={`relative z-50 flex h-6 w-7 flex-col justify-center gap-[5px] lg:hidden ${textColor}`}
          >
            <span
              className={`h-px w-full bg-current transition-all duration-300 ease-smooth ${
                menuOpen ? 'translate-y-[3px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-px w-full bg-current transition-all duration-300 ease-smooth ${
                menuOpen ? '-translate-y-[3px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menu mobile plein écran */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-cream-50 transition-all duration-500 ease-smooth lg:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="mt-28 flex flex-col gap-2 px-8" aria-label="Navigation mobile">
          {domaine.nav.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={{ transitionDelay: menuOpen ? `${120 + i * 60}ms` : '0ms' }}
              className={({ isActive }) =>
                `border-b border-ink/10 py-4 font-serif text-3xl transition-all duration-500 ease-smooth ${
                  isActive ? 'text-copper' : 'text-ink'
                } ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`
              }
            >
              {t(item.label)}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
