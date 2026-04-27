/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'apple-bg': '#F5F5F7',
        'apple-text': '#1D1D1F',
        'apple-secondary': '#6E6E73',
        'apple-blue': '#007AFF',
      },
      fontFamily: {
        'sf': ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
