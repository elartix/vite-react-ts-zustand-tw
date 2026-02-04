// eslint.config.js
import globals from 'globals';
import js from '@eslint/js';

import importPlugin from 'eslint-plugin-import';

import jsxA11y from 'eslint-plugin-jsx-a11y';

import react from 'eslint-plugin-react/configs/recommended.js';
import { reactRefresh } from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';

import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';


export default [
  // Ignore build output directory
  {
    ignores: [
      'dist',
      'dev-dist',
      '*.md'
    ]
  },
  js.configs.recommended,
  importPlugin.flatConfigs.typescript,
  importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser, // Include browser globals if needed
        ...globals.node,    // Include Node.js globals
      },
      parser: tsParser, // Specify TypeScript parser
      parserOptions: {
        project: './tsconfig.json', // Point to your tsconfig for type-aware linting
      },
    },
    plugins: {
      'jsx-a11y': jsxA11y,
      'react': react.plugins.react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
      'import/resolver': {
        typescript: {}
      }
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'array-bracket-spacing': [
        'error',
        'never'
      ],
      'arrow-spacing': [
        'warn',
        {
          'after': true,
          'before': true
        }
      ],
      'block-scoped-var': [
        'error'
      ],
      'block-spacing': [
        'warn',
        'always'
      ],
      'brace-style': [
        'warn',
        '1tbs',
        {
          'allowSingleLine': true
        }
      ],
      'camelcase': [
        'warn',
        {
          'allow': [
            'access_token',
            'refresh_token',
            'client_id',
            'grant_type',
            'id_token',
            '^UNSAFE_',
            'short_name'
          ],
          'ignoreDestructuring': true,
          'properties': 'always'
        }
      ],
      'class-methods-use-this': [
        'warn',
        {
          'exceptMethods': [
            'render'
          ]
        }
      ],
      'comma-spacing': [
        'warn',
        {
          after: true,
          before: false
        }
      ],
      'comma-style': [
        'warn',
        'last'
      ],
      'computed-property-spacing': [
        'error',
        'never'
      ],
      'constructor-super': [
        'warn'
      ],
      'curly': [
        'warn',
        'all'
      ],
      'default-case': [
        'warn'
      ],
      'dot-location': [
        'warn',
        'property'
      ],
      'dot-notation': [
        'warn',
        {
          'allowKeywords': true
        }
      ],
      'eol-last': [
        'warn',
        'always'
      ],
      'eqeqeq': [
        'warn',
        'smart'
      ],
      'func-call-spacing': [
        'warn',
        'never'
      ],
      'func-style': [
        'warn',
        'declaration',
        {
          'allowArrowFunctions': true
        }
      ],
      'generator-star-spacing': [
        'warn',
        {
          'after': true,
          'before': true
        }
      ],
      'global-require': [
        'error'
      ],
      'id-blacklist': [
        'warn',
        'err',
        'cb',
        'callback'
      ],
      'import/named': ['error'],
      'import/newline-after-import': 'warn',
      'import/no-duplicates': ['warn', {
        'prefer-inline': true
      }],
      'import/consistent-type-specifier-style': ['warn', 'prefer-inline'],
      'import/no-anonymous-default-export': [
        'warn',
        {
          'allowAnonymousClass': false,
          'allowAnonymousFunction': true,
          'allowArray': true,
          'allowArrowFunction': false,
          'allowCallExpression': true,
          'allowLiteral': false,
          'allowObject': true
        }
      ],
      'import/no-unresolved': [
        'off',
        {
          'ignore': [
            '../extensiton/*'
          ]
        }
      ],
      'indent': [
        'warn',
        2,
        {
          'ImportDeclaration': 'first',
          'ObjectExpression': 'first',
          'SwitchCase': 1,
          'ignoredNodes': []
        }
      ],
      'jsx-a11y/anchor-is-valid': [
        'warn',
        {
          'aspects': [
            'noHref',
            'invalidHref',
            'preferButton'
          ],
          'components': [
            'react-router-dom_Link_is-valid-using-\'to\'',
            'Link'
          ],
          'specialLink': [
            'hrefLeft',
            'hrefRight',
            'to'
          ]
        }
      ],
      'jsx-quotes': [
        'error',
        'prefer-double'
      ],
      'key-spacing': [
        'warn',
        {
          afterColon: true
        }
      ],
      'keyword-spacing': [
        'warn',
        {
          after: true,
          before: true
        }
      ],
      'linebreak-style': [
        'error',
        'unix'
      ],
      'lines-between-class-members': [
        'error',
        'always'
      ],
      'max-depth': [
        'warn',
        {
          'max': 5
        }
      ],
      'max-len': [
        'error',
        {
          'code': 160,
          'comments': 160,
          'ignoreComments': true,
          'ignorePattern': 'import',
          'ignoreStrings': true,
          'ignoreTemplateLiterals': true,
          'ignoreTrailingComments': true,
          'ignoreUrls': true,
          'tabWidth': 4
        }
      ],
      'max-nested-callbacks': [
        'error',
        {
          'max': 4
        }
      ],
      'max-params': [
        'warn',
        {
          'max': 6
        }
      ],
      'max-statements-per-line': [
        'warn',
        {
          'max': 2
        }
      ],
      'new-parens': [
        'error'
      ],
      'no-bitwise': [
        'error'
      ],
      'no-confusing-arrow': [
        'off',
        {
          allowParens: true
        }
      ],
      'no-console': [
        'warn',
        {
          allow: [
            'error',
            'warn',
            'info',
            'group',
            'groupEnd'
          ]
        }
      ],
      'no-duplicate-imports': [
        'warn',
        {
          includeExports: true,
          allowSeparateTypeImports: false
        }
      ],
      'no-else-return': [
        'warn'
      ],
      'no-empty': [
        'error'
      ],
      'no-empty-pattern': [
        'warn',
        {
          allowObjectPatternsAsParameters: true
        }
      ],
      'no-extend-native': [
        'warn',
        {
          'exceptions': [
            'Error',
            'Array'
          ]
        }
      ],
      'no-fallthrough': [
        'warn',
        {
          commentPattern: 'no-break'
        }
      ],
      'no-floating-decimal': [
        'error'
      ],
      'no-implied-eval': [
        'error'
      ],
      'no-iterator': [
        'error'
      ],
      'no-labels': [
        'error'
      ],
      'no-lone-blocks': [
        'error'
      ],
      'no-loop-func': [
        'error'
      ],
      'no-mixed-operators': [
        'error',
        {
          groups: [
            [
              '&&',
              '||'
            ]
          ]
        }
      ],
      'no-multi-assign': [
        'warn'
      ],
      'no-multi-spaces': [
        'warn',
        {
          ignoreEOLComments: true
        }
      ],
      'no-multi-str': [
        'error'
      ],
      'no-multiple-empty-lines': [
        'warn',
        {
          max: 2,
          maxBOF: 1,
          maxEOF: 1
        }
      ],
      'no-new': [
        'error'
      ],
      'no-new-func': [
        'error'
      ],
      'no-new-object': [
        'error'
      ],
      'no-new-require': [
        'error'
      ],
      'no-new-wrappers': [
        'error'
      ],
      'no-proto': [
        'error'
      ],
      'no-redeclare': 'off',
      'no-restricted-globals': [
        'warn',
        {
          message: 'Use local parameter instead.',
          name: 'event'
        }
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            'import1',
            'import2'
          ],
          patterns: [
            'import1/private/*',
            'import2/*',
            '!import2/good'
          ]
        }
      ],
      'no-script-url': 'off',
      'no-sequences': [
        'error'
      ],
      'no-spaced-func': [
        'error'
      ],
      'no-tabs': [
        'warn'
      ],
      'no-throw-literal': [
        'error'
      ],
      'no-trailing-spaces': [
        'warn',
        {
          ignoreComments: true,
          skipBlankLines: true
        }
      ],
      'no-undef': [
        'error'
      ],
      'no-undef-init': [
        'warn'
      ],
      'no-undefined': [
        'off'
      ],
      'no-underscore-dangle': [
        'warn',
        {
          allow: [
            '_id',
            '_object',
            '_doc',
            '_number',
            '_data',
            'id_token',
            '_d',
            '_def',
            '_instance',
            '__dirname',
            '__filename',
            '__component',
            '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__',
            'toUserId_fromUserId',
            '_fetch',
            '_config',
            'unstable_cache'
          ],
          allowAfterThis: true
        }
      ],
      'no-unneeded-ternary': [
        'warn',
        {
          defaultAssignment: true
        }
      ],
      'no-unreachable': [
        'error'
      ],
      'no-unsafe-negation': [
        'warn'
      ],
      'no-unused-labels': [
        'error'
      ],
      'no-unused-vars': [
        'warn',
        {
          args: 'none',
          ignoreRestSiblings: true,
          vars: 'local',
          varsIgnorePattern: '[iI]gnored'
        }
      ],
      'no-unused-expressions': 'off',
      'no-useless-call': [
        'error'
      ],
      'no-useless-computed-key': [
        'warn'
      ],
      'no-useless-concat': [
        'error'
      ],
      'no-useless-constructor': [
        'error'
      ],
      'no-useless-escape': [
        'warn'
      ],
      'no-useless-rename': [
        'error'
      ],
      'no-var': [
        'error'
      ],
      'no-with': [
        'warn'
      ],
      'object-curly-spacing': [
        'warn',
        'always',
        {
          arraysInObjects: false,
          objectsInObjects: false
        }
      ],
      'operator-linebreak': [
        'warn',
        'before'
      ],
      'prefer-const': [
        'warn',
        {
          'destructuring': 'all',
          'ignoreReadBeforeAssign': true
        }
      ],
      'prefer-spread': [
        'warn'
      ],
      'prefer-template': [
        'warn'
      ],
      'quote-props': [
        'warn',
        'as-needed'
      ],
      'quotes': [
        'error',
        'single'
      ],
      'radix': [
        'warn',
        'as-needed'
      ],
      'require-yield': [
        'error'
      ],
      'rest-spread-spacing': [
        'warn',
        'never'
      ],
      'semi': [
        'warn',
        'always'
      ],
      'semi-spacing': [
        'warn',
        {
          after: true,
          before: false
        }
      ],
      'space-before-blocks': [
        'warn',
        'always'
      ],
      'space-before-function-paren': [
        'warn',
        'always'
      ],
      'space-in-parens': [
        'warn',
        'never'
      ],
      'symbol-description': [
        'error'
      ],
      'template-curly-spacing': [
        'off'
      ],
      'unicode-bom': [
        'error'
      ],
      'valid-typeof': [
        'error',
        {
          requireStringLiterals: true
        }
      ],
      'yield-star-spacing': [
        'warn'
      ],
      'yoda': [
        'error'
      ],
      'react/default-props-match-prop-types': [
        'warn'
      ],
      'react/display-name': [
        'off'
      ],
      'react/jsx-curly-spacing': [
        'warn',
        {
          when: 'never',
          spacing: { objectLiterals: 'never' },
          children: {
            when: 'always'
          }
        }
      ],
      'react/jsx-indent-props': [
        2,
        'first'
      ],
      'react/no-children-prop': [
        'warn'
      ],
      'react/no-unused-prop-types': [
        'warn'
      ],
      'react/no-unused-state': [
        'warn'
      ],
      'react/prefer-stateless-function': [
        'warn',
        {
          'ignorePureComponents': true
        }
      ],
      'react/prop-types': [
        'off'
      ],
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': [
        'warn',
        {
          classes: 'ignore',
          functions: 'ignore',
          ignoreFunctionalComponents: true,
          forbidDefaultForRequired: false
        }
      ],
      'react/self-closing-comp': [
        'warn',
        {
          component: true,
          html: true
        }
      ],
      'react-hooks/exhaustive-deps': [
        1,
        {
          enableDangerousAutofixThisMayCauseInfiniteLoops: true
        }
      ],
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/rules-of-hooks': 'warn',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'none',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          vars: 'local',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': ['warn', {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': true,
        'ts-check': false,
        minimumDescriptionLength: 3,
      }],
      '@typescript-eslint/no-empty-object-type': ['warn',
        { allowInterfaces: 'always', allowObjectTypes: 'always' },
      ],
      '@typescript-eslint/consistent-type-imports': ['warn', {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      }],
      '@typescript-eslint/no-unused-expressions': ['off', {}],
      '@stylistic/max-len': [
        'error',
        {
          code: 170,
          comments: 170,
          ignoreComments: true,
          ignorePattern: '^(export|import) (type|interface) .*',
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreTrailingComments: true,
          ignoreUrls: true,
          tabWidth: 2,
        }
      ],
      '@stylistic/indent': ['warn', 2,
        {
          ImportDeclaration: 'first',
          ObjectExpression: 'first',
          SwitchCase: 1,
          ignoredNodes: []
        }
      ],
      '@stylistic/member-delimiter-style': ['warn', {
        multiline: {
          delimiter: 'comma',
          requireLast: false
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false
        },
        overrides: {
          interface: {
            multiline: {
              delimiter: 'semi',
              requireLast: false
            },
            singleline: {
              delimiter: 'semi',
              requireLast: false
            },
          }
        },
        multilineDetection: 'brackets'
      }]

      // // React specific rules
      // 'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      // 'react/prop-types': 'off', // Turn off if using TypeScript
      // 'react-hooks/rules-of-hooks': 'error',
      // 'react-hooks/exhaustive-deps': 'warn',
      // 'jsx-a11y/anchor-is-valid': 'warn',
      // // Add or override TypeScript ESLint rules as needed
    }
  },
];
