/**
 * ──────────────────────────────────────────────────────────────────────────
 *  shopify.js — client Storefront API (GraphQL) en headless
 * ──────────────────────────────────────────────────────────────────────────
 *  Shopify ne sert QUE de back-office (produits, stocks, commandes, paiement).
 *  Ce module encapsule tous les appels réseau à la Storefront API :
 *    • lecture des produits          → fetchAllProducts()
 *    • création d'un panier + URL de checkout hébergé → createCheckoutCart()
 *
 *  Aucune dépendance : la Storefront API GraphQL n'est qu'un POST JSON, donc
 *  on utilise `fetch` natif (bundle plus léger, rien à installer).
 *
 *  ⚠️  Configuration — variables d'environnement Vite (jamais en dur ici) :
 *      VITE_SHOPIFY_DOMAIN           ex. "mon-domaine.myshopify.com"
 *      VITE_SHOPIFY_STOREFRONT_TOKEN token d'accès Storefront (public-safe)
 *      VITE_SHOPIFY_API_VERSION      optionnel (défaut ci-dessous)
 *
 *  Note prod : le token Storefront est conçu pour être exposé côté client
 *  (lecture seule + panier). Pour une vraie boutique en production, on
 *  passerait toutefois par un backend/proxy afin de masquer la config, poser
 *  du cache et du rate-limiting. Pour cette démo, l'env Vite suffit (voir README).
 * ──────────────────────────────────────────────────────────────────────────
 */

const DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN
const TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN
// Versions Storefront = trimestrielles (AAAA-MM). Surchargeable via l'env.
const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2025-01'

/** Erreur typée : permet au hook/panier de distinguer un souci Shopify. */
export class ShopifyError extends Error {
  constructor(message, { cause, type } = {}) {
    super(message)
    this.name = 'ShopifyError'
    this.type = type // 'config' | 'network' | 'http' | 'graphql'
    if (cause) this.cause = cause
  }
}

/** Vrai si le domaine ET le token sont renseignés. Sinon → mode démo (fallback). */
export function isShopifyConfigured() {
  return Boolean(DOMAIN && TOKEN)
}

/**
 * Exécute une requête GraphQL contre la Storefront API.
 * Centralise TOUTE la gestion d'erreur pour que les appelants n'aient qu'à
 * try/catch une seule fois :
 *   - non configuré       → ShopifyError('config')
 *   - réseau injoignable   → ShopifyError('network')
 *   - HTTP 4xx/5xx         → ShopifyError('http')   (ex. token invalide → 401/403)
 *   - erreurs GraphQL      → ShopifyError('graphql')
 */
