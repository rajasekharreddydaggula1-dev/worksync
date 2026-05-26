/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'Poppins', 'Segoe UI', 'sans-serif'] },
      colors: {
        sidebar: '#0F172A',
        'sidebar-hover': '#1E293B',
        primary: '#2563EB',
        'primary-end': '#4F46E5',
        surface: '#FFFFFF',
        bg: '#F1F5F9',
        border: '#E2E8F0',
        navy: '#0F172A',
        green: '#22C55E',
        blue: '#3B82F6',
        orange: '#F59E0B',
        red: '#EF4444',
        purple: '#8B5CF6',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.07)',
        'card-hover': '0 4px 16px 0 rgba(0,0,0,0.10)',
        sidebar: '4px 0 24px 0 rgba(0,0,0,0.18)',
      },
    },
  },
  plugins: [],
};
