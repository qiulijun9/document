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
2. rem 是相对于根元素的 html 的字体大小来计算尺寸的,不依赖父元素计算

- zcool 采用的是引用外部 js <script src="https://m.zcool.com.cn/static/hd.min.js" async></script>文件
  会根据你传的<meta>的属性，计算一个根元素的的 font-size 值，为 37.5px
  此时 1rem = 37.5px, 2em = 75px , 14px ~ 14/37.5 = 0.37333rem

%
以父级的宽度为准
例父级 width: 200px，则子级 width: 50%;height:50%;为 width: 100px;height: 100px;

vw,vh
基于视口的宽度和高度(不包括地址栏和工具栏)

vmin,vmax
vmin 为当前 vw,和 vh 中较小的一个值, vmax 为两个中较大的一个值
