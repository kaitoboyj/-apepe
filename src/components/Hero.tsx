import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Users, Droplets, TrendingUp, Rocket, Gift, MousePointer2 } from 'lucide-react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 40
      const y = (clientY / innerHeight - 0.5) * 40
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        skewY: 7,
        duration: 1.5,
        delay: 0.2,
      })
        .from(
          subtitleRef.current?.children || [],
          {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
          },
          '-=1'
        )
        .from(
          imageRef.current,
          {
            scale: 0.5,
            rotateY: 45,
            opacity: 0,
            duration: 1.5,
          },
          '-=1.2'
        )
        .from(
          featuresRef.current?.children || [],
          {
            x: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
          },
          '-=1'
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
      className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <motion.div 
        style={{ y: y1, x: mousePos.x * 0.5 }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-apepe-green/10 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: y2, x: mousePos.x * -0.5 }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-apepe-ethereum/10 rounded-full blur-[150px] pointer-events-none" 
      />

      {/* Animated Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-20 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            style={{ opacity }}
            className="lg:col-span-6 space-y-8"
          >
            <div ref={titleRef} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-apepe-green/10 border border-apepe-green/30 text-apepe-green text-xs font-bold uppercase tracking-widest mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-apepe-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-apepe-green"></span>
                </span>
                Multichain Revolution
              </div>
              <h1 className="font-marker text-6xl sm:text-7xl lg:text-8xl text-apepe-green neon-text leading-tight">
                $APEPE
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                ONE TOKEN. <span className="text-apepe-green">ANY CHAIN.</span>
                <br />
                <span className="gradient-text">UNLIMITED POTENTIAL.</span>
              </h2>
            </div>

            <div ref={subtitleRef} className="space-y-6">
              <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
                $APEPE is a multichain powerhouse, bridging communities across 
                Solana, Ethereum, and beyond. One vision, multiple ecosystems.
              </p>

              <div className="flex flex-wrap gap-4">
                {[
                  { name: 'Solana', color: 'apepe-solana', icon: '/assets/ape-3d.png', isCustom: true },
                  { name: 'Ethereum', color: 'apepe-ethereum', icon: 'eth' },
                  { name: 'Polygon', color: 'apepe-polygon', icon: '/assets/polygon.png' },
                  { name: 'BSC', color: 'apepe-bsc', icon: '/assets/bnb.png' },
                  { name: 'Base', color: 'apepe-base', icon: 'base' }
                ].map((chain, i) => (
                  <motion.a
                    key={chain.name}
                    href="#"
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={`flex items-center gap-2 px-4 py-2 bg-${chain.color}/10 border border-${chain.color}/40 rounded-xl hover:bg-${chain.color}/20 hover:border-${chain.color} transition-all duration-300 group`}
                  >
                    {chain.name === 'Solana' ? (
                      <svg viewBox="0 0 32 32" className="w-4 h-4">
                        <path d="M4 16.5L8 12.5L16 20.5L24 12.5L28 16.5L16 28.5L4 16.5Z" fill="#00ffa3" />
                        <path d="M4 9.5L8 5.5L16 13.5L24 5.5L28 9.5L16 21.5L4 9.5Z" fill="#00ffa3" opacity="0.6" />
                      </svg>
                    ) : chain.name === 'Ethereum' ? (
                      <svg viewBox="0 0 32 32" className="w-4 h-4">
                        <path d="M16 2L15.5 3.5V21L16 21.5L25 16L16 2Z" fill="#627eea" />
                        <path d="M16 2L7 16L16 21.5V12.5V2Z" fill="#8c9eff" />
                        <path d="M16 23.5L15.6 24V30.2L16 30.5L25 18L16 23.5Z" fill="#627eea" />
                        <path d="M16 30.5V23.5L7 18L16 30.5Z" fill="#8c9eff" />
                      </svg>
                    ) : chain.name === 'Base' ? (
                      <div className="w-4 h-4 rounded-full bg-[#0052ff] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    ) : (
                      <img src={chain.icon} alt={chain.name} className="w-4 h-4 object-contain" />
                    )}
                    <span className="text-xs font-bold text-white">{chain.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Hero Image Container */}
          <div className="lg:col-span-6 relative" ref={imageRef}>
            <div className="relative group">
              {/* Animated glow ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 bg-gradient-to-tr from-apepe-green/20 via-apepe-ethereum/20 to-apepe-solana/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" 
              />
              
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotateZ: [-1, 1, -1]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-apepe-card shadow-2xl">
                  <img
                    src="/assets/promo.jpg"
                    alt="$APEPE Mascot"
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Glass overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-apepe-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>

              {/* Enhanced Orbiting chain badges */}
              {[
                { name: 'Solana', icon: 'sol', x: '-10%', y: '-5%', delay: 0 },
                { name: 'Ethereum', icon: 'eth', x: '95%', y: '10%', delay: 5 },
                { name: 'Polygon', icon: 'poly', x: '90%', y: '85%', delay: 10 },
                { name: 'BSC', icon: 'bsc', x: '-5%', y: '75%', delay: 15 }
              ].map((badge, idx) => (
                <motion.div
                  key={badge.name}
                  animate={{ 
                    y: [0, 15, 0],
                    x: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 4 + idx, 
                    repeat: Infinity, 
                    ease: 'easeInOut',
                    delay: badge.delay * 0.1
                  }}
                  style={{ top: badge.y, left: badge.x }}
                  className="absolute z-20 hidden sm:block"
                >
                  <div className="p-3 rounded-2xl bg-apepe-card/80 border border-white/10 backdrop-blur-md shadow-xl">
                    {badge.name === 'Solana' && (
                      <svg viewBox="0 0 32 32" className="w-6 h-6">
                        <path d="M4 16.5L8 12.5L16 20.5L24 12.5L28 16.5L16 28.5L4 16.5Z" fill="#00ffa3" />
                      </svg>
                    )}
                    {badge.name === 'Ethereum' && (
                      <svg viewBox="0 0 32 32" className="w-6 h-6">
                        <path d="M16 2L15.5 3.5V21L16 21.5L25 16L16 2Z" fill="#627eea" />
                      </svg>
                    )}
                    {badge.name === 'Polygon' && <img src="/assets/polygon.png" className="w-6 h-6 object-contain" />}
                    {badge.name === 'BSC' && <img src="/assets/bnb.png" className="w-6 h-6 object-contain" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Highlights - Bottom of Hero */}
        <div 
          ref={featuresRef}
          className="grid md:grid-cols-3 gap-6 mt-20"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10, backgroundColor: 'rgba(57, 255, 20, 0.05)' }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 rounded-xl bg-apepe-green/10 text-apepe-green group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold text-lg">{feature.title}</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
