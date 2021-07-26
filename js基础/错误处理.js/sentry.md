# 解决问题

兼容性问题
问题反馈不及时，bug 难以复现
线上问题着急处理

# 异常监控的意义

1. 实时感知
   实时感知线上问题
2. 主动聚焦
   具备错误定位，行为还原，帮助快速解决问题
   收集静态资源，接口响应等性能数据，定位性瓶颈，提高用户体验

3. 预测分析
   各维度的埋点及热力分析

## 异常监控核心问题

1. 异常采集 -采集内容：
   用户信息: 用户登录时的基本信息及权限
   用户行为: 用户点击出错的也页面路径，执行的操作
   异常信息: 异常级别，异常类型，代码错误等
   环境信息：出错的浏览器环境，版本，系统版本，接口等

2. 数据存储
   后端存储

3. 统计分析
   提供可视化的异常分析的面板

4. 报告告警
   告警方式：邮件，短信？

## 常见的异常错误

1. js 运行时错误
   EvalError :在 eval() 中发生错误
   InternalError: 递归卡死会发生该错误
   RangeError:超出数字范围错误，如数组越界..
   ReferenceError: 引用错误 ，如变量没定义
   SyntaxError:语法错误，
   TypeError:类型错误
   UrlError:在 encodeUrl() 中发生的错误

2. 网络加载错误
   link,script,img,css 等加载异常

3. http 请求错误
   400 ，500

## 常见的异常捕获的方式

1. try-catch
   缺点：只能捕获同步代码块的错误，无法捕获代码语法错误，和异步错误

2. window.onerror = (message,source,lineno,colno,error)=>{} 全局捕获
   特点：

   - 可以捕获同步和异步代码块中的错误，建议写在最前面
   - 可以阻止事件去冒泡（return /true/false）

     缺点： 无法捕获跨域,资源加载错误，API 等错误,兼容性问题

3. window.addEventListener("error") 全局捕获
   特点：

   - 可以捕获资源加载错误
   - 可以捕获运行时错误

   缺点：无法阻止事件冒泡

4. window.addEventListener("unhandlerejection") 异步异常
   当 Promise 被 reject 处理器的时候会触发 unhandlerejection
5. iframe 异常
6. 网站崩溃和卡死
   页面加载时会触发：window.addEventListener("load")
   当浏览器窗口关闭或者刷新时，会触发 beforeunload 事件 :window.addEventListener("beforeunload")
   Service Worker :发心跳监控
7. 第三方库异常捕获

# 错误上报

1. 发请求存储到服务器
2. navigator.sendBeacon
3. IndexDB 缓存，异步上传
4. 页面截图 html2canvas

# SourceMap

- 什么是 sourceMap
  SourceMap 是一个信息文件，里面存储着代码的位置信息

- sourceMap 格式

```js
{
   version:3,  // Source Map的版本
   file:"min.js",//  转换后的文件名
   names:["foo","bar"], // 转换前的属性和变量名
   sources:["one.js","two.js"], // 转换前的文件，可能是一个或多个文件集合
   sourceRoot:"http://...", // 转换前的文件路径
   mappings:"CAAC,IAAI..." // 记录位置信息的字符串

}
```

- mappings 采用 base 64 VIQ 编码

  AAAAA
  第一位:表示转换后代码的第几列
  第二位:表示转换后 sources 属性中的哪一个文件
  第三位:表示转换前代码的第几行
  第四位:表示转换前代码的第几列
  第五位表示:属于 names 属性中的哪一个变量。

base64 编码：
文本 ---> ASCII ---> 二进制 ---> 取 6 位 索引 ---> 查表 转成 base64 编码

base64 VIQ 编码：
文本 ---> 二进制 ---> 右边补充符号位--->5 位一组，不够补 0 -->组的顺序颠倒 ---> 每组前补 1，最后一组前补 0 --->查表 转成 base64 编码

# 什么是 sentry

sentry 是一个实时事件日志记录和汇集的平台。它分为客户端和服务端，客户端是你嵌入的应用程序，程序出现异常则会向服务端发送消息，服务保存错误并提供一个可视化的平台。

# 为什么选用 sentry

1. 开源,下载量高，体积小
2. 支持多种语言
3. 提供 scouce Map 能力
4. 可扩展能力，支持多个第三方集成
5. 隐私和安全

# 私有化部署(docker-compose)

- git clone https://github.com/getsentry/onpremise.git
- cd onpremise
- ./install.sh
在执行安装过程中，出现 ./install/\_lib.sh: line 15: realpath: command not found 错误。
解决：https://github.com/getsentry/onpremise/issues/941
<!-- - docker-compose run --rm web config generate-secret-key -->
- 安装 docker-image 需要花费很长时间
- 镜像安装完会提示 docker-compose up -d
- http://localhost:9000/sentry

  https://www.it610.com/article/1289071347372204032.htm

# 接入 sentry

1. 创建项目
   createProject - Browser
   http://localhost:9000/sentry/react-demo/getting-started/javascript-react/
2. 安装 sdk
3. 入口文件中初始化 sentry
4. 集成 source map

```

```
