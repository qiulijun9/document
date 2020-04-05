post 和 get 区别：

1. 缓存： get 请求会被浏览器主动缓存下来，留下历史记录。post 不会
2. 编码： get 只能接收 url 编码，只能接收 ASCII 字符，post 没有限制
3. 参数： get 请求放在 url 中，不安全，post 放在请求体中，比较安全
4. tcp: get 只会发一个请求报文，post 会发两个数据包先发 header 部分，如果服务器响应再发 body 部分

# Accept(分为发送端和接收端)

数据格式:
Content-type/Accept :
.text:text/html,text/plain,text/css
.image:image/gif,image/jpeg,image/png
.audio/video:audio/mpeg,video/mp4
.application: application/json,application/javascript,application/pdf,application/stream

压缩方式：
Content-Encoding/Accept-Encoding:
gzip/deflate/br

支持语言：
Content-Language/Accept-Language:
zh-Cn,zh,en

支持字符：
Content-Type/Accept-Charset:
utf-8
