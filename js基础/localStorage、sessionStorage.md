https://juejin.im/post/5cce69c56fb9a0321e16b343

locaStorage 和 sessionStorage 相同点：

1. 存储大小大概在 5M 左右
2. 都有同源策略限制，跨域无法访问
3. 都保存在客户端，不参与服务端通信
4. 以 key 和 value 的方式进行存储

不同点：

1. locaStorage 存储在本地，除非手动清除，否则一直在
   sessionStorage: 仅在当前回话下有效，关闭页面或浏览器后就会清除
2. locaStorage：在同一个浏览器内，同源文档之间共享 localStorage 数据，可以互相读取、覆盖、清除(同浏览器限制、同源限制)

sessionStorage 的作用域还被限定在了窗口中，也就是说，只有同一浏览器、同一窗口的同源文档才能共享数据(同浏览器限制、同源限制、同标签页限制)

3.操作方法：
setItem(key,value)
getItem(key)
removeItem(key)
clear()


