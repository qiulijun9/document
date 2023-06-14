# webpack 中的 Module 是指什么？

webpack 支持 ESModule,CommonJs,AMD ,资源等模块

1. ES Module
   export ,import 引入和导出资源

   ```js
   import { a } from './a.js'

   export { b }
   ```

2. CommonJS
   导入，导出

```js
require

module.exports
```


# webpack 中的 module ,怎么表示依赖关系

主要根据每个文件中的 引入语句来，确定依赖了哪些文件,再打包出相应的 bundle
如 import, require , define require ,@import ...

# webpack 中的 chunk 和 bundle，模块 的区别是什么

1. chunk（打包过程中）
   chunk 是 webpack 打包过程中的 modules 集合，是打包过程中的概念

   如何形成的 chunk？
   webpack 打包是从入口文件开始，入口文件引入其他模块，其他模块引入另外的其他模块，webpack 通过引用关系打包模块，这些 modules 就形成了一个 chunk,

   多入口的模块，会产生多个路径，会形成多个 chunk

2. bundle
   最终输出的一个或多个打包后的文件

3. 模块
webpack 中 任何资源都是模块，如 js 文件，css 文件，图片等都可以视为独立的单元，可以通过loader 和plugin进行转换和处理，最后转成一个或多个块chunk

4. chunk 和 bundle 有什么关系

- 一般一个 chunk 对应一个 bundle,
- 但是 在 devtool: 'source-map',是会产生一个 chunk 对应两个 bundle 的情况

- 多个入口也会打包出不同的多的 chunk 和 bundle

```js
  entry: {
    index: ['./src/index.js', './src/add.js'],
  },
```

会打包出一个 chunk, 会把一个 key 数组中的文件合并成一个入口

```js
 entry: {
    index: './src/index.js',
    add: './src/add.js',
  },
```

不同的 key 对应的入口文件会形成不同的 chunk

chunk 是过程中的代码块，bundle 是打包输出的代码块，chunk 在构建完成就形成了 bundle




# plugin 和 loader 分别是什么，怎么工作的？

1. Loader 模块转换器
   webpack 只支持js he Json,loader 是将非 js 模块转换成 webpack 能识别的 js 模块,
   webpack loader 将所有类型的文件，转换成应用程序的（依赖图）可以直接使用的模块

   常见的loader:
   - babel-loader 转换ES6，ES7语法
   - css-loader  支持.css 文件的加载和解析
   - less-loader 将less 转成css
   - styled-loader    将样式通过<style> 标签插入到 header 中
   - ts-loader 将ts 转成js
   - file-loader 将图片、字体打包
   - thread-loader 多进程打包js 和css

   ### webpack loader css 顺序
   less-loader 加载.less 文件
   css-loader 加载 .css 文件

   执行顺序是 less-loader ---> css-loader --->styled-loader
   webpack 加载是从右往左加载
   use: ['style-loader','css-loader','less-loader']

2. Plugin （扩展插件）增强 webpack的功能
   运行在 webpack 打包的各个阶段（整个构建过程），用于bundle的优化，资源管理等
  
   常见的 plugin
   - commonsChunkPlugin: 将相同模块提取成公共js
   - cleanWebpackPlugin：清理构建目录
   - ExtractTextWebpackPLugin： 将css 从bundle 文件中提取成独立的css 文件
   - CopyWebpackPlugin: 将文件拷贝到目录
   - HtmlWebpackPlugin: 创建 html 文件去承载输出的bundle
   - optimize-css-assets-webpack-plugin:css 去重
   -speed-measure-webpack-plugin：输出打包的耗时
   - webpack-bundle-analyzer：可视化输出打包文件的体积

   使用 plugins:[ new commonsChunkPlugin()]



3. Compiler（webpack 实例）
   包含了 webpack 环境的所有配置信息（options,loader,plugins），是在 webpack 启动时实例化的，可以理解为 webpack 的实例，是全局唯一的
4. Compliation
   包含了当前的模块资源，编译生成资源
   webpack 在开发模式下运行的时候，每当检测到一个文件发生变化，就会生成一个 Compliation

# 如何实现一个plugin 
插件类需要实现一个 apply 方法，并将其导出。apply 方法接受一个名为 compiler 的参数，该参数是 Webpack 的编译器实例。
在 apply 方法中，可以通过调用 compiler.hooks 对象上的方法来注册事件钩子处理函数。例如，以下是一个简单的 Plugin，可以在 Webpack 构建完成后输出一个提示信息：


