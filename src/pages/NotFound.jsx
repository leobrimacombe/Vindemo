import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import Seo from '../components/Seo.jsx'

/**
 * NotFound — page 404. Fond sombre plein écran pour rester lisible sous le
 * header transparent.
 */
export default function NotFound() {
  const { t } = useLang()

  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center bg-bordeaux-deep px-6 text-center text-cream-50">
      <Seo
        title={{ fr: 'Page introuvable', de: 'Seite nicht gefunden', en: 'Page not found' }}
        description={{ fr: 'Page introuvable', de: 'Seite nicht gefunden', en: 'Page not found' }}
      />
      <p className="font-serif text-7xl text-copper-light sm:text-8xl">404</p>
      <h1 className="mt-6 font-serif text-3xl sm:text-4xl">
        {t({
          fr: 'Cette page s’est égarée dans les vignes',
          de: 'Diese Seite hat sich in den Reben verirrt',
          en: 'This page got lost among the vines',
        })}
      </h1>
      <p className="mt-4 max-w-md font-light text-cream-100/75">
        {t({
          fr: 'Le lien que vous suivez n’existe pas ou a été déplacé.',
          de: 'Der Link, dem Sie folgen, existiert nicht oder wurde verschoben.',
          en: 'The link you followed doesn’t exist or has been moved.',
        })}
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex items-center justify-center rounded-full bg-cream-50 px-8 py-4 font-sans text-sm font-medium tracking-wide text-bordeaux transition-colors duration-500 hover:bg-copper-light hover:text-ink"
      >
        {t({ fr: 'Retour à l’accueil', de: 'Zurück zur Startseite', en: 'Back to home' })}
      </Link>
    </section>
  )
}
