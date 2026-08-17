// Catalog context — provides products + categories to the whole app.
//
// Strategy: render instantly with the built-in fallback catalog, then swap in
// the live Sanity data once it arrives. If Sanity is empty or unreachable, the
// fallback stays — so the storefront can never render blank.
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { fetchCatalog } from '../lib/sanity'
import { fallbackProducts, fallbackCategories } from '../config/catalog'

const CatalogContext = createContext(null)

export function CatalogProvider({ children }) {
  const [products, setProducts] = useState(fallbackProducts)
  const [categories, setCategories] = useState(fallbackCategories)
  const [heroSlides, setHeroSlides] = useState([])
  const [logoUrl, setLogoUrl] = useState('/assets/logo.jpg')
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState('fallback')

  useEffect(() => {
    let active = true
    fetchCatalog()
      .then(({ products: p, categories: c, heroSlides: h, logoUrl: l }) => {
        if (!active) return
        if (p && p.length) {
          setProducts(p)
          setSource('sanity')
        }
        if (c && c.length) setCategories(c)
        if (h && h.length) setHeroSlides(h)
        if (l) setLogoUrl(l)
      })
      .catch((err) => {
        // Keep the fallback catalog; just log for debugging.
        console.warn('[catalog] Sanity fetch failed, using built-in catalog.', err)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const value = useMemo(
    () => ({
      products,
      categories,
      heroSlides,
      logoUrl,
      loading,
      source,
      getProductById: (id) => products.find((p) => p.id === id),
      getProductsByCategory: (categoryId) =>
        products.filter((p) => p.category === categoryId),
    }),
    [products, categories, heroSlides, logoUrl, loading, source],
  )

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCatalog() {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog must be used within a CatalogProvider')
  return ctx
}
