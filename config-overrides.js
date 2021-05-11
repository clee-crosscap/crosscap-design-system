const path = require('path');
const CCRA = require('customize-cra');


module.exports = (config, env) => {
  const babelLoader = CCRA.getBabelLoader(config);
  
  return CCRA.override(
    CCRA.addWebpackAlias({
      '@assets':     path.resolve(__dirname, './src/assets/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@features':   path.resolve(__dirname, './src/features/'),
      '@interfaces': path.resolve(__dirname, './src/interfaces/'),
      '@slices':     path.resolve(__dirname, './src/slices/'),
      '@utility':    path.resolve(__dirname, './src/utility/'),
      '@loaders':    path.resolve(__dirname, './src/loaders/'),
      '@workers':    path.resolve(__dirname, './src/workers/'),
      '@languages':  path.resolve(__dirname, './src/languages/'),
      '@root':       path.resolve(__dirname, './src/'),
    }),
    CCRA.addWebpackModuleRule({
      test: /\.worker\.[tj]sx?$/,
      use: [
        {
          loader: 'worker-loader',
          options: {
            worker: {
              type: 'SharedWorker',
              options: {
                type: 'classic',
                name: 'crosscap-react-app-worker',
              },
            },
          },
        },
        {
          loader: babelLoader.loader,
          options: babelLoader.options
        }
      ]
    })
  )(config, env)
}