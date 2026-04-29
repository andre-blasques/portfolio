export interface Metric {
  label: string
  value: string
}

export interface Project {
  slug: string
  title: string
  shortTitle: string
  category: string
  year: string
  thumbnail: string
  description: string
  problem: string
  solution: string
  metrics: Metric[]
  tools: string[]
  figmaUrl: string
  comingSoon?: boolean
}

export const projects: Project[] = [
  {
    slug: 'virtual-accounts',
    title: 'U.S. Virtual Accounts - Meridian',
    shortTitle: 'Virtual Accounts',
    category: 'Fintech · Multiplatform',
    year: '2026',
    thumbnail: 'https://framerusercontent.com/images/wdZBATjUQNPpIzo5LbHDgMyMPr0.png',
    description:
      'A multiplatform solution for opening and managing U.S. virtual accounts, connecting international users to the American financial system.',
    problem:
      'Users outside the U.S. faced significant barriers to opening and operating American bank accounts, limiting their access to global financial services.',
    solution:
      'We designed a guided onboarding and virtual account management experience, with simplified flows for KYC, international transfers, and real-time balance visibility.',
    metrics: [
      { label: 'E2E Product launching', value: '0→1' },
      { label: 'Accounts created in 3 months', value: '100k+' },
    ],
    tools: [
      'Ai-Assisted design process', 'Problem-framing', 'Data-informed decisions',
      'Benchmark', 'Customer journey mapping', 'User flows', 'Decks',
      'Hi-fi Prototyping', 'Success metrics mapping',
    ],
    figmaUrl: 'https://www.figma.com/slides/X208hShKloTGIw99632FFJ',
  },
  {
    slug: 'web3-wallet',
    title: 'Web3 Wallet',
    shortTitle: 'Web3 Wallet',
    category: 'Crypto · Web3',
    year: '2024',
    thumbnail: 'https://framerusercontent.com/images/j1WUXFKG24vGbTmNDrcdF6xqtc.png',
    description:
      'A crypto wallet focused on simplicity and security, designed for both beginner and advanced users in the Web3 ecosystem.',
    problem:
      'Most Web3 wallets are complex and inaccessible to non-technical users, creating a significant entry barrier to the crypto world.',
    solution:
      'A conversational and progressive interface that guides users from wallet creation to advanced operations like staking and swaps, built on a custom design system.',
    metrics: [
      { label: 'E2E Product launching', value: '0→1' },
      { label: 'From scratch to prod', value: '3 Months' },
    ],
    tools: [
      'Problem-framing', 'Benchmark', 'User-Research', 'Data-informed decisions',
      'Customer journey mapping', 'User flows', 'Hi-fi Prototyping', 'Metrics',
      'Post-launch plan',
    ],
    figmaUrl: 'https://www.figma.com/slides/Lxp1Dn1cIo4fEKrG5TWhQc',
  },
  {
    slug: 'qr-payments',
    title: 'QR Payments with Cryptoback',
    shortTitle: 'QR Payments',
    category: 'Crypto · Payments',
    year: '2023',
    thumbnail: '/figma/qr/hero.png',
    description:
      'Implementation of QR Code payment methods in the Argentine market, integrating Pix-like experiences for the local ecosystem.',
    problem:
      'The Argentine market demanded an instant QR Code payment system compatible with multiple banks and digital wallets, with a UX adapted to the local context.',
    solution:
      'A unified payment flow with multi-provider support, real-time validation, and clear visual feedback for transaction confirmation.',
    metrics: [
      { label: 'E2E Product launching', value: '0→1' },
      { label: 'Transaction volume in month 1', value: '$500k+' },
    ],
    tools: [
      'Problem-framing', 'Benchmark', 'User-Research', 'Data-informed decisions',
      'User-testing', 'User flows', 'Hi-fi Prototyping', 'Metrics', 'Iteration loops',
    ],
    figmaUrl: 'https://www.figma.com/slides/6HCCbyLhRULZlQY5vTyBdL',
  },
  {
    slug: 'coming-soon',
    title: 'Coming Soon',
    shortTitle: 'Coming Soon',
    category: 'New project',
    year: '2025',
    thumbnail: 'https://framerusercontent.com/images/0OX4NyXTUMYzlggj9vNUY6ouPs.jpg',
    description: 'Next project currently in development.',
    problem: '',
    solution: '',
    metrics: [],
    tools: [],
    figmaUrl: '',
    comingSoon: true,
  },
]
