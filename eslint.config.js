/* eslint-env node */
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const reactCompiler = require('eslint-plugin-react-compiler');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = defineConfig([
  expoConfig,
  reactCompiler.configs.recommended,
  { ignores: ['**/node_modules', '**/dist', '**/out'] },
  {
    ignores: ['dist/*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public',
          },
        },
      ],
    },
  },
  {
    rules: {
      'react/display-name': 'off',

      // 1. Comillas simples obligatorias
      quotes: ['error', 'single', { avoidEscape: true }],

      // 2. Línea en blanco al final del archivo
      'eol-last': ['error', 'always'],

      // 3. Coma final obligatoria
      'comma-dangle': ['error', 'always-multiline'],

      // 4. Punto y coma obligatorio
      semi: ['error', 'always'],

      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  eslintPluginPrettierRecommended,
]);
