module.export = {
  printWidth: 100,
  bracketSameLine: false,
  singleAttributePerLine: true,
  plugins: [
    require("prettier-plugin-tailwindcss"),
    require("prettier-plugin-groq"),
  ],
  tailwindConfig: "./tailwind.config.js",
};
