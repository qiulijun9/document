# px em rem 区别

px
绝对长度单位,相对于屏幕分辨率来的,兼容性好

em
em 的值不固定
会继承父元素字体的大小,
默认浏览器字体是 16px,1em = 16px
计算比较复杂,一般会重写 html { font-size: 62.5%; }
rem
相对长度单位
1rem = 16px

1. rem 单位可谓集相对大小和绝对大小的优点于一身
2. rem 是相对于根元素来计算尺寸的,不依赖父元素计算

%
以父级的宽度为准
例父级 width: 200px，则子级 width: 50%;height:50%;为 width: 100px;height: 100px;

vw,vh
基于视口的宽度和高度(不包括地址栏和工具栏)

vmin,vmax
vmin 为当前 vw,和 vh 中较小的一个值, vmax 为两个中较大的一个值
