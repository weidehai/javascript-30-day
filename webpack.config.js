const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports={
    entry:'./src/javascript-drum-kit/index.js',
    output:{
        path:path.resolve(__dirname,'./src/javascript-drum-kit/dist'),
        filename: 'index_bundle.js'
    },
    devServer:{
        contentBase: './src/javascript-drum-kit/dist',
        port:1234
    },
    module:{
      rules:[
        {
          test:/\.scss$/,
          use:['style-loader','css-loader','sass-loader']
        },
        {
          test:/\.(jpg|png)$/,
          loader:'url-loader',
          options:{
            limit:8*1024
          }
        }
      ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:"javascript drum kit",
            template: './src/javascript-drum-kit/assets/index.html'
        })
    ],
    resolve:{
      alias:{
        "@drum":path.resolve('src/javascript-drum-kit')
      }
    }

}