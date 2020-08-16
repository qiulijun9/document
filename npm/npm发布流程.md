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
