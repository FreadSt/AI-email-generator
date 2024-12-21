const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  }),
  addWebpackModuleRule({
    test: /\.(png|jpe?g|gif)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/images/',
        },
      },
    ],
  })
);
