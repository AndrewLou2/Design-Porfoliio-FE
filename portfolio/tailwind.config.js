/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './src/index.html',
    './src/**/*.{html,ts}'
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        ink: '#111111',
        sub: '#555555',
        line: 'rgba(17,17,17,0.12)',
        bgwarm: '#F3F1EB'
      },
      fontFamily: {
        display: ['var(--font-geist-sans)'],
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)']
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.06)'
      }
    }
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.font-smallcaps': {
          'font-variant': 'small-caps',
          'letter-spacing': '0.08em'
        },
        '.tracking-tightish': {
          'letter-spacing': '-0.02em'
        },
        '.display-clamp': {
          'font-size': 'clamp(40px, 9vw, 128px)',
          'line-height': '0.95'
        }
      })
    })
  ]
}

