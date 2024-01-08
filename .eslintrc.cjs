module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', 'react-refresh', 'import', 'jsx-a11y'],
  settings: {
    react: {
      version: '999.999.999'
    }
  },
  env: {
    browser: true,
    es6: true,
    es2020: true,
    commonjs: true,
    node: true
  },
  globals: {
    window: true,
    console: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
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
          '^UNSAFE_'
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
        'after': true,
        'before': false
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
      'error',
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
    'import/no-duplicates': 'warn',
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
          "react-router-dom_Link_is-valid-using-'to'",
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
        'afterColon': true
      }
    ],
    'keyword-spacing': [
      'warn',
      {
        'after': true,
        'before': true
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
        'allowParens': true
      }
    ],
    'no-console': [
      'warn',
      {
        'allow': [
          'error',
          'warn',
          'info',
          'group',
          'groupEnd'
        ]
      }
    ],
    'no-duplicate-imports': [
      'error',
      {
        'includeExports': true
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
        'allowObjectPatternsAsParameters': true
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
        'commentPattern': 'no-break'
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
        'groups': [
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
        'ignoreEOLComments': true
      }
    ],
    'no-multi-str': [
      'error'
    ],
    'no-multiple-empty-lines': [
      'warn',
      {
        'max': 2,
        'maxBOF': 1,
        'maxEOF': 1
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
        'message': 'Use local parameter instead.',
        'name': 'event'
      }
    ],
    'no-restricted-imports': [
      'error',
      {
        'paths': [
          'import1',
          'import2'
        ],
        'patterns': [
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
        'ignoreComments': true,
        'skipBlankLines': true
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
        'allow': [
          '_id',
          '_object',
          '_doc',
          '_number',
          '_data',
          'id_token',
          '_d',
          '_instance',
          '__component',
          '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'
        ],
        'allowAfterThis': true
      }
    ],
    'no-unneeded-ternary': [
      'warn',
      {
        'defaultAssignment': true
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
        'args': 'none',
        'ignoreRestSiblings': true,
        'vars': 'local',
        'varsIgnorePattern': '[iI]gnored'
      }
    ],
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
      'always'
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
    'react-hooks/exhaustive-deps': [
      1,
      {
        'enableDangerousAutofixThisMayCauseInfiniteLoops': true
      }
    ],
    'react-hooks/rules-of-hooks': 'warn',
    'react/default-props-match-prop-types': [
      'warn'
    ],
    'react/display-name': [
      'off'
    ],
    'react/jsx-curly-spacing': [
      'warn',
      {
        'children': {
          'when': 'always'
        },
        'when': 'never'
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
        'classes': 'ignore',
        'forbidDefaultForRequired': false,
        'functions': 'ignore'
      }
    ],
    'react/self-closing-comp': [
      'warn',
      {
        'component': true,
        'html': true
      }
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
        'after': true,
        'before': false
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
        'requireStringLiterals': true
      }
    ],
    'yield-star-spacing': [
      'warn'
    ],
    'yoda': [
      'error'
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { 'varsIgnorePattern': '^_', "argsIgnorePattern": "^_" }],
    "@typescript-eslint/ban-ts-comment": [
      'off',
      {'ts-ignore': 'allow-with-description'},
    ]
  },
}
