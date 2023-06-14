# BFC 用途

块级格式化上下文，是一个独立的容器，用于决定块级盒子的布局及影响的范围，
相当于 css 的属性，触发了 bfc 条件会形成  一个具有 bfc 特点的独立容器

BFC 创建：

- 根元素
- 浮动元素 （float 不为 null）
- 绝对定位元素 ( position 为 absolute 或 fixed)
- 有 overflow 且不是 visible 的元素
- 内联元素，表格元素 display：inline-block display：table-cell display:table-captions

BFC 解决的问题：

- 父元素高度塌陷，在正常文档流中父元素如果没高度，需要子元素撑起来，如果子元素设置成了 BFC 就会脱离文档流，导致父元素塌陷
  解决办法

  1.  为父元素设置 overflow:hidden
  2.  利用清除浮动 在浮动元素下添加一个 div 用 clear:both 来清除浮动 或利用伪类来清除浮动

- margin 重叠 ,同属于一个 BFC 的相邻两个 box 会发生 margin 重叠
  解决办法给这个两个 box 外层的父元素设置 BFC
- 清除浮动
  给父元素也设置 BFC,例如给父级元素添加 overflow:hidden 属性
- 自适应两栏布局

# 实现水平垂直居中的方式

1.  绝对定位 + -margin 父元素设置 relative ，子元素设置 position: absolute; left: 50%; top: 50%; margin-left：-元素宽的一半，margin-top: - 元素高的一半

```css
.box {
  width: 200px;
  height: 200px;
  border: 1px solid red;
  position: relative;
}
.children-box {
  position: absolute;
  width: 100px;
  height: 100px;
  background: yellow;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -50px;
}
```

2. 绝对定位 + transform(-50%,-50%)
   父元素设置 relative ，子元素设置 position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);

3. 绝对定位 + top,bottom,left,right = 0 + margin:auto
   父元素设置 relative ，子元素设置 position: absolute; left:0;right:0;top:0;bottom:0; margin:auto;

4. flex 布局  display:flex;align-items:center; justify-content:center
5. grid 布局，父元素设置 display:flex, 子元素设置 margin：auto
6. table-cell 父元素设置 display: table-cell; text-align: center; vertical-align: middle;

# css 重绘，重流

浏览器在渲染阶段会经历 dom 解析，cssOM 解析, 最后合并成 render Tree 就能获取元素在页面上的大小位置，最终绘制出来
什么是回流？
当 render tree 中的一部分元素因为大小，布局，隐藏等改变需要重新构建，称为回流。 相当于将解析和合成的过程重新又走了一篇，开销是非常大的。
什么是重绘？
当 render tree 的元素需要更新属性，这些属性只影响元素外观，风格，不影响布局的，则称为重绘。 跳过了生成布局树和建图层树的阶段，直接生成绘制列表，然后继续进行分块、生成位图等后面一系列操作。

重流一定重绘，重绘不一定重流

会导致重流的一些操作：

1. 页面首次渲染
2. 元素尺寸的改变，位置的改变，内容的改变，常见的几何属性有width、height、padding、margin、left、top、border 等等,
3. 窗口的改变
4. 字体大小的改变
5. dom 节点添加或删除元素
6. 读写 offset族、scroll族和client族属性的时候，浏览器为了获取这些值，需要进行回流操作。
eg: 比如要获取元素的属性高度，需要重流返回真正的布局结构，才能获取该值，比如以下属性和方法：

 - clientTop、clientLeft、clientWidth、clientHeight
 - offsetTop、offsetLeft、offsetWidth、offsetHeight
 - scrollTop、scrollLeft、scrollWidth、scrollHeight
 - getComputedStyle()
 - getBoundingClientRect()

会导致重绘的操作：

1. color ,background-color,visibility 的改变

