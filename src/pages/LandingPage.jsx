import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── data ─── */
const heroSlides = [
  { img: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1600&q=80', alt: '3D Printed Figurines', title: 'Crafted with Precision', subtitle: 'Custom 3D Printed Figurines & Models', cta: 'Shop Now' },
  { img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=80', alt: '3D Printing Workshop', title: 'From Imagination to Reality', subtitle: 'Premium Quality 3D Prints Delivered to Your Door', cta: 'Explore Collection' },
  { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80', alt: '3D Printed Art', title: 'Art Meets Technology', subtitle: 'Handcrafted 3D Printed Art Pieces & Home Decor', cta: 'View Art' },
  { img: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=1600&q=80', alt: '3D Printed Objects', title: 'Unlimited Possibilities', subtitle: 'Custom Orders Welcome — Let Us Build Your Vision', cta: 'Get Custom Print' },
]

const videoTiles = [
  { name: 'Figurines', img: '/assets/product-1.jpg' },
  { name: 'Miniatures', img: '/assets/product-2.jpg' },
  { name: 'Custom Prints', img: '/assets/product-3.jpg' },
  { name: 'Home Decor', img: '/assets/product-4.jpg' },
  { name: 'Keychains', img: '/assets/product-5.jpg' },
  { name: 'Action Figures', img: '/assets/product-1.jpg' },
  { name: 'Art Pieces', img: '/assets/product-2.jpg' },
  { name: 'Gift Ideas', img: '/assets/product-3.jpg' },
]

const categories = [
  { name: 'Figurines', img: '/assets/product-1.jpg' },
  { name: 'Miniatures', img: '/assets/product-2.jpg' },
  { name: 'Custom Prints', img: '/assets/product-3.jpg' },
  { name: 'Home Decor', img: '/assets/product-4.jpg' },
  { name: 'Keychains', img: '/assets/product-5.jpg' },
  { name: 'Action Figures', img: '/assets/product-1.jpg' },
]

const bestSellers = [
  { name: 'Dragon Figurine', price: '₹2,499', originalPrice: '₹3,200', img: '/assets/product-1.jpg', badge: 'Best Seller' },
  { name: 'Anime Character Model', price: '₹3,800', originalPrice: '₹4,500', img: '/assets/product-2.jpg', badge: '' },
  { name: 'Skull Sculpture', price: '₹1,899', originalPrice: '', img: '/assets/product-3.jpg', badge: 'Popular' },
  { name: 'Robot Action Figure', price: '₹2,200', originalPrice: '₹2,800', img: '/assets/product-4.jpg', badge: '' },
  { name: 'Fantasy Creature', price: '₹4,500', originalPrice: '₹5,200', img: '/assets/product-5.jpg', badge: '' },
  { name: 'Miniature Landscape', price: '₹5,999', originalPrice: '₹7,000', img: '/assets/product-1.jpg', badge: 'Trending' },
  { name: 'Mech Warrior Model', price: '₹3,200', originalPrice: '', img: '/assets/product-2.jpg', badge: '' },
  { name: 'Animal Figurine Set', price: '₹1,499', originalPrice: '₹1,800', img: '/assets/product-3.jpg', badge: '' },
]

const newArrivals = [
  { name: 'Castle Miniature', price: '₹6,500', img: '/assets/product-4.jpg' },
  { name: 'Custom Portrait Bust', price: '₹4,200', img: '/assets/product-5.jpg' },
  { name: 'Spaceship Model', price: '₹3,800', img: '/assets/product-1.jpg' },
  { name: 'Architectural Model', price: '₹8,999', img: '/assets/product-2.jpg' },
  { name: 'Vase — Organic Form', price: '₹1,200', img: '/assets/product-3.jpg' },
  { name: 'Geometric Planter', price: '₹899', img: '/assets/product-4.jpg' },
  { name: 'Lamp Base — Modern', price: '₹1,599', img: '/assets/product-5.jpg' },
  { name: 'Desk Organizer', price: '₹749', img: '/assets/product-1.jpg' },
]

const reviews = [
  { name: 'Arjun M.', rating: 5, text: 'The dragon figurine is absolutely stunning! Detail level is insane for this price. Will order again.', product: 'Dragon Figurine' },
  { name: 'Priya S.', rating: 5, text: 'Got a custom portrait bust as a gift. The person literally teared up. Amazing quality!', product: 'Custom Portrait Bust' },
  { name: 'Rahul K.', rating: 5, text: 'Fast delivery, great packaging. The anime model looks exactly like the preview. Highly recommend.', product: 'Anime Character Model' },
]

/* ─── Ken Burns animation configs per tile ─── */
const kenBurnsAnimations = [
  'kenBurns1 10s ease-in-out infinite',
  'kenBurns2 12s ease-in-out infinite 1s',
  'kenBurns1 8s ease-in-out infinite 2s',
  'kenBurns2 11s ease-in-out infinite 0.5s',
  'kenBurns1 13s ease-in-out infinite 1.5s',
  'kenBurns2 9s ease-in-out infinite 3s',
  'kenBurns1 11s ease-in-out infinite 0.8s',
  'kenBurns2 10s ease-in-out infinite 2.5s',
]

/* ─── animations ─── */
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, margin: '-40px' },
}

const staggerItem = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── WhatsApp link ─── */
const WA_LINK = 'https://wa.me/919876543210?text=Hi!%20I%27m%20interested%20in%20ordering%20from%20The%20Little%20Hood'

/* ─── components ─── */

function ProductCard({ product }) {
  return (
    <motion.div {...staggerItem} className="product-card group">
      <div className="relative overflow-hidden rounded-[8px] bg-[#f5f5f5] aspect-square mb-3">
        <img
          src={product.img}
          alt={product.name}
          className="product-card-img w-full h-full object-cover"
          loading="lazy"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&q=80' }}
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-brown-700 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full z-10">
            {product.badge}
          </span>
        )}
      </div>
      <h3 className="font-body font-semibold text-[15px] text-body leading-snug mb-1 line-clamp-2">{product.name}</h3>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[#000] font-semibold text-[15px]">{product.price}</span>
        {product.originalPrice && (
          <span className="text-[#000]/40 text-[13px] line-through">{product.originalPrice}</span>
        )}
      </div>
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center py-2.5 rounded-pill border border-brown-500 text-brown-950 bg-beige font-semibold text-[14px] hover:bg-brown-500 hover:text-white transition-colors duration-200"
      >
        Order on WhatsApp
      </a>
    </motion.div>
  )
}

function CategoryCard({ cat, index }) {
  return (
    <motion.div {...staggerItem} className="text-center flex-shrink-0">
      <div className="relative overflow-hidden rounded-[8px] aspect-square bg-[#f5f5f5] mb-3">
        <img
          src={cat.img}
          alt={cat.name}
          className="product-card-img w-full h-full object-cover"
          loading="lazy"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&q=80' }}
        />
      </div>
      <span className="font-body font-medium text-[15px] text-body">{cat.name}</span>
    </motion.div>
  )
}

export default function LandingPage() {
  const [heroIndex, setHeroIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const heroInterval = useRef(null)

  // Hero auto-slide
  useEffect(() => {
    heroInterval.current = setInterval(() => {
      setHeroIndex(i => (i + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(heroInterval.current)
  }, [])

  // Sticky header shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goSlide = useCallback((i) => {
    setHeroIndex(i)
    clearInterval(heroInterval.current)
    heroInterval.current = setInterval(() => {
      setHeroIndex(idx => (idx + 1) % heroSlides.length)
    }, 5000)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Announcement Bar ─── */}
      <div className="bg-brown-700 text-white text-[13px] py-3 text-center font-body">
        <span>Free shipping on orders above ₹999 — Use code <strong>PRINT10</strong> for 10% off!</span>
      </div>

      {/* ─── Header ─── */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? 'shadow-[0_2px_5px_rgba(0,0,0,0.06)]' : ''}`}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-12 flex items-center justify-between h-[60px] md:h-[80px]">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 -ml-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-5 h-[2px] bg-body rounded" />
            <span className="block w-5 h-[2px] bg-body rounded" />
            <span className="block w-5 h-[2px] bg-body rounded" />
          </button>

          {/* Logo */}
          <a href="#" className="flex items-center">
            <img src="/assets/logo.jpg" alt="The Little Hood" className="h-14 md:h-18 w-auto object-contain rounded" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {['Home', 'Figurines', 'Miniatures', 'Custom Prints', 'Home Decor', 'Contact'].map(label => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
                className="font-body text-[15px] text-body hover:text-brown-700 transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-body hover:text-brown-700 transition-colors"
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-brown-100"
            >
              <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-3">
                <input
                  type="text"
                  placeholder="Search for 3D prints, figurines, miniatures..."
                  className="w-full px-4 py-2.5 rounded-[6px] border border-[#D3D3D3] text-[15px] font-body focus:outline-none focus:border-brown-700"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[9998]"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-[360px] bg-cream z-[9999] overflow-y-auto"
            >
              {/* Menu header */}
              <div className="bg-white flex items-center justify-between px-4 py-4 border-b border-black/[0.06]">
                <img src="/assets/logo.jpg" alt="The Little Hood" className="h-14 w-auto rounded" />
                <button onClick={() => setMobileMenuOpen(false)} className="p-1" aria-label="Close menu">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
              </div>
              {/* Menu links */}
              <div className="bg-white px-4 py-3">
                {['Home', 'Figurines', 'Miniatures', 'Custom Prints', 'Home Decor', 'Contact'].map(label => (
                  <a
                    key={label}
                    href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 text-[14px] font-medium tracking-wider text-body border-b border-black/[0.04] last:border-0"
                  >
                    {label}
                  </a>
                ))}
              </div>
              {/* Menu footer */}
              <div className="px-4 py-5">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 rounded-pill bg-brown-700 text-white font-semibold text-[14px]"
                >
                  Order on WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Circular Video Tiles (separate section, above hero) ─── */}
      <section className="py-3 md:py-4 bg-white">
        <div className="w-full">
          <div
            className="flex gap-4 md:gap-5 px-4 md:px-12 overflow-x-auto overflow-y-hidden hide-scrollbar snap-x snap-mandatory"
            style={{
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x',
              overscrollBehaviorY: 'contain',
              height: 'fit-content',
            }}
          >
            {videoTiles.map((tile, i) => (
              <motion.a
                key={tile.name + i}
                href="#best-sellers"
                {...staggerItem}
                className="flex flex-col items-center flex-shrink-0 snap-start group"
              >
                {/* Outer shimmer ring */}
                <div className="relative w-[68px] h-[68px] md:w-[90px] md:h-[90px] rounded-full p-[2.5px] video-tile-shimmer">
                  {/* Inner white gap + image */}
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#f5f5f5]">
                    <img
                      src={tile.img}
                      alt={tile.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      style={{ animation: kenBurnsAnimations[i % kenBurnsAnimations.length] }}
                      loading="lazy"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=200&q=80' }}
                    />
                  </div>
                </div>
                {/* Label */}
                <span className="mt-1.5 text-[11px] md:text-[13px] font-body font-medium text-body/80 group-hover:text-brown-700 transition-colors whitespace-nowrap">
                  {tile.name}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Hero Slideshow ─── */}
      <section id="home" className="relative">
        <div className="relative w-full h-[55vh] md:h-[calc(100dvh-100px)] min-h-[340px] md:min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src={heroSlides[heroIndex].img}
                alt={heroSlides[heroIndex].alt}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1600&q=80' }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />
            </motion.div>
          </AnimatePresence>

          {/* Slide content */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center text-white px-4 max-w-[600px]"
              >
                <p className="text-[13px] md:text-[15px] uppercase tracking-[3px] mb-3 font-body opacity-90">
                  {heroSlides[heroIndex].subtitle}
                </p>
                <h1 className="font-heading text-[36px] md:text-[56px] lg:text-[64px] font-bold leading-tight mb-6">
                  {heroSlides[heroIndex].title}
                </h1>
                <a
                  href="#best-sellers"
                  className="inline-block px-8 py-3 bg-white text-body font-semibold text-[15px] rounded-pill hover:bg-brown-700 hover:text-white transition-colors duration-200"
                >
                  {heroSlides[heroIndex].cta}
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide indicators — Simple dots */}
        <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === heroIndex
                  ? 'w-6 h-2 bg-white'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="py-8 md:py-12">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12">
          <motion.h2 {...fadeUp} className="font-heading text-center text-[24px] md:text-[32px] text-dark mb-6 md:mb-8">
            Shop by Category
          </motion.h2>
          <motion.div {...staggerContainer} className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-5">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.name + i} cat={cat} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Best Sellers ─── */}
      <section id="best-sellers" className="py-8 md:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12">
          <motion.h2 {...fadeUp} className="font-heading text-center text-[24px] md:text-[32px] text-dark mb-2">
            Best Sellers
          </motion.h2>
          <motion.p {...fadeUp} className="text-center text-body/70 text-[15px] mb-8 md:mb-10 font-body">
            Our most loved 3D printed creations
          </motion.p>
          <motion.div {...staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-5 md:gap-y-8">
            {bestSellers.map((p, i) => (
              <ProductCard key={p.name + i} product={p} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Promotional Banner ─── */}
      <section className="py-8 md:py-12">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12">
          <motion.div {...fadeUp} className="relative overflow-hidden rounded-[16px]">
            <img
              src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1200&q=80"
              alt="Custom 3D Printing"
              className="w-full h-[200px] md:h-[320px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brown-700/80 to-brown-700/40 flex items-center">
              <div className="px-6 md:px-16 text-white max-w-[500px]">
                <h3 className="font-heading text-[22px] md:text-[36px] font-bold leading-tight mb-2 md:mb-3">
                  Custom Orders Welcome
                </h3>
                <p className="text-[14px] md:text-[16px] opacity-90 mb-4 md:mb-6 font-body">
                  Have a unique idea? We'll bring it to life. Send us your design and we'll 3D print it for you.
                </p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2.5 bg-white text-brown-950 font-semibold text-[14px] rounded-pill hover:bg-brown-50 transition-colors"
                >
                  Get a Quote
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── New Arrivals ─── */}
      <section id="new-arrivals" className="py-8 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12">
          <motion.h2 {...fadeUp} className="font-heading text-center text-[24px] md:text-[32px] text-dark mb-2">
            New Arrivals
          </motion.h2>
          <motion.p {...fadeUp} className="text-center text-body/70 text-[15px] mb-8 md:mb-10 font-body">
            Fresh from the print bed — just for you
          </motion.p>
          <motion.div {...staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-5 md:gap-y-8">
            {newArrivals.map((p, i) => (
              <ProductCard key={p.name + i} product={p} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── About / Behind the Scenes ─── */}
      <section id="custom-prints" className="py-8 md:py-16 bg-cream/50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12">
          <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="grid grid-cols-2 gap-3">
              <div className="overflow-hidden rounded-[16px] aspect-[3/4]">
                <img src="/assets/workshop.jpg" alt="Our Workshop" className="w-full h-full object-cover" loading="lazy"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80' }}
                />
              </div>
              <div className="overflow-hidden rounded-[16px] aspect-[3/4] mt-8">
                <img src="/assets/team.jpg" alt="Our Team" className="w-full h-full object-cover" loading="lazy"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80' }}
                />
              </div>
            </div>
            <div>
              <p className="text-brown-700 font-semibold text-[14px] uppercase tracking-wider mb-2 font-body">About Us</p>
              <h2 className="font-heading text-[28px] md:text-[40px] text-dark leading-tight mb-4">
                Behind the Prints
              </h2>
              <p className="text-body text-[16px] leading-relaxed mb-3 font-body">
                At <strong className="text-brown-700">The Little Hood</strong>, we're passionate about transforming digital designs into tangible art. Our small team of 3D printing enthusiasts works out of a cozy workshop, carefully crafting each piece with attention to detail.
              </p>
              <p className="text-body text-[16px] leading-relaxed mb-6 font-body">
                From collectible figurines to custom home decor, we use premium PLA and resin materials to ensure every print meets our high standards. Every piece is hand-finished and quality-checked before shipping.
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-7 py-3 rounded-pill bg-brown-700 text-white font-semibold text-[15px] hover:bg-brown-800 transition-colors"
              >
                Talk to Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Reviews ─── */}
      <section className="py-8 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12">
          <motion.h2 {...fadeUp} className="font-heading text-center text-[24px] md:text-[32px] text-dark mb-8 md:mb-10">
            What Our Customers Say
          </motion.h2>
          <motion.div {...staggerContainer} className="grid md:grid-cols-3 gap-4 md:gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                {...staggerItem}
                className="bg-white border border-brown-100 rounded-[16px] p-5 md:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-[#FFAA47]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-body text-[15px] leading-relaxed mb-4 font-body">"{r.text}"</p>
                <div>
                  <p className="font-semibold text-[14px] text-dark font-body">{r.name}</p>
                  <p className="text-[12px] text-brown-700 font-body">{r.product}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Newsletter ─── */}
      <section className="py-10 md:py-16 bg-brown-700">
        <div className="max-w-[600px] mx-auto px-4 md:px-12 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-[24px] md:text-[32px] text-white mb-2">Stay in the Loop</h2>
            <p className="text-white/80 text-[15px] mb-6 font-body">
              Get notified about new prints, special offers, and behind-the-scenes updates.
            </p>
            <form className="flex gap-2 max-w-[460px] mx-auto" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-pill bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-[15px] font-body focus:outline-none focus:border-white/50"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-pill bg-white text-brown-950 font-semibold text-[14px] hover:bg-brown-50 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ─── Mobile Bottom Navigation Bar ─── */}
      <nav className="fixed bottom-0 left-0 right-0 z-[9990] md:hidden">
        <div
          className="flex items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
          style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            borderTop: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          {[
            { label: 'Home', icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            ), href: '#home' },
            { label: 'Shop', icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
            ), href: '#best-sellers' },
            { label: 'Search', icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            ), action: 'search' },
            { label: 'Orders', icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16h6"/><path d="M19 13v6"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/></svg>
            ), href: WA_LINK, external: true },
            { label: 'Account', icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            ), href: WA_LINK, external: true },
          ].map((item, idx) => {
            const active = idx === 0
            const baseClass = 'flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-all duration-200 active:scale-90'
            const colorClass = active ? 'text-brown-700' : 'text-body/50'
            const labelClass = `text-[10px] font-body font-medium ${active ? 'text-brown-700' : 'text-body/50'}`

            if (item.action === 'search') {
              return (
                <button
                  key={item.label}
                  onClick={() => setSearchOpen(!searchOpen)}
                  className={`${baseClass} ${colorClass}`}
                >
                  {item.icon}
                  <span className={labelClass}>{item.label}</span>
                </button>
              )
            }

            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${baseClass} ${colorClass}`}
                >
                  {item.icon}
                  <span className={labelClass}>{item.label}</span>
                </a>
              )
            }

            return (
              <a
                key={item.label}
                href={item.href}
                className={`${baseClass} ${colorClass}`}
              >
                {item.icon}
                <span className={labelClass}>{item.label}</span>
              </a>
            )
          })}
        </div>
      </nav>

      {/* ─── Footer ─── */}
      <footer
        id="contact"
        className="py-12 md:py-16 pb-24 md:pb-16"
        style={{ background: 'linear-gradient(180deg, rgba(139,84,61,1), rgba(171,117,91,1) 100%)' }}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center mb-4">
                <img src="/assets/logo.jpg" alt="The Little Hood" className="h-14 md:h-16 w-auto rounded" />
              </div>
              <p className="text-white/80 text-[14px] leading-relaxed font-body">
                Handcrafted 3D printed creations. From figurines to custom prints, we bring your ideas to life.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading text-white font-semibold text-[16px] mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Best Sellers', 'New Arrivals', 'Custom Prints', 'About Us'].map(label => (
                  <li key={label}>
                    <a href={`#${label.toLowerCase().replace(/\s+/g, '-')}`} className="text-white/80 text-[14px] font-body hover:text-white transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-heading text-white font-semibold text-[16px] mb-4">Categories</h4>
              <ul className="space-y-2">
                {['Figurines', 'Miniatures', 'Home Decor', 'Keychains', 'Action Figures'].map(label => (
                  <li key={label}>
                    <a href="#" className="text-white/80 text-[14px] font-body hover:text-white transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading text-white font-semibold text-[16px] mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-white/80 text-[14px] font-body hover:text-white transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@thelittlehood.in" className="text-white/80 text-[14px] font-body hover:text-white transition-colors">hello@thelittlehood.in</a>
                </li>
                <li>
                  <a href="https://instagram.com/thelittlehood" target="_blank" rel="noopener noreferrer" className="text-white/80 text-[14px] font-body hover:text-white transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/60 text-[13px] font-body">© 2026 The Little Hood. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-white/60 text-[13px] font-body hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/60 text-[13px] font-body hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-white/60 text-[13px] font-body hover:text-white transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
