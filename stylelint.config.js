module.exports = {
  extends: 'stylelint-config-recommended-scss',
  rules: {
    'declaration-colon-space-after': ['always'],
    'declaration-colon-space-before': ['never'],
    'function-comma-newline-after': ['never-multi-line'],
    'function-comma-newline-before': ['never-multi-line'],
    'function-parentheses-newline-inside': ['never-multi-line'],
    'function-parentheses-space-inside': ['never'],
    indentation: [2],
    'length-zero-no-unit': true,
    'no-descending-specificity': [
      true,
      {
        ignore: ['selectors-within-list'],
      },
    ],
    'no-extra-semicolons': true,
    'number-no-trailing-zeros': true,
    'selector-type-no-unknown': [
      true,
      {
        ignore: ['custom-elements'],
      },
    ],
    'string-quotes': 'single',
  },
};
