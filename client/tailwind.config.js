/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        'primary-dark': '#4f46e5',
        surface: '#1e293b',
        'surface-light': '#334155',
        bg: '#0f172a',
      },
    },
  },
  plugins: [],
};
