https://yeoman.io/authoring/user-interactions.html

- 安装 yo

npm install yo -g
git init

1. 生成带有 generator 名字的仓库，files 属性必须是生成器使用的文件和目录的数组,如 generator-name

```json
{
  "name": "generator-name",
  "version": "0.1.0",
  "description": "",
  "files": ["generators"],
  "keywords": ["yeoman-generator"],
  "dependencies": {
    "yeoman-generator": "^1.0.0"
  }
}
```

2. 目录格式

```
├───package.json
└───generators/
    ├───app/
    │   └───index.js
    |   └───templates
    └───router/
        └───index.js
```

3. 扩展生成器
   index.js

```js
const Generator = require('yeoman-generator')
module.exports = class extends Generator {}
```

4. npm link 或 yarn link

5. 新建项目
   yo name

6. 主要的工作在建立 templates，以及配置的扩展生成器
