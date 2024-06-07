const { rules } = require('../config-eslint/next');

module.exports = {
  extends: ['@repo/eslint-config/react.js'],
  rules: {
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
  },
};
