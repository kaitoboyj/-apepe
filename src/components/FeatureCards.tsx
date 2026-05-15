import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Zap, Hand, TrendingUp, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export default function FeatureCards() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const cards = [
    {
      icon: Hand,
      title: 'BUILT FOR',
      titleAccent: 'THE COMMUNITY',
      desc: '$APEPE is community-driven and backed by diamond hands. Together, we build the future.',
      image: '/assets/logo.jpg',
      accent: 'apepe-green',
    },
    {
      icon: Zap,
      title: 'FAST. LOW FEES.',
      titleAccent: 'MULTICHAIN NATIVE.',
      desc: 'Native support for Solana, Ethereum, Polygon, BSC, and more. Experience the ultimate flexibility.',
      accent: 'apepe-solana',
      chains: true,
    },
    {
      icon: TrendingUp,
      title: 'HOLD $APEPE',
      titleAccent: 'SHAPE THE FUTURE',
      desc: 'Your hold is your power. Your belief is our fuel. Together we rise.',
      accent: 'apepe-green',
    },
  ]

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-14"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-5"
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative rounded-2xl bg-apepe-card border border-apepe-border p-6 hover:border-apepe-green/60 transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-apepe-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-apepe-green/10 group-hover:bg-apepe-green/20 transition-colors">
                    <card.icon className="w-5 h-5 text-apepe-green" />
                  </div>
                  {i === 0 && (
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full border-2 border-apepe-green/40 overflow-hidden bg-apepe-bg">
                        <img
                          src={card.image}
                          alt="$APEPE"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -inset-1 rounded-full border border-apepe-green/20 animate-pulse" />
                    </div>
                  )}
                  {i === 2 && (
                    <div className="w-12 h-12 rounded-full bg-apepe-green/10 flex items-center justify-center border border-apepe-green/30">
                      <Rocket className="w-5 h-5 text-apepe-green" />
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <h3 className="text-lg font-black text-white uppercase leading-tight">
                    {card.title}
                  </h3>
                  {card.titleAccent && (
                    <h4 className="text-lg font-black text-apepe-green uppercase leading-tight">
                      {card.titleAccent}
                    </h4>
                  )}
                </div>

                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  {card.desc}
                </p>

                {card.chains && (
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-apepe-border">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-apepe-solana/10 border border-apepe-solana/30 flex items-center justify-center">
                        <svg viewBox="0 0 32 32" className="w-4 h-4">
                          <path d="M4 16.5L8 12.5L16 20.5L24 12.5L28 16.5L16 28.5L4 16.5Z" fill="#00ffa3" />
                        </svg>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-apepe-ethereum/10 border border-apepe-ethereum/30 flex items-center justify-center">
                        <svg viewBox="0 0 32 32" className="w-4 h-4">
                          <path d="M16 2L15.5 3.5V21L16 21.5L25 16L16 2Z" fill="#627eea" />
                        </svg>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-apepe-polygon/10 border border-apepe-polygon/30 flex items-center justify-center overflow-hidden">
                        <img src="/assets/polygon.png" alt="Polygon" className="w-5 h-5 object-contain" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-apepe-bsc/10 border border-apepe-bsc/30 flex items-center justify-center overflow-hidden">
                        <img src="/assets/bnb.png" alt="BSC" className="w-5 h-5 object-contain" />
                      </div>
                    </div>
                    <div className="flex-1 h-px bg-apepe-border" />
                    <div className="flex gap-1">
                      {[1, 2, 3].map((b) => (
                        <div
                          key={b}
                          className="w-1.5 h-1.5 rounded-full bg-apepe-green animate-pulse"
                          style={{ animationDelay: `${b * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
