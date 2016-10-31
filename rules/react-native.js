module.exports = {
  plugins: ['react-native'],
  rules: {
    'no-alert': 2, // Should use { Alert } from 'react-native'
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
  },
};
