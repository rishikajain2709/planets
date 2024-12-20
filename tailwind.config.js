/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': 'rgb(250, 250, 250)',
        'neon-cyan': '#00ffe2',
        'neon-cyan-shadow': '#00ffe230',
        'neon-pink': '#ff00c1',
        'dark': 'rgb(17, 24, 39)',
        'red': '#b91c1c',
      }
    },
  },
  plugins: [],
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "editor.quickSuggestions": {
    "strings": "on"
  },
}

