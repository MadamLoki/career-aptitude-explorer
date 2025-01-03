/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./frontend/Aspire/src/**/*.{js,jsx,ts,tsx}",
    "./frontend/Aspire/index.html",
  ],
  theme: {
    extend: {

    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
}

