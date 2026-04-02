
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#020817',
        card: '#0f172a',
        cardHover: '#1e293b',
        primary: '#3b82f6',
        accent: '#10b981',
        danger: '#ef4444',
        muted: '#94a3b8',
        textMain: '#f8fafc',
      }
    },
  },
  plugins: [],
}
