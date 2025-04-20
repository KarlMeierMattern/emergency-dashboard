/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // for routing files
    "./components/**/*.{js,jsx,ts,tsx}", // if you have a components folder
    "./*.{js,jsx,ts,tsx}", // for root-level files like App.tsx
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
