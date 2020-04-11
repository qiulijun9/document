# webpack(打包工具)

## 作用：

1. 打包（把多个文件打包成一个 js 文件）
2. 转化（less,sass,ts）需要用到 loader
3. 优化（对项目进行优化）

## 构成：

webpack.config.js

1. entry：入口模块
   单入口：

```
 entry: "./index.js"
```

多入口一出口:按照顺序打包

```
 entry:["./index.js","./index2.js"]
 output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist") //绝对路径
  },
```

多入口多出口：

```
//入口配置
 entry: {
    index: "./index.js",
    index2: "./index2.js"
  },
//出口配置
  output: {
    filename: "[name].bundle.js",
    path: resolve(__dirname, "dist") //绝对路径
  },
```

2. output:输出的目录

```
output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist") //绝对路径
  },
```

3. loaders:转化器
   webpack 只能处理 js,所以对非 js 模块，
   loaders 是将各类文件处理成 webpack 能够处理的模块
   写法：
   use:['xx-loader','xx-loader']
   loader:['xx-loader','xx-loader']
   use:[{loader:'xx-loader'},{loader:'xx-loader'}]

## css loader

```
module: {
    rules: [
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"] //css loader
      },
    ]
  },
```

### 分离 css

1. 安装 extract-text-webpack-plugin@next
2. 引入
3. 在 plugin 中应用

```
   在 plugin 中应用
   new ExtractTextPlugin("提取的 css 路径") //打包 css 文件到指定文件夹和 js 文件分离
   在module 中应用
    rules: [
       { test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          //把css打包到指定文件夹
          fallback: "style-loader",
          use: "css-loader",
          publicPath: "../" //css中文件的路径
        })
       }
    ]
```

## img loader

下载 url-loader
应用：

```
      {
        test: /\.(jpg|jpeg|png|gif|svg|webp)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4 * 1024, //超过4kb，转换成base64的图片
              outputPath: "imgs" //打包后输出的路径
            }
          }
        ]
      }
```

## less loader

下载 less less-loader
应用：

```
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader "] //less loader
      }
```

## sass loader

下载 node-sass sass-loader
应用：

```
      {
        test: /\.(sass|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader "] //sass loader
      }
```

## postcss 预处理器　，处理浏览器前缀

安装 postcss-loader autoprefixer -D
配置.prettierrc.json
## 消除冗余 css 代码

Ｐ urifycss
安装　 purifycss-webpack purify-css glob

引入插件
const purifycssWebpack =require('purifycss-webpack')
使用
new purifycssWebpack({paths:"路径"})

## babel

babel 　主要用来编译 js,esnext,jsx
安装：
　 babel-core babel-loader babel-present-env

4. plugins:插件
   安装插件-----引入插件 -----使用插件
   https://www.npmjs.com/package/html-webpack-plugin# 配置项手册

```
生成html模板，如果要生成多个html 文件，可以new 多个，给不同的filename
  plugins: [
    //生成html模板
    new HtmlWebpackPlugin({
      chunks:[],//多页面引入自己的js
      filename:"index.html",//生成的文件名
      template: "./public/index.html",定义模板
      title: "webpack"， //定义html title ，使用模板  <titsle><%= htmlWebpackPlugin.options.title%></title>
      //压缩
      minify: {
        collapseWhitespace: true, //删除空格
        removeAttributeQuotes: true //删除属性双引号
      }
    })
  ],

```

5. devSever:开发服务器

```
devServer: {
   contentBase: resolve(__dirname, "build"), //服务器访问的地址
   compress: true, // 启动 gzip
   host: "localhost",  //ip
   port: 3000,
   open: true // 自动打开浏览器
 },
```

6. mode:模式
   开发环境 development(没有压缩)，生产环境 production 压缩后的文件

```
 mode: "development"
```

## 安装：

npm install webpack-cli -g
npm webpack -g --save-dev

## 运行

webpack
如果配置文件名不叫 webpack.config.js 运行时 webpack --config 配置文件名

可以在 package.json 中配置运行命令：
如：运行 npm run build 来进行打包

```
 "scripts": {
    "build": "webpack"
  },
```

## 使用第三方库

1. npm 下载　 import 引入
   　即使不用，打包时也会打包进去

2. providePlugins 全局引入　
   引入包
   使用
   new webpack.ProvidePlugin({\$:"jquery"})
   　不用的话，打包时不会打包进去，使用时才会打包

## 提取第三方 js 库

optimization.splitchunks
