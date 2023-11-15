const { GenerateSW } = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  // ... other configurations

  plugins: [
    // ... other plugins
    new GenerateSW(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: 'manifest.json' },
        { from: 'src/icons', to: 'icons' }, // Make sure you have an 'icons' folder with different sizes of icons
      ],
    }),
  ],
};
