import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

export function Header() {
  const { theme, toggle } = useTheme()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const atHero = isHome && !scrolled

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 lg:px-20 py-5 transition-all duration-300"
      style={{
        background: atHero ? 'transparent' : 'color-mix(in srgb, var(--bg) 75%, transparent)',
        backdropFilter: atHero ? 'none' : 'blur(16px)',
        WebkitBackdropFilter: atHero ? 'none' : 'blur(16px)',
        borderBottom: atHero ? '1px solid transparent' : '1px solid var(--border)',
      }}
    >
      <Link to="/" className="flex items-center gap-2">
        <img
          src="https://framerusercontent.com/images/X4YXA4f1YmQLuOssIHFCDNeMTA.png"
          alt="André Blasques"
          className="h-6 w-auto"
          style={{ filter: 'var(--logo-filter)' }}
        />
      </Link>

      <nav className="flex items-center gap-5">
        <a
          href="https://www.linkedin.com/in/andreblasques"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm transition-colors hidden sm:block"
          style={{ color: 'var(--text-muted)' }}
        >
          LinkedIn
        </a>
        <a
          href="https://drive.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all"
          style={{ background: 'var(--text)', color: 'var(--bg)', border: '1px solid var(--text)' }}
        >
          See full CV
        </a>
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          {theme === 'dark' ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </nav>
    </header>
  )
}
