import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import babelParser from "@babel/eslint-parser";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
        process: "readonly",
      },
    },

    plugins: {
      react,
      "react-native": reactNative,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      // Turn off base no-unused-vars for JSX files (it doesn't understand JSX usage)
      // The React plugin handles this better
      "no-unused-vars": "off",
      // Use React's version which understands JSX
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "error",
      // React Native specific rules
      "react-native/no-unused-styles": "warn",
      "react-native/split-platform-components": "warn",
      "react-native/no-inline-styles": "warn",
      "react-native/no-color-literals": "off",
    },
  },

  // Prettier config must be last to override other configs
  prettier,
];

