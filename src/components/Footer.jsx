import { Link } from 'react-router-dom'
import { siteConfig } from '../config/site'

export default function Footer() {
  return (
    <footer className="w-full mt-20 border-t border-[#3a4a46]/15 bg-[#0e0e0e]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8 md:px-12 py-16 w-full max-w-[1440px] mx-auto">
        {/* Brand */}
        <div className="space-y-6">
          <div className="text-lg font-bold text-[#e5e2e1] font-headline uppercase tracking-tighter">
            {siteConfig.name}
          </div>
          <p className="font-body text-xs tracking-widest uppercase text-[#83948f] leading-relaxed max-w-xs">
            Crafting the future of additive manufacturing through technical precision and artistic vision.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h5 className="font-body text-xs tracking-widest uppercase text-[#83948f] mb-6">Connect</h5>
            <ul className="space-y-4">
              <li>
                <a
                  href={siteConfig.social.instagram}
                  className="font-body text-xs tracking-widest uppercase text-[#83948f] hover:text-[#ffe16d] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  className="font-body text-xs tracking-widest uppercase text-[#83948f] hover:text-[#ffe16d] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-body text-xs tracking-widest uppercase text-[#83948f] mb-6">Legal</h5>
            <ul className="space-y-4">
              <li>
                <a href="#" className="font-body text-xs tracking-widest uppercase text-[#83948f] hover:text-[#ffe16d] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="font-body text-xs tracking-widest uppercase text-[#83948f] hover:text-[#ffe16d] transition-colors">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right col */}
        <div className="flex flex-col justify-between items-start md:items-end">
          <div className="font-body text-xs tracking-widest uppercase text-[#83948f] leading-loose text-left md:text-right">
            © {new Date().getFullYear()} {siteConfig.name}.<br />
            Made in Bengaluru.
          </div>
          <div className="mt-8 flex gap-4">
            <div className="w-8 h-8 rounded-full border border-outline-variant/30 flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <div className="w-8 h-8 rounded-full border border-outline-variant/30 flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>token</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
