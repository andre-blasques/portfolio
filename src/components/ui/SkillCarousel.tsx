import { useState } from 'react'

const row1 = [
  'Figma', 'UX Strategy', 'Design Systems', 'Mentorship', 'A/B Testing',
  'Problem Framing', 'Prototyping', 'Visual Consistency', 'User Research',
  'Service Design', 'MCP connections', 'Design Thinking', 'Handoff',
  'AI-assisted Design', 'Journey Mapping',
]

const row2 = [
  'Stakeholder Management', 'Information Architecture', 'Data-Informed Design',
  'Micro-interactions', 'Prioritization', 'End-to-end Product Thinking',
  'User interviews', 'Multi-Platform', 'Documentation', 'Usability Testing',
  'Executive Communication', 'Stakeholder alignment', 'Metrics Thinking',
  'User Flows', 'Design Systems',
]

function Pill({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0"
      style={{
        background: 'var(--surface-dark)',
        color: 'var(--text-muted)',
      }}
    >
      {label}
    </span>
  )
}

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: string[]
  direction: 'left' | 'right'
  duration: number
}) {
  const [paused, setPaused] = useState(false)
  const doubled = [...items, ...items]

  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 10,
          width: 'max-content',
          animation: `${direction === 'left' ? 'marquee-left' : 'marquee-right'} ${duration}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {doubled.map((label, i) => (
          <Pill key={i} label={label} />
        ))}
      </div>
    </div>
  )
}

export function SkillCarousel() {
  return (
    <div className="flex flex-col gap-3">
      <MarqueeRow items={row1} direction="right" duration={50} />
      <MarqueeRow items={row2} direction="left" duration={60} />
    </div>
  )
}
