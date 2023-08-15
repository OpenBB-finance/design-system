module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "@remix-run/eslint-config"
],
  plugins: ["unused-imports"],
  rules: {
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
  ignorePatterns: ["**/app/styles/app.css"],
};
