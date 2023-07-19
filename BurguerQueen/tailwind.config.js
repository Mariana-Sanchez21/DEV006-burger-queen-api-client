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
    fontFamily: {
      'retro1': ['Diplomata', 'sans-serif'],
      'retro2': ['Nova Flat', 'sans-serif'],
     
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
        hForm:'50rem',
        mlForm:'40rem',
        mrForm:'-21rem',
        mtboton:'30rem'
       
      }
    },
  },
  plugins: [],
}

