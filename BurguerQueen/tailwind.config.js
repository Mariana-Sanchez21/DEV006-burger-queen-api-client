/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        
          primary: '#22A699',
          secondary: '#F2BE22',
          tertiary: '#F29727',
          quaternary: '#F24C3D'
      
      },
      spacing: {
        h: '34rem', 
      }
    },
  },
  plugins: [],
}

