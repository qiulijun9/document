# 消耗性能即浏览器解析这些属性需要花费大量的计算时间
计算量大：border-radius,box-shadow,filter,:nth-child
时间长：动画 transition, animation

# css 性能优化
1. 压缩css文件，如webpack
2. 优化css文件，如提取公共样式，删除无用的css
3. 尽量不要使用嵌套过多的复杂计算器
4. 内联首屏关键css,使用loadcss 加载外联样式
5. 尽量不要使用@import,因为会影响浏览器的并行加载，多个import会导致下载顺序被打乱
5. 优化重流和重绘