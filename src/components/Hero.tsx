import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Users, Droplets, TrendingUp, Rocket, Gift } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
      })
        .from(
          subtitleRef.current?.children || [],
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
          },
          '-=0.6'
        )
        .from(
          imageRef.current,
          {
            scale: 0.8,
            opacity: 0,
            duration: 1,
          },
          '-=0.8'
        )
        .from(
          featuresRef.current?.children || [],
          {
            x: 60,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
          },
          '-=0.6'
        )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const features = [
    {
      icon: Users,
      title: 'MULTI-CHAIN ACCESS',
      desc: 'Reach millions across Solana, Ethereum, Polygon, and more.',
    },
    {
      icon: Droplets,
      title: 'GLOBAL LIQUIDITY',
      desc: 'Deep pools across all major ecosystems.',
    },
    {
      icon: TrendingUp,
      title: 'UNIFIED GROWTH',
      desc: 'One token, many chains. Built for the multichain future.',
    },
  ]

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center pt-20 pb-8 overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-apepe-green/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-apepe-ethereum/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-5 space-y-6">
            <div ref={titleRef}>
              <h1 className="font-marker text-5xl sm:text-6xl lg:text-7xl text-apepe-green neon-text leading-none mb-3">
                $APEPE
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                ONE TOKEN. ANY CHAIN.
                <br />
                <span className="gradient-text">UNLIMITED POTENTIAL.</span>
              </h2>
            </div>

            <div ref={subtitleRef} className="space-y-5">
              <p className="text-gray-400 text-base max-w-md leading-relaxed">
                $APEPE is a multichain powerhouse, bridging communities across 
                Solana, Ethereum, and beyond. One vision, multiple ecosystems.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 bg-apepe-solana/10 border border-apepe-solana/40 rounded-lg hover:bg-apepe-solana/20 hover:border-apepe-solana transition-all duration-300 group"
                >
                  <svg viewBox="0 0 32 32" className="w-4 h-4 group-hover:scale-110 transition-transform">
                    <path d="M4 16.5L8 12.5L16 20.5L24 12.5L28 16.5L16 28.5L4 16.5Z" fill="#00ffa3" />
                    <path d="M4 9.5L8 5.5L16 13.5L24 5.5L28 9.5L16 21.5L4 9.5Z" fill="#00ffa3" opacity="0.6" />
                  </svg>
                  <span className="text-xs font-bold text-white">Solana</span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 bg-apepe-ethereum/10 border border-apepe-ethereum/40 rounded-lg hover:bg-apepe-ethereum/20 hover:border-apepe-ethereum transition-all duration-300 group"
                >
                  <svg viewBox="0 0 32 32" className="w-4 h-4 group-hover:scale-110 transition-transform">
                    <path d="M16 2L15.5 3.5V21L16 21.5L25 16L16 2Z" fill="#627eea" />
                    <path d="M16 2L7 16L16 21.5V12.5V2Z" fill="#8c9eff" />
                    <path d="M16 23.5L15.6 24V30.2L16 30.5L25 18L16 23.5Z" fill="#627eea" />
                    <path d="M16 30.5V23.5L7 18L16 30.5Z" fill="#8c9eff" />
                  </svg>
                  <span className="text-xs font-bold text-white">Ethereum</span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 bg-apepe-polygon/10 border border-apepe-polygon/40 rounded-lg hover:bg-apepe-polygon/20 hover:border-apepe-polygon transition-all duration-300 group"
                >
                  <img src="/assets/polygon.png" alt="Polygon" className="w-4 h-4 group-hover:scale-110 transition-transform object-contain" />
                  <span className="text-xs font-bold text-white">Polygon</span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 bg-apepe-bsc/10 border border-apepe-bsc/40 rounded-lg hover:bg-apepe-bsc/20 hover:border-apepe-bsc transition-all duration-300 group"
                >
                  <img src="/assets/bnb.png" alt="BSC" className="w-4 h-4 group-hover:scale-110 transition-transform object-contain" />
                  <span className="text-xs font-bold text-white">BSC</span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 bg-apepe-base/10 border border-apepe-base/40 rounded-lg hover:bg-apepe-base/20 hover:border-apepe-base transition-all duration-300 group"
                >
                  <svg viewBox="0 0 32 32" className="w-4 h-4 group-hover:scale-110 transition-transform">
                    <circle cx="16" cy="16" r="8" fill="#0052ff" />
                  </svg>
                  <span className="text-xs font-bold text-white">Base</span>
                </a>
              </div>
            </div>
          </div>

          {/* Center - Hero Image */}
          <div className="lg:col-span-4 relative" ref={imageRef}>
            <div className="relative">
              {/* Glow ring behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-apepe-green/30 via-apepe-ethereum/20 to-transparent rounded-full blur-2xl scale-90" />
              
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <img
                  src="/assets/promo.jpg"
                  alt="$APEPE Mascot"
                  className="w-full rounded-2xl shadow-[0_0_80px_rgba(57,255,20,0.25)] border border-apepe-green/30"
                />
              </motion.div>

              {/* Orbiting chain badges */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-4 -right-4 w-10 h-10 sm:w-14 sm:h-14"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-apepe-solana/20 border border-apepe-solana/50 flex items-center justify-center backdrop-blur-sm">
                  <svg viewBox="0 0 32 32" className="w-4 h-4 sm:w-5 sm:h-5">
                    <path d="M4 16.5L8 12.5L16 20.5L24 12.5L28 16.5L16 28.5L4 16.5Z" fill="#00ffa3" />
                  </svg>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-2 -left-2 w-10 h-10 sm:w-14 sm:h-14"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-apepe-ethereum/20 border border-apepe-ethereum/50 flex items-center justify-center backdrop-blur-sm">
                  <svg viewBox="0 0 32 32" className="w-4 h-4 sm:w-5 sm:h-5">
                    <path d="M16 2L15.5 3.5V21L16 21.5L25 16L16 2Z" fill="#627eea" />
                  </svg>
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute top-1/2 -right-6 w-10 h-10 sm:w-14 sm:h-14"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-apepe-polygon/20 border border-apepe-polygon/50 flex items-center justify-center backdrop-blur-sm overflow-hidden">
                  <img src="/assets/polygon.png" alt="Polygon" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute top-1/4 -left-6 w-10 h-10 sm:w-14 sm:h-14"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-apepe-bsc/20 border border-apepe-bsc/50 flex items-center justify-center backdrop-blur-sm overflow-hidden">
                  <img src="/assets/bnb.png" alt="BSC" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right - Feature Pills */}
          <div className="lg:col-span-3 space-y-3" ref={featuresRef}>
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-4 rounded-xl bg-apepe-card/90 border border-apepe-border backdrop-blur-sm hover:border-apepe-green/50 hover:bg-apepe-card transition-all duration-300 neon-border"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-1.5 rounded-md bg-apepe-green/10">
                    <feature.icon className="w-4 h-4 text-apepe-green" />
                  </div>
                  <h3 className="text-apepe-green font-bold text-xs uppercase tracking-wider">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-xs pl-9">
                  {feature.desc}
                </p>
              </div>
            ))}

            <div className="pt-3 flex flex-col gap-2">
              <a
                href="https://t.me/+jainc8Q3gqJhYmI0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-apepe-green text-apepe-bg font-black text-sm rounded-full hover:shadow-[0_0_30px_rgba(57,255,20,0.5)] hover:scale-105 transition-all duration-300"
              >
                <Rocket size={16} />
                $APEPE TO THE TOP
              </a>
              <a
                href="https://pegswap.xyz/apepe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-purple-600/15 border border-purple-500/40 text-purple-400 font-bold text-sm rounded-full hover:bg-purple-600/25 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300"
              >
                <Gift size={16} />
                Claim $APEPE
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
