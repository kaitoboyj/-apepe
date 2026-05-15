/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apepe: {
          green: '#39ff14',
          darkgreen: '#1a8c00',
          bg: '#050505',
          card: '#0f1110',
          border: '#1a2e1a',
          solana: '#00ffa3',
          ethereum: '#627eea',
          polygon: '#8247e5',
          bsc: '#f3ba2f',
          base: '#0052ff',
          arbitrum: '#2d374b',
          avalanche: '#e84142',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        marker: ['Permanent Marker', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(57, 255, 20, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(57, 255, 20, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
