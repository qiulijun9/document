# svg 是一种矢量图形格式
优点:
1. 尺寸更小,压缩性更强
2. 相对于.jpg,.png 等更省时间和空间
3. 任意缩放,不管什么分辨率下都能保证很好的视觉输出
4. 支持透明度,可修改颜色,来改变svg的颜色
5. 可设置动画

缺点
1. svg 设计变得复杂
2. 浏览器兼容不好

## 直接在html 中引入svg
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
   <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
</svg>

## 改变颜色
fill： 通过设置fill 属性的颜色，来改变svg的颜色
如果设置fill:currentColor 会默认继承父元素的颜色
fill: url(#lineGradient) 设置渐变色

## 标签
<use> : 使用url 引入一个<svg>,具有唯一id属性的重复元素, xlinkHref 用symbol的id
<g>: 把相关元素进行组合的容器,对元素进行分组,内容会直接显示
<symbol>: 用来定义图形模板对象(就是不显示的内容),可以使用多次,symbol 元素本身不呈现,只有当引入<use>的时候才展示,区别于<defs> 是能够创建自己的视窗，所以能够应用viewBox(设置图片的大小)和preserveAspectRatio(纵横比)属性.
<defs>可以定义我们不想直接显示的内容。

## 生成svg 插入到body
document.body.insertAdjacentHTML("afterbegin", svgMap);
insertAdjacentHTML(position,text): 将html 插入到body 之前
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
2. 适合展示logo
3. 适合图像包含文字的
4. 输出不会存在锯齿边缘
缺点:
1. 没有动画
2. 大型图片,文件大小会增加

# jpeg
优点
1. 适合高色彩的摄影图像
2. 很好的兼容性
3. 适合较大的图片

缺点
1. 压缩之后会损坏 
2. 不支持透明度
3. 会出现锯齿边缘
4. 不支持动画