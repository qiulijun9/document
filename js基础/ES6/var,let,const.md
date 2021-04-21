| 声明方式 |           变量提升           | 暂时性死区（声明之前变量不可用） | 重复声明 | 作用域 | 默认值 |
| :------- | :--------------------------: | :------------------------------: | :------: | :----: | ------ |
| var      | 允许（创建，初始化阶段提升） |              不存在              |   允许   |  全局  | 可无   |
| let      |   不允许 （创建阶段提升）    |               存在               |  不允许  |  块级  | 可无   |
| const    |   不允许（创建阶段提升））   |               存在               |  不允许  |  块级  | 必须有 |

window 下的 var 定义的变量属于全局作用域下，可以访问的到， window 下用 let 定义的变量,用 window 访问为 undefined
在全局作用域中使用 var 声明的时候，会创建一个新的全局变量作为全局对象的属性,而 let 和 const 不会。

## 变量提升

js 会把所有变量声明好了再赋值，会提升到作用域顶部事先声明好
变量提升的过程：1.创建，2.初始化，3.赋值。
var 在变量提升的时候 进行了创建和初始化 值 undefined
let 只有在创建阶段被提升了，初始化阶段并没有进行，所以 let const 会出现暂时性死区
const 只有创建和初始化阶段

```js
console.log(a)  //------undefined
var a =1

var 可变量提升
  ||
var a;
console.log(a)
a =1


console.log(b)  // ----报错 b is not defined
let b =2

```

## 变量提升带来的问题？

1. 变量容易在不察觉的情况下覆盖掉

```js
var myname = '123'
function showName() {
  console.log(myname) //  undefined  由于变量提升，会先采用showName 执行上下文提升的那个 myname undefined
  if (0) {
    var myname = '3456'
    console.log(1)
  }
  console.log(myname) //  undefined
}
showName()
```

2. 本应该销毁的变量没有被销毁 ，如下，当 for 执行完之后应该销毁，由于变量提升，所以并没有销毁

```js
function foo() {
  for (var i = 0; i < 7; i++) {}
  console.log(i)
}
foo()
```

## 当变量和函数一起提升时

所有的变量和函数会被整体提到作用域顶部，函数整体在变量整体的后面
函数声明可以提升，函数表达式不能提升
多个同名函数声明后会覆盖之前的

```js
function foo() {
  if (!foo) {
    var foo = 5
  }
  console.log(foo)
}
console.log(foo) //--- function
```

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
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000)
}
// 输出 0 1 2
//执行过程  let i ------i = 0 ------ i < 3----执行代码(console.log(i)) i++
```

## 为什么换成 let 就能输出正确的值？

1. 在 for( let i = 0; i< 3; i++) { 循环体 } 中间有有一个隐藏的块级作用域
   每次在进入 for 循环体之前会把 i 的值重新进行初始化和赋值

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
