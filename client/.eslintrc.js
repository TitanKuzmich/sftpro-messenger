module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: "."
  },
  env: {
    browser: true,
    "jest/globals": true
  },
  plugins: ["@typescript-eslint/eslint-plugin", "react-hooks", "jest", "import"],
  extends: ["airbnb", "plugin:import/typescript", "plugin:import/errors", "plugin:import/warnings", "prettier"],
  globals: {
    JSX: true,
    globalThis: true,
    NodeJS: true
  },
  rules: {
    // jsx-a11y/label-has-for :is deprecated
    "jsx-a11y/label-has-for": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/interactive-supports-focus": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/label-has-associated-control": [ 2, {
      "required": {
        "some": [ "nesting", "id" ]
      }
    }],
    "react/jsx-indent": "off",
    camelcase: "off",
    "import/order": [
      "error",
      {
        pathGroups: [
          {
            pattern: "@components/**",
            group: "parent",
            position: "after"
          }
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        groups: ["builtin", "external", "internal", "parent", "object", "sibling", "index"],
        "newlines-between": "always"
      }
    ],
    "import/named": "error",
    "import/default": "error",
    "import/namespace": "error",
    "import/newline-after-import": ["error", { count: 1 }],
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/no-cycle": "warn",
    "import/export": "error",
    "import/prefer-default-export": "off",
    "import/no-duplicates": "error",
    "no-irregular-whitespace": "warn",
    "react/no-access-state-in-setstate": "warn",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-case-declarations": "off",
    "class-methods-use-this": "off",
    "lines-between-class-members": "off",
    "no-nested-ternary": "off",
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true
      }
    ],
    "no-shadow": "off",
    "no-unused-vars": "off",
    "no-array-constructor": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false
      }
    ],
    "@typescript-eslint/no-shadow": ["warn", {ignoreFunctionTypeParameterNameValueShadow: true}],
    /**
     * @description rules of @typescript-eslint
     */
    "@typescript-eslint/prefer-interface": "off", // also want to use "type"
    "@typescript-eslint/explicit-function-return-type": "off", // annoying to force return type

    /**
     * @description rules of eslint-plugin-react
     */
    "react/destructuring-assignment": "off",
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".tsx", ".ts", ".jsx"]
      }
    ], // also want to use with ".tsx"
    "react/jsx-one-expression-per-line": "off",
    "react/prop-types": "off", // Is this incompatible with TS props type?
    "react/prefer-stateless-function": "off",
    "react/no-danger": "off",
    "react/jsx-wrap-multilines": "off",
    "react/jsx-props-no-spreading": "off",
    "no-use-before-define": "off",
    "arrow-body-style": "off",
    "react/jsx-fragments": "off",
    "react/jsx-curly-newline": "off",
    "react/require-default-props": "off",
    "react/state-in-constructor": "off",
    "react/no-unused-prop-types": "off",

    /**
     * @description rules of eslint-plugin-react-hooks
     */
    "react-hooks/rules-of-hooks": "error"
  }
}
