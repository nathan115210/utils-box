// eslint.config.mjs
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-config-prettier';

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
    ],
  },
  // TypeScript + React rules
  {
    files: ['src/*.{ts,tsx}'],
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
      // React 17+ / 19: no need to import React
      'react/react-in-jsx-scope': 'off',

      // Unused cleanup (errors so it works with --max-warnings=0)
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],

      // Keep imports tidy (make it error so no warnings trip your hook)
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
  },
  // turn off stylistic rules that clash with Prettier
  prettier,
];
