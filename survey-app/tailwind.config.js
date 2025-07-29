/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/**/*.component.{html,ts}",
    "./src/**/*.component.scss"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--mdc-theme-primary-50, #e3f2fd)',
          100: 'var(--mdc-theme-primary-100, #bbdefb)',
          200: 'var(--mdc-theme-primary-200, #90caf9)',
          300: 'var(--mdc-theme-primary-300, #64b5f6)',
          400: 'var(--mdc-theme-primary-400, #42a5f5)',
          500: 'var(--mdc-theme-primary, #1976d2)',
          600: 'var(--mdc-theme-primary-600, #1e88e5)',
          700: 'var(--mdc-theme-primary-700, #1976d2)',
          800: 'var(--mdc-theme-primary-800, #1565c0)',
          900: 'var(--mdc-theme-primary-900, #0d47a1)',
        },
        secondary: {
          50: 'var(--mdc-theme-secondary-50, #fce4ec)',
          100: 'var(--mdc-theme-secondary-100, #f8bbd9)',
          200: 'var(--mdc-theme-secondary-200, #f48fb1)',
          300: 'var(--mdc-theme-secondary-300, #f06292)',
          400: 'var(--mdc-theme-secondary-400, #ec407a)',
          500: 'var(--mdc-theme-secondary, #dc004e)',
          600: 'var(--mdc-theme-secondary-600, #e91e63)',
          700: 'var(--mdc-theme-secondary-700, #c2185b)',
          800: 'var(--mdc-theme-secondary-800, #ad1457)',
          900: 'var(--mdc-theme-secondary-900, #880e4f)',
        },
        accent: {
          50: '#fff3e0',
          100: '#ffe0b2',
          200: '#ffcc80',
          300: '#ffb74d',
          400: '#ffa726',
          500: '#ff9800',
          600: '#fb8c00',
          700: '#f57c00',
          800: '#ef6c00',
          900: '#e65100',
        }
      },
      fontFamily: {
        'sans': ['Roboto', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles to avoid conflicts with Angular Material
  }
}

