module.exports = {
  mode: 'production',
  entry: `${__dirname}/client/src/index.js`,
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/client/public`
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