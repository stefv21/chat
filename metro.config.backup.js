const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (() => {
  const defaultConfig = getDefaultConfig(__dirname);
  defaultConfig.resolver.sourceExts.push('cjs');
  defaultConfig.resolver.unstable_enablePackageExports = false;
  return defaultConfig;
})();