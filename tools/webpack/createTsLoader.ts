export function createTsLoader(test: RegExp, addPreset?: string[]) {
  const presets = [
    ['@babel/preset-env', { useBuiltIns: 'usage', corejs: { version: '3.8', proposals: true } }],
    '@babel/preset-typescript',
  ];

  if (addPreset?.length) {
    presets.push(...addPreset);
  }

  const use = [
    'thread-loader',
    {
      loader: 'babel-loader',
      options: { presets },
    },
  ];

  return {
    test,
    use,
    exclude: /node_modules/,
  };
}
