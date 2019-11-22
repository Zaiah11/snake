module.exports = {
  mode: 'development',
  entry: `${__dirname}/src/index.js`,
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/public`
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  }
}