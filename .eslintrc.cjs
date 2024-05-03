module.exports = {
    root: true,
    extends: ["@nuxt/eslint-config"],
    rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "no-useless-catch": "off",
        "vue/require-prop-types": "off",
        "vue/no-unused-vars": "off",
        "vue/valid-define-emits": "off",
        "vue/no-mutating-props": "off"
    }
  };
  