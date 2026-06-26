import { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react'

/**
 * HeaderContext — permet à une page de forcer un header OPAQUE par défaut
 * (sans attendre le scroll).
 *
 * Pourquoi : le header est transparent à texte clair en haut de page, ce qui
 * suppose une bannière sombre derrière lui (convention de toutes les pages du
 * site). Une page qui démarre sur un fond clair (ex. la fiche produit) rendrait
 * le menu illisible : elle appelle alors `useSolidHeader()` pour demander le
 * fond opaque dès le chargement, sans scroll.
 */
const HeaderContext = createContext({ solid: false, setSolid: () => {} })

export function HeaderProvider({ children }) {
  const [solid, setSolid] = useState(false)
  const value = useMemo(() => ({ solid, setSolid }), [solid])
  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
}

/** Lu par le Header pour savoir s'il doit rester opaque même sans scroll. */
export function useHeaderSolid() {
  return useContext(HeaderContext).solid
}

/**
 * Appelé par une page dépourvue de bannière sombre : force le header opaque
 * pendant que la page est montée, puis rétablit le comportement transparent.
 * useLayoutEffect → appliqué avant la peinture, donc aucun flash de menu blanc.
 */
export function useSolidHeader() {
  const { setSolid } = useContext(HeaderContext)
  useLayoutEffect(() => {
    setSolid(true)
    return () => setSolid(false)
  }, [setSolid])
}
