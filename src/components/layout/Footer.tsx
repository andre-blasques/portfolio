export function Footer({ hideWordmark = false }: { hideWordmark?: boolean }) {
  return (
    <footer>
      {!hideWordmark && (
        <div className="overflow-hidden px-6 md:px-12 pt-16">
          <p
            aria-hidden="true"
            className="font-bold leading-none select-none"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 13vw, 12rem)',
              color: 'var(--text)',
              opacity: 0.07,
              letterSpacing: '-0.03em',
              marginBottom: '-0.12em',
            }}
          >
            André Blasques
          </p>
        </div>
      )}
      <div className="border-t py-8 px-6 md:px-12" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} André Blasques
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/andreblasques"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              LinkedIn
            </a>
            <a
              href="mailto:andre.blasques@gmail.com"
              className="text-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              Email
            </a>
            <a
              href="https://wa.me/5511983176319"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
