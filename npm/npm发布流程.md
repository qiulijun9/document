# 创建项目

npm init

- 根据提示创建,会生成 package.json 文件

# 完善自己要发布的内容

- 必须要有一个 index.js 文件 index.js 中需要抛出使用的变量
- 需要清晰的 README.md 文档,告诉使用者如何使用

# 关联远程 git 仓库

- eg:git remote add origin github.com/qiulijun9/react-message-intl.git

# 注册 npm 账号

- https://www.npmjs.com/signup

# 发布之前设置

- npm config set registryhttp://registry.npmjs.org

# 登录 npm

- npm login
- 输入 username password Email

# 发布

- npm publish

# 发布完成之后,如果还想回到之前的 cnpm,使用下面的命令

- npm config set registry https://registry.npm.taobao.org

# 创建一个案例,引用刚上传的包

新建一个项目,引入刚发布的包,测试使用

# lerna

https://lernajs.bootcss.com/

lerna 是一个工具，优化了 git 和 npm 多包管理的工作流
每一个文件下都是一个独立的 npm 包。需要 lerna.json 和 packages 文件夹管理各个包

Lerna 中的两个主要命令是 lerna bootstrap 和 lerna publish。

bootstrap 会将仓库中的依赖项链接在一起。 publish 将有助于发布任何更新的软件包。

通过配置 lerna.json ,来确定发布时包的版本是固定模式还是独立模式
