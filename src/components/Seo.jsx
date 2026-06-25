import { useEffect } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'

/**
 * Seo — met à jour le <title>, la meta description et og:title pour la page
 * courante, dans la langue active. Léger, sans dépendance type react-helmet.
 */
function setMeta(selector, attr, value) {
  if (!value) return
  let el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

export default function Seo({ title, description }) {
  const { t } = useLang()
  const resolvedTitle = t(title)
  const resolvedDesc = t(description)

  useEffect(() => {
    if (resolvedTitle) document.title = resolvedTitle
    setMeta('meta[name="description"]', 'content', resolvedDesc)
    setMeta('meta[property="og:title"]', 'content', resolvedTitle)
    setMeta('meta[property="og:description"]', 'content', resolvedDesc)
  }, [resolvedTitle, resolvedDesc])

  return null
}
