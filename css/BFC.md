http://www.ziyi2.cn/2017/08/02/%E6%B8%85%E9%99%A4%E5%92%8C%E5%8E%BB%E9%99%A4%E6%B5%AE%E5%8A%A8/

# 正常流

顺序依次排版，不够换行

## 正常流原理：

在 css 中，规定了如何排列文字或者盒子的算法，这些算法依赖于格式化上下文
块级格式化上下文+文字/盒=位置
排版分为块级格式化上下文和行内级格式化上下文。

当我们要把正常流中的一个盒或者文字排版，需要分成三种情况处理。
当遇到块级盒：排入块级格式化上下文。
当遇到行内级盒或者文字：首先尝试排入行内级格式化上下文，如果排不下，那么创建一个行盒，先将行盒排版（行盒是块级，所以到第一种情况），行盒会创建一个行内级格式化上下文。
遇到 float 盒：把盒的顶部跟当前行内级上下文上边缘对齐，然后根据 float 的方向把盒的对应边缘对到块级格式化上下文的边缘，之后重排当前行盒。

### 正常流的排版

1. 收集盒和文字进行
2. 计算盒和文字在行中的排布
3. 计算行间的排布

### float 元素

1. 会先把元素当成正常元素排进文档流，在按照 float 的方向向该方向挤一下
2. float 元素能浮动到的位置会受之前浮动元素的影响
3. clear 清除浮动，找出干净的空间来做浮动

### Block Contaniner:能容纳正常流的盒，里面就有 BFC

1. dispaly:block
2. display:inline-block
3. display:table-cell
4. flex item ：flex 的子元素
5. grid cell
6. table-caption

### Block-lever-box:外面有 BFC 的(包括 inline-block)

1. dispaly:block
2. display:flex
3. display:table
4. display:grid

### Block Box = Block Contaniner+Block-lever-box

里外都有 BFC

## BFC 合并

block-box && overflow :visible

1. float
2. 边距折叠

## 什么是 BFC： BFC(Block Formating Context) 块级格式化上下文

BFC:块级格式化上下文，它决定了元素如何对其内容进行定位，以及与其他元素间的关系
是一个独立的容器，容器内部的布局和外部毫不相干,浮动元素,绝对定位元素,非块级容器及 overflow 不为 visible 的块级盒子,都会为他们的内容创建 BFC.

## 设立 BFC：

1. 根元素，父元素与正常文件流的子元素（非浮动子元素）自动形成一个 BFC
2. 浮动元素（元素的 float 不是 none）
3. 绝对定位元素 (元素 position 为 absolute 或 fixed)
4. 符合 Block Contaniner 的元素
   -. 内联元素（元素 display：inline-block）
   -. 表格单元格（元素 display：table-cell）
   -. 表格标题（元素 display：table-caption）
5. 具有 overflow 且不是 visible 的块元素
6. flex item flex 的子元素 或 inline-flex
7. display:flow-root
8. column-span:all

## 简单满足 BFC 条件 和设立 BFC 是一个意思

1. 浮动元素
2. 绝对定位元素
3. 不是块级元素但能包含块级元素的容器如 inline-blocks, table-cells, table-captions）
4. 自身为块级，overflow 为 hidden 的元素

## BFC 约束规则：

1. BFC 是页面上独立的容器，容器里面的子元素不会影响到外面的元素
2. BFC 中的盒会按垂直方向一个个排列
3. 在同一个 BFC 里，可能会发生 margin 重叠
4. 计算 BFC 高度时，浮动的子元素也计算
5. 浮动盒区域不叠加到 BFC 上
6. 元素的左边 margin 会与 border 的左边重合

## BFC 解决的问题：

1. 自适应两列布局
   .left{
   width: 100px;
   height: 150px;
   float: left;
   background: #f66;
   }
   .right{
   height: 200px;
   background-color: #3ebcee;
   overflow: hidden;
   }
   <div>
   <div className="left"></div>
   <div className="right"></div>
   </div>

2. 清除元素内部浮动问题,子元素如果设置 BFC，父元素没有设置，则会出现高度塌陷问题
给子元素设置 BFC,父元素也设置 BFC
.parent{
border: 5px solid red;
width: 300px;
overflow:hidden
}
.child{
width: 100px;
height: 100px;
border: #ffb685 2px solid;
float: left;
}
 <div className="parent">
    <div className="child"></div>
    <div className="child"></div>
 </div>
3. 垂直 margin 折叠问题,在一个 BFC 中，指两个或多个盒子在垂直方向上（兄弟元素或是父子元素），会发生 margin 重叠，且是以最大的外边距为准。且只发生在 BFC 中
例如：下面的两个 P 标签的 margin 为 100，应该为 200，所以在外面包裹一层设置 BFC
.p-container p{
color: #f55;
background: #fcc;
width: 200px;
line-height: 100px;
text-align:center;
margin: 100px;
}
   <div className="p-container">
      <div style={{overflow:'hidden'}}>
      <p>hahha</p>
      </div>
      <p>haha</p>
   </div>

## 高度塌陷产生的原因：

在没有给父元素（正常流）创建 BFC,但子元素（浮动）是 BFC，脱离了文档流 ，在没有其他子元素或没设置高度时会发生高度塌陷

## 解决高度塌陷：

1. clear 属性(清除浮动)

1)可以在父元素尾部追加空的 div 标签，并利用 clear:both 解决塌陷 <div style="clear:both;"></div>

2)通过 after 伪元素设置来清除浮动 ,上面例子 2
.parent::after{
content: "";
display: block;
clear: both;
}

2. BFC
   给父元素也设置 BFC,例如给父级元素添加 overflow:hidden 属性

清除浮动的原理：
可以设置元素禁止浮动元素出现在它的左侧，右侧，或者双侧。
清除区域是在元素的外边距之上增加一些额外的间隔，（确保浮动元素和该元素不会重叠）

## 采用 BFC 解决高度塌陷和 clear 属性清除浮动相比的优势是什么？

1. clear 属性规定的是元素哪一侧不允许有其他浮动元素，但是我们并不是想让父元素周围没有其他浮动元素，而是减少浮动带来的影响，也就是使浮动元素闭合。
2. 会增加一些无用的标签
