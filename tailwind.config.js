export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#111827',
        secondary: '#64748b',
        success: '#10B981',
        warning: '#f59e0b',
        error: '#dc2626',
        info: '#0284c7',
      },
    },
  },
  plugins: [],
}
