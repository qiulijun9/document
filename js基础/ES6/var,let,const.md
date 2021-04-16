声明方式 变量提升 暂时性死区（声明之前变量不可用） 重复声明 作用域 默认值
var 允许 不存在 允许 全局 可无
let 不允许 存在 不允许 块级 可无
const 不允许 存在 不允许 块级 必须有

window 下的 var 定义的变量属于全局作用域下，可以访问的到， window 下用 let 定义的变量,用 window 访问为 undefined
在全局作用域中使用 var 声明的时候，会创建一个新的全局变量作为全局对象的属性,而 let 和 const 不会。

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
函数声明可以提升，函数表达式不能提升
多个同名函数声明后会覆盖之前的

<!--
    function foo() {
    if (!foo) {
        var foo = 5;
    }
    console.log(foo);
    }
    console.log(foo); --- function
-->

# 输出

```js
for(var i = 0; i < 3; i++ ){
 setTimeout(()=>{
  console.log(i)
},1000)
}
输出 3 3 3
```

# 怎么让输出 012

```js
for(let i = 0; i < 3; i++ ){
 setTimeout(()=>{
  console.log(i)
},1000)
}
输出 0 1 2
执行过程  let i ------i = 0 ------ i < 3----执行代码(console.log(i)) i++
```

利用闭包

```js
for (var i = 0; i < 3; i++) {
  ;(function (j) {
    setTimeout(() => {
      console.log(j)
    }, 1000)
  })(i)
}
```

```js
function foo() {
  let a = 3
  return function () {
    console.log(a) //可以获取闭包中的a
  }
}
let a = 2
let bar = foo()
bar()
```

```js
function foo() {
  let a = 3
  return function () {
    console.log(this.a) // this 指向window,为window下的a,由于是var 定义的变量，a =2
  }
}
var a = 2
let bar = foo()
bar()

function foo() {
  let a = 3
  return function () {
    console.log(this.a) //this 指向window,由于是let 定义的a ,只在块级作用域内有效，所以为undefined
  }
}
let a = 2
let bar = foo()
bar()
```
