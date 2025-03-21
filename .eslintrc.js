module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
      project: 'tsconfig.json',
      sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'jest-formatting', 'sonarjs'],
  extends: [
      'plugin:prettier/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:jest-formatting/recommended',
      'plugin:sonarjs/recommended'
  ],
  root: true,
  env: {
      node: true,
      jest: true
  },
  overrides: [
      {
          files: ['*.e2e-spec.ts', '*.spec.ts'],
          rules: {
              'max-lines-per-function': 'off',
              'max-lines': 'off',
              'sonarjs/no-duplicate-string': 'off'
          }
      },
      {
          files: ['*.ts'],
          rules: {
              '@typescript-eslint/explicit-function-return-type': 'error'
          }
      }
  ],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
      'jest-formatting/padding-around-after-all-blocks': 2,
      'jest-formatting/padding-around-after-each-blocks': 2,
      'jest-formatting/padding-around-test-blocks': 2,
      'jest-formatting/padding-around-describe-blocks': 2,
      'jest-formatting/padding-around-before-all-blocks': 2,
      'jest-formatting/padding-around-before-each-blocks': 2,
      'max-lines': [
          'error',
          {
              max: 400,
              skipComments: true
          }
      ],
      'max-lines-per-function': [
          'error',
          {
              max: 50,
              skipComments: true
          }
      ],
      '@typescript-eslint/naming-convention': [
          'error',
          { selector: 'enumMember', format: ['UPPER_CASE'] },
          {
              selector: ['objectLiteralProperty'],
              format: ['camelCase', 'PascalCase', 'UPPER_CASE']
          },
          {
              selector: [
                  'parameter',
                  'variable',
                  'function',
                  'classProperty',
                  'typeProperty',
                  'parameterProperty',
                  'classMethod',
                  'objectLiteralMethod',
                  'typeMethod'
              ],
              format: ['camelCase']
          },
          {
              selector: ['class', 'interface', 'enum'],
              format: ['PascalCase']
          },
          {
              selector: ['variable'],
              modifiers: ['exported'],
              format: ['PascalCase', 'camelCase', 'UPPER_CASE']
          },
          {
              selector: ['function'],
              modifiers: ['exported'],
              format: ['PascalCase', 'camelCase']
          }
      ],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
      indent: 'off',
      'prettier/prettier': [
          'error',
          {
              useTabs: false,
              tabWidth: 4,
              printWidth: 120,
              singleQuote: true,
              trailingComma: 'none'
          }
      ],
      'prefer-const': 1,
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      'sonarjs/no-duplicate-string': 'warn',
      'sonarjs/cognitive-complexity': 'warn'
  }
};
