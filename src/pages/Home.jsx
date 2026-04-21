import { Link } from 'react-router-dom'
import { WHATSAPP_URL, WHATSAPP_NUMBER, whatsappMsg } from '../config/site'

const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg(''))}`

export default function Home() {
  return (
    <main className="relative">
      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden precision-grid pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10" />
        <div className="container mx-auto px-6 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 text-left">
            <span className="font-label text-secondary-fixed text-xs uppercase tracking-[0.3em] mb-4 block">
              3D Printed with Care
            </span>
            <h1 className="font-headline text-6xl md:text-7xl lg:text-8xl font-black text-on-surface leading-tight tracking-tighter mb-6">
              The Little Hood
            </h1>
            <p className="font-body text-2xl md:text-3xl lg:text-4xl text-on-surface-variant max-w-xl mb-10 leading-tight font-headline font-light">
              Browse our catalog → Order on WhatsApp → We print & deliver
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline text-sm uppercase font-bold px-10 py-4 rounded-sm hover:shadow-[0_0_20px_rgba(0,245,212,0.3)] transition-all inline-block"
              >
                Browse Catalog & Order on WhatsApp
              </a>
              <Link
                to="/gallery"
                className="border border-outline-variant bg-surface-container-lowest text-on-surface font-headline text-sm uppercase font-bold px-10 py-4 rounded-sm hover:bg-surface-container-low transition-all inline-block"
              >
                View Gallery
              </Link>
            </div>
          </div>

          {/* Hero visual */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-primary-container/20 rounded-full blur-[120px]" />
              <div className="relative z-10 w-full h-full p-4">
                <img
                  alt="3D printer in action"
                  className="w-full h-full object-cover rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                  src="https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80"
                />
                <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-lg border border-outline-variant/15 max-w-[200px]">
                  <span className="text-[10px] uppercase tracking-widest text-outline block mb-1">Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                    <span className="font-headline text-sm font-medium">Printing at 25μm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Bento ─────────────────────────── */}
      <section className="py-24 relative bg-surface-container-lowest">
        <div className="container mx-auto px-6">
          <div className="mb-20 max-w-2xl">
            <h2 className="font-headline text-4xl font-bold mb-4">Engineered Excellence</h2>
            <p className="text-on-surface-variant">
              We bring you a curated collection of 3D printed products — from art pieces to functional parts, all crafted with precision.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 — large */}
            <div className="md:col-span-2 group relative overflow-hidden bg-surface-container-low rounded-lg p-10 flex flex-col justify-between min-h-[400px]">
              <div className="relative z-10">
                <span className="material-symbols-outlined text-primary-container text-4xl mb-6">layers</span>
                <h3 className="font-headline text-3xl font-bold mb-4">Custom Materials</h3>
                <p className="text-on-surface-variant max-w-md leading-relaxed">
                  From aerospace-grade polymers to intricate carbon-fiber composites, we print in materials that redefine durability and aesthetics.
                </p>
              </div>
              <img
                alt="3D printer at work"
                className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                src="https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=600&q=80"
              />
            </div>

            {/* Feature 2 */}
            <div className="bg-surface-container-highest rounded-lg p-10 flex flex-col">
              <span className="material-symbols-outlined text-secondary-fixed text-4xl mb-6">biotech</span>
              <h3 className="font-headline text-2xl font-bold mb-4">Precision Printing</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
                Achieving tolerances of 0.05mm. Every layer is a testament to our commitment to absolute mechanical accuracy.
              </p>
              <div className="mt-auto border-t border-outline-variant/20 pt-6">
                <span className="font-headline text-xs uppercase tracking-widest text-secondary-fixed">24/7 Monitoring</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-surface-container-high rounded-lg p-10 flex flex-col md:col-span-1">
              <span className="material-symbols-outlined text-primary-container text-4xl mb-6">brush</span>
              <h3 className="font-headline text-2xl font-bold mb-4">Artistic Finishes</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Hand-polished, chrome-plated, or custom-painted. We turn raw 3D prints into gallery-ready masterpieces.
              </p>
            </div>

            {/* Feature 4 — CTA row */}
            <div className="md:col-span-2 bg-gradient-to-r from-surface-container-low to-surface-container-high rounded-lg p-10 flex items-center justify-between">
              <div className="max-w-md">
                <h3 className="font-headline text-2xl font-bold mb-2">Ready to Order?</h3>
                <p className="text-on-surface-variant text-sm">
                  Browse our catalog and place your order directly on WhatsApp — we print it and deliver to your door.
                </p>
              </div>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="material-symbols-outlined text-primary-container text-6xl opacity-20 hover:opacity-50 transition-opacity"
              >
                rocket_launch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────── */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="font-headline text-4xl font-bold mb-4">How It Works</h2>
            <div className="w-20 h-1 bg-primary-container mx-auto" />
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-0 w-full h-px bg-outline-variant/20 z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
              {[
                { step: '01', icon: 'inventory_2', title: 'Browse Catalog', desc: "Explore our curated collection of 3D printed products. Find what you like and order directly on WhatsApp." },
                { step: '02', icon: 'query_stats', title: 'We Print It', desc: 'Our studio prepares your selected item for printing with precision and care.' },
                { step: '03', icon: 'precision_manufacturing', title: 'Quality Check', desc: 'Every piece is inspected under 10x magnification before packaging.' },
                { step: '04', icon: 'local_shipping', title: 'Delivered to You', desc: 'Secure, shock-proof packaging with delivery across India.' },
              ].map(({ step, icon, title, desc }) => (
                <div key={step} className="text-center group">
                  <div className="w-20 h-20 bg-surface-container-highest rounded-sm flex items-center justify-center mx-auto mb-8 border border-outline-variant/30 group-hover:border-primary-container transition-all">
                    <span className="material-symbols-outlined text-primary-container text-3xl">{icon}</span>
                  </div>
                  <span className="font-headline text-xs text-secondary-fixed uppercase tracking-widest mb-2 block">Step {step}</span>
                  <h4 className="font-headline text-xl font-bold mb-3">{title}</h4>
                  <p className="text-on-surface-variant text-sm px-4">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ─────────────────────────────── */}
      <section className="border-y border-outline-variant/10 bg-surface-container-low/50 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-8 py-12 flex flex-wrap justify-between gap-12">
          {[
            { value: '99.8%', label: 'Print Success Rate' },
            { value: '40+', label: 'Industrial Materials' },
            { value: '15k', label: 'Parts Shipped' },
            { value: '<0.05', label: 'Tolerance (mm)' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col">
              <span className="text-primary font-headline text-4xl font-black">{value}</span>
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mt-1">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
