module.exports = (
  colorPalette,
  alertColors = ["success", "warning", "error", "info"]
) => {
  const colorsObject = {};

  if (colorPalette) {
    for (let i = 0; i < colorPalette.length; i++) {
      const color = colorPalette[i];
      colorsObject[`bb-${color}`] = {
        DEFAULT: `var(--color-${color}-default)`,
        lighter: `var(--color-${color}-lighter)`,
        100: `var(--color-${color}-100)`,
        200: `var(--color-${color}-200)`,
        300: `var(--color-${color}-300)`,
        400: `var(--color-${color}-400)`,
        500: `var(--color-${color}-500)`,
        600: `var(--color-${color}-600)`,
        700: `var(--color-${color}-700)`,
      };
    }
  }

  if (alertColors) {
    for (let i = 0; i < alertColors.length; i++) {
      const color = alertColors[i];
      colorsObject[`bb-${color}`] = {
        DEFAULT: `var(--color-${color}-default)`,
        100: `var(--color-${color}-100)`,
        200: `var(--color-${color}-200)`,
        300: `var(--color-${color}-300)`,
        400: `var(--color-${color}-400)`,
        500: `var(--color-${color}-500)`,
      };
    }
  }

  return colorsObject;
};
