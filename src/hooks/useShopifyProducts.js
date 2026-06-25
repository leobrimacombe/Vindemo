import { useEffect, useState } from 'react'
import { fetchAllProducts, isShopifyConfigured } from '../lib/shopify.js'
import { domaine } from '../data/domaine.js'

/**
 * useShopifyProducts — charge les produits de la boutique au montage.
 *
 * Renvoie { products, loading, error, source } où :
 *   • source === 'shopify'  → vrais produits issus de la Storefront API
 *   • source === 'fallback' → produits de DÉMO (domaine.boutique.produitsDemo)
 *
 * La section n'est JAMAIS vide : si Shopify n'est pas configuré, est
 * injoignable, renvoie une erreur ou zéro produit, on bascule proprement sur
 * les produits de démo (l'erreur est loggée en console, pas affichée brutalement
 * à l'écran). Idéal pour une présentation : la boutique s'affiche toujours.
 */
export function useShopifyProducts() {
  const [state, setState] = useState({
    products: [],
    loading: true,
    error: null,
    source: 'fallback',
  })

  useEffect(() => {
    let cancelled = false

    // Pas de config → inutile d'appeler le réseau, repli immédiat.
    if (!isShopifyConfigured()) {
      setState({ products: domaine.boutique.produitsDemo, loading: false, error: null, source: 'fallback' })
      return
    }

    setState((s) => ({ ...s, loading: true }))

    fetchAllProducts()
      .then((products) => {
        if (cancelled) return
        if (products.length === 0) {
          // Boutique configurée mais vide → on montre quand même la démo.
          setState({ products: domaine.boutique.produitsDemo, loading: false, error: null, source: 'fallback' })
        } else {
          setState({ products, loading: false, error: null, source: 'shopify' })
        }
      })
      .catch((error) => {
        if (cancelled) return
        // eslint-disable-next-line no-console
        console.warn('[boutique] Shopify indisponible, repli sur les produits de démo :', error?.message || error)
        setState({ products: domaine.boutique.produitsDemo, loading: false, error, source: 'fallback' })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
