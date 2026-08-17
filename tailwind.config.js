/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // 主深色
        ink: '#092126',
        // 主綠 / 青色
        teal: {
          DEFAULT: '#1A7A80',
          deep: '#0E474F',
          muted: '#4D6E70',
        },
        // 淺底色
        mist: '#E3F7F7',
        sage: '#BDDEDB',
        // 亮橘點綴色
        accent: '#F57030',
      },
      fontFamily: {
        sans: [
          '"Noto Sans TC"',
          'system-ui',
          '-apple-system',
          '"PingFang TC"',
          '"Microsoft JhengHei"',
          'sans-serif',
        ],
      },
      maxWidth: {
        prose: '68ch',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .6s cubic-bezier(.2,.7,.3,1) both',
      },
    },
  },
  plugins: [],
}
