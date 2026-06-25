import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import LeDomaine from './pages/LeDomaine.jsx'
import NosCuvees from './pages/NosCuvees.jsx'
import Boutique from './pages/Boutique.jsx'
import Oenotourisme from './pages/Oenotourisme.jsx'
import Contact from './pages/Contact.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

/**
 * App — table de routage. Toutes les pages partagent le même Layout
 * (header + footer). Le contenu de chaque page provient de src/data/domaine.js.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="le-domaine" element={<LeDomaine />} />
        <Route path="nos-cuvees" element={<NosCuvees />} />
        <Route path="boutique" element={<Boutique />} />
        <Route path="oenotourisme" element={<Oenotourisme />} />
        <Route path="contact" element={<Contact />} />
        {/* Pages légales : une même vue paramétrée par la route */}
        <Route path="mentions-legales" element={<Legal route="/mentions-legales" />} />
        <Route path="confidentialite" element={<Legal route="/confidentialite" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