# webpack 的打包过程
1. 初始化阶段
  a. 初始化参数:从配置文件中读取参数
  b. 创建编译器对象: 根据配置文件中的参数创建 Complier 对象
  c. 初始化编译环境:注入内置插件，加载配置插件等
  d. 开始编译: 执行 Complier 的run 方法
  e. 确定入口: 根据 entry 找出所有入口文件
2. 构建阶段
  a. 编译模块: 从entry 出发，根据 entry 对应的dependence 创建module 对象，调用loader 将其转换成js,再将其解析成AST对象，找出该模块依赖的模块，在递归本步骤
  b. 完成模块编译：递归编译后得到编译后的js 文件，及其依赖关系图

3. 生成阶段
  a. 输出资源: 根据依赖关系，组装成一个个包含多个 module 的，chunk,再把chunk 转换成一个单独的文件加入输出列表
  b. 写入文件: 根据输出的路径和文件名，输出到文件中


// 比较简单的说法
1. 初始化参数：初始化 webpack.config.js 中的参数
2. 开始编译： 初始化一个 Compiler 对象，加载所有配置，开始编译
3. 确定入口： 根据 entry 找出所有的入口文件
4. 编译模块： 从入口文件开始，调用 loader，递归寻找依赖
5. 完成编译：得到每个模块编译好的内容，以及各个模块之前的关系
6. 输出资源：根据依赖关系，组装成一个个包含多个 module 的 chunk
7. 输出完成： 确定输出的文件名




# webpack 热更新（HMR）实现原理
工作流程介绍：
1. 启动 webpack-dev-server, webpack 开始构建
2. 页面加载后，与服务端（WDS）建立 WebSocket 链接
3. 当文件发生改变时，服务端监听文件内容发生改变，webpack 开始重新编译,并通过 WebSocket 发送 hash 事件
4. 浏览器收到hash事件后，请求 manifest 资源文件，确认增量变更范围
5. 浏览器加载发生变更的增量模块
6. webpack 运行时触发module.hot.accept 回调，执行代码更新
7. done

webpack-dev-server 包含了3部分
1.webpack: 负责编译代码
2.webpack-dev-middleware： 负责构建文件系统，作为express 的中间件拦截请求，中文件系统中把结果拿出来
3. express: 负责搭建请求路由服务


# treeSharking原理
简介： 基于ESmodule,在运行过程中静态分析模块的导入导出，标记导出的模块哪些是未使用的，再将其删除，从而实现打包体积优化的目的。

FlagDependencyExportsPlugin 插件： 将export 模块语句都记录在依赖图体系内
FlagDependencyUsagePlugin 插件：标记导出的模块如何使用 ，把记录存储在exportInfo._usedInRuntime 中

启用treeSharking:
- 使用 ESM 规范(是在模块顶层进行导出导出的，这是treeSharking 做静态分析的必要条件)
- optimization.usedExports = true
- mode: "production"

一 、 收集模块导出

在编译阶段将所有ESModule 导出语句转换成 dependencies 数组：
具名导出的模块转化为 HarmonyExportSpecifierDependency
default 导出的模块转化为 HarmonyExportExpressionDependency
所有模块编译完成后 ，触发 compilation.hooks.finishModules 方法，执行FlagDependencyExportsPlugin 插件
FlagDependencyExportsPlugin 插件 处理是从遍历module 对象的dependencies数组，找出每一项依赖的对象，转化成 ExportInfo 并记录到依赖关系图中
二、 标记模块的导出

FlagDependencyUsagePlugin 插件中，从entry 遍历依赖关系图中的所有module 对象
再遍历module 对象对应的 exportsInfo 数组
确定对应的依赖是否使用，如果使用则调用方法标记为已使用
内部修改 exportInfo._usedInRuntime  属性，记录该导出被如何使用
三、 生成代码

根据依赖关系图，和标记的exportsInfo 属性，判断哪些是使用哪些是未使用过的
对于使用过的保存到 initFragments 数组
生成导出的语句 js 文件
四、删除无用的代码

使用 Terser,ungligyJS 等工具 删除无用的代码

### webpack5 treeSharking 和 webpack4 TreeShaking 有什么区别？
1. 支持对动态导入的模块 进行treeShaking
2. 自动移除副作用代码： sideEffects，指定副作用，webpack5 会移除没有用的副作用模块代码，减小构建包的大小
3. 优化了模块解析算法，更快的识别模块依赖 ,webpack 4 没有分析模块导出和引用之前的依赖关系， webpack5在生产模式下默认开启optimization.innerGraph 

