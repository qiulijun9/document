babel:解析 ES6 语法到 ES5 语法，满足浏览器的兼容性,只解析语法，不管新的 API,不处理模块化

# 环境搭建 基本配置

安装 @babel/cli @babel/core @babel/plugin-transform-runtime @babel/preset-env

配置.babelrc 文件

```
{
  "presets": ["@babel/preset-env"]， //包含了很多常用的plugin
  "plugins":[]
}
```

编译： npx babel ..

# babel-polyfill

core-js 标准的库，所有 ES 新语法的 polyfill(补丁) 的集合
regnerator 是 generator 函数的 polyfill 库
babel-polyfill 是 core-js 和 regnerator 的集合。Babel 7.4 之后弃用，推荐直接使用 core-js 和 regnerator，
缺点： 会污染全局环境，在 babel-runtime 中配置解决

配置按需引入：
配置.babelrc 文件

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
}
```
