module.exports = {
  root: true,
  "env": {
    "node": true,
    "browser": true,
    "commonjs": true,
    "es2020": true,
    "jest": true,
  },
  "extends": ["eslint:recommended", "prettier"],
  plugins: ["prettier"],
  "parserOptions": {
    "ecmaVersion": 11
  },
  "rules": {}
};