# webpack splitChunk
代码分割，将代码分成chunks,当代码运行到它们的时候再加载
策略判断：大小判断、共用次数、动态引入的模块、缓存、依赖关系
1. 将变动的与不易变动的资源进行分离 ---> 有效利用缓存；
将 node_modules 中的资源拆分出来，如果 node_modules 中的资源不变，就可以有效利用缓存，避免受到业务代码频繁改动的影响；
2. 将大的拆分成若干个小的 chunk ---> 缩短单个资源下载时间；
将公共模块抽离出来 ---> 避免资源被重复打包，这样也可以在一定程度上减小打包产物总体积；
eg 
   - 先大体积包 echarts 拆分出来；
   - 再把 node_modules 中体积大于 160000B 的依赖包拆出来（这里参考 next.js，将阈值设置为 160000B）；
   - 再考虑将 node_modules 中的剩余项打成一个 chunk；
3. 将被多个 chunk 引用的包拆分成单独的模块；
 将被引用次数大于等于 3 次的公共模块拆分出来；

适用场景
1. 抽离相同的代码到共享块
项目中的第三方依赖库（如 React、Vue ，node_modules 文件夹下的等）和公共代码（如项目中的工具函数、样式文件等）。
这些代码在多个页面或组件中都被使用到，因此将它们拆分到一个单独的 chunk 中可以减少页面加载时间和代码冗余，提高应用的性能,还可以利用浏览器的缓存机制，避免重复下载。
2. 脚本懒加载，(用到的话才加载)让初始加载的代码更小

默认的策略
新的 chunk 是否被共享或者是来自 node_modules 的模块
新的 chunk 体积在压缩之前是否大于 30kb
按需加载 chunk 的并发请求数量小于等于 5 个
页面初始加载时的并发请求数量小于等于 3 个

eg: 打包后的文件太大 主要是xlsx，echart
xlsx.js 这样的插件没必要使用，导出 excel 更好的方法应该是后端返回文件流格式给前端处理
echart 文件太大，应该使用 cdn 引入的方法
```js
chainWebpack: config => {
    config.optimization.splitChunks({
      chunks: 'all',
      // async 动态引入的包会被拆分到不同的 chunk 中   initial 共同引用的代码多次（minChunks）会被拆分成一个单独的包
      // all 是动态引入和动态引入都会被拆分成一个单独的包，能够最大程度的生成复用代码
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial'
        },
        echarts: {
          name: 'chunk-echarts',
          priority: 20,
          test: /[\\/]node_modules[\\/]_?echarts(.*)/
        },
        commons: {
          name: 'chunk-commons',
          minChunks: 2, // 多少个代码共享时才拆分
          minSize:33000,
          priority: 5,
          chunks: 'initial',
          reuseExistingChunk: true,
          maxAsyncRequests:2// 指定按需加载的代码块的最大并行请求数量
        }
      }
    })
  },
```



懒加载js的方式
CommonJS: require.ensure
ES6: 动态 import( 需要babel 转换) @babel/plugin-syntax-dynamic-import 
会再分割成一个js 文件

添加到.babelrc 文件中
plugins:[@babel/plugin-syntax-dynamic-import ]



# script async 下载完文件会立即执行，当改文件中有其他依赖未下载完执行时报错，webpack 如何解决？
provide-plugin 可以在全局使用第三方库

new webpack.ProvidePlugin({
	_ : ['loadsh']
})

# webpack 5 是如何做缓存的
缓存主要产生在两个阶段，一个是模块解析阶段，一个是模块编译阶段。先写入到内存中的缓存队列中，等编译完成之后再内存的缓存队列写入到硬盘中。复用已经编译的模块，省去重新编译和执行的时间。

写入的缓存是什么？
是一个map类型，key：是缓存资源的唯一标识 value:是模块或文件的解析树据+快照。
解析数据：是对当前文件编译解析后的js 文件。
快照：是依据resolveTime, fileDependencies、contextDependencies、missingDependencies 以及在 webpack.config 的 snapshotOptions配置来生成快照的内容

何时读缓存？
项目在二次解析或编译模块时会读缓存。从硬盘读取到内存中加以利用。

