import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { createCheckoutCart, isShopifyConfigured } from '../lib/shopify.js'

/**
 * ──────────────────────────────────────────────────────────────────────────
 *  CartContext — panier 100 % côté client (state React + persistance)
 * ──────────────────────────────────────────────────────────────────────────
 *  Le panier est la source de vérité de l'UI : ajout / retrait / quantité /
 *  total fonctionnent toujours, y compris en mode démo (produits de fallback).
 *
 *  Le panier Shopify n'est créé qu'au moment de « Commander » (checkout) :
 *  on appelle alors cartCreate pour obtenir une vraie URL de checkout HÉBERGÉ
 *  par Shopify (qui gère le paiement). Cf. src/lib/shopify.js.
 *
 *  Une ligne de panier conserve les valeurs BRUTES du produit (title/alt
 *  éventuellement en {fr,de,en}) ; la résolution multilingue se fait à
 *  l'affichage via t(), afin que changer de langue mette aussi à jour le panier.
 * ──────────────────────────────────────────────────────────────────────────
 */

const STORAGE_KEY = 'domaine.cart'

const CartContext = createContext(null)

/** Clé de ligne : variante Shopify si dispo, sinon id produit (démo). */
function lineKey(product) {
  return product.variantId || product.id
}

/** Une variante est « réelle » (commandable) si c'est un GID Shopify. */
function isRealVariant(variantId) {
  return typeof variantId === 'string' && variantId.startsWith('gid://shopify/')
}

function readStoredLines() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(readStoredLines)
  const [drawerOpen, setDrawerOpen] = useState(false)
  // 'idle' | 'loading' | 'demo' | 'error'
  const [checkoutStatus, setCheckoutStatus] = useState('idle')

  // Persistance
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* quota plein ou stockage indisponible → on ignore silencieusement */
    }
  }, [lines])

  const open = useCallback(() => setDrawerOpen(true), [])
  const close = useCallback(() => setDrawerOpen(false), [])

  /** Ajoute un produit normalisé (incrémente si déjà présent) et ouvre le panier. */
  const addItem = useCallback((product, quantity = 1) => {
    const key = lineKey(product)
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key)
      if (existing) {
        return prev.map((l) => (l.key === key ? { ...l, quantity: l.quantity + quantity } : l))
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          variantId: product.variantId || null,
          title: product.title, // brut (string ou {fr,de,en})
          image: product.image || null,
          price: product.price,
          quantity,
        },
      ]
    })
    setCheckoutStatus('idle')
    setDrawerOpen(true)
  }, [])

  const removeItem = useCallback((key) => {
    setLines((prev) => prev.filter((l) => l.key !== key))
    setCheckoutStatus('idle') // efface un éventuel message démo/erreur pendant l'édition
  }, [])

  const setQty = useCallback((key, quantity) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, quantity } : l)),
    )
    setCheckoutStatus('idle')
  }, [])

  const clear = useCallback(() => setLines([]), [])

  // Sélecteurs dérivés
  const count = useMemo(() => lines.reduce((n, l) => n + l.quantity, 0), [lines])
  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + Number(l.price?.amount || 0) * l.quantity, 0),
    [lines],
  )
  const currency = lines[0]?.price?.currency || 'EUR'

  // Le checkout réel n'est possible que si Shopify est configuré ET que toutes
  // les lignes sont de vraies variantes Shopify (les produits de démo ont un
  // variantId null → pas de checkout réel possible).
  const canCheckout = useMemo(
    () => isShopifyConfigured() && lines.length > 0 && lines.every((l) => isRealVariant(l.variantId)),
    [lines],
  )

  /**
   * « Commander » : crée le panier Shopify et redirige vers le checkout hébergé.
   * En mode démo (canCheckout faux) → on n'effectue AUCUNE redirection, on
   * positionne juste le statut 'demo' pour afficher un message clair.
   */
  const checkout = useCallback(async () => {
    if (lines.length === 0) return
    if (!canCheckout) {
      setCheckoutStatus('demo')
      return
    }
    setCheckoutStatus('loading')
    try {
      const url = await createCheckoutCart(lines)
      // Redirection vers le checkout Shopify (paiement géré entièrement par eux).
      window.location.assign(url)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[boutique] échec de création du panier Shopify :', error?.message || error)
      setCheckoutStatus('error')
    }
  }, [lines, canCheckout])

  const value = useMemo(
    () => ({
      lines,
      count,
      subtotal,
      currency,
      drawerOpen,
      open,
      close,
      addItem,
      removeItem,
      setQty,
      clear,
      checkout,
      checkoutStatus,
      canCheckout,
    }),
    [lines, count, subtotal, currency, drawerOpen, open, close, addItem, removeItem, setQty, clear, checkout, checkoutStatus, canCheckout],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart doit être utilisé dans <CartProvider>')
  return ctx
}
