module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "commonjs": true,
        "es2020": true,
    },
    globals: {
        Vue: true,
        VueSocketIO: true,
        Vuetify: true,
    },
    "extends": ["eslint:recommended", "vue", "plugin:vue/vue3-recommended", "prettier"],
    plugins: ["prettier"],
    "parserOptions": {
        "ecmaVersion": 11
    },
    "rules": {}
};
