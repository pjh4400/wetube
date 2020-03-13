const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV; //pakage.jason에서 설정한 변수
const ENTRY_FILE = path.resolve(__dirname,"assets","js","main.js");
const OUTPUT_DIR = path.join(__dirname,"static");


const config = {
  entry: ENTRY_FILE,
  mode: MODE.replace(/\s/g,""),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader:'babel-loader'
          }
        ]

      },
    {
      test: /\.(scss)$/,
      use: ExtractCSS.extract([
        {
          loader: "css-loader"
        },
        {
        loader: "postcss-loader",
        options: {
          plugin() {
            return [autoprefixer({browsers: "cover 99.5%"})];
            }
          }
        },
        {
          loader: "sass-loader"
        }
      ])
    }
  ]
  },
  output:{
      path: OUTPUT_DIR,
      filename:"[name].js"
  },
  plugins: [new ExtractCSS("style.css")]
};

module.exports = config;
