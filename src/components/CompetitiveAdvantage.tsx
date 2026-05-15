import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, X } from 'lucide-react'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export default function CompetitiveAdvantage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(tableRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const columns = ['Ethereum', 'Solana', 'BSC', '$APEPE']

  type CellValue = string | { text: string; check?: boolean; highlight?: boolean }

  const rows: { label: string; values: CellValue[] }[] = [
    {
      label: 'Using Solidity and Vyper languages',
      values: ['100', 'X', 'BSC', { text: '', check: true }],
    },
    {
      label: 'TPS',
      values: ['100', '1500', '1600', { text: 'Up to 5,000', highlight: true }],
    },
    {
      label: 'Transaction Fee',
      values: ['$1', '>$0.01', '$0.15', { text: 'Up to $0.001', check: true, highlight: true }],
    },
    {
      label: 'Ethereum RPC API',
      values: ['Ethereum', 'X X X', '>$0.01', { text: '', check: true }],
    },
  ]

  return (
    <section ref={sectionRef} className="relative py-14 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-apepe-green/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Competitive <span className="gradient-text">Advantage</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            See how $APEPE stacks up against the competition across key metrics.
          </p>
        </motion.div>

        <div
          ref={tableRef}
          className="rounded-2xl border border-apepe-border bg-apepe-card/80 backdrop-blur-sm overflow-hidden"
        >
          {/* Header Row */}
          <div className="grid grid-cols-5 border-b border-apepe-border">
            <div className="p-4 sm:p-5 bg-apepe-bg/60" />
            {columns.map((col) => (
              <div
                key={col}
                className={`p-4 sm:p-5 text-center font-bold text-sm sm:text-base ${
                  col === '$APEPE'
                    ? 'bg-apepe-green/15 text-apepe-green'
                    : 'bg-apepe-bg/40 text-gray-300'
                }`}
              >
                {col}
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {rows.map((row, rowIndex) => (
            <div
              key={row.label}
              className={`grid grid-cols-5 ${
                rowIndex !== rows.length - 1 ? 'border-b border-apepe-border/50' : ''
              }`}
            >
              <div className="p-4 sm:p-5 bg-apepe-bg/40 flex items-center">
                <span className="text-xs sm:text-sm text-gray-300 font-medium leading-tight">
                  {row.label}
                </span>
              </div>
              {row.values.map((val, colIndex) => {
                const isApepe = colIndex === 3
                const isObj = typeof val === 'object'
                const isCheck = isObj && (val as { check?: boolean }).check === true
                const isHighlight = isObj && (val as { highlight?: boolean }).highlight === true
                const text = isObj ? (val as { text: string }).text : val
                const isX = text === 'X' || text === 'X X X'

                return (
                  <motion.div
                    key={colIndex}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * colIndex }}
                    className={`p-4 sm:p-5 flex items-center justify-center ${
                      isApepe ? 'bg-apepe-green/5' : ''
                    }`}
                  >
                    {isCheck ? (
                      <div className="w-8 h-8 rounded-full bg-apepe-green/20 border border-apepe-green/50 flex items-center justify-center">
                        <Check className="w-4 h-4 text-apepe-green" />
                      </div>
                    ) : isX ? (
                      <X className="w-5 h-5 text-gray-600" />
                    ) : (
                      <span
                        className={`text-sm sm:text-base font-semibold ${
                          isHighlight
                            ? 'text-apepe-green'
                            : isApepe
                            ? 'text-white'
                            : 'text-gray-400'
                        }`}
                      >
                        {text}
                      </span>
                    )}
                  </motion.div>
                )
              })}
            </div>
          ))}

          {/* Bottom accent for $APEPE column */}
          <div className="h-1 bg-gradient-to-r from-transparent via-apepe-green/40 to-transparent" />
        </div>
      </div>
    </section>
  )
}
