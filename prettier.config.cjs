/** @type {import("prettier").Config} */
const config = {
  arrowParens: 'always',
  printWidth: 160,
  singleQuote: true,
  jsxSingleQuote: false,
  semi: false,
  trailingComma: 'all',
  tabWidth: 2,
  quoteProps: 'consistent',
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
}

module.exports = config
