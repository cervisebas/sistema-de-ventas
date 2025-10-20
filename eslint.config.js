/* eslint-env node */
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  { ignores: ['**/node_modules', '**/dist', '**/out'] },
  {
    files: ['**/*.{ts,tsx}'],
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
  // eslintPluginReactRefresh.configs.recommended,
  eslintPluginPrettierRecommended,
]);
