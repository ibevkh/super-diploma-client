import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              'sourceTag': 'scope:shared',
              'onlyDependOnLibsWithTags': ['scope:shared']
            },
            {
              'sourceTag': 'scope:admin',
              'onlyDependOnLibsWithTags': ['scope:shared', 'scope:admin']
            },
            {
              'sourceTag': 'scope:client',
              'onlyDependOnLibsWithTags': ['scope:shared', 'scope:client']
            },
            {
              'sourceTag': 'type:app',
              'onlyDependOnLibsWithTags': ['type:feature', 'type:ui']
            },
            {
              'sourceTag': 'type:feature',
              'onlyDependOnLibsWithTags': ['type:ui', 'type:util']
            },
            {
              'sourceTag': 'type:ui',
              'onlyDependOnLibsWithTags': ['type:ui', 'type:util']
            },
            {
              'sourceTag': 'type:util',
              'onlyDependOnLibsWithTags': ['type:util']
            }
          ],
        },
      ],
    },
  },
  {
    files: ['*.ts', '*.tsx'],
    extends: [
      'plugin:@nx/typescript',
      'plugin:@nx/angular',
      'plugin:import/recommended',
      'plugin:@ngrx/all'
    ],
    rules: {
      '@ngrx/with-state-no-arrays-at-root-level': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          'selector': 'default',
          'format': ['camelCase'],
          'leadingUnderscore': 'allow',
          'trailingUnderscore': 'allow'
        },
        {
          'selector': 'variable',
          'format': ['camelCase', 'UPPER_CASE'],
          'leadingUnderscore': 'allow',
          'trailingUnderscore': 'allow'
        },
        {
          'selector': 'typeLike',
          'format': ['PascalCase']
        },
        {
          'selector': 'enumMember',
          'format': ['PascalCase']
        }
      ],
      'complexity': 'error',
      'max-len': [
        'error',
        {
          'code': 140
        }
      ],
      'no-new-wrappers': 'error',
      'no-throw-literal': 'error',
      'import/no-unresolved': 'off',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          'groups': [
            ['^\\u0000'],
            ['^@?(?!ib/)\\w'],
            ['^@ib/?\\w'],
            ['^\\w'],
            ['^[^.]'],
            ['^\\.']
          ]
        }
      ],
      'sort-imports': 'off',
      'import/named': 'off',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      '@typescript-eslint/consistent-type-definitions': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-invalid-this': 'off',
      '@typescript-eslint/no-invalid-this': ['warn']
    }
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
