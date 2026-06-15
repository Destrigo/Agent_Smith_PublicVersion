/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: '#09090b',
        surface: '#111113',
        border: '#27272a',
        primary: '#f59e0b',
        'primary-light': '#fcd34d',
        success: '#22c55e',
        muted: '#71717a',
      },
    },
  },
  plugins: [],
}
