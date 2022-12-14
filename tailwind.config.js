// https://colorhunt.co/palette/1f1d363f3351864879e9a6a6
// https://colorhunt.co/palette/1b262c0f4c753282b8bbe1fa
// https://colorhunt.co/palette/2d132c801336c72c41ee4540
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": "rgb(31, 29, 54)",
        "background-dark": "var(--cds-cegal-dark-background-color)",
        "secondary-text-color": "var(--cds-cegal-dark-text-color-muted)",
        "secondary-dark": "rgb(63, 51, 81)",
        "accent-dark": "rgb(63, 51, 81)",
        "contrast-dark": "#4E4E4E",
        "cegal-green": "#00FF97",
        "cegal-dark-green":
          "var(--cds-cegal-dark-background-color-alternative-colored)",
      },
      scale: {
        300: "3.00",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar-hide"),
  ],
};
