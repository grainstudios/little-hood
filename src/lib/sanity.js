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
    images,
    "video": video.asset->url,
    bestSeller,
    outOfStock,
    "createdAt": _createdAt
  }`

const CATEGORIES_QUERY = `*[_type == "category" && !(_id in path("drafts.**"))]
  | order(order asc, title asc) {
    "id": slug.current,
    "name": title
  }`

// GROQ: visible hero slides ordered manually. Powers the landing-page slideshow.
const HERO_SLIDES_QUERY = `*[_type == "heroSlide" && !(_id in path("drafts.**")) && active != false]
  | order(order asc, _createdAt asc) {
    "id": _id,
    title,
    subtitle,
    ctaLabel,
    ctaLink,
    backgroundType,
    image,
    "video": video.asset->url,
    headlineColor,
    customHeadlineColor,
    subtitleColor,
    customSubtitleColor,
    textColor,
    customTextColor,
    fontFamily,
    headlineSize,
    subtitleSize,
    textAlign,
    textShadow,
    overlayOpacity
  }`

// GROQ: global site settings (currently just the logo). Uses the first doc.
const SITE_SETTINGS_QUERY = `*[_type == "siteSettings" && !(_id in path("drafts.**"))][0]{ logo }`

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

// Resolve a hero slide's uploaded image into a wide CDN URL, matching the
// shape the slideshow expects (slide.img = url).
function withHeroImageUrl(slide) {
  const img =
    slide.image && slide.image.asset
      ? urlFor(slide.image).width(1920).height(1080).quality(85).auto('format').url()
      : ''
  return {
    id: slide.id,
    title: slide.title || '',
    subtitle: slide.subtitle || '',
    ctaLabel: slide.ctaLabel || '',
    ctaLink: slide.ctaLink || '',
    img,
    // Treat missing backgroundType as "video" when a video is present, so
    // slides created before the Image/Video toggle existed still play.
    video: slide.video && slide.backgroundType !== 'image' ? slide.video : '',
    // Legacy slides only have `textColor`; new slides set headline/subtitle separately.
    headlineColor: slide.customHeadlineColor || slide.headlineColor || slide.customTextColor || slide.textColor || '#ffffff',
    subtitleColor: slide.customSubtitleColor || slide.subtitleColor || slide.customTextColor || slide.textColor || '#ffffff',
    fontFamily: slide.fontFamily && slide.fontFamily !== 'default' ? slide.fontFamily : '',
    headlineSize: slide.headlineSize || 'medium',
    subtitleSize: slide.subtitleSize || 'medium',
    textAlign: slide.textAlign || 'center',
    textShadow: slide.textShadow !== false,
    overlayOpacity: typeof slide.overlayOpacity === 'number' ? slide.overlayOpacity : 30,
  }
}

// Resolve the site logo into a CDN URL, or null if none is set.
function resolveLogo(settings) {
  if (settings && settings.logo && settings.logo.asset) {
    return urlFor(settings.logo).width(360).fit('max').auto('format').url()
  }
  return null
}

// Fetch the full catalog (products + categories + hero slides + settings) from
// Sanity. Returns empty/falsy values on failure so callers can fall back.
export async function fetchCatalog() {
  const [products, categories, heroSlides, settings] = await Promise.all([
    client.fetch(PRODUCTS_QUERY),
    client.fetch(CATEGORIES_QUERY),
    client.fetch(HERO_SLIDES_QUERY),
    client.fetch(SITE_SETTINGS_QUERY),
  ])
  return {
    products: Array.isArray(products) ? products.map(withImageUrls) : [],
    categories: Array.isArray(categories) ? categories : [],
    heroSlides: Array.isArray(heroSlides)
      ? heroSlides.map(withHeroImageUrl).filter((s) => s.img || s.video)
      : [],
    logoUrl: resolveLogo(settings),
  }
}
