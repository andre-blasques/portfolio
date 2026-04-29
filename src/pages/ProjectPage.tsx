import { useParams, Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Tag } from '../components/ui/Tag'
import { projects } from '../data/projects'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: 'var(--text-subtle)' }}>
      {children}
    </p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-2xl md:text-3xl font-semibold mb-6"
      style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
    >
      {children}
    </motion.h2>
  )
}


// ── Web3 Wallet rich content ──────────────────────────────────────────────────

function PhoneStrip({ screens, labels, cardHeight = 370 }: { screens: string[]; labels: string[]; cardHeight?: number }) {
  // The section already has px-6 md:px-12 padding applied.
  // stripPadding adds ONLY the max-w-4xl centering offset on top of that:
  //   (100vw - section-paddings - max-w-4xl) / 2 = (100vw - 6rem - 56rem) / 2
  // On narrow screens: no centering needed → 0px (section padding is enough)
  // On wide screens: grows to keep phones aligned with centered text
  const stripPadding = 'max(0px, calc((100vw - 62rem) / 2))'
  return (
    <div
      className="overflow-x-auto pb-4"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      } as React.CSSProperties}
    >
      <div className="flex gap-4" style={{ width: 'max-content', paddingLeft: stripPadding, paddingRight: stripPadding }}>
        {screens.map((src, i) => (
          <div key={i} className="flex flex-col items-center gap-3 flex-shrink-0">
            <div
              style={{
                width: 200,
                height: cardHeight,
                background: 'transparent',
                boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
                overflow: 'hidden',
                borderRadius: 8,
              }}
            >
              <img src={src} alt={labels[i] || ''} className="w-full h-full block" style={{ objectFit: 'cover', objectPosition: 'top' }} />
            </div>
            {labels[i] && (
              <p className="text-xs text-center" style={{ color: 'var(--text-subtle)', maxWidth: 160 }}>
                {labels[i]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function Web3WalletContent() {
  return (
    <>
      {/* ── Overview ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Overview</SectionLabel>
          <SectionTitle>Self-Custodial Wallet, Built Into Bitso</SectionTitle>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}
          >
            After delivering QR Payments, the team was scaled up to tackle a more ambitious product: a Web3 wallet embedded natively in the Bitso app. I led the full design process, from problem framing and user research to handoff and post-launch iterations, in 3 months, from exploration to production.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}
          >
            This product is especially significant: beyond its technical complexity and the breadth of flows, it pushed me deep into the Web3 world: understanding MPC wallets, dApp connections, token approval flows, and how to make all of that feel safe and accessible to someone who doesn't want to be a crypto expert.
          </motion.p>
        </div>
      </section>

      {/* ── Problem Statement ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Problem</SectionLabel>
          <SectionTitle>Users Were Leaving for Self-Custodial Alternatives</SectionTitle>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}
          >
            Data science and key stakeholders identified that a percentage of Bitso users were migrating to self-custodial competitors, and Bitso had no product to compete with. An internal survey with the research team helped size the opportunity.
          </motion.p>

          {/* Survey stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { pct: '37%', label: 'Already use Web3 wallets', sub: 'MetaMask, Trust, Coinbase, Phantom; mostly for simpler UX and lower fees' },
              { pct: '47%', label: "Don't use Web3 wallets", sub: "Mainly because they don't understand them. It's too complex." },
              { pct: '53%', label: 'Would use a Bitso Web3 wallet', sub: 'Convenience and security were the main drivers of interest' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl flex flex-col gap-3"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <p className="text-4xl font-bold leading-none" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{s.pct}</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{s.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{s.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Feature interest stats */}
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: 'var(--text-subtle)' }}
          >
            What features Web3 users are most interested in
          </motion.p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Staking', pct: '46%' },
              { label: 'Cold storage', pct: '40%' },
              { label: 'NFTs', pct: '38%' },
              { label: 'Swaps', pct: '36%' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <span className="text-base font-bold text-[#09f]" style={{ fontFamily: 'var(--font-display)' }}>{f.pct}</span>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{f.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Research ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Research</SectionLabel>
          <SectionTitle>8 User Interviews, 3 Product Pillars</SectionTitle>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}
          >
            I collaborated with the product and research teams to interview 8 Mexican users of other Web3 wallets. Their feedback helped define the product pillars and refine the target audience profile.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              {
                icon: '🔒', title: 'Security',
                items: ['Protection from scams', 'Interact only with trustable apps and tokens'],
              },
              {
                icon: '🌐', title: 'Access',
                items: ['More tokens and networks', 'Staking, swaps, lending, NFTs, Pools, dApps'],
              },
              {
                icon: '⚡', title: 'Convenience',
                items: ['Already trust Bitso', 'Everything on one app', 'Easy portfolio management', 'Fiat on-ramps'],
              },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl flex flex-col gap-4"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <span className="text-2xl">{p.icon}</span>
                <p className="text-base font-semibold" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{p.title}</p>
                <ul className="flex flex-col gap-2">
                  {p.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#09f]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Target profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="p-6 rounded-2xl"
            style={{ background: 'rgba(111,66,193,0.08)', border: '1px solid rgba(111,66,193,0.25)' }}
          >
            <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: 'rgba(111,66,193,0.9)' }}>Target Profile</p>
            <p className="text-lg font-semibold mb-4" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>The Enthusiastic</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--text-subtle)' }}>Profile</p>
                <ul className="flex flex-col gap-1.5">
                  {['High risk tolerance', 'Low to intermediate crypto knowledge', 'Seeks opportunities to profit', "Doesn't want to become a Web3 nerd, just wants the right path to profitability"].map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(111,66,193,0.9)' }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--text-subtle)' }}>Main pains</p>
                <ul className="flex flex-col gap-1.5">
                  {['Complexity of managing multiple wallets', 'Difficulty diversifying portfolios', 'Fear of losing assets to scams', 'Lack of educational content'].map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(111,66,193,0.9)' }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Feature Definition ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Prioritization</SectionLabel>
          <SectionTitle>Three Tiers of Features</SectionTitle>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}
          >
            By combining minimum Web3 requirements, good practices, and user pain points, we created three feature groups that guided MVP scope and prioritization.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: 'Must Have', color: 'var(--text)',
                items: ['Create & recover wallet', 'Deposit', 'Send', 'Portfolio view (Tokens / NFTs)', 'Wallet Connect', 'Sign messages & token approval', 'Transaction history'],
              },
              {
                label: 'Most Required by Users', color: '#09f',
                items: ['Educational content / learn how to use', 'Swaps', 'NFTs', 'Staking', 'Access to more tokens & networks', 'Security area'],
              },
              {
                label: 'Nice to Have', color: 'var(--text-subtle)',
                items: ['Multiple key storage methods', 'Integrated wallet balances view', 'Explore tab', 'dApp browser', 'Rewards', 'Security & educational area', 'Bitso shortcut for dApp connection'],
              },
            ].map((col, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl flex flex-col gap-4"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <p className="text-sm font-semibold" style={{ color: col.color }}>{col.label}</p>
                <ul className="flex flex-col gap-2">
                  {col.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#09f] opacity-60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Process ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Design process</SectionLabel>
          <SectionTitle>From Survey to Progressive Launch</SectionTitle>
          <div className="flex flex-col gap-0">
            {[
              { step: '01', phase: 'Discovery', items: ['Stakeholder interviews', 'Survey analysis', 'Problem definition', 'Goals & success metrics'] },
              { step: '02', phase: 'Research & Benchmark', items: ['8 user interviews', 'Competitor analysis', 'Competitive landscape mapping', 'Feature requirements definition'] },
              { step: '03', phase: 'Strategy & Alignment', items: ['Target audience definition', 'MVP scope', 'Product trio alignment', 'PRD collaboration'] },
              { step: '04', phase: 'Design & Iteration', items: ['First sketches', 'Design critique & squad feedback', 'Mid-fi flows', 'High-fidelity', 'Tech refinement', 'Repriorization'] },
              { step: '05', phase: 'Delivery & Launch', items: ['Data tracking setup', 'Stakeholder final alignment', 'Handoff', 'Development support', 'Progressive launch'] },
            ].map((s, i, arr) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center flex-shrink-0" style={{ width: 36 }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                    style={{ background: 'var(--surface)', border: '1px solid rgba(0,153,255,0.35)' }}
                  >
                    <span className="text-[10px] font-mono font-semibold text-[#09f]">{s.step}</span>
                  </motion.div>
                  {i < arr.length - 1 && (
                    <div className="flex-1 w-px mt-1 mb-1" style={{ background: 'rgba(0,153,255,0.35)', minHeight: 24 }} />
                  )}
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.05 }}
                  className="flex-1 pb-6"
                >
                  <p className="text-sm font-semibold mb-2 mt-1.5" style={{ color: 'var(--text)' }}>{s.phase}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span key={item} className="inline-flex items-center px-3 py-1 rounded-full text-xs"
                        style={{ background: 'var(--surface)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Solution</SectionLabel>
          <SectionTitle>An MPC Wallet Embedded in a Trusted App</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}
            >
              A Web3 wallet integrated directly into the Bitso app, with a separate balance, allowing users to deposit, send, and hold tokens and NFTs through MPC technology. Initially launched on Ethereum mainnet, with Polygon, Arbitrum, and Optimism added in subsequent iterations.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}
            >
              Staking, swaps, lending, NFTs, and DeFi interactions are accessible via Wallet Connect. The MPC approach removes seed phrases, making key management invisible while maintaining real self-custody security.
            </motion.p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { from: 'Convenience', to: 'Web3 wallet on the same app' },
              { from: 'Security & easiness', to: 'MPC Wallet' },
              { from: 'Easier for MVP', to: 'Ethereum mainnet' },
              { from: 'Swaps, NFTs, Staking', to: 'Wallet Connect' },
            ].map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-4 rounded-xl flex flex-col gap-2"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>{d.from}</p>
                <div className="w-4 h-px" style={{ background: '#09f', opacity: 0.6 }} />
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{d.to}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Create Wallet Flow ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto mb-8">
          <SectionLabel>MVP Flows</SectionLabel>
          <SectionTitle>Create &amp; Switch to Web3 Wallet</SectionTitle>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            From the custodial wallet, users are guided through a single-action creation flow: iCloud sync for key backup, success state, welcome bottom sheet, and arrival at the Web3 Wallet with their address already visible.
          </p>
        </div>
        <PhoneStrip
          screens={[
            '/figma/web3/create-s1.png',
            '/figma/web3/create-s2.png',
            '/figma/web3/create-s3.png',
            '/figma/web3/create-s4.png',
            '/figma/web3/create-s5.png',
            '/figma/web3/create-s6.png',
          ]}
          labels={['Custodial wallet', 'Create wallet', 'Cloud sync', 'Success', 'Welcome', 'Web3 Wallet']}
        />
      </section>

      {/* ── Deposit ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto mb-8">
          <SectionTitle>Deposit</SectionTitle>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            From the Web3 Wallet home, users can deposit Ethereum tokens by sharing their address or QR code. A warning ensures they only send accepted tokens.
          </p>
        </div>
        <PhoneStrip
          screens={['/figma/web3/deposit-s1.png', '/figma/web3/deposit-s2.png']}
          labels={['Web3 Wallet', 'Deposit main page']}
        />
      </section>

      {/* ── Send Flow ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto mb-8">
          <SectionTitle>Send</SectionTitle>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Token picker, calculator with live conversion, recipient address input with safety warning, confirmation screen with network fee breakdown, and success state.
          </p>
        </div>
        <PhoneStrip
          screens={[
            '/figma/web3/send-s1.png',
            '/figma/web3/send-s2.png',
            '/figma/web3/send-s3.png',
            '/figma/web3/send-s4.png',
            '/figma/web3/send-s5.png',
            '/figma/web3/send-s6.png',
          ]}
          labels={['Web3 Wallet', 'Currency picker', 'Calculator', 'Receipt input', 'Confirmation', 'Success']}
        />
      </section>

      {/* ── Transaction History ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto mb-8">
          <SectionTitle>Transaction History</SectionTitle>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            The Activity tab shows all on-chain transactions with status indicators. Tapping any row opens the full details on Etherscan directly within the app.
          </p>
        </div>
        <PhoneStrip
          screens={['/figma/web3/txhistory-s1.png', '/figma/web3/txhistory-s2.png']}
          labels={['Activity tab', 'Etherscan']}
        />
      </section>

      {/* ── Landing Page ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Landing Page</SectionLabel>
          <SectionTitle>Web3 Wallet Landing Page</SectionTitle>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}
          >
            Alongside the app, I designed the marketing landing page for the Web3 Wallet, communicating the product value proposition to a wider audience. The page was designed fully responsive, from 1440px desktop to 375px mobile.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row gap-6 items-start"
          >
            {/* Desktop browser mockup */}
            <div className="flex-1 min-w-0">
              {/* Browser chrome */}
              <div
                className="flex items-center gap-3 px-4 py-2.5 rounded-t-xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
              >
                <div className="flex gap-1.5 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,95,87,0.8)' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,189,46,0.8)' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(40,200,64,0.8)' }} />
                </div>
                <div
                  className="flex-1 flex items-center px-3 py-1 rounded-md"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                >
                  <span className="text-xs truncate" style={{ color: 'var(--text-subtle)' }}>bitso.com/web3-wallet</span>
                </div>
              </div>
              {/* Scrollable LP content */}
              <div
                className="overflow-y-auto rounded-b-xl"
                style={{
                  maxHeight: 480,
                  border: '1px solid var(--border)',
                  borderTop: 'none',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'var(--border) transparent',
                }}
              >
                <img
                  src="/figma/web3/lp-desktop.png"
                  alt="Web3 Wallet desktop landing page"
                  className="w-full block"
                  draggable={false}
                />
              </div>
              <p className="text-xs text-center mt-3" style={{ color: 'var(--text-subtle)' }}>Desktop, 1440px</p>
            </div>

            {/* Mobile phone mockup */}
            <div className="flex-shrink-0 flex flex-col items-center" style={{ width: 200 }}>
              {/* Phone top chrome */}
              <div
                className="w-full flex flex-col items-center pt-3 pb-2 rounded-t-3xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderBottom: 'none' }}
              >
                <div className="w-14 h-1 rounded-full" style={{ background: 'var(--border)' }} />
              </div>
              {/* Scrollable LP content */}
              <div
                className="w-full overflow-y-auto"
                style={{
                  maxHeight: 480,
                  border: '1px solid var(--border)',
                  borderTop: 'none',
                  borderBottom: 'none',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'var(--border) transparent',
                }}
              >
                <img
                  src="/figma/web3/lp-mobile.png"
                  alt="Web3 Wallet mobile landing page"
                  className="w-full block"
                  draggable={false}
                />
              </div>
              {/* Phone bottom chrome */}
              <div
                className="w-full flex flex-col items-center pb-3 pt-2 rounded-b-3xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none' }}
              >
                <div className="w-20 h-1 rounded-full" style={{ background: 'var(--border)' }} />
              </div>
              <p className="text-xs text-center mt-3" style={{ color: 'var(--text-subtle)' }}>Mobile, 375px</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Results</SectionLabel>
          <SectionTitle>MVP in 3 Months, Iteration After</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {[
              { title: 'MVP delivered in 3 months', body: 'From exploration to production for the first batch of users. Rapid turnaround validated the team\'s efficiency under a tight deadline.' },
              { title: 'Activation rate met expectations', body: 'After one month, activation results aligned with targets and the product gained its first active adopters.' },
              { title: 'Bug identification cycle', body: 'Detected and fixed critical issues early: total balance errors, scam token filtering, and portfolio view corrections.' },
              { title: 'Community building', body: 'Launched a Telegram community with early adopters to accelerate feedback loops, product engagement, and validation.' },
            ].map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col gap-2"
              >
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{r.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{r.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="p-6 rounded-2xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: 'var(--text-subtle)' }}>Post-launch iterations</p>
            <div className="flex flex-wrap gap-2">
              {['Multiple networks (Polygon, Arbitrum, Optimism, Base)', 'Deposit from Custodial Wallet', 'dApp Explore tab', 'NFTs', 'Internal Swaps', 'Ongoing UX improvements'].map((f) => (
                <span key={f} className="inline-flex items-center px-3 py-1 rounded-full text-xs"
                  style={{ background: 'var(--bg)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                  {f}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── NFT Visual ── */}
      <section className="py-6 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden"
          style={{ border: '1px solid var(--border)' }}
        >
          <img
            src="/figma/web3/nft-view.png"
            alt="NFT detail view: Nakamigos #11082"
            className="w-full block"
            style={{ maxHeight: 500, objectFit: 'cover', objectPosition: 'center' }}
          />
        </motion.div>
      </section>

      {/* ── Learnings ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Reflection</SectionLabel>
          <SectionTitle>Learnings</SectionTitle>
          <div className="flex flex-col gap-6">
            {[
              { n: '01', text: 'Launching fast accelerates learning. Even a simplified MVP generates the feedback needed to make the right next moves. Waiting for perfection slows everything down.' },
              { n: '02', text: 'Internal surveys are underrated. Running structured surveys with the data and research team gave us signal quality comparable to external user research, at a fraction of the cost.' },
              { n: '03', text: 'Progressive launching is a risk-mitigation tool. Shipping to a small cohort first let us catch critical issues before they reached the full user base.' },
              { n: '04', text: 'Marketing and content need to be in the room from day one. Educational content was one of the top user requests, and delaying that team\'s involvement directly affected activation.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--surface)', border: '1px solid rgba(0,153,255,0.35)' }}
                >
                  <span className="text-[10px] font-mono font-semibold text-[#09f]">{item.n}</span>
                </div>
                <p className="text-base leading-relaxed mt-1.5" style={{ color: 'var(--text-muted)' }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}

// ── QR Payments Cryptoback rich content ──────────────────────────────────────

function QRPaymentsCryptobackContent() {
  const accent = '#22c55e'
  const accentBorder = 'rgba(34,197,94,0.3)'

  return (
    <>
      {/* ── Overview ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Overview</SectionLabel>
          <SectionTitle>From Utility to Engagement Loop</SectionTitle>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}
          >
            QR Payments was a core capability at Bitso Argentina, enabling users to pay merchants through local payment rails. Despite strong fundamentals, the experience behaved as a pure utility, it enabled transactions, but did not create engagement, retention, or differentiation.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}
          >
            This project redefined QR Payments from a transactional feature into a behavior-driven system by introducing Cryptoback, a reward mechanism that returns a percentage of each payment in BTC. The goal was not to add incentives, but to design a repeatable engagement loop that could scale sustainably.
          </motion.p>

          {/* Impact grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Significant increase in monthly payment volume',
              'Improvement in repeat usage and payment frequency',
              'Reduction in early churn after first transaction',
              'New behavioral loop connecting payments and crypto exposure',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: accent }} />
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Baseline Experience ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto mb-8">
          <SectionLabel>Baseline</SectionLabel>
          <SectionTitle>The original QR Payments flow was efficient and familiar</SectionTitle>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            The experience was frictionless, but lacked any mechanism to drive return usage. Users completed transactions, but did not build habits.
          </p>
        </div>
        <PhoneStrip
          screens={[
            '/figma/qr/base-s1.png',
            '/figma/qr/base-s2.png',
            '/figma/qr/base-s3.png',
            '/figma/qr/base-s4.png',
            '/figma/qr/base-s5.png',
            '/figma/qr/base-s6.png',
          ]}
          labels={['Home', 'QR Scanner', 'Amount', 'Currency picker', 'Confirmation', 'Success']}
          cardHeight={444}
        />
      </section>

      {/* ── Problem ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Problem</SectionLabel>
          <SectionTitle>Two months after launch, performance remained below expectations</SectionTitle>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}
          >
            The issue was not usability. The issue was absence of motivation.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { value: '19%', label: 'Monthly payment volume', sub: 'Adoption and usage well below target' },
              { value: '5%', label: 'Customer Retention', sub: 'Users with at least 3 payments per month' },
              { value: '32%', label: 'Transacting users', sub: 'Unique users per month' },
              { value: '35%', label: 'Churn rate', sub: 'No payments in the last 30 days' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl flex flex-col gap-2"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <p className="text-4xl font-bold leading-none" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{s.value}</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{s.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{s.sub}</p>
              </motion.div>
            ))}
          </div>
          {/* Insight box */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="p-6 rounded-2xl"
            style={{ background: 'var(--surface)', borderLeft: `3px solid ${accent}`, paddingLeft: 20 }}
          >
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Insight</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Payments alone do not create retention. Users need a reason to come back, and that reason must be immediate, visible, and emotionally meaningful.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Research ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Research</SectionLabel>
          <SectionTitle>User Behavior</SectionTitle>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}
          >
            We surveyed 403 users and conducted follow-up interviews. Three patterns emerged:
          </motion.p>
          <div className="flex flex-col gap-3 mb-10">
            {[
              'Payments were perceived as purely functional, no emotional hook',
              'Users required a clear and immediate benefit to change behavior',
              'Rewards only worked when they were visible and easy to understand',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: accent }} />
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item}</p>
              </motion.div>
            ))}
          </div>

          {/* Market Dynamics */}
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: 'var(--text-subtle)' }}
          >
            Market Dynamics, Competitor cashback
          </motion.p>
          <div className="flex flex-wrap gap-3 items-center mb-4">
            {['Lemon', 'MercadoPago', 'Ualá', 'MODO'].map((c, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
              >
                {c}
              </motion.span>
            ))}
          </div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Average rewards ranged from <strong style={{ color: 'var(--text)' }}>4–5%</strong>, with promotional spikes reaching up to <strong style={{ color: 'var(--text)' }}>20%</strong>. These models created short-term spikes but were expensive to scale sustainably.
          </p>
        </div>
      </section>

      {/* ── Strategy ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Strategy</SectionLabel>
          <SectionTitle>We selected a variable reward model based on controlled randomness</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { title: 'Fixed crypto rewards', items: ['Predictable but expensive', 'Does not drive excitement', 'Difficult to sustain at scale'], selected: false },
              { title: 'Yield-based accounts', items: ['Mid-high development effort', 'Impacts many existing flows', 'Risk of conflicting with conversions'], selected: false },
              { title: 'Variable reward system', items: ['Low effort, high flexibility', 'Creates "aha moments"', 'Avg 4%, financially viable', 'Drives adoption and retention'], selected: true },
            ].map((opt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl flex flex-col gap-3"
                style={{
                  background: opt.selected ? `rgba(34,197,94,0.07)` : 'var(--surface)',
                  border: `1px solid ${opt.selected ? accent : 'var(--border)'}`,
                  opacity: opt.selected ? 1 : 0.6,
                }}
              >
                <p className="text-sm font-semibold" style={{ color: opt.selected ? accent : 'var(--text)' }}>{opt.title}</p>
                <div className="flex flex-col gap-1.5">
                  {opt.items.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: opt.selected ? accent : 'var(--text-subtle)' }} />
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Constraints */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="p-6 rounded-2xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: 'var(--text-subtle)' }}>Constraints</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Unable to offer better flat rates than competitors',
                'High pressure for short-term results from stakeholders',
                'Limited engineering bandwidth, existing components only',
                'Financial and regulatory risk considerations',
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: 'var(--text-subtle)' }} />
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{c}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Validation ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Validation</SectionLabel>
          <SectionTitle>We validated the concept through prototype-based interviews with 8 users</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { n: '01', finding: 'Users preferred uncertain high rewards over fixed low rewards' },
              { n: '02', finding: 'The possibility of a large outcome increased excitement and recall' },
              { n: '03', finding: 'Reward visibility directly impacted trust and participation' },
              { n: '04', finding: 'Lack of clarity reduced participation significantly' },
              { n: '05', finding: 'Immediate feedback after payment strongly reinforced behavior' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl flex flex-col gap-3"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <span className="text-xs font-mono font-semibold" style={{ color: accent }}>{f.n}</span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{f.finding}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── System Design ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>System Design</SectionLabel>
          <div className="flex flex-col md:flex-row gap-10 items-stretch">
            <div className="flex-1">
              <SectionTitle>Variable rewards, controlled average</SectionTitle>
              <motion.p
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}
              >
                Randomized rewards allowed us to maintain an average return of approximately 4% while delivering moments that felt significantly more valuable, shifting the system from predictable utility to engaging interaction.
              </motion.p>
              {/* Rate chips */}
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: 'var(--text-subtle)' }}
              >
                Possible outcomes
              </motion.p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['1%', '2%', '5%', '10%', '25%'].map((rate, i) => (
                  <motion.span
                    key={rate}
                    initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold"
                    style={{
                      background: i === 4 ? `rgba(34,197,94,0.12)` : 'var(--surface)',
                      border: `1px solid ${i === 4 ? accent : 'var(--border)'}`,
                      color: i === 4 ? accent : 'var(--text)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {rate}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center px-4 py-2 rounded-full text-xs"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                >
                  ~4% weighted average
                </motion.span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                The system was designed to balance three factors: user excitement, cost control, and long-term sustainability.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0 self-stretch flex items-center justify-center"
              style={{ width: 260 }}
            >
              <img
                src="/figma/qr/mockup-hand.png"
                alt="Bitso, up to 25% crypto back on QR payments"
                className="w-full h-full"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Design Decisions ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Design Decisions</SectionLabel>
          <SectionTitle>Execution focused on four critical behavioral moments</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { n: '01', title: 'Pre-transaction activation', body: 'Users explicitly activate Cryptoback before payment, ensuring awareness and eligibility without adding friction to the core flow.' },
              { n: '02', title: 'Confirmation reinforcement', body: 'Reward expectation is surfaced at confirmation, reducing uncertainty and improving completion rates.' },
              { n: '03', title: 'Reward reveal moment', body: 'A dedicated reveal animation introduces a peak emotional experience and reinforces memory after payment.' },
              { n: '04', title: 'Immediate reward feedback', body: 'Users instantly see the BTC earned, closing the loop between action and outcome and reinforcing repetition.' },
            ].map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl flex flex-col gap-3"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `rgba(34,197,94,0.1)`, border: `1px solid ${accentBorder}` }}
                >
                  <span className="text-[10px] font-mono font-semibold" style={{ color: accent }}>{d.n}</span>
                </div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{d.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{d.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Process ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Process</SectionLabel>
          <SectionTitle>From sketches to handoff</SectionTitle>
          <div className="flex flex-col gap-0">
            {[
              { step: '01', phase: 'Sketches & Mid-fi flows', items: ['Explorations', 'First design definitions', 'Initial proposals'] },
              { step: '02', phase: 'Internal validations', items: ['Squad feedback', 'Design critique', 'Tech refinement'] },
              { step: '03', phase: 'Prioritization', items: ['Tech refinement', 'Phaseout planning', 'Scope lock'] },
              { step: '04', phase: 'High fidelity flow', items: ['Adjustments based on team feedback', 'Stakeholder alignment'] },
              { step: '05', phase: 'Data tracking', items: ['Collaborated with Data Science', 'Accurate event tracking'] },
              { step: '06', phase: 'Last refinement', items: ['Collaboration with developers', 'Edge cases', 'Bug resolution'] },
              { step: '07', phase: 'Handoff', items: ['Final delivery', 'Development support', 'QA review'] },
            ].map((s, i, arr) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center flex-shrink-0" style={{ width: 36 }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                    style={{ background: 'var(--surface)', border: `1px solid ${accentBorder}` }}
                  >
                    <span className="text-[10px] font-mono font-semibold" style={{ color: accent }}>{s.step}</span>
                  </motion.div>
                  {i < arr.length - 1 && (
                    <div className="flex-1 w-px mt-1 mb-1" style={{ background: accentBorder, minHeight: 24 }} />
                  )}
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.05 }}
                  className="flex-1 pb-6"
                >
                  <p className="text-sm font-semibold mb-2 mt-1.5" style={{ color: 'var(--text)' }}>{s.phase}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span key={item} className="inline-flex items-center px-3 py-1 rounded-full text-xs"
                        style={{ background: 'var(--surface)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final Experience ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto mb-8">
          <SectionLabel>Final Experience</SectionLabel>
          <SectionTitle>The final flow preserved simplicity while embedding a reward loop</SectionTitle>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Activation → Payment → Anticipation → Reveal → Confirmation with BTC received. A static flow transformed into a dynamic system that encourages repetition.
          </p>
        </div>
        <PhoneStrip
          screens={[
            '/figma/qr/cb-s1.png',
            '/figma/qr/cb-s2.png',
            '/figma/qr/cb-s3.png',
            '/figma/qr/base-s3.png',
            '/figma/qr/base-s4.png',
            '/figma/qr/base-s5.png',
            '/figma/qr/cb-aha.png',
            '/figma/qr/base-s6.png',
          ]}
          labels={['Home with cryptoback', 'Activation', 'QR Scanner', 'Amount', 'Currency picker', 'Confirmation', 'Aha-moment', 'Success']}
          cardHeight={444}
        />
      </section>

      {/* ── Distribution ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto mb-8">
          <SectionLabel>Distribution</SectionLabel>
          <SectionTitle>The concept extended beyond product into communication</SectionTitle>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Messaging focused on simplicity, immediacy, and upside, <em>QR payments, now with crypto.</em>
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Desktop browser mockup */}
            <div className="flex-1 min-w-0">
              <div
                className="flex items-center gap-3 px-4 py-2.5 rounded-t-xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
              >
                <div className="flex gap-1.5 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,95,87,0.8)' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,189,46,0.8)' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(40,200,64,0.8)' }} />
                </div>
                <div
                  className="flex-1 flex items-center px-3 py-1 rounded-md"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                >
                  <span className="text-xs truncate" style={{ color: 'var(--text-subtle)' }}>bitso.com/qr-payments</span>
                </div>
              </div>
              <div
                className="overflow-y-auto rounded-b-xl"
                style={{
                  maxHeight: 480,
                  border: '1px solid var(--border)',
                  borderTop: 'none',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'var(--border) transparent',
                }}
              >
                <img src="/figma/qr/lp-desktop.png" alt="QR Payments landing page desktop" className="w-full block" draggable={false} />
              </div>
              <p className="text-xs text-center mt-3" style={{ color: 'var(--text-subtle)' }}>Desktop, 1440px</p>
            </div>
            {/* Mobile phone mockup */}
            <div className="flex-shrink-0 flex flex-col items-center" style={{ width: 200 }}>
              <div
                className="w-full flex flex-col items-center pt-3 pb-2 rounded-t-3xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderBottom: 'none' }}
              >
                <div className="w-14 h-1 rounded-full" style={{ background: 'var(--border)' }} />
              </div>
              <div
                className="w-full overflow-y-auto"
                style={{
                  maxHeight: 480,
                  border: '1px solid var(--border)',
                  borderTop: 'none',
                  borderBottom: 'none',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'var(--border) transparent',
                }}
              >
                <img src="/figma/qr/lp-mobile.png" alt="QR Payments landing page mobile" className="w-full block" draggable={false} />
              </div>
              <div
                className="w-full flex flex-col items-center pb-3 pt-2 rounded-b-3xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none' }}
              >
                <div className="w-20 h-1 rounded-full" style={{ background: 'var(--border)' }} />
              </div>
              <p className="text-xs text-center mt-3" style={{ color: 'var(--text-subtle)' }}>Mobile, 375px</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Results ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Results</SectionLabel>
          <SectionTitle>The 2-month experiment confirmed the hypothesis</SectionTitle>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}
          >
            All four success metrics moved in the right direction. Introducing variability and immediacy into the reward mechanism shifted user behavior from transactional to habitual.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { metric: '↑ Volume', label: 'Monthly payment volume', detail: 'Users paid more frequently after activating Cryptoback' },
              { metric: '↑ Retention', label: '3+ payments per month', detail: 'Repeat usage increased among activated users' },
              { metric: '↑ Transacting users', label: 'Unique users per month', detail: 'New users converted at a higher rate with the reward visible' },
              { metric: '↓ Churn', label: 'No payment within 30 days', detail: 'Early drop-off reduced after the first Cryptoback reward' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl flex flex-col gap-2"
                style={{ background: 'var(--surface)', border: `1px solid ${accentBorder}` }}
              >
                <p className="text-2xl font-bold leading-none" style={{ color: accent, fontFamily: 'var(--font-display)' }}>{item.metric}</p>
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>{item.label}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reflection ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Reflection</SectionLabel>
          <SectionTitle>Reframing how incentives work</SectionTitle>
          <div className="flex flex-col gap-6">
            {[
              { n: '01', text: 'Instead of increasing reward value, we redesigned how value is perceived. Variability creates a different kind of engagement than predictable returns.' },
              { n: '02', text: 'By introducing variability and timing, we created a system where each transaction carries potential, not just outcome. The randomness became part of the product experience.' },
              { n: '03', text: 'The result was a shift from a utility-driven feature to a behavior-driven product system, one that could scale without proportionally increasing cost.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--surface)', border: `1px solid ${accentBorder}` }}
                >
                  <span className="text-[10px] font-mono font-semibold" style={{ color: accent }}>{item.n}</span>
                </div>
                <p className="text-base leading-relaxed mt-1.5" style={{ color: 'var(--text-muted)' }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// ── Virtual Accounts rich content ─────────────────────────────────────────────

/** Video that restarts + plays when scrolled into view, pauses when out */
function ScrollVideo({ src, borderRadius = 20 }: { src: string; borderRadius?: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.currentTime = 0
          video.play().catch(() => {/* autoplay blocked */})
        } else {
          video.pause()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      className="w-full h-auto block"
      style={{ borderRadius, display: 'block' }}
    >
      <source src={src} type="video/mp4" />
      <source src={src} type="video/quicktime" />
    </video>
  )
}

/** iPhone shell mockup - silver CSS frame, 20px screen radius, auto height follows video */
function IPhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      position: 'relative',
      width: 224,
      flexShrink: 0,
      userSelect: 'none',
      background: 'linear-gradient(160deg, #dddbd7 0%, #b4b2ae 35%, #c8c6c2 65%, #dddbd7 100%)',
      borderRadius: 26,
      padding: 6,
      boxShadow: [
        'inset 0 1px 0 rgba(255,255,255,0.55)',
        'inset 0 -1px 0 rgba(0,0,0,0.18)',
        'inset 1px 0 0 rgba(255,255,255,0.2)',
        'inset -1px 0 0 rgba(0,0,0,0.1)',
        '0 20px 40px rgba(0,0,0,0.55)',
        '0 4px 10px rgba(0,0,0,0.28)',
      ].join(', '),
    }}>
      {/* Screen - 20px radius, clips video */}
      <div style={{ borderRadius: 20, overflow: 'hidden', background: '#000' }}>
        {children}
      </div>

      {/* Left: silent switch + vol up + vol down */}
      {[{ top: 62, h: 22 }, { top: 94, h: 34 }, { top: 136, h: 34 }].map((b, i) => (
        <div key={i} aria-hidden="true" style={{
          position: 'absolute', left: -4, top: b.top, width: 4, height: b.h,
          background: 'linear-gradient(to right, #8a8886, #b4b2ae)',
          borderRadius: '2px 0 0 2px',
        }} />
      ))}
      {/* Right: power button */}
      <div aria-hidden="true" style={{
        position: 'absolute', right: -4, top: 108, width: 4, height: 52,
        background: 'linear-gradient(to left, #8a8886, #b4b2ae)',
        borderRadius: '0 2px 2px 0',
      }} />
    </div>
  )
}


/** Browser window mockup - CSS chrome bar + scroll-triggered video */
function LaptopVideo({ src, alt }: { src: string; alt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.currentTime = 0
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="mx-auto w-full select-none overflow-hidden"
      style={{
        maxWidth: 680,
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 24px 48px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3)',
      }}
    >
      {/* Browser chrome bar */}
      <div
        style={{
          background: 'linear-gradient(to bottom, #2a2a2a, #222)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.85 }} />
          ))}
        </div>
        {/* URL bar */}
        <div
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 6,
            padding: '3px 10px',
            fontSize: 11,
            color: 'rgba(255,255,255,0.35)',
            fontFamily: 'var(--font-mono, monospace)',
            letterSpacing: 0.2,
          }}
        >
          meridian.portal.app
        </div>
      </div>

      {/* Video content */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        aria-label={alt}
        className="w-full block"
        style={{ display: 'block' }}
      >
        <source src={src} type="video/mp4" />
        <source src={src} type="video/quicktime" />
      </video>
    </div>
  )
}

function SlideImage({ src, alt, delay = 0 }: { src: string; alt: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="max-w-4xl mx-auto rounded-2xl overflow-hidden"
      style={{ border: '1px solid var(--border)' }}
    >
      <img src={src} alt={alt} className="w-full h-auto block" />
    </motion.div>
  )
}

function VirtualAccountsContent() {
  return (
    <>
      {/* ── Product Overview ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Product overview</SectionLabel>
          <SectionTitle>U.S. Virtual Accounts: Real-Time Deposits</SectionTitle>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base leading-relaxed mb-6"
            style={{ color: 'var(--text-muted)' }}
          >
            A solution that enables users outside the U.S. to receive payments as if they had a U.S. bank account.
            It removes friction from cross-border payments, enabling users to receive USD easily, faster, and with
            more control over FX and timing.
          </motion.p>
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            {[
              'Generates U.S. bank details (account + routing number) for each user',
              'Allows receiving payments via ACH or wire directly in USD',
              'Funds arrive in real-time or near instantly',
              'Users can hold funds in USD and convert to local currency anytime',
              'Fully integrated into wallets, fintechs, or partner platforms',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#09f]" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── Design Process ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Design process</SectionLabel>
          <SectionTitle>How I Designed It</SectionTitle>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 px-5 py-3 rounded-full mb-10 w-fit"
            style={{ background: 'rgba(0,153,255,0.10)', border: '1px solid rgba(0,153,255,0.25)' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#09f] flex-shrink-0" style={{ boxShadow: '0 0 6px #09f' }} />
            <span className="text-xs font-medium tracking-wide text-[#09f]">AI embedded across the entire process</span>
          </motion.div>

          <div className="flex flex-col gap-0">
            {[
              { step: '01', phase: 'Opportunity & Problem Framing', items: ['User research', 'Market & competitor analysis', 'Problem definition', 'Success metrics'] },
              { step: '02', phase: 'Concept & Validation', items: ['Concept exploration', 'Rapid prototyping', 'Stakeholder alignment', 'Early user validation'] },
              { step: '03', phase: 'Solution Definition', items: ['Solution design', 'Scope & trade-offs', 'Engineering & compliance alignment'] },
              { step: '04', phase: 'Design & Iteration', items: ['Interaction & UI design', 'High-fidelity prototyping', 'Iteration loops'] },
              { step: '05', phase: 'Delivery & Growth', items: ['Design-dev collaboration', 'Launch support', 'Post-launch analysis', 'Continuous improvements'] },
            ].map((s, i, arr) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center flex-shrink-0" style={{ width: 36 }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                    style={{ background: 'var(--surface)', border: '1px solid rgba(0,153,255,0.35)' }}
                  >
                    <span className="text-[10px] font-mono font-semibold text-[#09f]">{s.step}</span>
                  </motion.div>
                  {i < arr.length - 1 && (
                    <div className="flex-1 w-px mt-1 mb-1" style={{ background: 'rgba(0,153,255,0.35)', minHeight: 24 }} />
                  )}
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.05 }}
                  className="flex-1 pb-6"
                >
                  <p className="text-sm font-semibold mb-2 mt-1.5" style={{ color: 'var(--text)' }}>{s.phase}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span key={item} className="inline-flex items-center px-3 py-1 rounded-full text-xs"
                        style={{ background: 'var(--surface)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Leadership ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>My role</SectionLabel>
          <SectionTitle>End-to-End Product Design</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Full ownership',
                body: 'Led product design from 0 → launch, driving problem framing, solution definition and delivery, not just execution.',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="1.5" fill="white" />
                  </svg>
                ),
              },
              {
                title: 'Cross-functional',
                body: 'Partnered closely with Product, Engineering, Compliance and Data to balance user needs, technical constraints and regulatory requirements.',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="1.5" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: 'AI-First approach',
                body: 'Integrated AI across the workflow to accelerate synthesis, exploration and documentation, enabling faster iteration without compromising quality.',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="4" width="20" height="16" rx="3" stroke="white" strokeWidth="1.5" />
                    <rect x="6" y="10" width="4" height="3" rx="1" stroke="white" strokeWidth="1.5" />
                    <rect x="14" y="10" width="4" height="3" rx="1" stroke="white" strokeWidth="1.5" />
                    <path d="M9 17h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M2 7h20" stroke="white" strokeWidth="1.5" />
                  </svg>
                ),
              },
              {
                title: 'Design System & Scale',
                body: 'Built and evolved a scalable design system used across multiple products, ensuring consistency and faster delivery. Leveraged AI to accelerate component exploration, pattern generation and reuse, reducing design redundancy and enabling teams to scale efficiently.',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
            ].map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl flex flex-col gap-3" style={{ background: 'var(--surface)' }}>
                <span style={{ opacity: 0.4, filter: 'var(--icon-filter)', display: 'inline-flex' }}>{card.icon}</span>
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{card.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Prototypes gallery ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto mb-10">
          <SectionLabel>Prototypes</SectionLabel>
          <SectionTitle>Three Surfaces, One System</SectionTitle>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            The product was designed across three distinct experiences, each targeting a different context
            and user type, all sharing the same underlying system.
          </p>
        </div>

        {/* Visual Concept - split layout */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center py-8"
          >
            <div style={{ width: 224 }}>
              <ScrollVideo src="/videos/visual-concept.mov" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <p className="text-xs font-medium uppercase tracking-widest mb-3 text-[#09f]">01: Visual Concept</p>
            <p className="text-xl font-semibold mb-3" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>First polished prototype</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Built before any engineering was started, used to validate the product idea, run user interviews,
              and pitch to potential partners. Designed the visual language from scratch: dark UI with blue accents,
              USD-first layout, and a clear hierarchy for balance visibility.
            </p>
          </motion.div>
        </div>

        {/* Hosted UX - centered phone */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-medium uppercase tracking-widest mb-3 text-[#09f]">02: Hosted UX</p>
              <p className="text-xl font-semibold mb-3" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>Partner-embedded experience</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                White-labeled, customizable, and deployed inside existing partner apps.
                The flow covers: balance view → convert USD to local currency → transaction history. Minimal friction,
                real-time FX rates, one-tap conversion.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex justify-center py-8"
            >
              <IPhoneMockup>
                <ScrollVideo src="/videos/hosted-ux.mov" borderRadius={0} />
              </IPhoneMockup>
            </motion.div>
          </div>
        </div>

        {/* Internal Platform - laptop */}
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
            <p className="text-xs font-medium uppercase tracking-widest mb-2 text-[#09f]">03: Internal Platform</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Meridian Portal: the back-office tool used by compliance, operations, and partner admins to manage
              accounts at scale. Designed in parallel with the end-user product, sharing the same Design System
              and token architecture. Top: transaction management. Bottom: white-label onboarding per partner.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <LaptopVideo src="/videos/internal-platform.mp4" alt="Meridian Portal: internal platform walkthrough" />
          </motion.div>
        </div>
      </section>

      {/* ── Research & Insights ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Research</SectionLabel>
          <SectionTitle>Who We Talked To</SectionTitle>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}
          >
            We ran 18 remote interviews across three cohorts, all based outside the U.S. but receiving USD income regularly.
            Interviews were supplemented by a short survey (n=120) to validate themes at scale.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { type: 'Freelancers', meta: 'Philippines, Colombia, Argentina · ages 24-38', body: 'Working with U.S. clients via direct contracts or platforms like Upwork. Entrepreneurial, financially savvy, and highly sensitive to FX rates and fees.' },
              { type: 'Virtual Assistants', meta: 'Philippines, Mexico · ages 22-35', body: 'Structured long-term arrangements with U.S. businesses. More consistent income, lower wages, and strong dependency on fast local access to funds.' },
              { type: 'Seafarers', meta: 'Philippines, Indonesia · ages 28-45', body: 'Paid in USD through maritime employers. High earners with irregular payout cycles, facing unique compliance requirements around USD wage distribution.' },
            ].map((profile, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl flex flex-col gap-2" style={{ background: 'var(--surface)' }}>
                <p className="text-sm font-semibold text-[#09f]">{profile.type}</p>
                <p className="text-xs mb-1" style={{ color: 'var(--text-subtle)' }}>{profile.meta}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{profile.body}</p>
              </motion.div>
            ))}
          </div>

          <SectionTitle>What We Found</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                theme: 'Cost',
                insight: 'Users were acutely aware of every fee in the chain: conversion spreads, wire fees, ATM withdrawals. Several described routing money through multiple apps just to minimize losses.',
                action: 'Fee transparency became a first-screen principle. We led with cost clarity instead of hiding it in fine print.',
              },
              {
                theme: 'Convenience',
                insight: 'Most users moved money across 2-4 platforms before accessing it locally. Each step added delay, cost, and failure risk. They had adapted to the friction, not accepted it.',
                action: 'We prioritized the USD-to-local conversion flow as the core job, not account management. Fewer steps, real-time FX, one-tap conversion.',
              },
              {
                theme: 'Local trust',
                insight: 'Users described Wise, PayPal, and similar services as utilities: necessary, not preferred. Local fintech brands, even with smaller feature sets, scored higher on trust.',
                action: 'The product visual and tonal language was built to feel local-first, not like a U.S. bank export.',
              },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl flex flex-col gap-3" style={{ background: 'var(--surface)' }}>
                <p className="text-base font-semibold" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{item.theme}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.insight}</p>
                <p className="text-xs leading-relaxed pt-2 border-t" style={{ color: 'var(--text-subtle)', borderColor: 'var(--border)' }}>Decision: {item.action}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benchmark ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto mb-8">
          <SectionLabel>Benchmark</SectionLabel>
          <SectionTitle>What the Market Was Missing</SectionTitle>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}
          >
            We mapped 7 products across two categories: traditional U.S. banks handling international wires (Wells Fargo, Chase, US Bank) and fintech alternatives serving international recipients (Wise, PayPal, Gusto, Payoneer). Evaluated across five dimensions: onboarding complexity, KYC friction, FX visibility, mobile experience, and trust signals for non-U.S. users.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Traditional banks', finding: 'Failed at access. Onboarding required a U.S. address, SSN, or in-person verification. Not built for international users.' },
              { label: 'Fintech alternatives', finding: 'Closer, but incomplete. Wise had good FX rates but weak account infrastructure. PayPal had reach but poor user control.' },
              { label: 'The gap', finding: 'No product offered a real U.S. account experience (routing + account number) with real-time visibility, built for international users.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-4 rounded-xl flex flex-col gap-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <p className="text-xs font-semibold text-[#09f]">{item.label}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.finding}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <SlideImage src="/figma/benchmark.png" alt="Competitor benchmark: Wells Fargo, US Bank, PayPal, Chase, Wise, Gusto" />
        <div className="max-w-4xl mx-auto mt-8">
          <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>Key decisions from this</p>
          <div className="flex flex-col gap-3">
            {[
              'Committed to ACH and wire support from day one. The benchmark confirmed this was the gap users hit hardest.',
              'Removed onboarding fields that assumed U.S. residency and rebuilt KYC around passport-based identification.',
              'Made routing and account numbers prominent from the start. Research showed these details were users\' proof of legitimacy to U.S. clients.',
            ].map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#09f]" />
                {d}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Strategy: Business Enablement ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-10">
          <div>
            <SectionLabel>Strategy</SectionLabel>
            <SectionTitle>Design as a Business Enabler</SectionTitle>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Created a conceptual version and deck that enabled Sales to pitch and acquire partners,
              validating demand before the product was even built. Design helped unlock partnerships
              before the product existed.
            </p>
          </div>
          <div>
            <SectionLabel>Product direction</SectionLabel>
            <SectionTitle>From Insight to Direction</SectionTitle>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Partner feedback and benchmark informed the PRD. The key decision: shift from a polished
              concept to a scalable, partner-driven product: less "fancy" UI, more flexible and
              customizable system.
            </p>
          </div>
        </div>
        {/* deck used to pitch + actual product screens side by side */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--border)' }}
          >
            <img src="/figma/deck-concept.png" alt="Conceptual deck used for partner pitches" className="w-full h-auto block" />
            <div className="px-4 py-3" style={{ background: 'var(--surface)' }}>
              <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>Sales deck, used to acquire the first partners before launch</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--border)' }}
          >
            <img src="/figma/phones-android.png" alt="Product UI: hosted UX balance and conversion flow" className="w-full h-auto block" />
            <div className="px-4 py-3" style={{ background: 'var(--surface)' }}>
              <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>Production UI: balance view, currency conversion, routing & account details</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Scalable System ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto mb-12">
          <SectionLabel>Architecture</SectionLabel>
          <SectionTitle>One System, Many Products</SectionTitle>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}
          >
            This product was never a single branded app. From day one, the roadmap included multiple distribution partners across different markets, each with its own brand, user base, and compliance requirements. Building bespoke for each partner was not viable. Shipping a generic white-label with no flexibility was not either.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                layer: '01: Foundation',
                desc: 'Typography, spacing, motion, border, and color primitives. Shared across all partners. Never overridden.',
              },
              {
                layer: '02: Brand',
                desc: 'Theming tokens (primary color, surfaces, logo region, button radius) that partners configure. One layer swap changes the entire visual identity.',
              },
              {
                layer: '03: Components',
                desc: 'Around 60 components built on top of the token system. No hardcoded brand values. A component does not know which partner it belongs to.',
              },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl flex flex-col gap-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <p className="text-xs font-semibold text-[#09f]">{item.layer}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="p-5 rounded-2xl mb-10" style={{ background: 'rgba(0,153,255,0.07)', border: '1px solid rgba(0,153,255,0.2)' }}>
            <p className="text-xs font-semibold text-[#09f] mb-2">Key decision</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              We chose tokens over component variants for partner customization. Variants would have multiplied the component count and created maintenance overhead over time. Tokens kept the system flat and predictable, and every partner shared the same interaction patterns, accessibility standards, and release cadence.
            </p>
          </motion.div>

          <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>Impact</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
            {[
              'New partner onboarding reduced from weeks to days',
              'One component library across mobile, web, and back-office',
              'A UX fix shipped to all partners simultaneously',
              'Reuse was the default, not the exception',
              'Token-based theming enabled visual rebrand in hours',
              'Engineering estimated significant reduction in per-partner front-end work',
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="p-4 rounded-xl text-sm" style={{ background: 'var(--surface)', color: 'var(--text-muted)' }}>
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* White-label partners showcase */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--border)' }}
          >
            <img src="/figma/phones-whitelabel.png" alt="White-label onboarding: RCBC, GCash, BPI" className="w-full h-auto block" />
            <div className="px-4 py-3" style={{ background: 'var(--surface)' }}>
              <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>Same product, 3 different bank brands: RCBC, GCash, BPI</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--border)' }}
          >
            <img src="/figma/ui-product.png" alt="Meridian Design System: multi-tenant token theming" className="w-full h-auto block" />
            <div className="px-4 py-3" style={{ background: 'var(--surface)' }}>
              <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>Design System with token-based theming, one component, any brand</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Validation & Iteration ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto mb-10">
          <SectionLabel>Iteration</SectionLabel>
          <SectionTitle>What the Data Revealed</SectionTitle>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}
          >
            Post-launch findings came from three sources: interviews with users who had already been through the product, activation funnel analysis, and withdrawal behavior tracked through the operations dashboard. Four patterns surfaced that changed the product.
          </motion.p>
        </div>
        <div className="max-w-4xl mx-auto flex flex-col gap-6 mb-12">
          {[
            {
              n: '01',
              source: 'User interviews',
              title: 'Empty balances felt like broken accounts',
              body: 'Users who had just opened an account but not yet received a deposit described uncertainty about whether the account was actually active. The $0.00 balance alone did not confirm anything.',
              change: 'We moved the routing and account number to the first screen and added an explicit account-active confirmation state, giving users something concrete to share with payers immediately.',
            },
            {
              n: '02',
              source: 'Funnel analysis',
              title: 'Drop-off concentrated at the conversion step',
              body: 'The activation funnel showed a consistent drop between account creation and first conversion. Users were reaching the screen and not completing the action. Partner data confirmed this was not a one-off pattern.',
              change: 'Simplified the input to a single field with a live calculated output. Removed the simultaneous display of source and destination amounts that was creating hesitation.',
            },
            {
              n: '03',
              source: 'Funnel + user interviews',
              title: 'The final confirmation felt irreversible',
              body: 'Interview feedback from early users described the conversion CTA as anxiety-inducing. They wanted to see the locked rate before committing. The funnel confirmed high abandonment at that exact point.',
              change: 'Introduced a rate-lock preview step before the final confirmation. Users could see the exact rate for a short window before tapping convert. Drop-off at that step decreased.',
            },
            {
              n: '04',
              source: 'Dashboard analysis',
              title: 'Withdrawal patterns exposed gaps in the back-office',
              body: 'Monitoring withdrawal data revealed cases where compliance teams needed to act on individual accounts but the internal platform only supported bulk actions. Manual workarounds were accumulating.',
              change: 'Rebuilt the account detail view in Meridian Portal to support per-user status flags and override capabilities, shifting it from an operational tool to a compliance-grade one.',
            },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="flex items-start gap-5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--surface)', border: '1px solid rgba(0,153,255,0.35)' }}
              >
                <span className="text-[10px] font-mono font-semibold text-[#09f]">{item.n}</span>
              </div>
              <div className="flex flex-col gap-2 mt-1.5">
                <p className="text-xs font-medium" style={{ color: 'var(--text-subtle)' }}>Source: {item.source}</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{item.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.body}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-subtle)' }}>This led to: {item.change}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <SlideImage src="/figma/flows-map.png" alt="Full user flow map: happy path, rejection, conversion, errors" />
      </section>

      {/* ── Results ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Impact</SectionLabel>
          <SectionTitle>Results</SectionTitle>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-base leading-relaxed mb-2" style={{ color: 'var(--text-muted)' }}
          >
            We took the product from zero to production in a single cycle, covering three surfaces: a mobile-first end-user experience, a white-label web integration layer, and an internal back-office platform for partner operations.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-xs mb-10" style={{ color: 'var(--text-subtle)' }}
          >
            Metrics are directional and anonymized for confidentiality.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {[
              { value: '100K+', label: 'Accounts opened in the first quarter, driven by organic partner distribution' },
              { value: '$5M+', label: 'TPV processed across deposits and withdrawals within the launch window' },
              { value: '2+', label: 'Major local bank partnerships acquired before the product was fully built' },
              { value: '0→1', label: 'Full E2E product launched across mobile, web, and back-office surfaces' },
              { value: 'Days', label: 'Time to onboard a new partner, down from several weeks after system standardization' },
              { value: '+', label: 'Additional investment rounds unlocked based on early traction and partner growth' },
            ].map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl flex flex-col gap-2" style={{ background: 'var(--surface)' }}>
                <p className="text-3xl font-bold text-[#09f]" style={{ fontFamily: 'var(--font-display)' }}>{m.value}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Real dashboard screenshots */}
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--border)' }}
          >
            <img src="/figma/results-chart.png" alt="Trailing 30D volume: daily and rolling amounts" className="w-full h-auto block" />
            <div className="px-4 py-3" style={{ background: 'var(--surface)' }}>
              <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>Trailing 30D volume monitoring, March 2026</p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--border)' }}
            >
              <img src="/figma/results-kpis.png" alt="Company wide KPIs: 127,834 accounts and $5.3M TPV" className="w-full h-auto block" />
              <div className="px-4 py-3" style={{ background: 'var(--surface)' }}>
                <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>Company-wide KPIs: open accounts, active accounts, TPV deposits & withdrawals</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--border)' }}
            >
              <img src="/figma/results-funnel.png" alt="Onboarding funnel: 178,625 persons to first deposit" className="w-full h-auto block" />
              <div className="px-4 py-3" style={{ background: 'var(--surface)' }}>
                <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>Onboarding funnel: application → KYC → account created → first deposit</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Learnings ── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Reflection</SectionLabel>
          <SectionTitle>Learnings & Next Steps</SectionTitle>
          <div className="flex flex-col gap-6">
            {[
              { n: '01', text: 'Designing for scale requires thinking in systems, not screens. The token-layer decision paid off faster than expected, but it required convincing engineering early that the upfront investment was worth it.' },
              { n: '02', text: 'Early validation with partners can de-risk entire product directions. The concept deck we built before the product existed was the real proof of demand, not user research alone.' },
              { n: '03', text: 'Simplicity scales better than flexibility. Every time we added an option to a flow, conversion dropped. The constraint of fewer choices was a product decision, not a design preference.' },
              { n: '04', text: 'Activation requires more than a working product. Users who understood what a U.S. account unlocked for them activated significantly faster. Educational content and contextual nudges in the first session are the clearest next lever for improving activation rates.' },
              { n: '05', text: 'Yield features and USD utility drive retention more than any onboarding improvement. Users who found a reason to keep funds in the account (interest, spending, instant conversion) returned far more consistently. Building toward those features is the most direct path to long-term engagement.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--surface)', border: '1px solid rgba(0,153,255,0.35)' }}
                >
                  <span className="text-[10px] font-mono font-semibold text-[#09f]">{item.n}</span>
                </div>
                <p className="text-base leading-relaxed mt-1.5" style={{ color: 'var(--text-muted)' }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find(p => p.slug === slug)

  if (!project || project.comingSoon) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'transparent', position: 'relative', zIndex: 1 }}>
        <Header />
        <div className="flex-1 flex items-center justify-center flex-col gap-4 pt-20">
          <p className="text-2xl font-semibold" style={{ color: 'var(--text)' }}>Project not found</p>
          <Link to="/" className="text-sm text-[#09f]">← Back to home</Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'transparent', position: 'relative', zIndex: 1 }}>
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-2 mb-8 text-sm" style={{ color: 'var(--text-subtle)' }}>
            <Link to="/" style={{ color: 'var(--text-muted)' }}>← Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-subtle)' }}>{project.shortTitle ?? project.title}</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-2 mb-4">
            <Tag variant="accent">{project.category}</Tag>
            <Tag>{project.year}</Tag>
          </motion.div>
          <motion.h1
            custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
            style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
          >
            {project.title}
          </motion.h1>
          <motion.p
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="text-lg leading-relaxed max-w-2xl"
            style={{ color: 'var(--text-muted)' }}
          >
            {project.description}
          </motion.p>
        </div>
      </section>

      {/* Hero image */}
      <section className="px-6 md:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden"
        >
          <img src={project.thumbnail} alt={project.title} className="w-full h-auto block" />
        </motion.div>
      </section>

      {/* Metrics row */}
      {project.metrics.length > 0 && (
        <section className="py-8 px-6 md:px-12">
          <div className="max-w-4xl mx-auto flex flex-wrap gap-8">
            {project.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <p className="text-3xl font-bold text-[#09f]" style={{ fontFamily: 'var(--font-display)' }}>{m.value}</p>
                <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{m.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Rich content per project */}
      {slug === 'qr-payments' && <QRPaymentsCryptobackContent />}
      {slug === 'virtual-accounts' && <VirtualAccountsContent />}
      {slug === 'web3-wallet' && <Web3WalletContent />}

      {/* Fallback: Problem + Solution for other projects */}
      {slug !== 'qr-payments' && slug !== 'virtual-accounts' && slug !== 'web3-wallet' && (project.problem || project.solution) && (
        <section className="py-12 px-6 md:px-12">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-6 rounded-2xl" style={{ background: 'var(--surface)' }}
            >
              <p className="text-xs font-medium text-[#09f] mb-2 uppercase tracking-wider">Problem</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{project.problem}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl" style={{ background: 'var(--surface)' }}
            >
              <p className="text-xs font-medium text-[#09f] mb-2 uppercase tracking-wider">Solution</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{project.solution}</p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Tools */}
      {slug !== 'virtual-accounts' && slug !== 'web3-wallet' && slug !== 'qr-payments' && project.tools.length > 0 && (
        <section className="py-12 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-xl font-semibold mb-4" style={{ color: 'var(--text)' }}
            >
              Process
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }} className="flex flex-wrap gap-2"
            >
              {project.tools.map(tool => <Tag key={tool}>{tool}</Tag>)}
            </motion.div>
          </div>
        </section>
      )}

      {/* See also */}
      {(() => {
        const others = projects.filter(p => p.slug !== project.slug && !p.comingSoon)
        if (others.length === 0) return null
        return (
          <section className="py-16 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-xs font-medium uppercase tracking-widest mb-8" style={{ color: 'var(--text-subtle)' }}>See also</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {others.map((p, i) => (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={`/projects/${p.slug}`}
                      className="group block rounded-2xl overflow-hidden"
                      style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
                    >
                      {/* Thumbnail */}
                      <div className="relative overflow-hidden" style={{ height: 180 }}>
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{ opacity: 0.8 }}
                        />
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }}
                        />
                      </div>
                      {/* Details */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-[#09f]">{p.category}</span>
                          <span className="text-xs" style={{ color: 'var(--text-subtle)' }}>{p.year}</span>
                        </div>
                        <p className="text-base font-semibold mb-1" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{p.title}</p>
                        <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted)' }}>{p.description}</p>
                        <p className="text-xs font-medium mt-3 text-[#09f] opacity-0 group-hover:opacity-100 transition-opacity duration-200">View project →</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )
      })()}

      <Footer hideWordmark />
    </div>
  )
}
