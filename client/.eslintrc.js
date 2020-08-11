module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  globals: {
    Vue: true,
    VueSocketIO: true,
    Vuetify: true,
  },
  extends: ["eslint:recommended", "vue", "plugin:vue/vue3-recommended", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {}
};
