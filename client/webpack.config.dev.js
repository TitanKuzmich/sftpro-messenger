/* eslint-disable */
const path = require("path")
const ramda = require("ramda")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin")

const envFile = require("dotenv").config({ path: path.join(__dirname, "./.env") }).parsed

const sourceDir = path.join(__dirname, "./src")
const sourceSVG = path.join(__dirname, "./src/assets/svg")

const entryPath = path.join(sourceDir, "./index.tsx")

const baseConfig = require("./webpack.config.base")

const devConfig = () => {
  // replace localhost with 0.0.0.0 if you want to access
  // your app from wifi or a virtual machine
  if (ramda.isNil(envFile)) {
    throw Error("Env file is not defined. Pls configure .env")
  }

  if (ramda.isNil(envFile.HOST) || ramda.isNil(envFile.PORT)) {
    throw Error("PORT or HOST is not defined. Pls configure .env")
  }

  const host = envFile.HOST
  const port = envFile.PORT
  const proxy_url = envFile.API_PROXY_URL
  return {
    mode: "development",
    devtool: "eval-cheap-source-map", //"inline-source-map",
    host,
    port,
    proxy_url,
    entry: {
      front: [
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        `webpack-dev-server/client?http://${host}:${port}`,

        // the entry point of our app
        entryPath
      ]
    },
    debug: false,

    optimization: {
      moduleIds: "deterministic",
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          }
        }
      }
    },

    output: {
      publicPath: "/",
      filename: "[chunkhash:5]-[name].js",
      pathinfo: false
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        chunks: "all",
        filename: "index.html",
        template: "index.dev.ejs",
        inlineSource: ".*main.*(css)$"
      }),

      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
        ignoreOrder: true
      }),

      new SpriteLoaderPlugin()
    ],
    module: {
      unsafeCache: true,
      rules: [
        {
          test: /\.svg$/,
          include: sourceSVG,
          loader: "svg-sprite-loader",

          options: {}
        },
        {
          test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$/,
          include: sourceDir,
          exclude: sourceSVG,
          type: "asset/resource"
        },
        {
          test: /\.(ts|tsx|js)$/,
          include: sourceDir,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheCompression: false,
                cacheDirectory: true
              }
            }
          ]
        },
        {
          test: /\.s?css$/,
          oneOf: [
            {
              test: /\.m\.s?css$/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader
                },
                {
                  loader: "css-loader",
                  options: {
                    modules: {
                      localIdentName: "[name]__[local]--[hash:base64:5]"
                    }
                  }
                },
                {
                  loader: "postcss-loader",
                  options: {
                    postcssOptions: {
                      plugins: [
                        [
                          "postcss-preset-env",
                          {
                            state: 0,
                            autoprefixer: {
                              grid: true
                            }
                          }
                        ]
                      ]
                    },
                    sourceMap: true
                  }
                },
                { loader: "sass-loader", options: { sourceMap: false } }
              ]
            },
            {
              use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
          ]
        }
      ]
    }
  }
}

module.exports = baseConfig(devConfig())
