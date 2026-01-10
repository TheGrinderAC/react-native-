const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Handle .cjs files and GraphQL files
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'cjs');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs'];

// Ensure proper module resolution
config.resolver.sourceExts = [...config.resolver.sourceExts, 'graphql', 'gql'];

module.exports = config;
