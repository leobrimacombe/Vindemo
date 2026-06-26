import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LanguageContext.jsx'
import { useReveal } from '../../hooks/useReveal.js'
import { domaine, hasCuvee } from '../../data/domaine.js'
import { formatPrice } from '../../lib/shopify.js'

/**
 * ProductCard — carte produit de la boutique.
 *
 * Reprend délibérément l'anatomie de CuveeCard (src/components/Cuvees.jsx) :
 * filet supérieur fin, tag cépage en petites capitales cuivre, titre serif,
 * prix là où la cuvée affiche son millésime (serif italique bordeaux). On y
 * ajoute l'image produit, le badge « Épuisé » et le bouton d'ajout au panier.
 *
 * Composant de PRÉSENTATION pur : il reçoit un produit normalisé + onAdd,
 * aucune logique Shopify ne fuit ici.
 */
export default function ProductCard({ product, index = 0, onAdd }) {
  const { t, lang } = useLang()
  const { ref, visible } = useReveal()
  const ui = domaine.boutique.ui

  const available = product.available !== false
  const price = formatPrice(product.price?.amount, product.price?.currency, lang)

  // Lien vers la fiche éditoriale si le produit correspond à une cuvée connue
  // (slug des produits de démo, ou handle Shopify identique au slug d'une cuvée).
  const ficheSlug = product.slug || product.handle
  const fiche = hasCuvee(ficheSlug) ? ficheSlug : null

  return (
    <article
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 90}ms` : '0ms' }}
      className={`reveal ${visible ? 'is-visible' : ''} group flex flex-col`}
    >
      {/* Image produit (ratio éditorial portrait, léger zoom au survol) */}
      <div className="relative overflow-hidden bg-stone-warm/40">
        {product.image?.url ? (
          <img
            src={product.image.url}
            alt={t(product.image.alt)}
            loading="lazy"
            className={`aspect-[4/5] w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04] ${
              available ? '' : 'opacity-70 grayscale-[35%]'
            }`}
          />
        ) : (
          <div className="aspect-[4/5] w-full" aria-hidden="true" />
        )}

        {!available && (
          <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 font-sans text-[0.65rem] font-medium uppercase tracking-widest text-cream-50 backdrop-blur-sm">
            {t(ui.epuise)}
          </span>
        )}
      </div>

      {/* Contenu — même grammaire visuelle que la carte cuvée */}
      <div className="flex flex-1 flex-col border-t border-ink/15 pt-6 transition-colors duration-500 group-hover:border-copper">
        {product.tag && (
          <span className="font-sans text-xs font-medium uppercase tracking-widest text-copper">
            {t(product.tag)}
          </span>
        )}

        <h3 className="mt-3 font-serif text-2xl leading-snug text-ink">
          {fiche ? (
            <Link
              to={`/nos-cuvees/${fiche}`}
              className="transition-colors duration-300 hover:text-bordeaux focus-visible:text-bordeaux"
            >
              {t(product.title)}
            </Link>
          ) : (
            t(product.title)
          )}
        </h3>

        {product.description && (
          <p className="mt-3 line-clamp-3 flex-1 text-[0.975rem] font-light leading-relaxed text-ink/70">
            {t(product.description)}
          </p>
        )}

        {fiche && (
          <Link
            to={`/nos-cuvees/${fiche}`}
            className="group/fiche mt-4 inline-flex items-center gap-2 self-start font-sans text-sm font-medium tracking-wide text-bordeaux"
          >
            {t(domaine.cuvees.fiche.voir)}
            <span
              className="transition-transform duration-300 group-hover/fiche:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        )}

        <div className="mt-6 flex items-baseline gap-3">
          <span className="font-serif text-xl italic text-bordeaux">{price}</span>
          <span className="h-px flex-1 bg-ink/10" />
        </div>

        {available ? (
          <button type="button" onClick={() => onAdd?.(product)} className="btn-primary mt-5 w-full">
            {t(ui.ajouter)}
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="mt-5 inline-flex w-full cursor-not-allowed items-center justify-center rounded-full border border-ink/15 px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-ink/40"
          >
            {t(ui.epuise)}
          </button>
        )}
      </div>
    </article>
  )
}
