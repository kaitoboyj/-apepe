import { useEffect, useState } from 'react'
import { Send, Menu, X, Gift } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Features', href: '#features' },
    { label: 'Community', href: '#community' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-apepe-bg/90 backdrop-blur-lg border-b border-apepe-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src="/assets/logo.jpg"
              alt="$APEPE Logo"
              className="w-12 h-12 rounded-full border-2 border-apepe-green/50 group-hover:border-apepe-green transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]"
            />
            <span className="font-marker text-2xl text-apepe-green tracking-wider">
              $APEPE
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-300 hover:text-apepe-green transition-colors duration-300 text-sm font-medium uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://pegswap.xyz/apepe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-purple-600/15 border border-purple-500/40 rounded-full text-purple-400 hover:bg-purple-600/25 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300"
            >
              <Gift size={16} />
              <span className="text-sm font-semibold">Claim</span>
            </a>
            <a
              href="https://t.me/+jainc8Q3gqJhYmI0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-apepe-green/10 border border-apepe-green/50 rounded-full text-apepe-green hover:bg-apepe-green/20 hover:border-apepe-green hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all duration-300"
            >
              <Send size={16} />
              <span className="text-sm font-semibold">Join Telegram</span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-apepe-green"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-apepe-bg/95 backdrop-blur-lg border-t border-apepe-border"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-gray-300 hover:text-apepe-green transition-colors text-lg font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://pegswap.xyz/apepe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-600/15 border border-purple-500/40 rounded-full text-purple-400 mt-2"
              >
                <Gift size={16} />
                <span className="text-sm font-semibold">Claim</span>
              </a>
              <a
                href="https://t.me/+jainc8Q3gqJhYmI0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-apepe-green/10 border border-apepe-green/50 rounded-full text-apepe-green mt-2"
              >
                <Send size={16} />
                <span className="text-sm font-semibold">Join Telegram</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
