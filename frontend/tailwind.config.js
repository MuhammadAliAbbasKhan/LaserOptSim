/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beam: {
          bg: '#ffffff',
          nav: '#e5ebf2',
          navHover: '#d7e2ee',
          cyan: '#0091ff',
          footer: '#d1dbe5',
        }
      }
    },
  },
  plugins: [],
}
