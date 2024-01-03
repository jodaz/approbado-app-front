const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Find the project and workspace directories
const projectRoot = __dirname;
// This can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(projectRoot, '../..');

module.exports = (async () => {
    const {
      resolver: {sourceExts, assetExts},
    } = await getDefaultConfig(projectRoot);

    return {
        transformer: {
            babelTransformerPath: require.resolve('react-native-svg-transformer'),
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: true,
                },
            }),
        },
        watchFolders: [workspaceRoot],
        resolver: {
            nodeModulesPaths: [
                path.resolve(projectRoot, 'node_modules'),
                path.resolve(workspaceRoot, 'node_modules'),
            ],
            disableHierarchicalLookup: true,
            assetExts: assetExts.filter(ext => ext !== 'svg'),
            sourceExts: [...sourceExts, 'svg'],
        },
    };
})();
