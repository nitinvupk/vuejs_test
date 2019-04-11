module.exports = {
  root: true,
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    "prettier",
    'plugin:vue/recommended'
  ],
  plugins: [
    "prettier",
  ],
  rules: {
      'no-console': 'off',
  },
};