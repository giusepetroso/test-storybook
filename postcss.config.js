module.exports = (ctx) => ({
  plugins:
    ctx.env === "pre"
      ? {
          "postcss-import": {},
          "postcss-at-rules-variables": {},
          "postcss-each": {},
          "postcss-mixins": {},
          "postcss-conditionals": {},
          "tailwindcss/nesting": {},
        }
      : {
          tailwindcss: {},
          autoprefixer: {},
          cssnano: ctx.env === "production" ? {} : false,
        },
});
