// eslint.config.mjs
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-config-prettier';

// Reusable TS + React base so we don't duplicate config
const tsReactBase = {
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: ['./tsconfig.eslint.json'],
      tsconfigRootDir: import.meta.dirname,
      ecmaFeatures: { jsx: true },
    },
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
    react,
    'react-hooks': reactHooks,
    import: importPlugin,
    'unused-imports': unusedImports,
  },
  settings: { react: { version: 'detect' } },
  rules: {
    // React 17+/19: no need to import React
    'react/react-in-jsx-scope': 'off',

    // Unused cleanup (errors so it works with --max-warnings=0)
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],

    // Tidy imports
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],

    // Let TS handle undefineds
    'no-undef': 'off',
  },
};

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '.next/**',
      '.out/**',
      '.turbo/**',
      '.vercel/**',
      '.pnpm-store/**',
    ],
  },

  // 1) Source files
  {
    files: ['src/**/*.{ts,tsx}'],
    ...tsReactBase,
  },

  // 2) Config & test setup files (so ESLint won’t “ignore” them)
  {
    files: ['vite.config.ts', 'vitest.*.ts', 'vitest.setup.ts', '*.config.ts', 'config/**/*.ts'],
    ...tsReactBase,
  },

  // Turn off stylistic rules that clash with Prettier
  prettier,
];
