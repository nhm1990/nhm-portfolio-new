import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Neues naturgrünes Farbschema
        sage: {
          50: '#f6f8f6',
          100: '#e8f0e8',
          200: '#d1e1d1',
          300: '#a8c7a8',
          400: '#7aa87a',
          500: '#5a8a5a', // Haupt-Naturgrün
          600: '#4a724a',
          700: '#3d5d3d',
          800: '#2f4a2f',
          900: '#243924',
          950: '#162116',
        },
        moss: {
          50: '#f5f7f4',
          100: '#e6ebe3',
          200: '#cdd7c7',
          300: '#a7b89e',
          400: '#829978',
          500: '#5d7a52', // Dunkleres Moosgrün
          600: '#4a6241',
          700: '#3c5036',
          800: '#2f3f2b',
          900: '#253323',
          950: '#151e14',
        },
        mint: {
          50: '#f3faf6',
          100: '#e0f5e9',
          200: '#c1ebd3',
          300: '#8ddbaf',
          400: '#5ac788',
          500: '#3bb06a', // Frisches Mintgrün
          600: '#2d8f54',
          700: '#267146',
          800: '#225a3a',
          900: '#1d4a31',
          950: '#0f2a1c',
        },
        charcoal: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#2C2D32',
          950: '#1a1a1c',
        },
      },
      // Zentrale Gradient-Definitionen
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #5a8a5a 0%, #3bb06a 100%)',
        'gradient-accent': 'linear-gradient(135deg, #3bb06a 0%, #5d7a52 100%)',
        'gradient-text': 'linear-gradient(90deg, #5a8a5a 0%, #2C2D32 50%, #5a8a5a 100%)',
        'gradient-soft': 'linear-gradient(180deg, #ffffff 0%, #f6f8f6 100%)',
        'gradient-hero':
          'radial-gradient(circle at 30% 50%, #e0f5e9 0%, #ffffff 50%, #f6f8f6 100%)',
        'gradient-dark': 'linear-gradient(135deg, #2C2D32 0%, #5a8a5a 100%)',
        // SVG Patterns - Natur + IT kombiniert
        'pattern-dots':
          "url(\"data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235a8a5a' fill-opacity='0.08'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
        'pattern-grid':
          "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 20h40M20 0v40' stroke='%235a8a5a' stroke-width='0.5' stroke-opacity='0.1'/%3E%3C/svg%3E\")",
        'pattern-leaves':
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10c-5 0-10 5-10 10 0 3 1 5 3 7-2 2-3 4-3 7 0 5 5 10 10 10s10-5 10-10c0-3-1-5-3-7 2-2 3-4 3-7 0-5-5-10-10-10z' fill='%233bb06a' fill-opacity='0.04'/%3E%3C/svg%3E\")",
        // Circuit-Leaves: Schaltkreis-Linien + organische Formen
        'pattern-circuit':
          "url(\"data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20h20v20M40 60h20v-20M0 40h40M60 40h20' stroke='%235a8a5a' stroke-width='1' fill='none' opacity='0.1'/%3E%3Ccircle cx='40' cy='40' r='3' fill='%233bb06a' opacity='0.15'/%3E%3Ccircle cx='20' cy='20' r='2' fill='%235a8a5a' opacity='0.1'/%3E%3Ccircle cx='60' cy='60' r='2' fill='%235a8a5a' opacity='0.1'/%3E%3C/svg%3E\")",
        // Code-Trees: Geschweifte Klammern + Baumstruktur
        'pattern-code':
          "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='30' font-family='monospace' font-size='20' fill='%235a8a5a' opacity='0.06'%3E%7B%7D%3C/text%3E%3Ctext x='60' y='70' font-family='monospace' font-size='16' fill='%233bb06a' opacity='0.05'%3E%3C/%3E%3C/text%3E%3Cpath d='M50 20 L50 50 M35 50 L65 50' stroke='%235d7a52' stroke-width='1.5' opacity='0.08'/%3E%3C/svg%3E\")",
        // Binary-Seeds: Binärcode (0,1) + Samenmuster
        'pattern-binary':
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='20' font-family='monospace' font-size='14' fill='%235a8a5a' opacity='0.07'%3E01%3C/text%3E%3Ctext x='35' y='45' font-family='monospace' font-size='14' fill='%233bb06a' opacity='0.06'%3E10%3C/text%3E%3Cellipse cx='15' cy='40' rx='2' ry='3' fill='%235d7a52' opacity='0.1'/%3E%3Cellipse cx='45' cy='15' rx='2' ry='3' fill='%235a8a5a' opacity='0.08'/%3E%3C/svg%3E\")",
        // Hexagons: Für futuristischen Look
        'pattern-hexagons':
          "url(\"data:image/svg+xml,%3Csvg width='56' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 0l14 8v16l-14 8-14-8V8z' stroke='%235a8a5a' stroke-width='0.5' fill='none' opacity='0.08'/%3E%3Cpath d='M28 50l14 8v16l-14 8-14-8V58z' stroke='%233bb06a' stroke-width='0.5' fill='none' opacity='0.06'/%3E%3C/svg%3E\")",
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
