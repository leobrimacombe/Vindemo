import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ScrollToTop from './ScrollToTop.jsx'
import CartDrawer from './boutique/CartDrawer.jsx'

/**
 * Layout — ossature commune à toutes les pages : header fixe, contenu
 * (Outlet), footer. ScrollToTop gère le défilement au changement de route.
 */
export default function Layout() {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-bordeaux focus:px-5 focus:py-2 focus:text-sm focus:text-cream-50"
      >
        Aller au contenu
      </a>

      <ScrollToTop />
      <Header />

      <main id="contenu">
        <Outlet />
      </main>

      <Footer />

      {/* Mini-panier — monté une fois, recouvre toutes les pages */}
      <CartDrawer />
    </>
  )
}
