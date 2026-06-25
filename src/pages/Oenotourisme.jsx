import { domaine } from '../data/domaine.js'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import OenotourismeSection from '../components/Oenotourisme.jsx'
import Chai3D from '../components/Chai3D.jsx'
import InfosPratiques from '../components/InfosPratiques.jsx'

/**
 * Oenotourisme (page) — formules + réservation, visite du chai en 3D et
 * informations pratiques.
 */
export default function Oenotourisme() {
  const page = domaine.pages['/oenotourisme']

  return (
    <>
      <Seo title={page.seoTitle} description={page.seoDesc} />
      <PageHero
        eyebrow={page.eyebrow}
        title={page.titre}
        subtitle={page.sous}
        image={page.image}
        imageAlt={page.imageAlt}
      />
      <OenotourismeSection />
      <Chai3D />
      <InfosPratiques />
    </>
  )
}
