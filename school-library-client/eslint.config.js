import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import {globalIgnores} from 'eslint/config'
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import customEslintRules from "eslint-plugin-custom-eslint-rules";

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
      customEslintRules
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import/resolver': {
        node: {
          paths: ['./'],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.png'],
          alias: {
            assets: 'src/assets/*',
            components: 'src/components/*',
            lib: 'src/lib/*',
            pages: 'src/pages/*',
            route: 'src/route/*',
            store: 'src/store/*',
          }
        },
        typescript: {}
      }
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // 'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react-refresh/only-export-components': 'off',
      'react-hooks/exhaustive-deps': 0,
      'prettier/prettier': [
        'error',
        {
          'no-inline-styles': false,
          endOfLine: 'auto'
        }
      ],
      '@typescript-eslint/no-explicit-any': 1,
      '@typescript-eslint/no-unused-vars': 2,
      '@typescript-eslint/ban-ts-comment': 0,
      'no-unexpected-multiline': 'error',
      'no-unused-vars': 0,
      'react/jsx-no-target-blank': 'off',
      semi: 'error',
      curly: 'off',
      'no-duplicate-imports': 'error',
      'no-dupe-else-if': 'warn',
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': 'error',
      'no-trailing-spaces': 'error',
      'no-dupe-keys': 'error',
      'no-return-assign': 'error',
      'no-console': 'off',
      'semi-style': ['error', 'last'],
      'eol-last': ['error', 'always'],
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true
        }
      ],
      'import/no-named-as-default': 'off',
      'import/no-unresolved': ['error', { ignore: ['^@'], caseSensitive: true }],
      'import/named': 'off',
      'import/newline-after-import': 'error',
      'import/exports-last': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-nodejs-modules': ['error', { allow: ['react', 'path'] }],
      'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
      'import/order': [
        'error',
        {
          // groups: ['builtin', 'external', 'internal', 'index', 'sibling', 'parent'],
          groups: [['external', 'builtin'], 'internal', ['sibling']],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before'
            }
          ],
          pathGroupsExcludedImportTypes: ['internal', 'react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ],
      "customEslintRules/remove-react-import": "error",
      "customEslintRules/blank-line-before-export-default": "error",
      "no-restricted-syntax": [
        "error",
        // No `React` keyword
        {
          "selector": "ImportDeclaration[source.value='react'] > ImportDefaultSpecifier",
          "message": "Unecessary `React` keyword"
        }
      ]
    },
  },
])
