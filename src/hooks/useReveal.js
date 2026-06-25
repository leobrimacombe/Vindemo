import { useEffect, useRef, useState } from 'react'

/**
 * useReveal — observe un élément et bascule `visible` à true une fois qu'il
 * entre dans le viewport. Sert aux apparitions douces au scroll.
 *
 * Usage :
 *   const { ref, visible } = useReveal()
 *   <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`} />
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Pas d'IntersectionObserver (ou mouvement réduit) → on affiche directement
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, visible }
}
