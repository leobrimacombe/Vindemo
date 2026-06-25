/**
 * Repli d'image : si une image distante (Unsplash) échoue à charger, on bascule
 * sur un visuel local embarqué dans le repo — le site n'affiche jamais de cadre
 * vide, même hors-ligne ou si une URL distante meurt.
 *
 * Usage : <img ... onError={onImgError()} />
 *         <img ... onError={onImgError('/placeholder.svg')} />
 */
export function onImgError(fallback = '/hero-vineyard.svg') {
  return (e) => {
    const img = e.currentTarget
    if (img.dataset.fallbackApplied) return // évite toute boucle
    img.dataset.fallbackApplied = 'true'
    img.src = fallback
  }
}
