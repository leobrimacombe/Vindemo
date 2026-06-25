import { domaine } from '../data/domaine.js'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Histoire from '../components/Histoire.jsx'
import Terroir from '../components/Terroir.jsx'
import Equipe from '../components/Equipe.jsx'
import CtaBand from '../components/CtaBand.jsx'

/**
 * LeDomaine — page « Le domaine » : histoire, terroir, équipe.
 */
export default function LeDomaine() {
  const page = domaine.pages['/le-domaine']

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
      <Histoire />
      <Terroir />
      <Equipe />
      <CtaBand />
    </>
  )
}
