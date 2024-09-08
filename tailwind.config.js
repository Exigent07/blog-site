/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      width: {
        'fix': 'var(--max-width)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'monospace'],
        accent: ['var(--font-accent)', 'monospace'],
      },
      colors: {
        background: 'var(--background-dark)',
        foreground: 'var(--foreground-dark)',
        primaryAccent: 'var(--primary-accent-dark)',
        secondaryAccent: 'var(--secondary-accent-dark)',
        highlight: 'var(--highlight-dark)',
        border: 'var(--border-dark)',
        light: {
          background: 'var(--background-light)',
          foreground: 'var(--foreground-light)',
          primaryAccent: 'var(--primary-accent-light)',
          secondaryAccent: 'var(--secondary-accent-light)',
          highlight: 'var(--highlight-light)',
          border: 'var(--border-light)',
        },
      },
      spacing: {
        unit: 'var(--spacing-unit)',
      },
      borderRadius: {
        DEFAULT: 'var(--border-radius)',
      },
      maxWidth: {
        DEFAULT: 'var(--max-width)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
