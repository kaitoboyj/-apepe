import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export default function EVMSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      gsap.from(rightRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-14 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-apepe-green/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-apepe-ethereum/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text Content */}
          <div ref={leftRef} className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-apepe-green/10 border border-apepe-green/30 flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/logo.jpg"
                  alt="$APEPE"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-marker text-xl text-apepe-green">$APEPE</span>
            </div>

            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-2">
                $APEPE
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                The Universal <span className="gradient-text">EVM/SOL Layer</span> for{' '}
                <span className="gradient-text">Any Chain</span>
              </h3>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 border border-apepe-green/50 rounded-lg text-apepe-green hover:bg-apepe-green/10 hover:border-apepe-green transition-all duration-300 group"
            >
              <Code2 className="w-4 h-4" />
              <span className="text-sm font-semibold">Deploy across the ecosystem</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              $APEPE is a revolutionary multichain bridge architecture
              built to unify the fragmented blockchain landscape.
            </p>
          </div>

          {/* Right - Visual */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            {/* Outer neon ring */}
            <div className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-full border-2 border-apepe-green/20 animate-pulse" />
            <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full border border-apepe-green/10" />

            {/* Orbital dots */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px]"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-apepe-green/60 shadow-[0_0_15px_rgba(57,255,20,0.5)]" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px]"
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-apepe-green/60 shadow-[0_0_15px_rgba(57,255,20,0.5)]" />
            </motion.div>

            {/* Central image container */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-b from-apepe-green/20 to-apepe-bg border-2 border-apepe-green/30 flex items-center justify-center overflow-hidden shadow-[0_0_60px_rgba(57,255,20,0.15)]">
              {/* Binary code background effect */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-1 p-8">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <span key={i} className="text-[8px] text-apepe-green font-mono">
                      {Math.random() > 0.5 ? '1' : '0'}
                    </span>
                  ))}
                </div>
              </div>

              <img
                src="/assets/promo.jpg"
                alt="$APEPE EVM"
                className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-2xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Deploy existing dApps on any supported chain with minimal code changes.
            Experience true interoperability with the $APEPE ecosystem.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
