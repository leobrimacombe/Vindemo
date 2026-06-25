import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { LANGS } from '../data/domaine'

/**
 * Système i18n volontairement minimal.
 *
 * Le contenu n'est PAS stocké ici : il vit dans src/data/domaine.js sous la
 * forme d'objets { fr, de, en }. Ce contexte ne fait que :
 *   1. tenir la langue active (avec persistance + détection navigateur),
 *   2. exposer un helper `t()` qui résout un de ces objets dans la bonne langue.
 */

const STORAGE_KEY = 'domaine.lang'

const LanguageContext = createContext(null)

function detectInitialLang() {
  if (typeof window === 'undefined') return 'fr'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved && LANGS.includes(saved)) return saved
  const nav = (window.navigator.language || 'fr').slice(0, 2).toLowerCase()
  return LANGS.includes(nav) ? nav : 'fr'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang)

  // Persiste le choix et met à jour l'attribut lang du <html> (a11y + SEO)
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next) => {
    if (LANGS.includes(next)) setLangState(next)
  }, [])

  /**
   * Résout une valeur traduisible.
   * - { fr, de, en } → renvoie la chaîne de la langue active (repli FR).
   * - chaîne simple   → renvoyée telle quelle (valeur neutre).
   */
  const t = useCallback(
    (value) => {
      if (value == null) return ''
      if (typeof value === 'string') return value
      return value[lang] ?? value.fr ?? ''
    },
    [lang],
  )

  const ctx = useMemo(() => ({ lang, setLang, t, langs: LANGS }), [lang, setLang, t])

  return <LanguageContext.Provider value={ctx}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang doit être utilisé dans <LanguageProvider>')
  return ctx
}
