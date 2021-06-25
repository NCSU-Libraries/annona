const webpack = require('webpack')
const filename = `js/${process.env["TYPE"]}.js`
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  },
  configureWebpack: config => {
    config.output.filename = filename,
    optimization = {
      runtimeChunk: 'single',
    }

  },
  chainWebpack:
    config => {
      config.optimization.delete('splitChunks'),
      config.when(process.env.NODE_ENV === 'production', plugin => {
            plugin.plugin('extract-css').tap(([options, ...args]) => [
                Object.assign({}, options, { filename: 'css/annona.css' }),
                ...args
            ])
        })
    }
}
