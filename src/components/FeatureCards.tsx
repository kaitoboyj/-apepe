import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Zap, Hand, TrendingUp, Rocket, Sparkles } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

function TiltCard({ card, i }: { card: any; i: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-8 hover:border-apepe-green/50 transition-colors duration-500 overflow-hidden flex flex-col min-h-[400px]"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-apepe-green/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* 3D Content Elements */}
      <div style={{ transform: 'translateZ(50px)' }} className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-8">
          <div className="p-4 rounded-2xl bg-apepe-green/10 group-hover:bg-apepe-green/20 group-hover:scale-110 transition-all duration-300">
            <card.icon className="w-8 h-8 text-apepe-green" />
          </div>
          
          {i === 0 && (
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-2 border-2 border-dashed border-apepe-green/30 rounded-full" 
              />
              <div className="w-16 h-16 rounded-full border-2 border-apepe-green/40 overflow-hidden bg-apepe-bg relative z-10">
                <img src={card.image} alt="$APEPE" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
          
          {i === 2 && (
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-16 h-16 rounded-2xl bg-apepe-green/10 flex items-center justify-center border border-apepe-green/30"
            >
              <Rocket className="w-8 h-8 text-apepe-green" />
            </motion.div>
          )}
        </div>

        <div className="mb-6" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-2xl font-black text-white uppercase leading-tight tracking-tight">
            {card.title}
          </h3>
          {card.titleAccent && (
            <h4 className="text-2xl font-black text-apepe-green uppercase leading-tight tracking-tight mt-1">
              {card.titleAccent}
            </h4>
          )}
        </div>

        <p className="text-gray-400 text-lg leading-relaxed flex-grow" style={{ transform: 'translateZ(20px)' }}>
          {card.desc}
        </p>

        {card.chains && (
          <div className="mt-8 pt-6 border-t border-white/10" style={{ transform: 'translateZ(40px)' }}>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[
                  { name: 'Solana', color: 'apepe-solana', icon: 'sol' },
                  { name: 'Ethereum', color: 'apepe-ethereum', icon: 'eth' },
                  { name: 'Polygon', color: 'poly', icon: '/assets/polygon.png' },
                  { name: 'BSC', color: 'bnb', icon: '/assets/bnb.png' }
                ].map((chain) => (
                  <div key={chain.name} className="w-10 h-10 rounded-full bg-apepe-bg border-2 border-white/10 flex items-center justify-center overflow-hidden">
                    {chain.name === 'Solana' ? (
                      <svg viewBox="0 0 32 32" className="w-5 h-5">
                        <path d="M4 16.5L8 12.5L16 20.5L24 12.5L28 16.5L16 28.5L4 16.5Z" fill="#00ffa3" />
                      </svg>
                    ) : chain.name === 'Ethereum' ? (
                      <svg viewBox="0 0 32 32" className="w-5 h-5">
                        <path d="M16 2L15.5 3.5V21L16 21.5L25 16L16 2Z" fill="#627eea" />
                      </svg>
                    ) : (
                      <img src={chain.icon} className="w-5 h-5 object-contain" />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex-1 h-px bg-white/5" />
              <Sparkles className="w-5 h-5 text-apepe-green animate-pulse" />
            </div>
          </div>
        )}
      </div>

      {/* Decorative Corner Element */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-apepe-green/5 rounded-full blur-3xl pointer-events-none" />
    </motion.div>
  )
}

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
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'back.out(1.2)',
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
    <section id="features" ref={sectionRef} className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <TiltCard key={card.title} card={card} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
