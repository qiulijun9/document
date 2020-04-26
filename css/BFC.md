http://www.ziyi2.cn/2017/08/02/%E6%B8%85%E9%99%A4%E5%92%8C%E5%8E%BB%E9%99%A4%E6%B5%AE%E5%8A%A8/

## 什么是 BFC：
BFC:块级格式化上下文，它决定了元素如何对其内容进行定位，以及与其他元素间的关系
是一个独立的容器，容器内部的布局和外部毫不相干

## BFC 触发的条件：

1. 根元素
2. 浮动元素（元素的 float 不是 none）
3. 绝对定位元素 (元素 position 为 absolute 或 fixed)
4. 内联元素（元素 display：inline-block）
5. 表格单元格（元素 display：table-cell）
6. 表格标题（元素 display：table-caption）
7. 具有 overflow 且不是 visible 的块元素
8. flex 或 inline-flex
9. display:flow-root
10. column-span:all

## BFC 约束规则：

1. BFC 是页面上独立的容器，容器里面的子元素不会影响到外面的元素
2. BFC 中的盒会按垂直方向一个个排列
3. 在同一个 BFC 里，可能会发生margin重叠
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

2. 清除元素内部浮动问题,子元素如果设置BFC，父元素没有设置，则会出现高度塌陷问题
  给子元素设置BFC,父元素也设置BFC
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
3. 垂直margin问题,在一个BFC里，相邻两个BFC，在垂直方向上，会发生margin重叠，且是以最大的外边距为准。
例如：下面的两个P 标签的margin 为100，应该为200，所以在外面包裹一层设置BFC
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
1)可以在父元素尾部追加空的子元素，并利用 clear:both 解决塌陷 <div style="clear:both;"></div>
2)通过 after 伪元素设置来清除浮动 ,上面例子2
    .parent::after{
      content: "";
      display: block;
      clear: both;
    }

2. BFC
给父元素也设置 BFC

清除浮动的原理：
可以设置元素禁止浮动元素出现在它的左侧，右侧，或者双侧。
清除区域是在元素的外边距之上增加一些额外的间隔，（确保浮动元素和该元素不会重叠）

## 采用 BFC 解决高度塌陷和 clear 属性清除浮动相比的优势是什么？

1. clear 属性规定的是元素哪一侧不允许有其他浮动元素，但是我们并不是想让父元素周围没有其他浮动元素，而是减少浮动带来的影响，也就是使浮动元素闭合。
2. 会增加一些无用的标签

## 伪类和伪元素的区别：

1. 伪类是当元素处于某种状态是为其添加不同的样式，如：hover ,处于 dom 树无法描述的状态下为元素添加样式(操作 dom 中已有的元素)
   伪元素是用来创建一些不在文档树中的元素，为其添加样式 如：before（创建 dom 树之外的元素）
2. 双冒号（::）表示伪元素， 伪类使用单冒号（：）
