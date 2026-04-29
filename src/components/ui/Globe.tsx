import { useEffect, useRef } from 'react'

type V3 = [number, number, number]

function dot3(a: V3, b: V3) { return a[0]*b[0] + a[1]*b[1] + a[2]*b[2] }

function slerp(a: V3, b: V3, t: number): V3 {
  const d = Math.max(-1, Math.min(1, dot3(a, b)))
  if (Math.abs(d) > 0.9999) {
    return [a[0] + (b[0]-a[0])*t, a[1] + (b[1]-a[1])*t, a[2] + (b[2]-a[2])*t]
  }
  const theta = Math.acos(d)
  const sinT = Math.sin(theta)
  const s0 = Math.sin((1-t) * theta) / sinT
  const s1 = Math.sin(t * theta) / sinT
  return [a[0]*s0 + b[0]*s1, a[1]*s0 + b[1]*s1, a[2]*s0 + b[2]*s1]
}

const ry = (v: V3, a: number): V3 => {
  const [x, y, z] = v
  return [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)]
}
const rx = (v: V3, a: number): V3 => {
  const [x, y, z] = v
  return [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)]
}
const rz = (v: V3, a: number): V3 => {
  const [x, y, z] = v
  return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a), z]
}

function pr(v: V3, R: number, cx: number, cy: number) {
  return { x: cx + v[0] * R, y: cy - v[1] * R, d: v[2] }
}

function ll(lat: number, lon: number): V3 {
  return [Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)]
}

const NODES: V3[] = [
  ll(0.6, 0.3),  ll(-0.4, 1.8), ll(0.2, 3.5),  ll(-0.7, 5.0),
  ll(0.9, 1.5),  ll(-0.2, 4.2), ll(0.4, 2.6),  ll(-0.5, 0.8),
  ll(0.1, 2.0),  ll(-0.3, 3.2),
]

const LINKS = [[0,4],[1,2],[2,6],[3,5],[4,7],[0,1],[5,6],[8,9],[1,8],[7,3]]

// Stable per-connection phase offsets
const PHASES = LINKS.map((_, i) => (i / LINKS.length) * Math.PI * 2)

export function Globe({ size = 300 }: { size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)

    let raf: number
    let t = 0

    function frame() {
      const cx = size / 2
      const cy = size / 2
      const R = size * 0.36

      ctx.clearRect(0, 0, size, size)

      const dark = document.documentElement.classList.contains('dark')
      const wire = dark ? '180,180,180' : '40,40,40'
      const g = t * 0.0022

      function spt(lat: number, lon: number) {
        return pr(ry(ll(lat, lon), g), R, cx, cy)
      }

      // Globe outline
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${wire},0.28)`
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Latitude circles
      for (const deg of [-50, -25, 0, 25, 50]) {
        const lat = (deg * Math.PI) / 180
        ctx.beginPath()
        let first = true
        for (let i = 0; i <= 64; i++) {
          const p = spt(lat, (i / 64) * Math.PI * 2)
          if (first) { ctx.moveTo(p.x, p.y); first = false } else ctx.lineTo(p.x, p.y)
        }
        ctx.strokeStyle = `rgba(${wire},0.12)`
        ctx.lineWidth = 0.6
        ctx.stroke()
      }

      // Longitude meridians
      for (let j = 0; j < 8; j++) {
        const lon = (j / 8) * Math.PI * 2
        ctx.beginPath()
        let first = true
        for (let i = 0; i <= 32; i++) {
          const p = spt(-Math.PI / 2 + (i / 32) * Math.PI, lon)
          if (first) { ctx.moveTo(p.x, p.y); first = false } else ctx.lineTo(p.x, p.y)
        }
        ctx.strokeStyle = `rgba(${wire},0.12)`
        ctx.lineWidth = 0.6
        ctx.stroke()
      }

      // Orbital rings — opposite directions
      const rings = [
        { tx: 1.15, tz: 0.4,  spd: 2.2, dir:  1 },
        { tx: 0.65, tz: -0.55, spd: 1.7, dir: -1 },
      ]
      for (const ring of rings) {
        const ra = t * 0.0022 * ring.spd * ring.dir
        const pts: { x: number; y: number; d: number }[] = []
        for (let i = 0; i <= 100; i++) {
          const a = (i / 100) * Math.PI * 2
          let v: V3 = [Math.sin(a), 0, Math.cos(a)]
          v = rx(v, ring.tx)
          v = rz(v, ring.tz)
          v = ry(v, ra)
          pts.push(pr(v, R * 1.22, cx, cy))
        }
        for (let i = 0; i < pts.length - 1; i++) {
          const p = pts[i], q = pts[i + 1]
          const d = (p.d + q.d) / 2
          if (d < 0) continue
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(q.x, q.y)
          ctx.strokeStyle = `rgba(0,153,255,${d * 0.26})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      // Rotated node positions
      const rNodes = NODES.map(v => pr(ry(v, g), R, cx, cy))

      // Great-circle arcs with per-connection animated fade
      LINKS.forEach(([ai, bi], idx) => {
        const pa = rNodes[ai], pb = rNodes[bi]

        // Animated opacity: each connection has its own phase cycle
        const cycle = (t * 0.006 + PHASES[idx]) % (Math.PI * 2)
        const pulse = Math.max(0, Math.sin(cycle)) ** 1.8
        if (pulse < 0.03) return

        // Depth check — skip if both nodes are on the back
        if (pa.d < -0.1 && pb.d < -0.1) return

        const depthFactor = Math.max(0, (pa.d + pb.d) / 2)
        const opacity = pulse * depthFactor * 0.75
        if (opacity < 0.01) return

        // Draw SLERP arc (great circle)
        const STEPS = 32
        ctx.beginPath()
        let penDown = false
        for (let i = 0; i <= STEPS; i++) {
          const tv = i / STEPS
          const v = slerp(NODES[ai], NODES[bi], tv)
          const rv = ry(v, g)
          const p = pr(rv, R, cx, cy)
          if (p.d < 0) { penDown = false; continue }
          if (!penDown) { ctx.moveTo(p.x, p.y); penDown = true }
          else ctx.lineTo(p.x, p.y)
        }
        ctx.strokeStyle = `rgba(0,153,255,${opacity})`
        ctx.lineWidth = 0.9
        ctx.stroke()
      })

      // Nodes
      for (const p of rNodes) {
        if (p.d < 0) continue
        const op = p.d * 0.8 + 0.1
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,153,255,${op})`
        ctx.fill()
      }

      t++
      raf = requestAnimationFrame(frame)
    }

    frame()
    return () => cancelAnimationFrame(raf)
  }, [size])

  return (
    <canvas
      ref={ref}
      style={{ width: size, height: size, display: 'block' }}
    />
  )
}