webpack5 与 webpack4 相比的区别：
1. webpack5 不仅在模块的编译和解析阶段，也在代码生成，souceMap 阶段等都使用到了持久化缓存。
2. 内置了更加安全的缓存对比策略。
3. 编译流程和持久化缓存解耦，编译阶段的持久化数据不会阻碍整个流程，是先放入一个队列中，构建完成之后 再写入到硬盘中。
 cache 的配置：
 ```js
 module.exports = {
    cache: {
        type: 'filesystem', // 可选值 memory | filesystem
        cacheDirectory: './.cache/webpack', // 缓存文件生成的地址
        buildDependencies: { // 那些文件发现改变就让缓存失效，一般为 webpack 的配置文件
            config: [
                './webpack.config.js'
            ]
        },
        managedPaths: ['./node_modules', './libs'], // 受控目录，指的就是那些目录文件会生成缓存
        profile: true, // 是否输出缓存处理过程的详细日志，默认为 false
        maxAge: 1000 * 60 * 60 * 24, // 缓存失效时间，默认值为 5184000000
    }
}
 ```

# webpack5 新特性（构建速度更快，体积更小）
一、 功能移除
node >=10.13
1. 所有在 webpack4 中废弃的一些功能都被清除，因此要确保webpack4 没有打印警告
2. require.includes 语法废弃掉，（require.includes：）加载一个模块，并不马上执行
3. 不再为node.js 模块引入polyfill，减少了bundle 大小
webpack4 之前会把用到的node模块的polyfill 打包进来，因为webpack 打包后的文件要在浏览器中执行，浏览器识别不了node的模块，所以就会把这些用到的node polyfill 打包进来

webpack4---》webpack ----》lib ---> nodeSourcePlugin包中 ----> nodeLibsBrowser 中引入了,会把这些polyfill 打包进来
nodeLibsBrowser 是node 中核心的一些依赖模块

Webpack 5 推荐使用 fallback 配置项来引入必要的 polyfill,eg：
```js
   const BrowserFS = require('browserfs');
   const fs = BrowserFS.BFSRequire('fs');
   const path = BrowserFS.BFSRequire('path');

   module.exports = {
     // ...
     resolve: {
       fallback: {
         fs: false, // 不使用内置的 fs 模块
         path: require.resolve('path-browserify') // 使用 path-browserify 作为备选方案
       }
     },
     // ...
   };

```

二、 缓存
1. 长期缓存
生产模式下，默认使用chunkIds:"deterministic" 和 moduleIds:"deterministic"
deterministic：不同编译中不变的短数字id，应用缓存

之前使用的 chunkIds 和moduleIds 为顺序的数字，文件一更改，文件名也会更改，缓存会失效。

当使用 [contenthash] 时，webpack5 使用文件真正的哈希值，之前模块中内容注释修改或者文件名修改，也会重新编译。
 hmr 中 webpack4 热更新文件以模块为单位，webpack5 热更新文件以chunk 为单位

2. 持久化缓存
webpack4 可以使用cache-loader ,babel-loader 将编译的结果写入硬盘中
webpack5 缓存
- 默认开启，缓存默认是放在内存中，可以修改cache 进行设置
```js
cache:{
   type:"memory"
}
// 修改缓存存储到磁盘中
cache:{
   type:"filesystem"
}
```
- 最大500MB，缓存两个星期，旧的缓存先淘汰


三、 构建优化
TreeSharking ,可以分析模块依赖关系，移除更多无用的代码，打包的体积更小。
支持嵌套的treeSharking A 模块引入B模块，B模块引入A模块，对这类嵌套的代码也做了treeSharking操作

四、 代码生成
既可以生成Es5的代码也可以生成es6的代码  ，在webpack4 中只能生成es5 的代码
```
output:{
   ecmaVersion:6 || 或者是年份
}
```
五、模块联邦
模块联邦 使一个javaScript 应用在运行的过程中可以加载另一个应用的代码，即采用CDN的方式动态引入。可以实现更为灵活和精细的代码分割。能够共享模块，减少重复代码。
之前如果A，B两个应用要共享一块代码，就需要把这块代码打包成npm 包，再两个应用中分别引入。

ModuleFederationPlugin,插件将多个应用结合起来

### webpack 如何动态加载的

### webpack 原型

  commJS 
  语法 require  export default

  1. 收集依赖 从index,js 查找会依赖其他，生成一个关系依赖图
  2. es6-->es5   封装 require, 和export 方法

```js
var exports = {};
// 自执行函数 ，执行 export default ,不影响全局
(function (exports,code){
   eval(code); // 运行代码
})(exports,"export.default = function(a,b){return a + b}")



(function(list){
   //require 方法 根据文件名导出结果
   function require(file){
      var exports = {};
      (function (exports,code){
      eval(code)
      })(exports,list[file])
    return exports
   }

   require("index.js");
}({  "index.js":`var add = require("add.js").default;
                console.log(add(2+4));`,
     "add.js": `export.default= function(a,b){return a + b}`}))
  ```



