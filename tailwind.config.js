/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      colors:{
        transparent: 'transparent',
        current: 'currentColor',
        "purple":{
          main: "#4D0DAD",
          secondary: "#4c1d95"
        },
        "yellow":{
          main: "#FFAA00"
        },
        "green":{
          main: "#2CC47F",
          secondary: "#0CB360"
        }
      },
    }

  },
  plugins: [],
}
