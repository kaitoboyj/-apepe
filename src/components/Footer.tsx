import { Shield, Lock, Search, BarChart3, Send, Gift, Twitter, Github, Instagram, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(linksRef.current?.children || [], {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      })
    }, footerRef)
    return () => ctx.revert()
  }, [])
  const trustBadges = [
    { icon: Shield, label: '100% COMMUNITY FOCUSED' },
    { icon: Lock, label: 'LIQUIDITY LOCKED' },
    { icon: Search, label: 'TRANSPARENT & SAFE' },
    { icon: BarChart3, label: 'BUILT FOR LONG TERM' },
  ]

  return (
    <footer ref={footerRef} id="community" className="relative pt-10 pb-6">
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-apepe-green/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10"
        >
          <div ref={linksRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-3 p-4 rounded-xl bg-apepe-card border border-apepe-border hover:border-apepe-green/40 transition-all duration-300"
              >
                <badge.icon className="w-5 h-5 text-apepe-green flex-shrink-0" />
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>

          {/* $APEPE TO THE TOP badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <a
              href="https://x.com/apepe_wls?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              <Twitter size={18} />
              Follow Twitter
            </a>
            <a
              href="https://t.me/+jainc8Q3gqJhYmI0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-apepe-green/10 border border-apepe-green/40 rounded-lg hover:bg-apepe-green/20 transition-all duration-300 group"
            >
              <img
                src="/assets/logo.jpg"
                alt="$APEPE"
                className="w-7 h-7 rounded-full border border-apepe-green/30"
              />
              <span className="font-marker text-sm text-apepe-green group-hover:text-apepe-green">
                $APEPE TO THE TOP
              </span>
              <span className="text-lg">🚀</span>
            </a>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-10 rounded-2xl bg-gradient-to-b from-apepe-card to-transparent border border-apepe-border mb-8"
        >
          <h2 className="font-marker text-4xl sm:text-5xl text-apepe-green neon-text mb-4">
            $APEPE TO THE TOP
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Join the revolution. Be part of the community that's changing the
            game.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://pegswap.xyz/apepe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600/15 border-2 border-purple-500/40 text-purple-400 font-bold rounded-full hover:bg-purple-600/25 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300"
            >
              <Gift size={18} />
              Claim $APEPE
            </a>
            <a
              href="https://t.me/+jainc8Q3gqJhYmI0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-apepe-green text-apepe-bg font-black rounded-full hover:shadow-[0_0_30px_rgba(57,255,20,0.5)] hover:scale-105 transition-all duration-300"
            >
              <Send size={18} />
              Join Telegram
            </a>
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-apepe-border">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo.jpg"
              alt="$APEPE"
              className="w-10 h-10 rounded-full border border-apepe-green/30"
            />
            <span className="font-marker text-xl text-apepe-green">$APEPE</span>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} $APEPE. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/apepe_wls?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://t.me/+jainc8Q3gqJhYmI0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-apepe-green transition-colors"
            >
              <Send size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
