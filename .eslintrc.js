module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:vue/vue3-essential",
    "@vue/standard",
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    quotes: [
      "error",
      "double",
    ],

    semi: [
      "error",
      "always",
    ],
    "prefer-template": 2,
    "no-useless-concat": 2,
    "no-unused-vars": 2,

    "vue/no-multiple-template-root": 0,

    "comma-dangle": ["error", {
      arrays: "always-multiline",
      objects: "always-multiline",
      imports: "never",
      exports: "never",
      functions: "ignore",
    }],

    "space-before-function-paren": ["error", {
      anonymous: "always",
      named: "never",
      asyncArrow: "always",
    }],

    "vue/singleline-html-element-content-newline": ["error", {
      ignoreWhenNoAttributes: true,
      ignores: ["pre", "textarea"],
    }],
    "vue/component-name-in-template-casing": ["error", "kebab-case", { registeredComponentsOnly: false }],

    "vue/html-closing-bracket-newline": [
      "error", { multiline: "never" },
    ],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-new": 0,
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
