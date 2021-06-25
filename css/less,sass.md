less ,sass 都属于 css 预处理器

# css 缺点

1. 不能嵌套
2. 变量和重用的样式不能复用

# less 和 sass 区别

1. less 通过客户端处理,sass 通过服务端处理
2. less 使用@, sass 使用\$
3. sass 功能强大 有变量和作用域,有函数@function 和@return 以及函数参数 ,进程控制@if @else @for @each @while

# 使用

less

## 变量

变量使用规则:多次频繁出现的值、需要修改的值，设为变量。
声明变量:@变量名:变量值 @color: #00c;
使用变量: @变量名 @color

@color: #00c; /_ 蓝色 _/
#footer {
border: 1px solid @color; /_ 蓝色边框 _/
}

scss-作用域
声明变量：$变量名：变量值  $color: #00c;
变量在字符串中嵌套，需使用#{}包裹
$color: #00c; /* 蓝色 */
#header {
  border:  #{$i}px solid \$color; /_ 红色边框 _/
}

## 嵌套

less

1. 默认嵌套是后代选择器 ,需要子代选择器,在子代前面加>
2. & 表示上一层
   sass
3. 选择器嵌套 ul{ li{} } 后代
4. 属性嵌套：属性名与{之间必须有: 例如 border:{color:red;}
5. 伪类嵌套:ul{li{ &:hover{ "ul li:hover " } } }
   同时还有 Scss 对 sass 语法进行了改良，Sass 3 就变成了 Scss(sassy css)。与原来的语法兼容，只是用{}取代了原来的缩进。

styled-component

1. 可以通过 ThemeProvider 提供全局定制化的样式和主题
