基本概念：
flex:弹性布局。采用 flex 布局元素称为 flex 容器（flex container），所有的子元素是容器成员，称为 flex 项目(flex-item)。

使用 flex 布局首先要设置父容器 display:flex，当设为 flex 后，子容器的 float，clear,vertical-align 属性将失效

轴：
轴包括主轴（x 轴）和交叉轴（y 轴）
flex-direction 设置轴的方向：
[row(水平排列) | column(垂直排列)| row-reverse(水平反向排列)| column-reverse(垂直反向排列)]

父容器
justify-content 如何沿主轴方向排列子容器
[flex-start(默认起点对齐)| flex-end(终点对齐)| center(居中对齐)| space-between(两端对齐)| space-around(分散对齐)]

align-item 沿交叉轴方法排列子容器
[stretch(默认拉伸对齐) | flex-start | flex-end | center | baseline（第一行文字的基线对齐）]

flex-wrap 设置换行方式
[nowrap(不换行) | wrap(换行) | wrap-reverse(反向换行)]

flex-flow 轴向和换行同时设置 默认值（row nowrap）

align-content 多行沿交叉轴对齐
[stretch | flex-start | flex-end | center | space-between | space-around]

子容器：

flex 子容器在主轴上如何伸缩（flex 值可以是数字也可以是单位数字或是 none）

order 子容器的排列顺序，数值越小越靠前

flex-grow 子容器的放大比例

flex-shrink 子容器的缩小比例

flex-basies 子子容器占据的主轴空间

aligin-self 子容器如何沿交叉轴排列
[auto(继承父元素) | flex-start | flex-end | center | baseline | stretch]
