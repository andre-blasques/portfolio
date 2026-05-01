import { useEffect, useRef } from 'react'

const CELL = 40 // grid cell size in px

/**
 * Full-page fixed grid with:
 *   1. Base grid      — always visible at very low opacity (z:0)
 *   2. Cell highlight — the cell under the cursor fills with accent blue (z:0)
 *   3. Lit grid       — brighter grid lines revealed by a circle mask at cursor (z:0)
 * Uses rAF + direct DOM writes → 60fps, zero React re-renders.
 */
export function GridSpotlight() {
  const litRef  = useRef<HTMLDivElement>(null)
  const cellRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only register mouse listeners on devices with a real pointer (mouse/trackpad)
    const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!hasPointer) return

    let rafId: number

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        // Spotlight grid
        if (litRef.current) {
          const mask = `radial-gradient(72px circle at ${e.clientX}px ${e.clientY}px, black 99%, transparent 100%)`
          litRef.current.style.maskImage = mask
          litRef.current.style.webkitMaskImage = mask
          litRef.current.style.opacity = '1'
        }

        // Cell highlight — snap to nearest grid cell origin
        if (cellRef.current) {
          const cx = Math.floor(e.clientX / CELL) * CELL
          const cy = Math.floor(e.clientY / CELL) * CELL
          cellRef.current.style.transform = `translate(${cx}px, ${cy}px)`
          cellRef.current.style.opacity = '1'
        }
      })
    }

    const onLeave = () => {
      if (litRef.current)  litRef.current.style.opacity  = '0'
      if (cellRef.current) cellRef.current.style.opacity = '0'
    }

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const gridBase: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(var(--grid-color) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
    `,
    backgroundSize: `${CELL}px ${CELL}px`,
  }

  const gridLit: React.CSSProperties = {
    ...gridBase,
    backgroundImage: `
      linear-gradient(var(--grid-color-lit) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid-color-lit) 1px, transparent 1px)
    `,
    opacity: 0,
    transition: 'opacity 0.25s ease',
  }

  return (
    <>
      {/* Base grid + cell highlight — behind all content */}
      <div
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      >
        <div style={gridBase} />

        {/* Cell fill — hidden on touch devices via CSS */}
        <div
          ref={cellRef}
          className="pointer-only"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: CELL,
            height: CELL,
            background: 'var(--grid-color-lit)',
            opacity: 0,
            transition: 'opacity 0.15s ease',
            willChange: 'transform, opacity',
          }}
        />
      </div>

      {/* Spotlight (lit grid lines) — hidden on touch devices via CSS */}
      <div
        aria-hidden="true"
        className="pointer-only"
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      >
        <div ref={litRef} style={gridLit} />
      </div>
    </>
  )
}
