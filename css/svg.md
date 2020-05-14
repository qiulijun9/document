# svg 是一种矢量图形格式

优点:

1. 尺寸更小,压缩性更强
2. 相对于.jpg,.png 等更省时间和空间
3. 任意缩放,不管什么分辨率下都能保证很好的视觉输出
4. 支持透明度,可修改颜色,来改变 svg 的颜色
5. 可设置动画

缺点

1. svg 设计变得复杂
2. 浏览器兼容不好
3. 渲染成本较高

## 直接在 html 中引入 svg

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
   <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
</svg>

## 改变颜色

fill： 通过设置 fill 属性的颜色，来改变 svg 的颜色
如果设置 fill:currentColor 会默认继承父元素的颜色
fill: url(#lineGradient) 设置渐变色

## 标签

<use> : 使用 url 引入一个<svg>,具有唯一 id 属性的重复元素, xlinkHref 用 symbol 的 id
<g>: 把相关元素进行组合的容器,对元素进行分组,内容会直接显示
<symbol>: 用来定义图形模板对象(就是不显示的内容),可以使用多次,symbol 元素本身不呈现,只有当引入<use>的时候才展示,区别于<defs> 是能够创建自己的视窗，所以能够应用 viewBox(设置图片的大小)和 preserveAspectRatio(纵横比)属性.
<defs>可以定义我们不想直接显示的内容。

## 生成 svg 插入到 body

document.body.insertAdjacentHTML("afterbegin", svgMap);
insertAdjacentHTML(position,text): 将 html 插入到 body 之前
position
. 'beforebegin'：元素自身的前面。
. 'afterbegin'：插入元素内部的第一个子节点之前。
. 'beforeend'：插入元素内部的最后一个子节点之后。
. 'afterend'：元素自身的后面。

## svg 形状:

矩形 <rect>
圆形 <circle>
椭圆 <ellipse>
线 <line>
折线 <polyline>
多边形 <polygon>
路径 <path>

# png

优点

1. 支持透明度
2. 适合展示 logo
3. 适合图像包含文字的
4. 输出不会存在锯齿边缘

缺点:

5. 没有动画
6. 大型图片,文件大小会增加,png 的体积较大

png-8 和 png-24 png-8 的体积较小,可能会造成损耗,按需使用

# jpeg

优点

1. 适合高色彩的摄影图像,首页或者 Banner 的图片会用到
2. 很好的兼容性
3. 适合较大的图片

缺点

1. 压缩之后会损坏
2. 不支持透明度
3. 会出现锯齿边缘
4. 不支持动画

# base64

1. 文本文件
2. 是一种编码方式
3. 小图片做处理,图片尺寸小的,比如搜索中的小图标
4. 不同发起请求,浏览器会自动解码出图片

# webp

优点:

1. 支持色彩丰富的图片
2. 支持透明
3. 可以显示动态图片

缺点:

1. 兼容性不好

# CDN

CDN 主要是用来存放静态资源的.不需要业务计算的资源.
一般会把静态资源和主页面放在不同的域名之下,是为了不频繁的携带 cookie.
