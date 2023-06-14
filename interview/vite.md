### vite 简介
 vite 是以 ESModule 为基础的构建工具，
 利用浏览器已经支持ESM,（type=”module“）在开发环境阶段，从而实现no-bundle 构建。
 从入口文件出发，遇见import 就会发送一个http 请求去加载资源。
 vite 在后端起一个服务 vite dev server，去处理这些请求。做到了按需加载，比原始的webpack 的编译速度要快好多。
 
 在开发环境中，使用ESbuild 提升性能
 在生产环境中，vite 依然会使用Rollup进行打包

 ### vite 特点：
 1. 启动速度快
 2. 热更新快
 3. 按需编译
 4. 内置了对ts,jsx,sass/less 等语法的支持
 5. 配合 Rollup 实现生成环境的打包

 vite 解决的问题：
 1. 第三方库的问题




 ### commonJS
 1. 使用 require  导出一个模块，，module.exports 
 2. 模块进行同步加载  ,模块请求会阻塞js的解析，不太适合应用在浏览器端

 ```js
 // module-a.js
var data = "hello world";
function getData() {
  return data;
}
module.exports = {
  getData,
};

// index.js
const { getData } = require("./module-a.js");
console.log(getData());
 ```

 ### AMD  异步模块定义规范
 异步加载模块，在浏览器中模块会异步加载，解决浏览器加载阻塞的问题
 define 定义或去加载一个模块

 ```js
 // main.js
define(["./print"], function (printModule) {
  printModule.print("main");
});

// print.js
define(function () {
  return {
    print: function (msg) {
      console.log("print " + msg);
    },
  };
});
 ```

module 加载一个模块，只能加载模块，不能定义模块
```js

 // module-a.js
require(["./print.js"], function (printModule) {
  printModule.print("module-a");
});
```


## ESModule
ESModule 已经得到了现代浏览器的支持，如果在 script标签中 设置 type ="module" 属性，浏览就会按照ESModule  去加载和解析模块。加载模块的任务交给了浏览器，
这也是vite 在开发阶段实现 no-bundle 的原因

```js
// main.js
import { methodA } from "./module-a.js";
methodA();

//module-a.js
const methodA = () => {
  console.log("a");
};

export { methodA };
```


## 依赖预构建
1. 将其他格式（UMD和CommonJS） 的产物转换成ESM 格式，使其可以在浏览器通过<script  type=”module“> 的方式下是可以正常加载的
2. 打包第三方库的代码，（react,react-dom,lodash）将各个第三方库的文件合并到一起，减少http 请求数量， 比如：在加载lodash 的debounce  方法，可能因为依赖加载上百个请求，在合并完之后请求变少，页面加载也变快了
3. 预构建产物的文件一般会放在 node_modules 下的.vite 文件夹中
在页面中查看，..../.vite/react.js  该文件会使用强缓存，缓存时间为一年，在依赖没有变的情况下回使用缓存中的内容


这两件时间都是由ESBuild 来完成，这也是vite 项目启动快的原因



## ESbuild 在 vite 中发挥了哪些作用
一、 依赖预构建 -Bundler
 优点：
1. ESM 的兼容
2. 合并海量请求，提升页面加载速度
缺点：
1. 不支持 ES5 的语法
2. 不提供打包产物的能力
3. 不支持 splitChunks, 无法自动拆包

二、单文件编译 -作为TS 和JSX 的编译工具 Transformer
esbuild  转义ts,jsx 的能力通过 vite 插件提供，（esbuild plugin）,替换 原来babel ,tsc 的功能

三、代码压缩 -作为压缩工具  Minifier
vite 将 ESbuild 作为生成环境下的代码压缩工具，传统的webpack,rollup是使用Terser 这种js 压缩工具来处理（压缩速度慢，在传统压缩下对比大量的ast ,这些ast 不被共享）

ESbuild 是从头共享AST 以及由原生语言编写的压缩器


## Rollup 在 vite 中发挥了哪些作用
一、 生产环境下的 Bundle
1. css 压缩，如果某个异步模块引入了css 代码，vite 会将这些css 抽取出来做为单独的文件使用
2. 自动预加载，为chunks 添加预加载属性，<link rel="modulepreload">，提前下载好资源
3. 异步chunk 加载优化

二、 兼容插件机制
采用 Plugin Container 来管理插件，完全兼容 rollup 的插件