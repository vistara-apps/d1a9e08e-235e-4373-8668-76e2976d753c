/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(215 25% 95%)',
        error: 'hsl(0 80% 50%)',
        accent: 'hsl(160 70% 45%)',
        border: 'hsl(215 20% 85%)',
        primary: 'hsl(220 80% 50%)',
        surface: 'hsl(215 25% 98%)',
        textPrimary: 'hsl(215 20% 20%)',
        textSecondary: 'hsl(215 20% 40%)',
      },
      borderRadius: {
        'lg': '16px',
        'md': '10px',
        'sm': '6px',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(0 0% 0% / 0.08)',
        'modal': '0 8px 24px hsla(0 0% 0% / 0.12)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '32px',
      },
    },
  },
  plugins: [],
}
