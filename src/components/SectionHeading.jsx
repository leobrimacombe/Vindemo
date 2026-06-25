import { useLang } from '../i18n/LanguageContext.jsx'
import { useReveal } from '../hooks/useReveal.js'

/**
 * SectionHeading — sur-titre + titre + filet décoratif, réutilisé par toutes
 * les sections pour une mise en page cohérente.
 */
export default function SectionHeading({ eyebrow, title, intro, align = 'left', tone = 'dark' }) {
  const { t } = useLang()
  const { ref, visible } = useReveal()

  const isCentered = align === 'center'
  const titleColor = tone === 'light' ? 'text-cream-50' : 'text-ink'
  const introColor = tone === 'light' ? 'text-cream-200/80' : 'text-ink/70'

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${
        isCentered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'
      }`}
    >
      {eyebrow && <p className="eyebrow mb-4">{t(eyebrow)}</p>}
      <h2 className={`text-balance text-4xl leading-[1.05] sm:text-5xl lg:text-[3.4rem] ${titleColor}`}>
        {t(title)}
      </h2>
      <div className={`rule mt-6 ${isCentered ? 'mx-auto' : ''}`} />
      {intro && (
        <p className={`mt-6 max-w-prose text-lg font-light leading-relaxed ${introColor} ${isCentered ? 'mx-auto' : ''}`}>
          {t(intro)}
        </p>
      )}
    </div>
  )
}
