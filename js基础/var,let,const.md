声明方式 变量提升 暂时性死区 重复声明 作用域 默认值
var 允许 不存在 允许 全局 可无
let 不允许 存在 不允许 块级 可无
const 不允许 存在 不允许 块级 必须有

## 变量提升

js 会把所有变量声明好了再赋值，会提升到作用域顶部事先声明好

<!--
console.log(a)  ------undefined
var a =1

var 可变量提升
  ||
var a;
console.log(a)
a =1


console.log(b) ----报错 b is not defined
let b =2

-->

## 当变量和函数一起提升时

所有的变量和函数会被整体提到作用域顶部，函数整体在变量整体的后面
函数可以在声明之前调用，变量不可以，多个同名函数声明后会覆盖之前的

<!--
    function foo() {
    if (!foo) {
        var foo = 5;
    }
    console.log(foo);
    }
    console.log(foo); --- function
-->
