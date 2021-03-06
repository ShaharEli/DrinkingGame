module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'react-native/no-unused-styles': 2,
    'react-native/no-inline-styles': 2,
    'react-hooks/rules-of-hooks': 0,
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'prefer-template': 2,
  },
  ignorePatterns: ['**/*.js',"node_modules/**","src/types/game.ts"],
};
