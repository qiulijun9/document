# 3 次握手 4 次挥手

3 次是最安全的次数，2 次不安全，4 次浪费资源

3 次握手：
客户端发送数据包到服务器 ------ 服务器收到请求后给与响应 ------ 客户端会再发送 请求连接成功

## tcp 连接能发几个 http 请求

http.1.0 不支持长连接，每次请求发送完毕，连接就会断开，所以只能发送一个 http 请求。
http1.1 支持长连接，只要 tcp 连接不断开，就一直能发请求,持续不断，没有上限
http2.0 支持多路复用，可以并发多个 http 请求，也支持长连接，连接不断，就能一直发送 http 请求

https 之所以能保障数据安全传输，是在 http 下面增加了一层 SSL/TLS 协议。

SSL：安全套接字，在发展到第三个版本的时候成为 TLS

现在主流的是 TLS/1.2，之前的 TLS1.0、TLS1.1 都被认为是不安全的，在不久的将来会被完全淘汰。

# 传统的 RSA 握手过程：

通过对称加密+非对称加密+数字证书一起实现

第一次握手：浏览器发送 client_random，和加密方法给服务器，
第二次握手：服务端发送 server_random,加密方法，数字证书给浏览器
第三个握手：浏览器验证数字证书通过后生成 pre_random,在把 server_random,client_random,pre_random,一起通过公钥加密生成一个随机数。发送给服务端，服务器通过私钥解密获得该随机数。之后的传输都使用这个随机数进行加密解密。

# TLS1.2 握手过程

第一次握手：浏览器发送 client_random,TLS 版本，加密套件列表给服务器，
第二次握手：服务器发送 server_random,确认 TLS 版本，使用加密套接列表，证书
第三次握手：浏览器通过 server_params 和 client_params 通过 ECDHE 算法计算出 Pre_random,用 client_random、server_random 和 pre_random，这三个数通过一个伪随机数函数来计算出最终的 secret。
服务端通过 ECDHE 算法计算出 pre_random，计算出 secret

# TLS 1.3 改进

1. 强化安全
   对称加密剩下 AES 和 CHACHA20 ，分组模式剩下 GCM,POLY1305，哈希摘要算法剩下，sha256,sha384,之前的 RSA 非对称加密算法不在了
2. 提升性能
   服务端不必等待对方验证证书之后才拿到 client_params，而是直接在第一次握手的时候就能够拿到, 拿到之后立即计算 secret
