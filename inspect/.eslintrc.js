module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {

    // note you must disable the base rule as it can report incorrect errors
    "indent": "off",
    "@typescript-eslint/indent": ["error", 2],
    "explicit-function-return-type": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", {
      "vars": "all",
      "args": "after-used",
      "ignoreRestSiblings": false
    }]

  },
  "extends": ["plugin:@typescript-eslint/recommended", "unobtrusive"],
};
