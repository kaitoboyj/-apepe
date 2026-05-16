import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, ArrowRight, Cpu, Network, ShieldCheck } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export default function EVMSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-apepe-green/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-apepe-ethereum/5 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Content */}
          <div ref={leftRef} className="space-y-10">
            <div className="space-y-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
              >
                <div className="p-2 rounded-lg bg-apepe-green/10">
                  <Cpu className="w-5 h-5 text-apepe-green" />
                </div>
                <span className="text-xs font-black text-white uppercase tracking-widest">$APEPE TECHNOLOGY</span>
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter">
                  THE <span className="gradient-text">UNIVERSAL</span>
                  <br />
                  <span className="text-white">BRIDGE LAYER</span>
                </h2>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-400">
                  EVM & SOL Interoperability
                </h3>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                Our revolutionary architecture allows developers to deploy dApps 
                across multiple chains simultaneously. $APEPE acts as the 
                connective tissue for the next generation of multichain apps.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Network, title: 'Multi-Chain', desc: 'Native support for 5+ chains' },
                { icon: ShieldCheck, title: 'Secure', desc: 'Audited bridge architecture' }
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-white/5 border border-white/10 rounded-2xl"
                >
                  <item.icon className="w-8 h-8 text-apepe-green mb-3" />
                  <h4 className="text-white font-bold mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#"
              whileHover={{ x: 10 }}
              className="inline-flex items-center gap-3 text-apepe-green font-black group"
            >
              EXPLORE OUR TECH STACK
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </motion.a>
          </div>

          {/* Right - Visual Visualization */}
          <div className="relative flex items-center justify-center">
            <motion.div
              style={{ rotate, scale }}
              className="relative w-full aspect-square max-w-[500px] flex items-center justify-center"
            >
              {/* Central Core */}
              <div className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-apepe-bg border-4 border-apepe-green shadow-[0_0_100px_rgba(57,255,20,0.2)] flex items-center justify-center overflow-hidden">
                <img 
                  src="/assets/logo.jpg" 
                  alt="$APEPE" 
                  className="w-32 h-32 sm:w-44 sm:h-44 object-contain animate-pulse"
                />
                
                {/* Floating Particles in Core */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: [0, -100],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                      style={{ 
                        left: `${Math.random() * 100}%`,
                        top: '100%'
                      }}
                      className="absolute w-1 h-1 bg-apepe-green rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* Orbital Rings */}
              {[1, 2, 3].map((ring) => (
                <div 
                  key={ring}
                  className={`absolute rounded-full border border-white/10`}
                  style={{ 
                    width: `${100 + ring * 20}%`, 
                    height: `${100 + ring * 20}%`,
                    opacity: 1 / ring 
                  }}
                />
              ))}

              {/* Orbital Nodes */}
              {[
                { icon: 'sol', angle: 0 },
                { icon: 'eth', angle: 90 },
                { icon: 'poly', angle: 180 },
                { icon: 'bnb', angle: 270 }
              ].map((node, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ 
                    rotate: `${node.angle}deg`,
                    width: '130%',
                    height: '130%'
                  }}
                >
                  <motion.div 
                    animate={{ rotate: -node.angle - (i * 90) }} // Keep icons upright
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl bg-apepe-card border border-white/20 flex items-center justify-center shadow-xl backdrop-blur-md"
                  >
                    {node.icon === 'sol' && (
                      <svg viewBox="0 0 32 32" className="w-6 h-6">
                        <path d="M4 16.5L8 12.5L16 20.5L24 12.5L28 16.5L16 28.5L4 16.5Z" fill="#00ffa3" />
                      </svg>
                    )}
                    {node.icon === 'eth' && (
                      <svg viewBox="0 0 32 32" className="w-6 h-6">
                        <path d="M16 2L15.5 3.5V21L16 21.5L25 16L16 2Z" fill="#627eea" />
                      </svg>
                    )}
                    {node.icon === 'poly' && <img src="/assets/polygon.png" className="w-6 h-6 object-contain" />}
                    {node.icon === 'bnb' && <img src="/assets/bnb.png" className="w-6 h-6 object-contain" />}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