# 避免回流和重绘？
1. 减少对dom的操作，可以使用createDocumentFragment ，cloneNode 来操作元素，实际不会影响文档结构
2. 尽可能在 dom 树末端改变 css, 使影响范围少一点
3. 避免使用 table 布局，因为 table 布局需要先计算所有元素的大小和位置，然后才能进行布局，这个过程比较耗费性能
4. 对于 resize、scroll 等进行防抖/节流处理
5. 避免使用 calc
6. 使用 transform、opacity （GPU加速） 等css 来替换js 动画效果
- 使用 transform 属性来移动元素，而不是使用 top 和 left 属性，因为使用 transform 不会触发回流，而使用 top 和 left 会触发回流。
7. 虚拟列表
8. 缓存布局信息
缓存布局信息，避免重复计算，可以将计算结果保存在变量中，然后在需要使用的时候直接调用，避免重复触发回流。


# 获取元素的高度的方法

1. offsetHeight
包括元素的高度、边框和滚动条（如果有）
2. clientHeight
包括元素的高度和滚动条（如果有），不包括边框
3. getComputedStyle()
 函数获取元素的计算样式，然后计算高度。
 eg:
 ```js
 const para = document.querySelector("p");
 const compStyles = window.getComputedStyle(para);
 compStyles.getPropertyValue("font-size")
 ```
4. getBoundingClientRect()
getBoundingClientRect（）,每次调用时都会重新计算元素的位置和大小
返回的位置信息是相对于视口（浏览器窗口的）的，不是相对于文档的
getBoundingClientRect（）本身不会触发重流和重绘，但是如果在触发重绘和重流操作之后会立即调用它，来确保返回值是最新的

# 三栏布局
1. 浮动布局 ,左右浮动元素，中间自适应

```css
.left{
  float:left;
	width: 100px;
}
.right{
   float:right;
	 width: 100px;
}
.main{
      margin-left: 120px;
	    margin-right: 120px;
}
```
2. BFC
```css
	.left {
	    float: left;
	    width: 100px;
	}
	.right {
      float: right;
	    width: 200px;
	}	
	.main {
	    overflow: hidden;
	    background-color: green;
	}
```
3. flex
```css
.container {
	display: flex;
}
.left {
	width: 250px;
}
.right {
	width: 250px;
}
.main {
	flex: 1;
	margin: 0 10px;
}  

```
4. 绝对定位
```css
.container {
	    position: relative;
	}
	.main {
	    height: 400px;
	    margin: 0 120px;
	}
	.left {
	    position: absolute;
      left: 0;
	    top: 0;
	    width: 100px;
	    height: 300px;
	}
	.right {
	    position: absolute;
      right: 0;
      top:0;
	    width: 100px;
	    height: 300px;
  }
	  
```

# 两栏布局
1. flex
```css
.container {
  display: flex;
	width: 100%;
	height: 200px;
}
.left {
	width: 200px;
	height: 100%;
}
.right {
	flex: 1;
	height: 100%;
}
```




# css 实现一个三角形

- 利用 border 属性

```css
.triangle {
  height: 0;
  width: 0;
  border-color: red transparent transparent transparent;
  border-style: solid;
  border-width: 30px;
}
```

- 利用 clip-path

```css
.triangle {
  width: 30px;
  height: 30px;
  background: red;
  clip-path: polygon(
    0px 0px,
    0px 30px,
    30px 0px
  ); // 将坐标(0,0),(0,30),(30,0)连成一个三角形
  transform: rotate(225deg); // 旋转225，变成下三角
}
```

# 移动端 1px

在设备像素比大于 1 的情况下，有些设备会出现 1px 在一些屏幕上很粗的现象，如何解决？

1. 利用::after + transfrom 进行缩放

```css
.scale::after {
  display: block;
  content: '';
  border-bottom: 1px solid #000;
  transform: scaleY(0.5);
}
```

2. border-image
   根据媒体查询不同的像素比给定不同的 border-image
3. box-shadow

```css
div.shadow {
  box-shadow: 0 0.5px 0 0 #000;
}
```

# rem 原理

em 是以父元素的的 font-size 为单位的