async function shopifyFetch(query, variables = {}) {
  if (!isShopifyConfigured()) {
    throw new ShopifyError('Shopify non configuré (VITE_SHOPIFY_DOMAIN / VITE_SHOPIFY_STOREFRONT_TOKEN manquants).', {
      type: 'config',
    })
  }

  const endpoint = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`

  let res
  try {
    res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': TOKEN,
        Accept: 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    })
  } catch (cause) {
    // DNS, offline, CORS, domaine erroné… → la promesse fetch rejette.
    throw new ShopifyError('Boutique injoignable (erreur réseau).', { type: 'network', cause })
  }

  if (!res.ok) {
    // 401/403 = token Storefront invalide ; 404 = domaine/version erronés ; 5xx = panne.
    throw new ShopifyError(`Réponse HTTP ${res.status} de la Storefront API.`, { type: 'http' })
  }

  const json = await res.json()

  // La Storefront API renvoie 200 même en cas d'erreur de requête : il faut
  // inspecter le tableau `errors` du corps JSON.
  if (json.errors?.length) {
    throw new ShopifyError(json.errors[0]?.message || 'Erreur GraphQL.', { type: 'graphql', cause: json.errors })
  }

  return json.data
}

// ── Lecture des produits ────────────────────────────────────────────────────

const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo { hasNextPage endCursor }
      nodes {
        id
        title
        handle
        description(truncateAt: 240)
        productType
        availableForSale
        featuredImage { url altText }
        priceRange { minVariantPrice { amount currencyCode } }
        # 1ʳᵉ variante = celle qu'on ajoute au panier (merchandiseId).
        variants(first: 1) {
          nodes {
            id
            availableForSale
            price { amount currencyCode }
          }
        }
      }
    }
  }
`

/**
 * Normalise un produit Shopify vers le modèle interne consommé par l'UI.
 * Ce modèle est volontairement aligné sur `domaine.boutique.produitsDemo` afin
 * que les composants (ProductCard, panier) ne voient aucune différence entre un
 * vrai produit Shopify et un produit de démo.
 *
 *   { id, variantId, title, description, tag, image:{url,alt}, price:{amount,currency}, available }
 *
 * title/description/tag/alt sont ici de simples chaînes (langue par défaut du
 * store) ; le helper t() du site les laisse passer telles quelles.
 */
function normalizeProduct(node) {
  const variant = node.variants?.nodes?.[0]
  const money = variant?.price || node.priceRange?.minVariantPrice
  return {
    id: node.id,
    // merchandiseId requis par l'API Cart. Null si le produit n'a aucune
    // variante achetable → l'UI le traitera comme non commandable.
    variantId: variant?.id || null,
    title: node.title,
    description: node.description || '',
    tag: node.productType || null,
    image: node.featuredImage
      ? { url: node.featuredImage.url, alt: node.featuredImage.altText || node.title }
      : null,
    price: { amount: money?.amount ?? '0', currency: money?.currencyCode ?? 'EUR' },
    // `availableForSale` au niveau produit ET variante (rupture de stock).
    available: Boolean(node.availableForSale && variant?.availableForSale !== false),
  }
}

/**
 * Récupère TOUS les produits (pagination incluse) → le nombre de produits est
 * donc dynamique : ajouter une cuvée dans l'admin Shopify la fait apparaître au
 * rechargement, sans toucher au code. Lève une ShopifyError en cas de problème.
 */
export async function fetchAllProducts({ pageSize = 50 } = {}) {
  const all = []
  let after = null
  // Garde-fou : au plus quelques pages (évite une boucle infinie théorique).
  for (let page = 0; page < 20; page += 1) {
    const data = await shopifyFetch(PRODUCTS_QUERY, { first: pageSize, after })
    const conn = data?.products
    if (!conn) break
    all.push(...conn.nodes.map(normalizeProduct))
    if (!conn.pageInfo?.hasNextPage) break
    after = conn.pageInfo.endCursor
  }
  return all
}

// ── Panier & checkout ─────────────────────────────────────────────────────

const CART_CREATE_MUTATION = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`

/**
 * Crée un panier Shopify à partir des lignes du panier client et renvoie
 * l'URL du checkout HÉBERGÉ par Shopify (c'est lui qui gère le paiement).
 *
 * On crée le panier UNIQUEMENT au moment de « Commander » (et non à chaque
 * ajout) : le panier source-de-vérité reste côté client (réactif, résilient,
 * fonctionne même en mode démo), et on ne sollicite le réseau qu'une fois.
 * `cartLinesAdd` / `cartLinesUpdate` / `cartLinesRemove` existent si l'on
 * souhaitait un jour un panier Shopify persistant côté serveur.
 *
 * @param {{ variantId: string, quantity: number }[]} lines
 * @returns {Promise<string>} URL de checkout
 */
export async function createCheckoutCart(lines) {
  const cartLines = lines.map((l) => ({ merchandiseId: l.variantId, quantity: l.quantity }))
  const data = await shopifyFetch(CART_CREATE_MUTATION, { lines: cartLines })

  const userErrors = data?.cartCreate?.userErrors
  if (userErrors?.length) {
    throw new ShopifyError(userErrors[0].message || 'Création du panier refusée.', { type: 'graphql', cause: userErrors })
  }

  const url = data?.cartCreate?.cart?.checkoutUrl
  if (!url) throw new ShopifyError('Aucune URL de checkout renvoyée.', { type: 'graphql' })
  return url
}

// ── Utilitaires ─────────────────────────────────────────────────────────────

/** Formate un montant Shopify (string + devise ISO) selon la langue active. */
export function formatPrice(amount, currency = 'EUR', lang = 'fr') {
  const locale = { fr: 'fr-FR', de: 'de-DE', en: 'en-GB' }[lang] || 'fr-FR'
  const value = Number(amount)
  if (Number.isNaN(value)) return ''
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
  } catch {
    // Devise inconnue d'Intl → repli simple.
    return `${value.toFixed(2)} ${currency}`
  }
}
