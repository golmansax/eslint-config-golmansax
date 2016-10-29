module.exports = {
  rules: {
    'react/jsx-closing-bracket-location': [2, {
      nonEmpty: 'props-aligned',
      selfClosing: 'line-aligned',
    }],
    'react/jsx-curly-spacing': 2,
    'react/jsx-no-duplicate-props': 2,
    'react/sort-prop-types': 2,
    'react/no-multi-comp': [2, { ignoreStateless: true }],
    'react/react-in-jsx-scope': 0,
    'react/sort-comp': [2, {
      order: [
        'static-methods',
        'lifecycle',
        'setNativeProps',
        'render',
        '/^_render.+$/',
      ],
    }],
  },
};
