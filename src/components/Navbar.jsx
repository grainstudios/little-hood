import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { siteConfig, WHATSAPP_URL } from '../config/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { to: '/gallery', label: 'Gallery' },
    { to: '/process', label: 'Process' },
    { to: WHATSAPP_URL, label: 'WhatsApp Inquiry', external: true },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-900/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]'
          : 'bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold tracking-tighter text-[#e5e2e1] font-headline"
        >
          {siteConfig.name}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.to}
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                className="font-headline tracking-tight text-sm uppercase font-medium text-[#e5e2e1] hover:text-[#00f5d4] transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className={`font-headline tracking-tight text-sm uppercase font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-[#00f5d4] border-b border-[#00f5d4] pb-1'
                    : 'text-[#e5e2e1] hover:text-[#00f5d4]'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Order Now CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex bg-primary-container text-on-primary-container px-5 py-2 font-headline text-sm uppercase font-bold tracking-widest hover:opacity-80 transition-all duration-300 scale-95 active:scale-90 rounded-sm"
        >
          Order Now
        </a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-[#e5e2e1] transition-transform duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#e5e2e1] transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#e5e2e1] transition-transform duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-900/95 backdrop-blur-xl border-t border-outline-variant/20 px-6 py-6 space-y-4">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.to}
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-headline tracking-tight text-sm uppercase text-[#e5e2e1] hover:text-[#00f5d4] py-2"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="block font-headline tracking-tight text-sm uppercase text-[#e5e2e1] hover:text-[#00f5d4] py-2"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-primary-container text-on-primary-container px-5 py-3 font-headline text-sm uppercase font-bold tracking-widest text-center rounded-sm mt-4"
            onClick={() => setMenuOpen(false)}
          >
            Order Now
          </a>
        </div>
      )}
    </nav>
  )
}
