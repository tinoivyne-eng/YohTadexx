/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      colors: {
        studio: {
          black: '#0a0a0a',
          charcoal: '#151515',
          gray: '#2a2a2a',
          blue: '#2563eb',
          bluelight: '#3b82f6',
          white: '#f5f5f5',
        },
      },
      fontFamily: {
        heading: ['"Poppins"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'studio-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #151515 100%)',
      },
    },
  },
  plugins: [],
}