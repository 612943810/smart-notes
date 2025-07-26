/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#42b883',
          dark: '#35946a',
          light: '#52c993',
        },
        secondary: {
          DEFAULT: '#35946a',
          dark: '#2b7a56',
          light: '#42b883',
        },
      },
      backgroundColor: {
        'primary': '#42b883',
        'secondary': '#35946a',
      },
    },
  },
  plugins: [],
}
