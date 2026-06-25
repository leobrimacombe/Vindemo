import { useLang } from '../i18n/LanguageContext.jsx'
import { LANG_LABELS } from '../data/domaine.js'

/**
 * LanguageSwitcher — sélecteur FR / DE / EN.
 * `tone` adapte les couleurs selon que le header est transparent (sur le hero)
 * ou opaque (après scroll).
 */
export default function LanguageSwitcher({ tone = 'dark' }) {
  const { lang, setLang, langs } = useLang()

  const base = tone === 'light' ? 'text-cream-50/70' : 'text-ink/60'
  const active = tone === 'light' ? 'text-cream-50' : 'text-bordeaux'

  return (
    <div
      role="group"
      aria-label="Choix de la langue / Sprachauswahl / Language"
      className="flex items-center gap-1 font-sans text-xs font-medium tracking-widest"
    >
      {langs.map((code, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && <span className={`mx-1.5 ${base} opacity-40`} aria-hidden="true">·</span>}
          <button
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            aria-label={LANG_LABELS[code].name}
            className={`transition-colors duration-300 hover:opacity-100 ${
              lang === code ? `${active} opacity-100` : `${base} hover:${active}`
            }`}
          >
            {LANG_LABELS[code].short}
          </button>
        </span>
      ))}
    </div>
  )
}
