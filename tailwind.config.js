/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(0, 142, 228)',
          dark: 'rgb(0, 120, 200)',
          light: 'rgb(64, 176, 240)',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
