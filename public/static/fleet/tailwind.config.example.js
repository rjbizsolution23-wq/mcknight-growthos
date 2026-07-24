/**
 * The Contracting Preacher — Tailwind Config Extension
 * Drop into your existing tailwind.config.js under `theme.extend`
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        tcp: {
          navy: '#0A1628',
          'navy-2': '#0F1E36',
          'navy-3': '#152947',
          gold: '#C9A961',
          'gold-dark': '#B08D3F',
          'gold-light': '#E4CB92',
          ivory: '#F7F3EA',
          'ivory-2': '#EFE8D6',
          red: '#8B1F1F',
          slate: '#4A5568',
          'slate-2': '#718096',
          line: '#E5DFD0',
          'line-2': '#D6CFB8',
          ok: '#2F6B4A',
          warn: '#B87A1F',
        },
      },

      backgroundColor: {
        'tcp-body': '#EBE4D2',
      },

      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },

      fontSize: {
        'tcp-hero':    ['80px', { lineHeight: '0.96', letterSpacing: '-0.02em' }],
        'tcp-h1':      ['64px', { lineHeight: '0.96', letterSpacing: '-0.02em' }],
        'tcp-h2':      ['44px', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'tcp-h3':      ['28px', { lineHeight: '1.15' }],
        'tcp-lede':    ['22px', { lineHeight: '1.5' }],
        'tcp-eyebrow': ['12px', { letterSpacing: '0.2em' }],
        'tcp-tag':     ['11px', { letterSpacing: '0.14em' }],
      },

      letterSpacing: {
        'tcp-hero':     '-0.02em',
        'tcp-heading':  '-0.01em',
        'tcp-eyebrow':  '0.2em',
        'tcp-tag':      '0.14em',
        'tcp-wide':     '0.24em',
      },

      borderRadius: {
        'tcp':      '2px',
        'tcp-pill': '20px',
      },

      boxShadow: {
        'tcp-sm':    '0 2px 6px -3px rgba(10,22,40,0.15)',
        'tcp-card':  '0 12px 30px -18px rgba(10,22,40,0.25)',
        'tcp-lift':  '0 20px 40px -30px rgba(10,22,40,0.35)',
        'tcp-modal': '0 30px 80px -30px rgba(0,0,0,0.5)',
        'tcp-toast': '0 20px 40px -20px rgba(10,22,40,0.5)',
      },

      backgroundImage: {
        'tcp-aurora':
          'radial-gradient(circle at 85% 20%, rgba(201,169,97,0.20), transparent 45%), ' +
          'radial-gradient(circle at 15% 90%, rgba(201,169,97,0.10), transparent 50%)',
        'tcp-brand-strip':
          'linear-gradient(90deg, #0A1628 0%, #0A1628 62%, #C9A961 62%, #C9A961 100%)',
        'tcp-cta':
          'linear-gradient(135deg, #8B1F1F 0%, #6d1616 100%)',
      },

      maxWidth: {
        'tcp':     '1360px',
        'tcp-doc': '1180px',
      },

      transitionDuration: {
        'tcp':      '150ms',
        'tcp-fast': '120ms',
        'tcp-slow': '250ms',
      },
    },
  },
};
