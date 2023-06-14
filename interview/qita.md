#  单页应用和多页应用的区别
单页应用是相对于多页应用来说的，
多页应用在每次页面跳转时经历了以下几个阶段：
1. 发出新页面的http请求
2. 服务端接收到请求，响应html
3. 浏览器开始构建dom,cssom
4. 加载静态资源
5. 渲染页面

单页应用在渲染页面时只需经历以下两个阶段：
1. 发起新页面的静态资源请求
2. 新页面资源加载完成后，渲染对应的内容

单页应用由浏览器控制路由变化，减少了http 请求，提高页面的渲染速度

# hash路由 和 history路由 的区别

hash 路由
1. 是通过 # 来标记的路由，也就是 url 的描点来标记
2. 浏览器通过 hashChange  来监听路由的改变
3. 使用hash的方式兼容性好 ，ie8 之前的也可以用
4. 当页面强制刷新时 还能保持在该页面

history 路由
1. history 通过window.history  pushState和，replateState 等API 来替换路由
2. 兼容性较差
3. 页面强制刷新时，要走一遍服务端请求，查看当前url是否存在，想要刷新之后页面资源还在，就需要服务端和浏览器端同步


# package.json 中的main 和module,type
main :代表模块加载（或npm） 的入口文件 ，require 中的引入的模块是通过该文件的 module.exports 导出的，browser 环境和 node 环境均可使用
module: 定义 npm 包的 ESM 规范的入口文件,browser 环境和 node 环境均可使用
browser : 定义 npm 包在 browser 环境下的入口文件

早期的node 只支持commonJS模块，，不过在nodejs版本13.2.0中，node正式支持ES Modules模块化，
需要在package.json 中定义 type: "module"
type: "module"


```js
  "main": "lib/index.js",  // main 
  "module": "lib/index.mjs", // module

  // browser 可定义成和 main/module 字段一一对应的映射对象，也可以直接定义为字符串
  "browser": {
    "./lib/index.js": "./lib/index.browser.js", // browser+cjs
    "./lib/index.mjs": "./lib/index.browser.mjs"  // browser+mjs
  },

  // "browser": "./lib/index.browser.js" // browser
```
package.json 的入口文件指定可以有：
1. main
2. module
3. browser
4. browser + cjs
5. browser + mjs



# git merge 和git rebase 有何区别
都是在合并分支时使用的命令

git merge
1. 历史记录是非现象的有可能会有很多个分叉
2. 当一个分支合并到另一个分支时，会保留原有分支的提交历史
3. 合并时会创建一个新的提交



git rebase 
1. 提交的信息后历史记录保持线性的，
2. 当一个分支合并到另一个分支时不会保留原有分支的提交历史，rebase 会将整个分支移动到另一个分支上，有效地整合了所有分支上的提交
3. 有可能会造成代码丢失

# 如何获取网站的FCP 和 TTI 时间

对于 FCP，通常可以通过 Performance API 的 performance.getEntriesByType('paint') 方法获取首次渲染相关的性能数据，然后查找 first-contentful-paint 指标的时间戳。


对于 TTI，通常需要通过 JavaScript 代码模拟用户的交互行为，比如点击按钮、输入内容等，然后在相应的事件处理函数中，使用 Performance API 的 performance.now() 方法记录时间戳，直到页面变得可交互为止。一般来说，页面变得可交互的标准是当用户可以进行主要的交互操作，比如点击按钮、输入内容、滚动页面等。

白屏时间new Date.getTime() - performance.timing.navigationStart