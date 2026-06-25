import { domaine } from '../data/domaine.js'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Cuvees from '../components/Cuvees.jsx'
import CtaBand from '../components/CtaBand.jsx'

/**
 * NosCuvees — page catalogue des vins (grille enrichie : notes + accords +
 * température de service).
 */
export default function NosCuvees() {
  const page = domaine.pages['/nos-cuvees']

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
      <Cuvees showHeading={false} />
      <CtaBand />
    </>
  )
}
