/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'cream': {
          50: '#fffbf5',
          100: '#fff8f3',
          200: '#f5f1eb',
          300: '#f0e6d6',
          400: '#e8d5c1',
          500: '#d4b896',
          600: '#b8956b',
          700: '#9c7c54',
          800: '#7d6344',
          900: '#5f4a33',
        },
        'rose-warm': {
          50: '#fef7f7',
          100: '#feeee8',
          200: '#f8e8e5',
          300: '#f2d7d2',
          400: '#e8b4ab',
          500: '#d18471',
          600: '#b86951',
          700: '#9f5a42',
          800: '#824a36',
          900: '#6b3f2e',
        }
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #fef7f7 0%, #fff8f3 25%, #f8e8e5 50%, #f5f1eb 100%)',
        'gradient-gold': 'linear-gradient(135deg, #d4af37 0%, #f59e0b 50%, #d97706 100%)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': {
            transform: 'translateY(0)',
          },
          '40%': {
            transform: 'translateY(-10px)',
          },
          '60%': {
            transform: 'translateY(-5px)',
          },
        },
      },
      boxShadow: {
        'warm': '0 10px 25px rgba(217, 119, 6, 0.1)',
        'warm-lg': '0 20px 40px rgba(217, 119, 6, 0.15)',
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};