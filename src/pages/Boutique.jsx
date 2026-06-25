import { domaine } from '../data/domaine.js'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Boutique from '../components/boutique/Boutique.jsx'
import CtaBand from '../components/CtaBand.jsx'

/**
 * Page Boutique — vitrine e-commerce branchée sur Shopify (headless).
 * Même ossature que les autres pages : bannière + section + bandeau d'appel.
 */
export default function BoutiquePage() {
  const page = domaine.pages['/boutique']

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
      <Boutique showHeading={false} />
      <CtaBand />
    </>
  )
}
