/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
        fontFamily: {
        'poppins': ['Poppins', 'sans-serif'], // Adding Poppins as a custom font family
      },
    },
  },
  plugins: [],
}