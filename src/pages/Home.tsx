import { motion } from 'framer-motion'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { ProjectAccordion } from '../components/ui/ProjectAccordion'
import { SkillCarousel } from '../components/ui/SkillCarousel'
import { projects } from '../data/projects'

const EASE = [0.76, 0, 0.24, 1] as const

function TextReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div style={{ overflow: 'hidden', paddingBottom: '0.18em', marginBottom: '-0.18em' }}>
      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function FadeIn({ children, delay = 0, x = 0, y = 0 }: {
  children: React.ReactNode; delay?: number; x?: number; y?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function ScrollReveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function Home() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Header />

      {/* ── Hero ── */}
      <section
        className="relative flex flex-col px-8 md:px-16 lg:px-20 pb-0 sm:pb-16 min-h-[72svh] sm:min-h-0"
      >
        <div className="pt-[72px] sm:pt-32" style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn delay={0.1}>
            <div className="flex flex-col sm:flex-row items-start sm:items-stretch gap-3 sm:gap-4 sm:max-w-md">
              <div
                className="flex-shrink-0 rounded-full overflow-hidden"
                style={{ aspectRatio: '1', maxHeight: 80 }}
              >
                <img
                  src="https://framerusercontent.com/images/rNS3m6iygTIa7bGeYjfeqWBMKBc.png"
                  alt="André Blasques"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-base leading-relaxed sm:pt-1" style={{ color: 'var(--text-muted)' }}>
                Hi, I'm André Blasques! An experienced product designer passionate about building
                intuitive, impactful products. (:
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="mt-6 sm:mt-20">
          {/* Title row — desktop: flex with right block; mobile: just the h1 */}
          <div className="flex items-end justify-between gap-8">
            <h1
              className="text-[3.5rem] sm:text-[clamp(2.6rem,6.4vw,7rem)] font-medium leading-[0.95] tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', paddingBottom: '0.18em' }}
            >
              <div className="block sm:hidden">
                <TextReveal delay={0.25}>Digital</TextReveal>
                <TextReveal delay={0.32}>Product</TextReveal>
                <TextReveal delay={0.38}>Designer</TextReveal>
              </div>
              <div className="hidden sm:block">
                <TextReveal delay={0.25}>Digital Product</TextReveal>
                <TextReveal delay={0.38}>Designer</TextReveal>
              </div>
            </h1>

            {/* Desktop only: right-aligned email + scroll */}
            <FadeIn delay={0.65} x={12}>
              <div className="text-right hidden sm:block flex-shrink-0">
                <a
                  href="mailto:andre.blasques@gmail.com"
                  className="block text-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  andre.blasques@gmail.com
                </a>
                <div
                  className="flex items-center justify-end gap-2 mt-1 cursor-pointer"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                >
                  <p className="text-sm" style={{ color: 'var(--text-subtle)' }}>
                    Scroll to see how I bring ideas to life (:
                  </p>
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                      <defs>
                        <linearGradient id="chevron-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f2f2f2" />
                          <stop offset="50%" stopColor="#aaaaaa" />
                          <stop offset="100%" stopColor="#666666" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M4 7l6 6 6-6"
                        stroke="url(#chevron-grad)"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Mobile only: email + scroll below title, left-aligned */}
          <FadeIn delay={0.65}>
            <div className="flex flex-col gap-1 mt-4 sm:hidden">
              <a
                href="mailto:andre.blasques@gmail.com"
                className="text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                andre.blasques@gmail.com
              </a>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              >
                <p className="text-sm" style={{ color: 'var(--text-subtle)' }}>
                  Scroll to see how I bring ideas to life (:
                </p>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 7l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: 'var(--text-subtle)' }}
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Carousel ── */}
      <section className="pt-6 pb-2 sm:py-16 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SkillCarousel />
        </motion.div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="pt-6 sm:pt-16 pb-6 sm:pb-16 px-8 md:px-16 lg:px-20">
        <ScrollReveal>
          <ProjectAccordion projects={projects} />
        </ScrollReveal>
      </section>

      {/* ── Stat cards ── */}
      <section className="pt-6 sm:pt-16 pb-6 sm:pb-16">
        <div className="px-8 md:px-16 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Years of experience */}
            <ScrollReveal delay={0} className="h-full">
              <div className="p-6 rounded-2xl flex flex-col gap-3 h-full transition-transform duration-300 hover:-translate-y-1 cursor-default" style={{ background: 'var(--surface-dark)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0" style={{ opacity: 0.4, filter: 'var(--icon-filter)' }}>
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
                  <path d="M12 7v5l3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-2xl font-bold leading-none" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>10+</p>
                <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>Years of experience</p>
              </div>
            </ScrollReveal>

            {/* Main industries */}
            <ScrollReveal delay={0.08} className="h-full">
              <div className="p-6 rounded-2xl flex flex-col gap-3 h-full transition-transform duration-300 hover:-translate-y-1 cursor-default" style={{ background: 'var(--surface-dark)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0" style={{ opacity: 0.4, filter: 'var(--icon-filter)' }}>
                  <path d="M6 20V14M10 20V8M14 20V11M18 20V4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <p className="text-2xl font-bold leading-none" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>Fintech · Crypto · Payments</p>
                <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>Main industries</p>
              </div>
            </ScrollReveal>

            {/* Languages */}
            <ScrollReveal delay={0.16} className="h-full">
              <div className="p-6 rounded-2xl flex flex-col gap-3 h-full transition-transform duration-300 hover:-translate-y-1 cursor-default" style={{ background: 'var(--surface-dark)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0" style={{ opacity: 0.4, filter: 'var(--icon-filter)' }}>
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
                  <path d="M12 2c-3.5 5.5-3.5 14.5 0 20M12 2c3.5 5.5 3.5 14.5 0 20M2 12h20" stroke="white" strokeWidth="1.5" />
                </svg>
                <div className="flex items-center gap-3">
                  {[
                    { src: 'https://flagcdn.com/w80/br.png', label: 'PT' },
                    { src: 'https://flagcdn.com/w80/us.png', label: 'EN' },
                    { src: 'https://flagcdn.com/w80/es.png', label: 'ES' },
                  ].map(({ src, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <img src={src} alt={label} className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
                      <span className="text-2xl font-bold leading-none" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>Languages</p>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="pt-6 pb-6 sm:py-24 px-8 md:px-16 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: big statement + logos */}
          <div className="flex flex-col gap-12">
            <ScrollReveal>
              <h2
                className="text-3xl md:text-4xl font-bold leading-tight"
                style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
              >
                10+ years shaping digital experiences across fintech, crypto, and Web3.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div>
                <p className="text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--text-subtle)' }}>
                  Companies & brands
                </p>
                <div className="grid grid-cols-3 gap-x-8 gap-y-7 items-center">
                  {[
                    { src: '/logos/meridian.svg',   alt: 'Meridian',   h: 26 },
                    { src: '/logos/bitso.svg',       alt: 'Bitso',      h: 24 },
                    { src: '/logos/abinbev.svg',     alt: 'ABInBev',    h: 22 },
                    { src: '/logos/metlife.svg',     alt: 'MetLife',    h: 24 },
                    { src: '/logos/rdsaude.svg',     alt: 'RD Saúde',   h: 24 },
                    { src: '/logos/multilaser.svg',  alt: 'Multilaser', h: 16 },
                  ].map(({ src, alt, h }) => (
                    <img
                      key={alt}
                      src={src}
                      alt={alt}
                      style={{ maxHeight: h, width: 'auto', maxWidth: '100%', opacity: 0.55, filter: 'var(--logo-filter)' }}
                      className="object-contain"
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: paragraphs */}
          <div className="flex flex-col gap-6">
            <ScrollReveal delay={0.1}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                I've worked across industries: insurance, appliances, delivery, and finance,
                bringing a hands-on approach from early research all the way through prototyping,
                handoff, and QA. I prioritize clear planning and documentation so that design
                decisions are grounded in real user needs.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.18}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                My recent focus has been on fintech and crypto, spaces where great UX is still rare
                and the opportunity to make complex systems feel intuitive is huge. I work across
                apps, platforms, dashboards, and internal tools.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.26}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Fluent in Portuguese, English, and Spanish, enabling cross-regional collaboration
                and research across Latin America and beyond.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.34}>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://www.linkedin.com/in/andreblasques"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                  style={{ background: 'var(--text)', color: 'var(--bg)' }}
                >
                  {'LinkedIn ↗︎'}
                </a>
                <a
                  href="/cv-andreblasques.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                  style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' }}
                >
                  {'Full CV ↗︎'}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  )
}
