import { useState } from 'react'
import { Link } from 'react-router-dom'
import { galleryProducts, WHATSAPP_NUMBER, whatsappMsg } from '../config/site'

const categories = ['All Objects', 'Art & Decor', 'Industrial', 'Architectural', 'Custom Jewelry']
const materials = ['All', 'Resin', 'Nylon', 'PLA', 'Castable Wax']

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All Objects')
  const [activeMaterial, setActiveMaterial] = useState('All')

  const filtered = galleryProducts.filter((p) => {
    const catMatch = activeCategory === 'All Objects' || p.category === activeCategory
    const matMatch = activeMaterial === 'All' || p.material.toLowerCase().includes(activeMaterial.toLowerCase())
    return catMatch && matMatch
  })

  const getWhatsAppLink = (product) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg(product.name))}`

  return (
    <main className="pt-32 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto relative min-h-screen bg-grid-pattern">
      {/* Header */}
      <header className="mb-16">
        <span className="label-md uppercase tracking-[0.3em] text-secondary-fixed font-headline text-xs block mb-4">
          Precision Engineering
        </span>
        <h1 className="font-headline text-5xl md:text-7xl font-light tracking-tight text-on-surface max-w-4xl">
          The Curated <span className="text-primary-fixed">Collection</span>
        </h1>
        <div className="w-24 h-px bg-outline-variant mt-8 opacity-30" />
      </header>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-8 mb-12 items-start md:items-center justify-between">
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs font-headline uppercase tracking-widest transition-all ${
                activeCategory === cat
                  ? 'bg-primary-container text-on-primary-container'
                  : 'bg-surface-container-low text-on-surface border border-outline-variant/15 hover:bg-primary-container hover:text-on-primary-container'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">filter_list</span>
          <select
            value={activeMaterial}
            onChange={(e) => setActiveMaterial(e.target.value)}
            className="bg-surface-container-lowest border-none text-xs font-headline uppercase tracking-widest pl-10 pr-8 py-2 focus:ring-1 focus:ring-primary/20 appearance-none text-on-surface-variant cursor-pointer rounded-sm"
          >
            {materials.map((m) => (
              <option key={m} value={m}>{m === 'All' ? 'Material: All' : m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-20 text-outline">
            <span className="material-symbols-outlined text-5xl mb-4 block">search_off</span>
            <p className="font-headline text-sm uppercase tracking-widest">No objects match the selected filters</p>
          </div>
        ) : (
          filtered.map((product, i) => {
            const isLarge = i === 0
            return (
              <article
                key={product.id}
                className={`group relative bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/10 shadow-2xl ${
                  isLarge ? 'md:col-span-8' : 'md:col-span-4'
                }`}
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className={`overflow-hidden relative ${isLarge ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}>
                    <img
                      alt={product.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                      src={product.images[0]}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80" />
                  </div>
                  <div className={`absolute bottom-0 left-0 p-6 md:p-8 w-full flex justify-between items-end ${isLarge ? '' : 'flex-col items-start gap-4'}`}>
                    <div className="max-w-md">
                      <span className="text-secondary-fixed font-headline text-[10px] tracking-[0.3em] uppercase mb-2 block">
                        {product.category}
                      </span>
                      <h3 className={`font-headline font-light tracking-tight text-on-surface mb-2 ${isLarge ? 'text-3xl' : 'text-xl'}`}>
                        {product.name}
                      </h3>
                      {isLarge && (
                        <p className="text-on-surface-variant text-sm font-body leading-relaxed mb-4">
                          {product.description}
                        </p>
                      )}
                      <div className="flex gap-4 text-[10px] font-headline uppercase tracking-widest text-outline">
                        <span>Material: {product.material}</span>
                      </div>
                    </div>
                    <a
                      href={getWhatsAppLink(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-primary-container text-on-primary-container p-3 md:p-4 rounded-sm flex items-center justify-center hover:bg-primary transition-all shrink-0"
                    >
                      <span className="material-symbols-outlined text-xl">chat</span>
                    </a>
                  </div>
                </Link>
              </article>
            )
          })
        )}
      </div>

      {/* Load More */}
      <div className="mt-20 flex flex-col items-center">
        <button className="group flex items-center gap-4 py-4 px-10 border border-outline-variant/30 rounded-sm hover:border-primary-container transition-all">
          <span className="font-headline text-xs uppercase tracking-[0.3em]">Examine More Objects</span>
          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </div>
    </main>
  )
}
