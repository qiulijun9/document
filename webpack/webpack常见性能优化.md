# webpack 性能优化

1. 优化打包构建速度-提高开发体验效率
   (1)优化 babel-loader
   开启缓存,明确范围 exclude
   ````
     test: /\.(jsx|js)$/,
        use: {
          loader: "babel-loader?cacheDirectory",// 开启缓存
        },
        exclude: /node_modules/ //明确范围
      ```
   (2)IgnorePlugin 避免引入模块，直接不引入
     如：引入moment 模块，会把整个moment的各种语言版本都引入进来，如果只想引入中文的，
      1.引入IgnorePlugin 插件,避免引入这个库，
      ```
         // 忽略moment 下的local 文件
        new webpack.IgnorePlugin(/\.\/locale/,/moment/)
      ```
      2.手动引入中文语言包  import 'moment/local/zh-cn' ，再正常使用

   (3)noParse 避免重复打包，引入但不打包
   如：react.min.js 是已经经过模块化打包的，所以就没必要在进行模块化打包，忽略对文件react.min.js 的递归解析

   (4)happyPack 开启多进程打包 ，主要针对babel-loader

   (5)PareallelUglifyplugin 多进程压缩js

   (6)自动刷新(不可用于生产环境)
    devServer 中配置

   (7)热更新(不可用于生产环境)
     自动刷新： 整个网页刷新，速度慢，状态会丢失
     热更新：新代码生效，网页不更新，状态不丢失
     需要自己配置哪些模块允许热更新，和更新之后回调
    
   (8) DllPlugin 第三方库（react,vue）不用每次都打包，可以打包好后作为 dll 引用(不可用于生产环境)
    1. DllPlugin 打包出dll.js,manifest.json文件, 配置webpack.dll.js
    2. 使用dll.js,manifest.json文件
      在index.html 中引入 dll.js ,在 dev 配置的DllReferencePlugin 中引入manifest.json

   ````

2. 优化产出代码- 产品性能
   (1)小图片 base64 编码
   (2)bundle 加 hash
   (3)懒加载
   (4)提取公共代码
   (5)使用 CDN 加速
     如：引入echarts 需要1000kb ,按需引入可减少到500kb,用CDN引入需要187kb
     CDN 直接在index.html 中引入CDN 路径，便可直接使用

     CDN是什么？
     CDN 系统能够根据用户的网络流量，节点连接，负载，距离等状况，将用户的请求导向最近的服务器上。
   (6)使用 production 模式
   (7)Scope Hosting

# 关于开启多进程

1. 如果项目较小，打包很快，开启多进程会降低速度（会有进程开销）
2. 如果项目较大，打包较慢，可以开启多进程提高速度
3. 按需使用

# Scope Hosting

Scope Hosting (作用：让多个函数的内容，放到一个函数里面，减少作用域，代码体积更小，执行效率也更快)
使用：
引入插件： ModuleConcatenationPlugin
使用插件：

```
module.exports = {
  //优先引用第三方模块指向ES6模块化语法的文件
  resolve:{
   mainFields:["jsnext:main","brower","main"]
  },
  plugins：[
    new ModuleConcatenationPlugin()
  ]
}
```
