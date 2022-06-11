import path from 'path';

export function createTsLoader(test: RegExp, addPreset?: string[]) {
  const presets = ['@babel/preset-env', '@babel/preset-typescript'];
  addPreset?.length && presets.push(...addPreset);

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
    exclude: [path.resolve(__dirname, 'node_modules')],
  };
}
