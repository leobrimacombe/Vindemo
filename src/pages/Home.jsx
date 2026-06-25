import Seo from '../components/Seo.jsx'
import Hero from '../components/Hero.jsx'
import HomeUnivers from '../components/HomeUnivers.jsx'
import Chai3D from '../components/Chai3D.jsx'
import CtaBand from '../components/CtaBand.jsx'

// SEO de la page d'accueil (les autres pages tirent leur SEO de domaine.pages)
const homeSeo = {
  title: {
    fr: 'Domaine Vogel-Stein — Vins d’Alsace à Riquewihr',
    de: 'Domaine Vogel-Stein — Elsässer Weine in Riquewihr',
    en: 'Domaine Vogel-Stein — Wines of Alsace in Riquewihr',
  },
  description: {
    fr: 'Vignoble familial à Riquewihr depuis quatre générations. Dégustations, œnotourisme et grands vins d’Alsace : Riesling, Gewurztraminer, Pinot Gris, Crémant.',
    de: 'Familienweingut in Riquewihr seit vier Generationen. Verkostungen, Weintourismus und große Elsässer Weine: Riesling, Gewurztraminer, Pinot Gris, Crémant.',
    en: 'A family estate in Riquewihr for four generations. Tastings, wine tourism and great Alsace wines: Riesling, Gewurztraminer, Pinot Gris, Crémant.',
  },
}

/**
 * Home — page d'accueil : hero, accès aux univers, visite du chai en 3D,
 * puis appel à l'action. Vitrine d'entrée qui mène vers les pages dédiées.
 */
export default function Home() {
  return (
    <>
      <Seo title={homeSeo.title} description={homeSeo.description} />
      <Hero />
      <HomeUnivers />
      <Chai3D />
      <CtaBand />
    </>
  )
}
