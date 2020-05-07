http 是无状态协议，服务器与浏览器为了进行会话跟踪，就必须的主动维护一个状态，这个状态需要通过 cookie 和 session 机制来实现。

cookie:
是服务器发送到浏览器并保存在本地的一小块数据(存储在浏览器端)，它会在浏览器再次访问同一服务器，在请求中携带过去（cookie 是不可跨域的），是浏览器保存用户信息的一种机制，用来记录用户的一些信息。
cookie 是一个变量如:name =value,存储正在http header 中,如果要保存大量的信息,就要消耗大量带宽和资源,所以引入了session

cookie 的过期时间：
可以通过expires 设置cookie 的过期时间，如果不设置的话，默认是临时存储的，浏览器进程关闭就自动销毁

cookie 怎么设置的：

1. 客户端发送 http 请求到服务端
2. 服务端收到请求时，设置 set-cookie 字段
3. 浏览器收到响应后保存 cookie 字段
4. 浏览器在之后的每次请求中都会携带 cookie

cookie 用于以下三个方面:

1. 回话状态管理
2. 个性化设置
3. 浏览器行为跟踪

cookie 属性：
expires:过期时间
maxAge：date.now 毫秒数，在设置 cookie 失效之前需要经过的毫秒数
path:可以访问的页面路径
domain:域名
httpOnly: 默认 false ,true 表示只有服务器端能访问
secure:默认 false,true 表示只有 http 才能访问
sameSite：可以让 cookie 在跨站请求时不会被发送，阻止 CSRF 攻击
属性： none 允许携带 cookie
lax 不允许携带 cookie,但是通过 a 连接可以携带
strict 不允许携带 cookie，通过 a 顶层链接也不可以

# session:
可以存在不同地方.(数据库,磁盘,服务器)
是记录服务器和客户端会话状态的机制,session 是基于 cookie 实现的，session 存在服务端，sessionID 会保存在浏览器的 cookie 中,session 中可以保存一些比较多的用户信息,如果只用cookie 会不安全和浪费资源
 session 像一种数据结构.

## session 何时销毁？
当浏览器关闭时并没有立即销毁，等到timeout 到期才销毁这个session.
关闭浏览器只清除了和原回话的cookie,再次打开浏览器时，无法发送cookie,服务端会认为这是一个新的会话

## session 的过期时间
如果session一直活动，session就不会过期，后端可以设置过期时间，是从session 不活动开始计算过期时间，默认是30分钟

## cookie 和 session 的区别：

1. 安全性：session 比 cookie 更安全，session 存储在服务器端，cookie 存储在浏览器端。
2. 存取值的类型不同：cookie 只支持字符串，session 可以设置任意类型
3. 有效期不同：cookie 可设为长时间保持(可以设置有效时间)，session 一般会有失效时间
4. 存储大小不同：cookie 存储的数据不能超过 4k,session 可存的数据远远高于 cookie，访问量过多时，会占用服务器资源

# 同域/跨域 ajax 请求会不会携带cookie
  fetch 在同域或者跨域,默认是都不会携带cookie,只有设置了credentials,才会携带cookie,服务端设置Access-Control-Allow-Credentials响应头
  ajax/jQuery 在同域的时候会携带cookie,在跨域的时候需要设置withCredentials  和服务端响应头

  fetch 携带cookie
  fetch(url,{
      credentials:"include"//include:跨域携带cookie ,same-Origin:同域携带cookie,omit :任何情况不携带cookie
  })

  axios 设置 withCredentials
  axios.get('http://server.com', {withCredentials: true})
# token

访问 api 时所需要的凭证,本质上同sessionId没有区别,
简单 token 的组成：uid（用户唯一标识）+time（当前时间戳）+sign(签名)

1. 用户名和密码发送请求---程序验证----返回一个签名生成 token 给浏览器
2. 浏览器存储 token(存储在localStorage,sessionStorage中)
3. 发送请求带着在请求头 Authorization 带着 token
4. 服务端验证 token

特点：
长度没有限制,得加密,可发可不发
服务端无状态化，可扩展性好
支持移动端设备
安全，可以避免 csrf 攻击
支持跨程序调用

# JWT(Json web token ) token
解决无 session 机制.服务器端不需要维护session.
原理:当需要网站/API认证时,服务器认证后,生成一个JSON 格式的对象,发送给浏览器端.可以存储在localStorage 或是cookie 中
此后,浏览器和服务器端通信都使用jwt,放在 HTTP 请求的头信息Authorization字段里面。

JWT分为三个部分，header（头部） payload （负载） signature （签名）
header: type和加密算法,用base64 转码  header = '{"alg":"HS256","typ":"JWT"}'
payload: 设置用户信息,session 信息,用base64 转码
signature: 把前两个用加密算法(一般是sha256)重新加密,确保令牌是不可解密的.
优点:
服务器无需从数据库验证信息,只需要在服务器本地验证(验证jwt是否一致,和session 是否过期)就可以了,提高了性能

缺点:
1. 设置请求头,会占用很多空间,耗费很多流量,请求头设置越多,就比传统的会话慢很多.
2. 认卡不认人,一旦被窃取,很难保证安全.无法立即重新设置过期时间,只能等待过期


用处:
1. 移动应用app/ 单页面应用
2. 跨伺服器的资源请求,微服务

jwt token 截获了怎么处理:
1. 一般配合https 一起使用,放在请求头部
2. 不要存敏感信息，适合一次性的命令认证