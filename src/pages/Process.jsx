import { Link } from 'react-router-dom'
import { WHATSAPP_URL, WHATSAPP_NUMBER, siteConfig, whatsappMsg } from '../config/site'

const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg(''))}`

export default function Process() {
  return (
    <main className="pt-32 precision-grid min-h-screen">
      {/* ── Hero ─────────────────────────────────── */}
      <section className="px-6 md:px-8 max-w-[1440px] mx-auto mb-32">
        <div className="max-w-4xl">
          <span className="font-label text-primary uppercase tracking-[0.3em] text-xs mb-4 block">
            Craftsmanship Reimagined
          </span>
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter mb-8 leading-none">
            Browse & Order.<br />
            <span className="text-primary-container font-medium italic">We Print & Deliver.</span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
            A simple process — browse our catalog, pick what you like, and we'll handle the rest.
          </p>
        </div>
      </section>

      {/* ── Process Steps ────────────────────────── */}
      <section className="px-6 md:px-8 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 mb-40">
        {/* Step 1 */}
        <div className="md:col-span-7 bg-surface-container-low p-10 flex flex-col justify-between group overflow-hidden relative">
          <div className="relative z-10">
            <span className="text-primary-container font-headline text-4xl font-bold opacity-30">01</span>
            <h3 className="font-headline text-3xl mt-4 mb-4">Browse the Catalog</h3>
            <p className="text-on-surface-variant max-w-sm">
              Explore our curated collection of 3D printed products. Browse the gallery, find what you love, and place your order directly on WhatsApp.
            </p>
          </div>
          <div className="mt-12 flex items-center gap-4 text-primary text-sm font-label uppercase tracking-widest">
            <span>Explore Collection</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary-container/5 rounded-full blur-3xl group-hover:bg-primary-container/10 transition-colors duration-700" />
        </div>

        {/* Step 2 */}
        <div className="md:col-span-5 bg-surface-container-highest p-10 flex flex-col justify-between border-l-4 border-secondary-fixed">
          <div>
            <span className="text-secondary-fixed font-headline text-4xl font-bold opacity-30">02</span>
            <h3 className="font-headline text-3xl mt-4 mb-4">Confirm Your Order</h3>
            <p className="text-on-surface-variant">
              Once you've selected your items from our catalog, confirm your order details and preferred material on WhatsApp.
            </p>
          </div>
          <div className="mt-8 aspect-square w-full rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <img
              alt="3D printer at work"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=600&q=80"
            />
          </div>
        </div>

        {/* Step 3 */}
        <div className="md:col-span-4 bg-surface-container-low p-10 flex flex-col justify-between">
          <div>
            <span className="text-primary-container font-headline text-4xl font-bold opacity-30">03</span>
            <h3 className="font-headline text-3xl mt-4 mb-4">Production</h3>
            <p className="text-on-surface-variant">
              Your order goes into production. We use high-quality FDM and resin printers to ensure every piece meets our quality standards.
            </p>
          </div>
          <div className="mt-8">
            <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-primary-container w-2/3" />
            </div>
            <span className="text-[10px] uppercase tracking-tighter text-outline mt-2 block">System Status: Active</span>
          </div>
        </div>

        {/* Steps 4 & 5 combined */}
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-high p-10 flex flex-col justify-between">
            <div>
              <span className="text-primary-container font-headline text-4xl font-bold opacity-30">04</span>
              <h3 className="font-headline text-3xl mt-4 mb-4">Artisan Finishing</h3>
              <p className="text-on-surface-variant">
                Manual sanding, chemical smoothing, and custom automotive-grade coatings for a gallery-ready surface.
              </p>
            </div>
          </div>
          <div className="bg-primary-container text-on-primary-container p-10 flex flex-col justify-between">
            <div>
              <span className="font-headline text-4xl font-bold opacity-30">05</span>
              <h3 className="font-headline text-3xl mt-4 mb-4">Dispatch</h3>
              <p className="opacity-80 text-on-primary-container">
                White-glove delivery across all major Indian metros. Secure, shock-proof packaging engineered for fragile geometry.
              </p>
            </div>
            <div className="mt-12 flex justify-end">
              <span className="material-symbols-outlined text-6xl opacity-40">local_shipping</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Inquiry & Location ─────────────────── */}
      <section className="px-6 md:px-8 max-w-[1440px] mx-auto mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          {/* WhatsApp Focus */}
          <div className="space-y-12">
            <div>
              <h2 className="font-headline text-5xl font-light mb-6">
                Start a <span className="text-primary-container">Conversation.</span>
              </h2>
              <p className="text-on-surface-variant text-lg">
                Have questions or ready to order? Chat with us directly on WhatsApp — we're happy to help.
              </p>
            </div>

            <a
              className="group flex items-center justify-between bg-surface-container-highest p-8 rounded-lg hover:bg-surface-container transition-colors border border-outline-variant/10"
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#25D366] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                </div>
                <div>
                  <span className="font-headline text-2xl block">WhatsApp Inquiries</span>
                  <span className="text-outline text-sm uppercase tracking-widest">Available Mon—Sat: 10AM—7PM IST</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary-container group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </a>

            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <span className="font-label text-xs uppercase text-outline tracking-widest block mb-4">Direct Email</span>
                <a className="text-xl font-headline hover:text-primary-container transition-colors" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <span className="font-label text-xs uppercase text-outline tracking-widest block mb-4">Studio Line</span>
                <a className="text-xl font-headline hover:text-primary-container transition-colors" href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="relative group">
            <div className="absolute -top-10 -left-10 w-32 h-32 border-t border-l border-outline-variant/30 pointer-events-none" />
            <div className="bg-surface-container-low p-2 rounded-lg">
              <div className="h-[500px] w-full bg-surface-container-lowest relative overflow-hidden rounded-sm">
                <img
                  alt="Filament spools"
                  className="w-full h-full object-cover opacity-40 grayscale contrast-125"
                  src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80"
                />
                {/* Pin overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-4 h-4 bg-primary-container rounded-full animate-ping absolute inset-0" />
                    <div className="w-4 h-4 bg-primary-container rounded-full relative z-10 border-4 border-background" />
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-surface-container-highest px-4 py-2 rounded shadow-2xl border border-outline-variant/20">
                      <span className="font-headline text-xs font-bold uppercase tracking-widest">The Little Hood Studio HQ</span>
                      <p className="text-[10px] text-outline">Whitefield, Bengaluru 560066</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex items-start gap-4">
              <span className="material-symbols-outlined text-primary-container">location_on</span>
              <div>
                <p className="font-headline text-xl mb-1">Bengaluru Creative Hub</p>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {siteConfig.address.line1}<br />
                  {siteConfig.address.line2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
