const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = metge(commonConfig, {
    mode: 'production',
    devtool: 'nosources-source-map',
})