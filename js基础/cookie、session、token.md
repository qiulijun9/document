http 是无状态协议，服务器与浏览器为了进行会话跟踪，就必须的主动维护一个状态，这个状态需要通过 cookie 和 session 实现。

cookie:
是服务器发送到浏览器并保存在本地的一小块数据，它会在浏览器再次访问同一服务器，在请求中携带过去（cookie 是不可跨域的），是浏览器保存用户信息的一种机制，用来记录用户的一些信息。

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

session:
是记录服务器和客户端会话状态的机制,session 是基于 cookie 实现的，session 存在服务端，sessionID 会保存在浏览器的 cookie 中

cookie 和 session 的区别：

1. 安全性：session 比 cookie 更安全，session 存储在服务器端，cookie 存储在浏览器端。
2. 存取值的类型不同：cookie 只支持字符串，session 可以设置任意类型
3. 有效期不同：cookie 可设为长时间保持(可以设置有效时间)，session 一般会有失效时间
4. 存储大小不同：cookie 存储的数据不能超过 4k,session 可存的数据远远高于 cookie，访问量过多时，会占用服务器资源

# token

访问 api 时所需要的凭证
简单 token 的组成：uid（用户唯一标识）+time（当前时间戳）+sign(签名)
用户名和密码发送请求---程序验证----返回一个签名生成 token 给浏览器---浏览器存储 token，发送请求带着在请求头 Authorization 带着 token---- 服务端验证 token

特点：
服务端无状态化，可扩展性好
支持移动端设备
安全，可以避免 csrf 攻击
支持跨程序调用
