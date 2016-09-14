module.exports = {
  rules: {
    'import/no-extraneous-dependencies': [2, {
      devDependencies: true,
      optionalDependencies: false,
    }],
  },
};
