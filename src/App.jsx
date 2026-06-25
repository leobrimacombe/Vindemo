import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Histoire from './components/Histoire.jsx'
import Cuvees from './components/Cuvees.jsx'
import Chai3D from './components/Chai3D.jsx'
import Oenotourisme from './components/Oenotourisme.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

/**
 * App — assemble les sections dans l'ordre. Aucune logique métier ici :
 * tout le contenu provient de src/data/domaine.js via le contexte de langue.
 */
export default function App() {
  return (
    <>
      {/* Lien d'évitement pour l'accessibilité clavier */}
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-bordeaux focus:px-5 focus:py-2 focus:text-sm focus:text-cream-50"
      >
        Aller au contenu
      </a>

      <Header />

      <main id="contenu">
        <Hero />
        <Histoire />
        <Cuvees />
        <Chai3D />
        <Oenotourisme />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
