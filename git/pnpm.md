# https://cloud.tencent.com/developer/article/1555982

# https://juejin.cn/post/6932046455733485575

pnpm 是 node 包管理工具，同 npm 和 yarn 并无区别

# 特点：

1.  包安装速度快

2.  磁盘利用率极高
    pnpm 内部使用基于内容寻址的文件系统来存储文件的，所以它不会安装重复的包，不同版本的包也会更大程度上复用之前的版本
3.  支持 monorepo
    monorepo 用一个 git 仓库管理多个字项目
4.  安全性高

# 安装：

npm i -g pnpm

# 使用 pnpm 安装的包的目录结构

1. 只会安装 package.json 下的包
2. 安装的包的 node_modules 下并无包，存的是该包的一个软链接
3. 安装的依赖是存到了.pnpm 中对应包名的 node_modules 中，其 node_modules 中也是存的软链接
