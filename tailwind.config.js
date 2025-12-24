/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.center': {
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
        '.absolute_center': {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
        '.absolute_x_center': {
          left: '50%',
          transform: 'translate(-50%, 0%)',
        },
        '.absolute_y_center': {
          top: '50%',
          transform: 'translate(0%, -50%)',
        },
      })
    },
  ],
}