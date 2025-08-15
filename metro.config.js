const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (() => {
  const defaultConfig = getDefaultConfig(__dirname);
  return {
    ...defaultConfig,
    resolver: {
      ...defaultConfig.resolver,
      sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs']
    }
  };
})();