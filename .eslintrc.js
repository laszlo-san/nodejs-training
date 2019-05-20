module.exports = {
  extends: 'airbnb-base',
  rules: {
    'comma-dangle': ['error', 'never'],
    'no-unused-vars': ['error', { args: 'none' }],
    'object-shorthand': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'no-console': ['error', { allow: ['log'] }]
  }
};
