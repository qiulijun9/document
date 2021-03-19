yarn 和 npm 都是利用 packagae.json 来拉取依赖。但 package.json 的版本号不明确，是在一个范围，所以一在安装时版本可能不一。yarn.lock 用来记录版本，保证版本统一。

## npm 缺点

1.  npm 安装时间久
2.  npm 不同机器下载时版本可能不同

# yarn 优点

1. 并行安装， 安装速度快
2. 离线安装，如果安装过，就从缓存中获取，不用从网络中下载了
3. 安装版本统一，通过 yarn.lock 文件，记录了安装模块的版本号，保证每个人下载的版本相同 ß
4. 更简洁的输出，只会打印出关键的信息，不会打印所有安装的依赖的信息，更清晰

## yarn 和 npm 对比

| npm                         |         yarn          |
| :-------------------------- | :-------------------: |
| npm install                 |         yarn          |
| npm install react --save    |    yarn add react     |
| npm uninstall react --save  |   yarn remove react   |
| npm install ract --save-dev |  yarn add react--dev  |
| npm update --save           |     yarn upgrade      |
| npm install react -g        | yarn global add react |

yarn global bin
echo \$PATH 显示环境变量(变量名为 PATh)的

yarn 全局安装找不到,解决方案
将 yarn global bin 的路径,添加到全局配置中

```js
export PATH="$PATH:`yarn global bin`:$HOME/.config/yarn/global/node_modules/.bin"
```

## yarn / npm install 原理

1. 将包的版本区间解析为某个具体的版本号
2. 下载该版本号对应的 tar 包到本地离线镜像
3. 把依赖从本地离线镜像解压到本地缓存
4. 把解压后的文件拷贝到 node_modules 下
5. 生成.lock 文件

## 缺点：

1. 依赖的结构是树型的，依赖层级过多导致，文件路径过长
2. 会下载重复的包，文件体积过大
3. 模块实例不能共享
