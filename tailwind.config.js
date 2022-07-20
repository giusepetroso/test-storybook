/* eslint-disable  */
/** @type {import('tailwindcss').Config} */

const getColors = require("./src/utilities/tailwindColorsPalette");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        ...getColors([
          "primary",
          "secondary",
          "black",
          "gray",
          "blue",
          "purple",
          "aqua",
          "green",
          "red",
          "yellow",
        ]),
      },
    },
  },
  plugins: [],
};