# CommonJS 和 ESModule 的区别
（语法，浏览器支持度，加载方式，导出不同）

CommonJS
1. 模块加载器是有Node.js 提供，也依赖了node.js 本身的功能，如 文件系统等，是不能直接在浏览器端运行的，业界也提供了 browserify 这样的打包工具来支持第三方来打包CommonJS
2. CommonJS  是约定的以同步的方式来加载模块，这种方式放在服务端是没问题的，但是放在浏览器端会带来明显的性能问题，会同步的加载模块，浏览器需要等到同步加载的模块响应返回后才能解析模块，”模块请求会阻塞js 的解析“，导致页面加载速度慢
3. CommonJS模块是动态运行的，模块导出值可以随时更改；导出的是值的拷贝。 拷贝：C（改了不影响）
module.exports 导出的是真正的对象
exports 只是它的一个引用，用来向module.exports中添加属性和方法
4. CommonJS 中，模块是同步加载的，因此如果 A 模块引入 B 模块，B 模块又引入 A 模块，就会造成循环依赖的问题，



ESModule
1. 在浏览器和node 环境下都可以运行
2. ESModule 异步加载模块，即在解析阶段就会进行模块加载，不会阻塞线程
3. ESModule 模块是静态解析的，模块导出值是只读的，不可更改。导出的是值的引用。（改了都改）
4. ES Module 中，模块是异步加载的，因此如果 A 模块引入 B 模块，B 模块又引入 A 模块，不会出现循环依赖的问题，循环依赖的情况下，其中一个模块会先被加载，并且会创建一个空对象作为其导出对象，然后另一个模块会被加载并执行，此时它可以访问第一个模块的导出对象


# vite构建服务

  创建 KOA server
       |
       |
 使用 chokidar 监听文件的变化
       |
       |
    模块解析
       |
       |
   各种中间件
       |
       |
    启动服务



 vite  会利用serverStaticPlugin 来将整个项目的的跟目录、public 目录设为静态目录，serverStaticPlugin  利用 koa Etag 来监听文件的变化  


# webpack 和vite 打包出的文件有何区别
webpack 打包出是一个或多个bundle 文件，需要 script  标签去加载这些文件，webpack 则会将所有的文件打包成一个或多个 JavaScript 文件，并且会对每个文件生成一个对应的哈希值，以实现浏览器缓存。
vite  打包出来是ESM 代码，可以直接在浏览器中运行，可以更快的执行，如 JS 文件会输出为原生的 ES Modules，CSS 文件会输出为原生的 CSS 文件。
# rollup
Rollup 的特点是针对库和组件的打包优化更为适用，因为库和组件往往比应用程序更为简单，而且对于库和组件而言，代码体积更为重要，因此 Rollup 专注于打包体积更小、性能更好的代码。

Rollup 的使用方式与其他打包工具类似，可以通过配置文件来指定入口文件、输出文件、插件等参数，也可以通过命令行参数来进行配置。Rollup 支持多种模块格式的输入和输出，包括 CommonJS、AMD、ES6、UMD 等。

Rollup 的核心是利用 ES6 模块化的特性，将代码分析成模块，并通过 Tree-Shaking 的方式去除未使用的模块和代码，从而减小打包后的代码体积。同时，Rollup 还提供了多种插件，例如代码压缩、处理 CSS、图片等，以满足不同的需求。

# webpack 是如何确定模块依赖关系的
1. 识别入口文件：Webpack通过配置文件中的entry选项指定入口文件

2. 解析模块依赖：Webpack根据入口文件中的依赖关系，递归解析所有依赖模块的依赖关系。包括CommonJS、ES6模块化、AMD等,Webpack 会根据不同的模块化规范来解析模块依赖。

3. 加载模块
Webpack 会根据模块的依赖关系去加载模块，Webpack 支持多种加载器（Loader），通过加载器可以将模块转换为 Webpack 可以识别的格式，比如将 ES6 模块转换为 CommonJS 模块。

4. 生成依赖图谱
Webpack 会将所有模块的依赖关系生成一个依赖图谱，图谱中记录了模块之间的依赖关系，包括依赖模块的路径、模块 ID 等信息。

5. 打包模块
Webpack 根据依赖图谱将所有模块打包成一个或多个 Chunk（代码块）,每个 Chunk 包含了一组相互依赖的模块，每个 Chunk 都有一个唯一的 ID，可以在代码中按需加载。