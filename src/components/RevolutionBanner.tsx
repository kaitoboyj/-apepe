import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Users, Shield, Eye, Gift } from 'lucide-react'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export default function RevolutionBanner() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        x: -60,
        opacity: 0,
        duration: 0.8,
      })
      gsap.from(centerRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
      })
      gsap.from(rightRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        x: 60,
        opacity: 0,
        duration: 0.8,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const badges = [
    { icon: Users, label: 'STRONG COMMUNITY' },
    { icon: Shield, label: 'FAIR LAUNCH' },
    { icon: Eye, label: 'LONG TERM VISION' },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-2xl bg-gradient-to-b from-apepe-card to-apepe-bg border border-apepe-border overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-apepe-green/60 to-transparent" />

          <div className="grid lg:grid-cols-12 gap-6 p-6 lg:p-10 items-center">
            {/* Left - Image */}
            <motion.div
              ref={leftRef}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3 relative"
            >
              <div className="relative rounded-xl overflow-hidden border border-apepe-green/20">
                <img
                  src="/assets/logo.jpg"
                  alt="$APEPE Revolution"
                  className="w-full h-48 lg:h-64 object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-apepe-bg/80 via-transparent to-transparent" />
                {/* Rocket emoji overlay */}
                <div className="absolute bottom-3 left-3 text-2xl">🚀</div>
              </div>
            </motion.div>

            {/* Center - Main Text */}
            <div ref={centerRef} className="lg:col-span-5 text-center space-y-4">
              <h3 className="text-gray-400 font-bold text-sm uppercase tracking-[0.3em]">
                THE MEME REVOLUTION
              </h3>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none">
                <span className="text-white">HAS </span>
                <span className="gradient-text">BEGUN</span>
              </h2>
              <div className="inline-block px-6 py-1 bg-apepe-green/10 border border-apepe-green/30 rounded-full">
                <span className="font-marker text-xl text-apepe-green">$APEPE</span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                {badges.map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-apepe-bg/80 border border-apepe-border rounded-full"
                  >
                    <badge.icon className="w-3.5 h-3.5 text-apepe-green" />
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Description */}
            <motion.div
              ref={rightRef}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-4 space-y-5"
            >
              <p className="text-gray-400 text-sm leading-relaxed">
                $APEPE is more than just a meme. It's a movement, a community, and
                a vision for the future.
              </p>
              <div>
                <h4 className="text-xl font-black text-apepe-green mb-3">
                  JOIN THE MOVEMENT.
                </h4>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://t.me/+jainc8Q3gqJhYmI0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2.5 bg-transparent border-2 border-apepe-green text-apepe-green text-sm font-bold rounded-full hover:bg-apepe-green hover:text-apepe-bg transition-all duration-300"
                  >
                    BE PART OF HISTORY
                  </a>
                  <a
                    href="https://pegswap.xyz/apepe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-600/15 border-2 border-purple-500/40 text-purple-400 text-sm font-bold rounded-full hover:bg-purple-600/25 hover:border-purple-500 transition-all duration-300"
                  >
                    <Gift size={16} />
                    Claim
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
