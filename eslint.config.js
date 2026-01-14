const js = require('@eslint/js');
const react = require('eslint-plugin-react');
const reactNative = require('eslint-plugin-react-native');
const jest = require('eslint-plugin-jest');
const babelParser = require('@babel/eslint-parser');
const prettier = require('eslint-config-prettier');

module.exports = [
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
      },
    },
    plugins: {
      react,
      'react-native': reactNative,
      jest,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:jest/recommended',
    ],
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      // Turn off base no-unused-vars for JSX files (it doesn't understand JSX usage)
      // The React plugin handles this better
      'no-unused-vars': 'off',
      // Use React's version which understands JSX
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'error',
      // React Native specific rules
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'warn',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'off',
    },
  },
  // Prettier config must be last to override other configs
  prettier,
];
