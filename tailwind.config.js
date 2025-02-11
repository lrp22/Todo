/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#dc4c3e",
        secondary: "#D88E2E",
        background: "#fff",
        backgroundAlt: "#f5f5f5",
        dark: "#635E5E",
        lightText: "#a6a6a6",
        lightBorder: "#d9d9d9",
        dateToday: "#2f9d23",
        dateTomorrow: "#9d6023",
        dateWeekend: "#233d9d",
        dateOther: "#54239d",
      },
    },
  },
  plugins: [],
};
