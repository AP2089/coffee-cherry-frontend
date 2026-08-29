import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0E0C0A',
          soft: '#1A1714',
          mute: '#2A2520',
        },
        bone: {
          DEFAULT: '#EDE8DF',
          soft: '#F7F3EC',
          mute: '#C9C2B6',
        },
        bronze: {
          DEFAULT: '#A67C52',
          soft: '#C4A484',
        },
        bloom: {
          DEFAULT: '#C9A0B0',
          deep: '#8E5F72',
          mist: '#E8D5DC',
        },
        velvet: {
          DEFAULT: '#5C3D2E',
          deep: '#3A241A',
          mist: '#D4C0B0',
        },
        santos: {
          DEFAULT: '#C4A35A',
          deep: '#8A6F2E',
          mist: '#E8D9A8',
        },
        noir: {
          DEFAULT: '#1B2838',
          deep: '#0D141C',
          mist: '#A8B8C8',
          berry: '#8B3A4A',
        },
        ember: {
          DEFAULT: '#C45C26',
          deep: '#7A3214',
          mist: '#E8B89A',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      },
      maxWidth: {
        content: '1440px',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
        soft: 'cubic-bezier(0.33, 1, 0.68, 1)',
      },
      transitionDuration: {
        slow: '800ms',
        reveal: '1200ms',
      },
    },
  },
  plugins: [],
} satisfies Config
