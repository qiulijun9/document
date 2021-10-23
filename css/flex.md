## 基本概念：

flex:弹性布局。采用 flex 布局元素称为 flex 容器（flex container），所有的子元素是容器成员，称为 flex 项目(flex-item)。

使用 flex 布局首先要设置父容器 display:flex，当设为 flex 后，子容器的 float，clear,vertical-align 属性将失效

## 容器的属性：

flex-direction 设置轴的方向：轴包括主轴（x 轴）和交叉轴（y 轴）
[row(水平排列默认) | column(垂直排列)| row-reverse(水平反向排列)| column-reverse(垂直反向排列)]

flex-wrap 设置换行方式
[nowrap(不换行默认) | wrap(换行) | wrap-reverse(反向换行)]

flex-flow （是 flex-direction 和 flex-warp 的简写形式）轴向和换行同时设置 默认值（row nowrap）

justify-content 沿主轴方向对齐
[flex-start(默认起点对齐)| flex-end(终点对齐)| center(居中对齐)| space-between(两端对齐)| space-around(分散对齐)]

align-items 沿交叉轴方法单行对齐，在单行时设置 align-content 不起作用
[stretch(默认拉伸对齐，未设置高度时，沾满整个容器) | flex-start | flex-end | center | baseline（第一行文字的基线对齐）]

align-content 多行沿交叉轴对齐
注意：当父元素没有高度时，多行时设置 align-items 是相对与每一行的垂直居中。 设置 aligin-center 无效
当父元素有高度时，设置 aligin-center 才有效，将子项作为一个整体对齐。多行时设置 align-items 是相对与每一行的垂直居中。
[stretch | flex-start | flex-end | center | space-between | space-around]

## 项目的属性：

flex 子容器在主轴上如何伸缩（flex 值可以是数字也可以是单位数字或是 none）
是 flex-grow,flex-thrink,flex-basis 的缩写默认为(0 1 auto),
当为 none 时值为(0 0 auto)
当为 auto 时值为(1 1 auto)
当为 数字 1 时值为(1 1 0%)

order 子容器的排列顺序，数值越小越靠前,默认为 0

flex-grow 项目放大的比例，只能是数字,默认为 0(常见场景,表单控件,占满剩余空间),
flex-grow:1 表示撑满剩余宽度

flex-shrink 项目缩小的比例，只能是数字,默认为 1, 1 越大，2 越小

flex-basis 设置盒子的宽度,占主轴的空间,默认是 auto,可以设置 px

aligin-self 子容器如何沿交叉轴排列
[auto(继承父元素) | flex-start | flex-end | center | baseline | stretch]

## align-items 和 align-center 区别

条件 属性（是否有效果）
| 子项| flex 容器|align-items |align-content |
| ------ | ------ |
| 单行 | 不指定高度 | 是| 否|
| 单行 | 固定高度 |是| 否（但是有设置 flex-wrap:wrap;时，有效果）|
| 多行 | 不指定高度 | 是| 否|
| 多行 | 固定高度 | 是| 是|

# flex 中 1 代表什么

flex 是 flex-grow ,flex-shrink,flex-basis 的结合
flex-grow:项目的放大比例：默认为 0
flex-shrink:项目的缩小比例：默认为 1 ,若空间不足，则缩小比例
flex-basis:计算项目空间，默认为 auto,即项目本身大小

flex 1 === flex 1 1 0%
