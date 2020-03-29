# http1.0

http1.0 规定浏览器与服务器只保持短暂的连接
连接无法复用，每次请求都需要经历三次握手和慢启动
head of line blocking 会导致带宽无法被充分利用，后续健康请求被阻塞

# http1.1

http1.1 和 http1.0 的区别：

1. 缓存处理，多了（entity tag,If-Unmodified-since,If-Match,If-None-Match）等缓存信息
2. 宽带优化及网络连接的使用：http1.0 存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功能允许只请求资源的某个部分，返回码是 206
3. 错误通知的管理，在 HTTP1.1 中新增了 24 个错误状态响应码，如 409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除。
4. Host 头处理，请求消息和响应消息中都支持 Host 头域，且请求消息中如果没有 Host 头域，会报 400 错
5. 长连接：默认开启 connection：keep-alive，弥补了 http1.0 每次请求都要建立连接的缺点

# http2.0

HTTP2.0 和 HTTP1.X 相比的新特性：

1. 支持二进制传送，实现方便且健壮。
2. 支持多路复用，即连接共享，
3. 采用 HPACK 压缩算法，压缩头部，减小传输的体积
4. 支持服务端推送

# http3.0

http3.0 有望引入谷歌主导开发的 QUIC 协议（快速 UDP 网络连接）。QUIC 放弃了 TCP，而使用了同级的 UDP 协议做传输层。

# https

https 和 http 区别：

1. https 协议要用到 CA(电子身份认证) 申请证书，一般免费证书很少，需要交费
2. http 协议运行在 tcp 之上，传输的内容是明文。https 运行在 SSL/TLS 之上，传输的内容都经过加密。
3. https 可以有效的防止运营商劫持，解决了防劫持的问题
4. 使用完全不同的连接方式，端口也不一样，前者 80，后者 443

SSL：安全套接字层，处于 OSI 七层网络模型中的的传输安全层，1999 年 被更名为 TLS

TLS 由记录协议，握手协议，警告协议，变更密码规范协议，扩展协议等几个子协议组成，综合使用了对称加密，非对称加密，身份认证等