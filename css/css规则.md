## css 语法

https://www.w3.org/TR/css-syntax-3/
https://www.w3.org/TR/CSS21/grammar.html#q25.0

## css 规则

1. @ rules
   @charset 声明 css 的字符集
   @import 级联规则
   @media(\*) 媒体查询
   @page 分页媒体（打印机）
   @counter-stle .

   @keyframes(\*) 定义动画
   @fontface(\*) 定义字体 webfont
   @supports 检查某些 css 功能十否存在，有兼容问题,不 8 推荐使用
   @namespace 定义命名空间

2. rules

3. 选择器
   ,
   +,>,~
   简单选择器 (类型选择器,\* .)
   复合选择器
   伪类，伪元素选择器
   not 选择器

最少有一个简单选择器

4. 声明

- key
  属性和变量

  变量声明法：--
  ：root{
  --main-clolor:#fff
  --side:margin-top
  }
  #foo{
  color:var(--main-color)；
  --side:20px;
  }

- value

收集标准

选择器

1. 简单选择器

- . class 选择器
- tagName svgla namespace 标签选择器
- #id id 选择器
- [attr=name] 属性选择器
- :hover 伪类选择器
- ::befor 伪元素选择器

2. 复合选择器
   由简单选择器组合起来的选择器称为复合选择器

注意 div 必须写在最前面 伪类伪元素写在后面

3. 复杂选择器
   复合选择器之间用连接符链接就构成了复杂选择器
   复合选择器 <sp>空格 复合选择器 子孙选择器
   复合选择器 > 复合选择器 父子选择器
   复合选择器 ~ 复合选择器 相邻兄弟选择器 紧挨的下一个兄弟节点
   复合选择器 + 复合选择器 兄弟选择器
   复合选择器 ||空格 复合选择器 选中 table 中某一个列

# 选择器优先级

是对该所有选择器进行计数
eg
#id div .a #id {
color:#fff
}

// 行内 id class,tagName
优先级为[0,2,1,1] s= 0 \* n3 + 2 \* n2 + 1 \*n1 + 1 \* n0

请写出下面的优先级

div#a.b .c[id=x] [0,1,3,1]
#a:not(#b) [0,2,0,0]
\*.a [0,0,1,0]
div.a [0,0,1,1]
