import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  getProductById,
  getProductsByCategory,
  categories,
  formatPrice,
  whatsappOrderUrl,
  WHATSAPP_URL,
} from '../config/site'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

const WA_LINK = `${WHATSAPP_URL}?text=${encodeURIComponent("Hi! I'm interested in ordering from The Little Hood")}`

function RelatedCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-[8px] bg-[#f5f5f5] aspect-square mb-3">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <h3 className="font-body font-semibold text-[14px] text-body leading-snug mb-1 line-clamp-2">{product.name}</h3>
      <span className="text-[#000] font-semibold text-[14px]">{formatPrice(product.price)}</span>
    </Link>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    setActiveImg(0)
  }, [id])

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-heading text-[28px] text-dark mb-3">Product not found</h1>
        <p className="text-body/70 font-body mb-6">The piece you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="px-7 py-3 rounded-pill bg-brown-700 text-white font-semibold text-[15px] hover:bg-brown-800 transition-colors">
          Back to Home
        </Link>
      </div>
    )
  }

  const categoryName = categories.find((c) => c.id === product.category)?.name || ''
  const related = getProductsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4)
  const orderUrl = whatsappOrderUrl(product.name)

  return (
    <div className="min-h-screen bg-cream">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/[0.06]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12 flex items-center justify-between h-[72px] md:h-[96px]">
          <Link to="/" className="flex items-center">
            <img src="/assets/logo.jpg" alt="The Little Hood" className="h-[64px] md:h-[88px] w-auto object-contain" />
          </Link>
          <Link
            to="/#shop"
            className="font-body text-[14px] md:text-[15px] text-body hover:text-brown-700 transition-colors flex items-center gap-1.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            Back to Shop
          </Link>
        </div>
      </header>

      {/* ─── Breadcrumb ─── */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-12 pt-5">
        <nav className="text-[13px] font-body text-body/60 flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-brown-700">Home</Link>
          <span>/</span>
          <Link to="/#shop" className="hover:text-brown-700">{categoryName}</Link>
          <span>/</span>
          <span className="text-body">{product.name}</span>
        </nav>
      </div>

      {/* ─── Product ─── */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-12 py-6 md:py-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Gallery */}
          <motion.div {...fadeUp}>
            <div className="relative overflow-hidden rounded-[14px] bg-white aspect-square mb-3 border border-black/[0.05]">
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2.5 flex-wrap">
                {product.images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActiveImg(i)}
                    className={`w-[64px] h-[64px] md:w-[78px] md:h-[78px] rounded-[8px] overflow-hidden border-2 transition-colors ${
                      i === activeImg ? 'border-brown-700' : 'border-transparent hover:border-brown-300'
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={src} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div {...fadeUp} className="flex flex-col">
            <p className="text-brown-700 font-semibold text-[13px] uppercase tracking-wider mb-2 font-body">{categoryName}</p>
            <h1 className="font-heading text-[26px] md:text-[36px] text-dark leading-tight mb-3">{product.name}</h1>
            <div className="text-[24px] md:text-[28px] font-semibold text-dark mb-5">{formatPrice(product.price)}</div>

            <p className="text-body text-[15px] md:text-[16px] leading-relaxed mb-6 font-body">{product.description}</p>

            {/* Highlights */}
            <ul className="space-y-2.5 mb-7">
              {[
                'Hand-finished and quality-checked before shipping',
                'Premium PLA / resin material with crisp detailing',
                'Made to order — colours can be customised on request',
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-body text-[14px] font-body">
                  <svg className="w-[18px] h-[18px] text-brown-700 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  {line}
                </li>
              ))}
            </ul>

            {/* Order CTA */}
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full md:w-auto px-8 py-3.5 rounded-pill bg-brown-700 text-white font-semibold text-[15px] hover:bg-brown-800 transition-colors mb-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Order on WhatsApp
            </a>
            <p className="text-body/60 text-[13px] font-body">Tap the button to message us directly — we'll confirm availability, colour options and delivery.</p>
          </motion.div>
        </div>
      </section>

      {/* ─── Related products ─── */}
      {related.length > 0 && (
        <section className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 md:py-12 border-t border-brown-100">
          <h2 className="font-heading text-[22px] md:text-[28px] text-dark mb-6 md:mb-8">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-5 md:gap-y-8">
            {related.map((p) => (
              <RelatedCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* ─── Footer ─── */}
      <footer
        className="py-12 md:py-16"
        style={{ background: 'linear-gradient(180deg, rgba(139,84,61,1), rgba(171,117,91,1) 100%)' }}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center">
            <img src="/assets/logo.jpg" alt="The Little Hood" className="h-20 md:h-24 w-auto object-contain rounded-[10px] bg-white p-1.5" />
          </Link>
          <p className="text-white/70 text-[13px] font-body">© 2026 The Little Hood. All rights reserved.</p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-2.5 rounded-pill bg-white text-brown-800 font-semibold text-[14px] hover:bg-white/90 transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </footer>
    </div>
  )
}
