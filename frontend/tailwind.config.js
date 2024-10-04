/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["Oswald", "sans-serif"], // Corrected sans-serif
        sourceSans: ["Source Sans Pro", "sans-serif"], // Corrected sans-serif
      },
    },
  },
  plugins: [],
};
