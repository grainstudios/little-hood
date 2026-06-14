// Site configuration + ordering helpers for The Little Hood.
//
// The product catalog itself is managed in Sanity (the admin panel) and lives
// in src/context/CatalogContext.jsx (with src/config/catalog.js as fallback).
// This file holds only static site config and pure helpers.

export const WHATSAPP_NUMBER = '919618125259'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export const siteConfig = {
  name: 'The Little Hood',
  tagline: 'Custom 3D Printed Creations',
  email: 'thelittlehood.in@gmail.com',
  phone: '+91 80 4422 1100',
  address: {
    line1: '4th Floor, Precision Heights, Industrial Estate',
    line2: 'Whitefield, Bengaluru, KA 560066, India',
  },
  social: {
    instagram: 'https://www.instagram.com/the_little_hood.inc',
    linkedin: '#',
  },
}

// Format a price for display. null/undefined → "Price on request".
export const formatPrice = (price) =>
  price == null ? 'Price on request' : `₹${price.toLocaleString('en-IN')}`

export const whatsappMsg = (productName) =>
  `Hi, I'm interested in ${productName} from The Little Hood`

export const whatsappOrderUrl = (productName) =>
  `${WHATSAPP_URL}?text=${encodeURIComponent(whatsappMsg(productName))}`
