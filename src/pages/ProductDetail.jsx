import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { galleryProducts, WHATSAPP_NUMBER, whatsappMsg } from '../config/site'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = galleryProducts.find((p) => p.id === id)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedMaterial, setSelectedMaterial] = useState(
    product?.materials?.find((m) => m.selected) || product?.materials?.[0]
  )

  if (!product) {
    return (
      <main className="pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center">
        <span className="material-symbols-outlined text-6xl text-outline mb-6">error_404</span>
        <h1 className="font-headline text-3xl font-bold mb-4">Object Not Found</h1>
        <Link to="/gallery" className="text-primary-container font-headline uppercase tracking-widest text-sm hover:opacity-70">
          ← Return to Gallery
        </Link>
      </main>
    )
  }

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg(product.name))}`

  const related = galleryProducts.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 3)

  const otherRelated = related.length < 3
    ? [
        ...related,
        ...galleryProducts.filter((p) => p.id !== product.id && !related.find((r) => r.id === p.id)).slice(0, 3 - related.length),
      ]
    : related

  return (
    <main className="precision-grid pt-32 pb-20 px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-outline text-xs font-headline uppercase tracking-widest">
        <Link to="/" className="hover:text-primary-container transition-colors">Home</Link>
        <span>/</span>
        <Link to="/gallery" className="hover:text-primary-container transition-colors">Gallery</Link>
        <span>/</span>
        <span className="text-on-surface">{product.name}</span>
      </div>

      {/* Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Image Gallery */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Image */}
          <div className="relative group aspect-[4/5] overflow-hidden rounded-lg bg-surface-container-low shadow-2xl">
            <img
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={product.images[selectedImage] || product.images[0]}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
          </div>

          {/* Thumbnail Strip */}
          <div className="grid grid-cols-2 gap-6">
            {(product.images.slice(0, 2) || []).map((img, i) => (
              <div
                key={i}
                className="aspect-square bg-surface-container-highest rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(i)}
              >
                <img
                  alt={`${product.name} view ${i + 1}`}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    selectedImage === i ? 'grayscale-0' : 'grayscale hover:grayscale-0'
                  }`}
                  src={img}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-10">
          {/* Header */}
          <header className="space-y-4">

            <h1 className="text-5xl md:text-6xl font-headline font-light text-on-surface tracking-tighter leading-none">
              {product.name.split(' ')[0]}<br />
              <span className="text-primary-container font-bold">
                {product.name.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">
              {product.description}
            </p>
          </header>

          {/* Tech Specs Bento */}
          <div className="grid grid-cols-2 gap-4">
            {product.specs.map((spec) => (
              <div key={spec.label} className="p-6 bg-surface-container-low rounded-lg border border-outline-variant/10">
                <span className="text-[10px] uppercase tracking-widest text-outline font-headline block mb-2">
                  {spec.label}
                </span>
                <span className="text-xl font-headline text-on-surface">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Material Selection */}
          {product.materials && product.materials.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-secondary-fixed font-headline">
                Material Configuration
              </h3>
              <div className="space-y-3">
                {product.materials.map((mat) => (
                  <button
                    key={mat.name}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`w-full flex items-center justify-between p-4 rounded-sm transition-all ${
                      selectedMaterial?.name === mat.name
                        ? 'bg-surface-container-highest border-l-2 border-primary-container'
                        : 'bg-surface-container-low hover:bg-surface-container-high border-l-2 border-transparent'
                    }`}
                  >
                    <div className="text-left">
                      <span className="block text-on-surface font-medium">{mat.name}</span>
                      <span className="text-xs text-outline">{mat.detail}</span>
                    </div>
                    <span className={`material-symbols-outlined ${selectedMaterial?.name === mat.name ? 'text-primary-container' : 'text-outline-variant'}`}>
                      {selectedMaterial?.name === mat.name ? 'check_circle' : 'circle'}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Price & CTA */}
          <div className="pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-headline text-3xl font-bold text-on-surface">{product.price}</span>
              <span className="text-outline text-xs uppercase tracking-widest">{product.material}</span>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-primary-container text-on-primary-container py-5 rounded-sm font-headline text-base uppercase font-extrabold tracking-[0.2em] shadow-[0_0_20px_-5px_rgba(0,245,212,0.4)] hover:shadow-[0_0_30px_-5px_rgba(0,245,212,0.6)] transition-all flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined">chat</span>
              WhatsApp Inquiry
            </a>
            <p className="text-center text-[10px] text-outline uppercase tracking-widest">
              Delivery across India: 3-7 business days
            </p>
          </div>
        </div>
      </div>

      {/* Related Objects */}
      {otherRelated.length > 0 && (
        <section className="mt-40 space-y-12">
          <div className="flex items-end justify-between border-b border-outline-variant/20 pb-6">
            <div className="space-y-2">
              <span className="text-secondary-fixed text-[10px] tracking-[0.3em] uppercase font-headline">
                Curated Collection
              </span>
              <h2 className="text-4xl font-headline font-light tracking-tighter">
                Related <span className="font-bold italic">Artifacts</span>
              </h2>
            </div>
            <Link
              to="/gallery"
              className="text-primary-fixed text-xs uppercase tracking-widest font-headline flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              View Archive
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherRelated.map((rel) => (
              <Link
                key={rel.id}
                to={`/product/${rel.id}`}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-lg bg-surface-container mb-4 relative">
                  <img
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src={rel.images[0]}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-headline text-lg font-medium">{rel.name}</h4>
                    <p className="text-xs text-outline uppercase tracking-widest">{rel.material}</p>
                  </div>
                  <span className="text-on-surface font-headline font-light">{rel.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
