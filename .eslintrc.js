module.exports = {
  extends: ['airbnb'],
  env: {
    es6: true,
    jest: true,
    browser: true,
    node: true,
    jquery: true,
  },
  plugins: ['json'],
  globals: {
    GENTLY: true,
    start: true,
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': ['error', { props: false }],
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'no-use-before-define': ['error', { functions: false }],
    'no-shadow': [
      'error',
      {
        builtinGlobals: true,
        hoist: 'functions',
        allow: ['resolve', 'reject', 'err'],
      },
    ],
    'consistent-return': 0,
    'key-spacing': [
      'error',
      {
        multiLine: { beforeColon: false, afterColon: true },
        align: { beforeColon: false, afterColon: true, on: 'colon', mode: 'strict' },
      },
    ],
  },
};
