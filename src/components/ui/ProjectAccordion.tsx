import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import type { Project } from '../../data/projects'
import { Tag } from './Tag'

interface ProjectAccordionProps {
  projects: Project[]
}

// Smooth, no-bounce spring — good for hover interactions
const hoverSpring = { type: 'spring', stiffness: 140, damping: 22, mass: 0.9, restSpeed: 0.01 } as const

export function ProjectAccordion({ projects }: ProjectAccordionProps) {
  const navigate = useNavigate()
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleHoverEnter = (project: Project) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    if (project.comingSoon) return
    setActiveSlug(project.slug)
  }

  const handleHoverLeave = () => {
    // Small delay prevents accidental collapse when mouse briefly leaves
    leaveTimer.current = setTimeout(() => setActiveSlug(null), 120)
  }

  return (
    <>
      {/* Desktop: horizontal accordion */}
      <div className="hidden lg:flex gap-3 h-[480px]">
        {projects.map((project, _index) => {
          const isActive = activeSlug === project.slug
          return (
            <motion.div
              key={project.slug}
              animate={{ flex: isActive ? 4 : 1 }}
              transition={hoverSpring}
              onMouseEnter={() => handleHoverEnter(project)}
              onMouseLeave={handleHoverLeave}
              onClick={() => { if (!project.comingSoon) navigate(`/projects/${project.slug}`) }}
              className="relative rounded-2xl overflow-hidden group"
              style={{
                minWidth: 120,
                background: '#000',
                border: '1px solid var(--border)',
                cursor: project.comingSoon ? 'default' : 'pointer',
              }}
            >
              {/* Phase 1a — image: scale + darken on expand */}
              <motion.img
                src={project.thumbnail}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{
                  opacity: isActive ? 0.28 : project.comingSoon ? 0.25 : 0.75,
                  scale: isActive ? 1.06 : 1,
                }}
                transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              />

              {/* Phase 1b — gradient: cross-fade collapsed → expanded */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)' }}
              />
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.45) 50%, transparent 100%)' }}
              />

              {/* Coming soon overlay */}
              {project.comingSoon && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/70 backdrop-blur-sm">
                    Coming Soon
                  </span>
                </div>
              )}

              {/* Collapsed: title fades out quickly as card opens */}
              <AnimatePresence>
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-0 left-0 right-0 p-4"
                  >
                    <p className="text-sm font-semibold text-white leading-tight">
                      {project.shortTitle}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Phase 2 — text: slide+fade in after card is visibly open */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10, transition: { duration: 0.15, ease: 'easeIn' } }}
                    transition={{ delay: 0.38, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex flex-col justify-end p-6"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Tag variant="accent">{project.category}</Tag>
                      <Tag>{project.year}</Tag>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm mb-4 line-clamp-2 text-white/70">
                      {project.description}
                    </p>

                    {/* Metrics row */}
                    {project.metrics.length > 0 && (
                      <div className="flex gap-4 mb-4">
                        {project.metrics.slice(0, 2).map(m => (
                          <div key={m.label}>
                            <p className="text-lg font-bold text-[#09f]">{m.value}</p>
                            <p className="text-xs text-white/50">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tools */}
                    <div className="flex flex-wrap gap-1.5 mb-0">
                      {project.tools.map(tool => (
                        <span
                          key={tool}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Arrow button — bottom-right corner */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ delay: 0.5, duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      onClick={e => { e.stopPropagation(); navigate(`/projects/${project.slug}`) }}
                      className="absolute top-6 right-6 flex items-center justify-center rounded-full"
                      style={{ width: 44, height: 44, background: '#09f', flexShrink: 0 }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Mobile/Tablet: always-open web-style dark cards */}
      <div className="flex lg:hidden flex-col gap-6">
        {projects.map((project, _index) => {
          return (
            <div
              key={project.slug}
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--border)', cursor: project.comingSoon ? 'default' : 'pointer' }}
              onClick={() => { if (!project.comingSoon) navigate(`/projects/${project.slug}`) }}
            >
              {/* Image header — clean, no gradient */}
              <div className="relative w-full overflow-hidden" style={{ height: 200 }}>
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  style={{ opacity: project.comingSoon ? 0.4 : 1 }}
                />
                {project.comingSoon && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/70 backdrop-blur-sm">
                      Coming Soon
                    </span>
                  </div>
                )}
              </div>

              {/* Details — always visible */}
              {!project.comingSoon && (
                <div className="p-4" style={{ background: 'var(--surface-dark)' }}>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--text)' }}>{project.shortTitle}</p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Tag variant="accent">{project.category}</Tag>
                      <Tag>{project.year}</Tag>
                    </div>
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>{project.description}</p>
                  {project.metrics.length > 0 && (
                    <div className="flex gap-4 mb-3">
                      {project.metrics.slice(0, 2).map(m => (
                        <div key={m.label}>
                          <p className="text-lg font-bold text-[#09f]">{m.value}</p>
                          <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>{m.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tools.map(tool => (
                      <span
                        key={tool}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                        style={{ background: 'var(--surface)', color: 'var(--text-muted)' }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <p className="inline-flex items-center gap-1 text-sm font-medium text-[#09f]">
                    {'View project →︎'}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
