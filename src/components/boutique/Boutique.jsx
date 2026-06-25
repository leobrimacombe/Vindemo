import { useLang } from '../../i18n/LanguageContext.jsx'
import { domaine } from '../../data/domaine.js'
import SectionHeading from '../SectionHeading.jsx'
import { useShopifyProducts } from '../../hooks/useShopifyProducts.js'
import { useCart } from '../../cart/CartContext.jsx'
import ProductCard from './ProductCard.jsx'

/** Carte fantôme affichée pendant le chargement (même gabarit que ProductCard). */
function SkeletonCard() {
  return (
    <div className="flex animate-pulse flex-col" aria-hidden="true">
      <div className="aspect-[4/5] w-full bg-stone-warm/40" />
      <div className="flex flex-col gap-3 border-t border-ink/15 pt-6">
        <div className="h-3 w-20 bg-ink/10" />
        <div className="h-6 w-3/4 bg-ink/10" />
        <div className="h-4 w-full bg-ink/5" />
        <div className="h-4 w-2/3 bg-ink/5" />
        <div className="mt-3 h-11 w-full rounded-full bg-ink/10" />
      </div>
    </div>
  )
}

/**
 * Boutique — grille de produits dans la DA des cuvées.
 *
 * `showHeading` suit la même convention que <Cuvees /> : à false quand la
 * section est posée sous une bannière de page qui porte déjà le titre.
 *
 * Les produits viennent de Shopify (useShopifyProducts) avec repli automatique
 * sur les produits de démo — la section n'est jamais vide.
 */
export default function Boutique({ showHeading = true }) {
  const { t } = useLang()
  const { boutique } = domaine
  const { products, loading, source } = useShopifyProducts()
  const { addItem } = useCart()

  return (
    <section id="boutique" className="scroll-mt-20 bg-cream-50 py-20 sm:py-28 lg:py-32">
      <div className="section-shell">
        {showHeading ? (
          <SectionHeading eyebrow={boutique.eyebrow} title={boutique.titre} intro={boutique.intro} />
        ) : (
          <p className="max-w-prose text-lg font-light leading-relaxed text-ink/70">{t(boutique.intro)}</p>
        )}

        {/* Repère discret quand les produits affichés sont des exemples (sans Shopify). */}
        {!loading && source === 'fallback' && (
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-copper/30 bg-copper/5 px-4 py-1.5 font-sans text-[0.7rem] font-medium uppercase tracking-widest text-copper">
            <span className="h-1.5 w-1.5 rounded-full bg-copper" aria-hidden="true" />
            {t(boutique.ui.modeDemo)}
          </p>
        )}

        <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} onAdd={addItem} />
              ))}
        </div>
      </div>
    </section>
  )
}
