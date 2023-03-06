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

4. flex 布局
5. grid 布局，父元素设置 display:flex, 子元素设置 margin：auto
6. table-cell 父元素设置 display: table-cell; text-align: center; vertical-align: middle;

# css 重绘，重流

浏览器在渲染阶段会经历 dom 解析，cssOM 解析, 最后合并成 render Tree 就能获取元素在页面上的大小位置，最终绘制出来
什么是回流？
当 render tree 中的一部分元素因为大小，布局，隐藏等改变需要重新构建，称为回流。
什么是重绘？
当 render tree 的元素需要更新属性，这些属性只影响元素外观，风格，不影响布局的，则称为重绘。

重流一定重绘，重绘不一定重流

会导致重流的一些操作：

1. 页面首次渲染
2. 元素尺寸的改变，位置的改变，内容的改变
3. 窗口的改变
4. 字体大小的改变

会导致重绘的操作：

1. color ,background-color 的改变

避免回流和重绘？

1. 避免使用 table 布局
2. 将动画效果脱离文档流
3. 避免使用 calc
4. 尽可能在 dom 树末端改变 css
5. 避免重复操作样式，最好一次性重写 style
6. 必要时，可以为元素设置 display:none ...

# flex 中 1 代表什么

flex 是 flex-grow ,flex-shrink,flex-basis 的结合
flex-grow:项目的放大比例：默认为 0
flex-shrink:项目的缩小比例：默认为 1 ,若空间不足，则缩小比例
flex-basis:计算项目空间，默认为 auto,即项目本身大小

flex 1 === flex 1 1 0%

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

flex-direction,flex-warp,flex-flow,justify-content,align-items,align-content,align-self 等

# css 隐藏元素，几种渲染有什么不同

1. opacity：0 ,位置还在,并且，如果该元素已经绑定一些事件，如 click 事件，那么点击该区域，也能触发点击事件
2. visibility：hidden 位置还在,但是不会触发绑定事件
3. display:none 位置不在，会导致浏览器重排和重绘
4. z-index： 设置层级较大
5. position 定位到屏幕外