rem 是一个相对单位，是相对于根元素的 font-size 值来设定的
假设 font-size 的值为 37.5px 则 1rem = 37.5 2rem = 75px

如何设定 font-size

1. 媒体查询, 设定每种屏幕对应的 font-size
2. js 设置 font-size 一般比较常用
   n 代表想要让字体大小成为屏幕的 n /1 公式是= 元素的宽度 /UI 图的宽度 \* 100

```js
function refreshRem() {
  var docEl = document.documentElement
  var width = docEl.getBoundingClientRect().width
  var rem = width / n
  document.documentElement.style.fontSize = rem + 'px'
  flexible.rem = win.rem = rem
}
win.addEventListener('resize', refreshRem)
```

3.  使用 vw 设置

```css
html {
  font-size: 10vw;
}
```


# 移动端做处理

1. 媒体查询
   需要定义不同尺寸下的样式，比较繁琐
2. %
   需要计算元素的%，% 的相对元素不同，width 和 height 相对于父元素的 width 和 height，而 margin、padding 相对于父元素的宽度
3. rem
   在响应式布局中，必须通过 js 来动态控制根元素 font-size 的大小。
4. vw,vh

# flex 介绍，及参数 flex 1

flex 又称为弹性布局，使用 flex 布局的元素称为容器，容器里面的元素又称为项目
Flex 布局是一种弹性布局，可以根据容器的大小和内容的大小自动调整元素的位置和大小，而传统布局需要手动调整元素的位置和大小。

flex-direction:
决定主轴（竖着的轴）的方向,值有row(默认值) ，row-reverse,column,column-reverse

flex-warp:
定义是否换行，norwarp(默认)不换行，warp 换行，warp-reverse 换行，第一行在下方

flex-flow:
是felx-direction 和 flex-warp 的简写,默认值 row nowrap

justify-content: （横着的方向，space-between，两端对齐）
定义元素在主轴上的方向，值 flex-start,flex-end,center,space-between,space-around

align-items: （竖着的方向）
定义元素在交叉轴上的方向, 值 flex-start | flex-end | center | baseline | stretch 

align-content：
属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用 flex-start | flex-end | center | space-between | space-around | stretch;


项目上的属性：
order：
项目的排列顺序，值越小排的越靠前
flex-grow:
项目的放大比例，默认为 0
flex-shrink:
项目的缩小比例，默认为1 ,空间不足时将其缩小
flex-basis: 可以是 number, auto,intial,inherit
项目占据的主轴空间，默认值为 auto ,当width 和flex-basis 同时存在时width 不生效，item 的宽度为flex-basis 设置的宽
flex：
flex-grow, flex-shrink 和 flex-basis的简写 ，默认值为 0 1 auto

align-self:
单个项目的对齐方式

# flex 中 1 代表什么

flex 是 flex-grow ,flex-shrink,flex-basis 的缩写
flex-grow:项目的放大比例：默认为 0
flex-shrink:项目的缩小比例：默认为 1 ,若空间不足，则缩小比例
flex-basis:计算项目空间，默认为 auto,即项目本身大小

flex 1 === flex 1 1 0%


# css 隐藏元素，几种渲染有什么不同

1. opacity：0 ,位置还在,并且，如果该元素已经绑定一些事件，如 click 事件，那么点击该区域，也能触发点击事件
2. visibility：hidden 位置还在,但是不会触发绑定事件
3. display:none 位置不在，会导致浏览器重排和重绘
4. z-index： 设置层级较大
5. position 定位到屏幕外

# display 的属性
none: 隐藏元素
block: 块级元素，一行只有一个元素，可设置宽高
inline: 行内元素，一行可以有多个行内元素，不可设置宽高
inline-block: 行内块级元素，既有行内元素的特性，又有块级元素的特性，，可设置宽高
flex: 会将元素变成弹性盒子
table: 元素会作为一个表格来显示
table-row: 元素作为一个表格行来显示
table-cell: 元素作为一个表格列来显示
list-item: 元素作为一个列表来显示

