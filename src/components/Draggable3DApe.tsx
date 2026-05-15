import { useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'

export default function Draggable3DApe() {
  const [sunk, setSunk] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const apeRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-200, 200], [15, -15])
  const rotateY = useTransform(x, [-200, 200], [-15, 15])

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const glowOpacity = useTransform(
    [springRotateX, springRotateY],
    ([rx, ry]) => {
      const dist = Math.abs((rx as number)) + Math.abs((ry as number))
      return Math.min(dist / 20, 1)
    }
  )

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
    setShowHint(false)
  }, [])

  const getDropTarget = useCallback(() => {
    if (!apeRef.current) return null
    const apeRect = apeRef.current.getBoundingClientRect()

    const targets = [
      ...Array.from(document.querySelectorAll('a[href*="t.me"]')).map((el) => ({ el, type: 'telegram' as const, href: (el as HTMLAnchorElement).href })),
      ...Array.from(document.querySelectorAll('a[href*="pegswap"]')).map((el) => ({ el, type: 'claim' as const, href: (el as HTMLAnchorElement).href })),
    ]

    for (const target of targets) {
      const rect = target.el.getBoundingClientRect()
      const overlap = !(
        apeRect.right < rect.left ||
        apeRect.left > rect.right ||
        apeRect.bottom < rect.top ||
        apeRect.top > rect.bottom
      )
      if (overlap) return target
    }
    return null
  }, [])

  const clearHighlights = useCallback(() => {
    document.querySelectorAll('.ape-drop-active').forEach((el) => el.classList.remove('ape-drop-active'))
  }, [])

  const handleDrag = useCallback(() => {
    const target = getDropTarget()
    clearHighlights()
    if (target) {
      target.el.classList.add('ape-drop-active')
    }
  }, [getDropTarget, clearHighlights])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    const target = getDropTarget()
    clearHighlights()
    if (target) {
      window.open(target.href, '_blank')
    }
    setSunk(true)
  }, [getDropTarget, clearHighlights])

  const handleClick = useCallback(() => {
    if (sunk) {
      setSunk(false)
      setShowHint(false)
    }
  }, [sunk])

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      {/* Hint tooltip */}
      <AnimatePresence>
        {showHint && !sunk && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2.5 }}
            className="absolute top-[15%] left-1/2 -translate-x-1/2 px-4 py-2 bg-apepe-green/10 border border-apepe-green/30 rounded-full text-apepe-green text-xs font-medium pointer-events-none"
          >
            👆 Drag & drop the ape to sink it. Click the faded ape to bring it back!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={apeRef}
        drag
        dragMomentum={false}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
        initial={{
          x: typeof window !== 'undefined' ? window.innerWidth / 2 - 100 : 0,
          y: typeof window !== 'undefined' ? window.innerHeight / 2 - 100 : 0,
          scale: 0,
          rotateY: 180,
        }}
        animate={
          sunk
            ? {
                scale: 0.5,
                opacity: 0.45,
                filter: 'blur(2px) brightness(0.8)',
                zIndex: -1,
                rotateX: 0,
                rotateY: 0,
              }
            : {
                scale: 1,
                opacity: 1,
                filter: 'blur(0px) brightness(1)',
                zIndex: 100,
                rotateY: 0,
              }
        }
        whileHover={
          sunk
            ? {
                scale: 0.55,
                cursor: 'pointer',
              }
            : {
                scale: 1.08,
                cursor: 'grab',
              }
        }
        whileDrag={
          sunk
            ? {}
            : {
                scale: 1.15,
                cursor: 'grabbing',
                boxShadow: '0 30px 60px rgba(57, 255, 20, 0.3), 0 0 100px rgba(57, 255, 20, 0.2)',
              }
        }
        transition={
          sunk
            ? {
                type: 'spring',
                stiffness: 60,
                damping: 20,
                duration: 1.2,
              }
            : {
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }
        }
        className="absolute w-64 h-64 sm:w-80 sm:h-80 pointer-events-auto"
        style={{ perspective: 1000, x, y, rotateX: springRotateX, rotateY: springRotateY, z: 50 as unknown as string }}
      >
        {/* 3D glow shadow that follows rotation */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            opacity: glowOpacity,
            background: 'radial-gradient(circle, rgba(57,255,20,0.4) 0%, transparent 70%)',
            transform: 'translateZ(-30px)',
          }}
        />

        {/* Main image container with 3D preserve */}
        <div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img
            src="/assets/ape-3d.png"
            alt="3D $APEPE Ape"
            draggable={false}
            className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(57,255,20,0.4)] select-none"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          />

          {/* Floating particles around the ape when dragging */}
          {isDragging && !sunk && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-apepe-green"
                  initial={{
                    x: '50%',
                    y: '50%',
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 120}%`,
                    y: `${50 + (Math.random() - 0.5) * 120}%`,
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.08,
                    repeat: Infinity,
                    repeatDelay: 0.2,
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Sink ripple effect on drop */}
        {sunk && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0.6 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border-2 border-apepe-green/40 pointer-events-none"
          />
        )}
      </motion.div>
    </motion.div>
  )
}
