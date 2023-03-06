# 状态码 常用

200 成功
301 永久重定向
302 临时重定向
304 命中协商缓存
400 客户端发送的报文中存在语法错误
401 没有权限
403 服务器禁止访问该资源
405 服务器禁止改请求方式访问
404 资源加载错误
401 没有权限
500 服务器内部错
502 网关或代理服务器出错
504 请求超时


# http 2 特点 和 cdn 有什么关系

1. 多路复用,单个了连接可以并行进行请求和响应，解决队头阻塞的问题
2. 二进制帧协议传送,正因为二进制流才可以多路复用，因为每个帧都有标识属于哪个流，多个帧组成一个流
3. 头部压缩，减少传输的体积
4. 服务端推送，服务器会向浏览器推送与这个请求相关的资源，服务器可以缓存资源

cdn 支持 http2,可以在很大程度上缓解传输压力
如果存在 cdn 缓存，当本地缓存过期之后，会先向最近的 cdn 缓存进行查找，如果 cdn 缓存也过期，就会像源站点发出请求返回新的资源。

# 同源站点间的通信

1. localStorage
2. BroadCast Channel 广播通信
   const bc = new BroadcastChannel('AlienZHOU');
   通过 bc.onmessage() 来监听，bc.postMessage() 发送数据

3. Service Worker 长期运行在后台的 worker
   监听消息 navigator.serviceWorker.addEventListener('message', function (e) {})
4. window.open
5. Websocket

# 输入 url 到页面渲染

1. 浏览器缓存

## 缓存

缓存分为强制缓存和协商缓存

强制缓存：不需要向服务端发送请求，直接是读取本地存储，也不需要域名解析和 tcp 链接，强制缓存在 http 中的状态码是 200
主要通过 Expires,Catch-Control,Pragma 几个属性来控制
Expires :过期时间，会根据系统时间和 Expires 来判断是否过期，但是系统时间有可能不准确（本地时间）
Catch-Control :

- max-age:单位是秒，是指从请求发起到缓存失效的时间，指强缓存失效的时间
- no-catch:使用协商缓存，需要询问服务端缓存是否有效，有效返回 304，无效返回新的资源
- no-store: 不使用缓存
- public: 响应可以被中间代理，cdn 等去缓存
- private: 个人缓存，中间代理，cdn 不允许缓存

Pragma:no-catch 同 catch-control 的 no-catch 一样，不使用强制缓存

协商缓存：在没有命中强制缓存的情况下会走协商缓存
在请求头设置了 if-Modified-Since 或 if-None-Match 时，服务端会查看是否命中缓存，命中会返回 304，并在响应头设置 Last-Modified 和 ETag 属性

Last-Modified/if-Modified-Since:代表文件的过期时间，在第一次请求时，服务端会在响应头中设置 Last-Modified。在第二次请求时浏览器会携带 if-Modified-Since 为上次服务端返回的响应值。服务端会根据最后修改时间 If-Modified-Since 做对比，如果相同就返回 304，不同则返回新资源
ETag/if-None-Match : 代表文件的唯一 hash 值，只有文件发生改变的时 hash 值才会改变

2. 域名解析
   查看是否有缓存，如果有缓存直接使用缓存中的 ip 地址
   由于数据包是通过 ip 地址传给对方的，所以需要域名解析。域名解析就是把域名解析成 IP 地址的过程
   浏览器提供了 DNS 数据缓存功能，如果域名已经被解析过，就不用再进行域名解析，会直接使用缓存里的
3. 建立 tcp 连接

- 三次握手： 确认客户端和服务端的接收和发送能力都正常
- 发送数据：接收端在接收到数据之后必须向发送端发送确认信号来保证数据没有丢包
- 四次挥手： 通过四次挥手来断开连接

4. 发送 http 请求
   请求包括：请求行，请求头，空行，请求体
   常见的请求头包括：
   Cache-Control, Expires,if-Modified-Since,Accept,Accept-Encoding,Accept-Language,Connection,Cookie,Host

   发送请求到服务端之后，服务端会给予响应，响应包括：响应行，响应头，响应体

   http1.0
   短连接
   http1.1

   - 长连接
   - 缓存的头部字段
   - 宽带优化及网络连接的处理
   - 错误通知管理，新增了错误状态码
   - host 头处理

   http2.0

   - 支持二进制传送
   - 多路复用
   - 支持服务端推送
   - 头部压缩

5. 渲染页面
   - 构建 dom 树
     利用 token 解析成 dom 树 挂载到 document 上
   - 构建 CSSOM 树
     收集 css 规则 style 标签中的样式，内敛样式，外部引用的样式，给 dom 节点添加样式信息
   - 生成渲染树
     给 dom 树添加位置信息
   - 建立图层
     每层中样式的绘制不会影响到其他层
   - 分块 生成绘制列表
     生成图块
   - 栅格化
     把图块转成位图的过程
   - 展示
6. 断开连接



