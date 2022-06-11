export function createStyleLoader(test: RegExp, addLoader?: string[]) {
  const use = ['thread-loader', 'style-loader', 'css-loader'];
  addLoader?.length && use.push(...addLoader);

  return {
    test,
    use,
  };
}
