import { domaine } from '../data/domaine.js'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import ContactSection from '../components/Contact.jsx'

/**
 * Contact (page) — bannière + coordonnées, horaires et carte.
 */
export default function Contact() {
  const page = domaine.pages['/contact']

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
      <ContactSection showHeading={false} />
    </>
  )
}
