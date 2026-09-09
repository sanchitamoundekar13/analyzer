/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF4FF',
          100: '#E0EBFF',
          200: '#C7D9FE',
          300: '#A4BFFC',
          400: '#7B9DFA',
          500: '#4F75F6',
          600: '#2550EB',
          700: '#1D3EC8',
          800: '#1B35A3',
          900: '#1B2F80',
          950: '#131E50',
        },
        slate: {
          850: '#151F32',
          900: '#0F172A',
          950: '#080D1A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle-card': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'elevated': '0 20px 35px -5px rgba(15, 23, 42, 0.08), 0 10px 15px -5px rgba(15, 23, 42, 0.03)',
        'blue-glow': '0 0 25px rgba(37, 80, 235, 0.25)',
      }
    },
  },
  plugins: [],
}
