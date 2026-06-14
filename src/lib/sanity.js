// Sanity client + helpers for reading the live product catalog.
//
// The project ID and dataset are NOT secrets, so they are safe to ship in the
// bundle. They can still be overridden with Vite env vars if needed.
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const SANITY_PROJECT_ID =
  import.meta.env.VITE_SANITY_PROJECT_ID || '8a36ilal'
export const SANITY_DATASET =
  import.meta.env.VITE_SANITY_DATASET || 'production'

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true, // fast, cached reads for public content
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)

// GROQ: published, visible products ordered by category then manual order.
const PRODUCTS_QUERY = `*[_type == "product" && !(_id in path("drafts.**")) && active != false]
  | order(category->order asc, order asc, name asc) {
    "id": slug.current,
    name,
    "category": category->slug.current,
    "categoryName": category->title,
    price,
    description,
    images
  }`

const CATEGORIES_QUERY = `*[_type == "category" && !(_id in path("drafts.**"))]
  | order(order asc, title asc) {
    "id": slug.current,
    "name": title
  }`

// Convert a product's Sanity image array into ready-to-use CDN URL strings,
// matching the shape the UI already expects (product.images = [url, ...]).
function withImageUrls(product) {
  const images = Array.isArray(product.images)
    ? product.images
        .filter((im) => im && im.asset)
        .map((im) => urlFor(im).width(1000).quality(80).auto('format').url())
    : []
  return { ...product, images }
}

// Fetch the full catalog (products + categories) from Sanity.
// Returns empty arrays on failure so callers can fall back gracefully.
export async function fetchCatalog() {
  const [products, categories] = await Promise.all([
    client.fetch(PRODUCTS_QUERY),
    client.fetch(CATEGORIES_QUERY),
  ])
  return {
    products: Array.isArray(products) ? products.map(withImageUrls) : [],
    categories: Array.isArray(categories) ? categories : [],
  }
}
