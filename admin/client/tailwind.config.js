/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './@/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        "green": "#88C507",
        "dark-green": "#378D00",
        "blue": "#0045BF",
        "gray": "#ECECEC",
      },
      maxWidth: {
        "container": "1300px",
        "subcontainer": "1100px",
      },
      borderRadius: {
        "large": "48px",
        "medium": "26px",
        "small": "10px",
      },
      backgroundImage: {
        "hero-section": "url('/webAssets/images/home/banner home page.png')",
        "hero-pattern": "url('/webAssets/images/home/services bg.png')",
        "green-bg": "url('/webAssets/images/about/Join Our Journey bg.png')",
      },
    },
    fontFamily: {
      "poppins": ["Poppins", "sans"],

    },
  },
  plugins: [require("tailwindcss-animate")],

};
