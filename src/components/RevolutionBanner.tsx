import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Users, Shield, Eye, Gift, ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export default function RevolutionBanner() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const xPos = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        x: -100,
        rotateY: -30,
        opacity: 0,
        duration: 1.2,
      })
      gsap.from(centerRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        scale: 0.9,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'back.out(1.7)',
      })
      gsap.from(rightRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        x: 100,
        rotateY: 30,
        opacity: 0,
        duration: 1.2,
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
      className="relative py-24 overflow-hidden"
    >
      {/* Background Text Overlay */}
      <motion.div 
        style={{ x: xPos, rotate }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none z-0"
      >
        REVOLUTION REVOLUTION REVOLUTION
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative rounded-[2.5rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-apepe-green/60 to-transparent" />

          <div className="grid lg:grid-cols-12 gap-10 p-8 lg:p-16 items-center">
            {/* Left - Image */}
            <div
              ref={leftRef}
              className="lg:col-span-4 relative group"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="relative rounded-3xl overflow-hidden border-2 border-white/10 aspect-square shadow-2xl"
              >
                <img
                  src="/assets/logo.jpg"
                  alt="$APEPE Revolution"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-apepe-bg/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Floating elements inside image */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-6 left-6 flex items-center gap-3"
                >
                  <div className="p-2 rounded-xl bg-apepe-green/20 backdrop-blur-md border border-apepe-green/30">
                    <Rocket className="w-6 h-6 text-apepe-green" />
                  </div>
                  <span className="text-white font-black tracking-widest text-lg drop-shadow-lg">APEPE</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Center - Main Content */}
            <div ref={centerRef} className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-apepe-green/10 border border-apepe-green/20 rounded-full text-apepe-green text-xs font-bold tracking-[0.2em] uppercase"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-apepe-green animate-pulse" />
                  The Meme Revolution
                </motion.div>
                
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter">
                  <span className="text-white">IT'S TIME FOR </span>
                  <br />
                  <span className="gradient-text">A NEW ERA</span>
                </h2>
                
                <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                  $APEPE is not just another token. It's a cross-chain movement 
                  designed to unite the fragmented world of Web3. One brand, 
                  one vision, every major chain.
                </p>
              </div>

              {/* Badges Grid */}
              <div className="grid sm:grid-cols-3 gap-4">
                {badges.map((badge, i) => (
                  <motion.div
                    key={badge.label}
                    whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                    className="flex flex-col items-center sm:items-start gap-3 p-5 bg-white/5 border border-white/10 rounded-2xl transition-all duration-300"
                  >
                    <div className="p-3 rounded-xl bg-apepe-green/10">
                      <badge.icon className="w-6 h-6 text-apepe-green" />
                    </div>
                    <span className="text-xs font-black text-white uppercase tracking-widest text-center sm:text-left leading-tight">
                      {badge.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-5 pt-4">
                <motion.a
                  href="https://t.me/+jainc8Q3gqJhYmI0"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(57, 255, 20, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-10 py-4 bg-apepe-green text-apepe-bg font-black rounded-full transition-all duration-300"
                >
                  JOIN THE MOVEMENT
                  <ArrowRight size={20} />
                </motion.a>
                
                <motion.a
                  href="https://pegswap.xyz/apepe"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(168, 85, 247, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-10 py-4 bg-purple-600/10 border-2 border-purple-500/30 text-purple-400 font-black rounded-full transition-all duration-300"
                >
                  <Gift size={20} />
                  CLAIM $APEPE
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