# position
static : 默认值，正常在文档流中的位置
relative: 相对定位，相对于元素的正常位置定位
absolute: 绝对定位，相对于最近的(非static) 的位置定位
fixed: 固定定位，相对于浏览器窗口的固定定位
sticky: 黏性布局，在滚动到底部和顶部时会吸顶/吸底。相对于最近“有定位的”父级元素

可以实现布局或定位，如两栏布局，导航，弹出框等。

# 隐藏元素的办法
1. display:none :元素不在文档流（渲染树）中占位
2. visibility:hidden ：元素不显示，但还是在文档流中占位置
3. opacity:0 : 元素通明度为0，但是在文档流中占位，会保留元素的事件
4. 元素设置 position :absolute / fixed ,transform:translate(-9999px, -9999px); 将元素定义到文档之外
5. 元素设置 width :0,height:0
6. clip:rect(0px, 0px, 0px, 0px)将元素剪裁为一个空白矩形，从而隐藏它


只有 opacity: 0 可以触发点击事件  

# css 的优先级
!important > 行内样式 > id选择器 > 类选择器 、属性选择器、伪类选择器 > 元素选择器、伪元素选择器
如果元素有多个class 样式 会应用哪个？
一般会对比两个 class的优先级，优先级高的元素。 如果同等优先级的条件下，相同属性 后面的class会覆盖前面的

# 如何实现 10px 的字体
```css
font-size: 16px;
transform: scale(0.625);
```
使用em 或者rem ,如果父元素的字体大小是 16px;(em 是相对于父元素的字体大小来计算的， rem 是相对于html（根元素） 设置的字体大小来计算的)
```css

font-size: 0.625em;
```

# 加载 js 和 css 会阻塞页面的下载吗，head 中如果有大体积的css 会阻塞渲染吗
1. 在解析中如果遇到了js脚本，如下所示，就会先暂停dom 的解析，执行js 脚本，执行完后再执行dom 的解析
```html
<html>
    <body>
        极客时间
        <script>
        document.write("--foo")
        </script>
    </body>
</html>

```
2. 如果在解析过程中遇到了外联的js,会暂停dom的解析，加载js 文件，加载完成后继续dom 的解析
```html
<html>
    <body>
        极客时间
        <script type="text/javascript" src="foo.js"></script>
    </body>
</html>
```
3. 如果在head 中引入了css，那在js中访问某个元素时也会等待这个文件的加载，加载完成后才可往下执行，css 也会阻塞dom的解析
```html
<html>
    <head>
        <style type="text/css" src = "theme.css" />
    </head>
    <body>
        <p>极客时间</p>
        <script>
            let e = document.getElementsByTagName('p')[0]
            e.style.color = 'blue'
        </script>
    </body>
</html>
```

# 伪类设置列表奇数行、偶数行、以及 3 的倍数行设置不同的样式

```js
li:nth-child(odd) {
  /* 奇数行样式 */
}

li:nth-child(even) {
  /* 偶数行样式 */
}

li:nth-child(3n) {
  /* 3 的倍数行样式 */
}
```

# 如何改变元素的层级
可以设置 z-index 属性，来指定元素在层叠上下文中的顺序。不同的层叠上下文中是独立的。
1. z-index 属性只在元素的 position 属性值为 absolute、fixed、relative 或 sticky 时才会生效，因为只有这些属性可以创建层叠上下文。
2. 在元素的父元素中，存在 transform、filter、perspective 属性 也会创建层叠上下文
3. 在使用 CSS 3D 变换（ translate3d()，对元素进行平移、缩放）时，也会创建一个层叠上下文，此时 z-index 属性同样会生效。

# 如何检测元素进入到某一区域
1. Intersection Observer API  检测一个元素进入另一个元素时，或者两个相交的元素区域发生变化时
2. 通过 getBoundingClientRect 来获取元素的 位置信息，在根据父元素的位置来判读子元素是否在其中
