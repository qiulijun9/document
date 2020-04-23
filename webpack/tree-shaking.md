 # webpack 在打包的时候怎么剔除不用变量和方法:
  webpack 打包在使用mode:production,会自动压缩代码，启动Tree-Shaking，但必须用ES6module才能生效（因为ES6module是静态引入）

  # Tree-Shaking 原理
  Tree-Shaking本质是消除无用代码
  无用代码：
  1. 定义没有使用的代码
  2. 永远不执行的代码
  3. 代码执行结果不会被用法的

  利用ES6module模块的编译时运行的特性，Tree-Shaking进行可靠的静态分析。
  从入口文件出发，就是将所有的代码打包到一个作用域下，遍历整个作用域，判断哪些变量、函数未使用或者引用，然后删除无用代码

  缺点：
   只能处理函数和顶层的import/export 变量
   不能清除未使用的类，js动态语言使得静态分析的时候有困难