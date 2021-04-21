# 解释 this 你不知道的 js

每个函数的 this ,取决于函数的调用位置，是在函数调用时绑定的

绑定规则：

1. 默认绑定
   独立函数调用，没有指向时指向 window
2. 隐式绑定
   当有上下文对象调用时，this 指向该对象
   对象属性引用链只在上层或是最后一层调用的位置起作用。
   this 执行丢失会指向 window

# 如何判断 this 的指向

1. 判断函数是否在 new 中调用，作为构造函数被调用
   在构造方法中,当使用 new 　调用方法时， this 指向 new 出来的实例

```js
function Func() {
  this.name = '大白'
}
let fn = new Func()
console.log(fn.name) // 大白
```

2. 函数是否通过 bind ,call,apply 显示的绑定，如果绑定就指向绑定的对象

```js
let bar = foo.call(obj)
```

3. 是否在某个上下文对象中被调用，作为对象的方法被调用
   谁调用了这个方法，this 就指向谁

```js
let obj = {
  name: 'aa',
  getName: function () {
    console.log(this) // obj
  },
}
obj.getName()
```

4. 默认绑定，全局上下文
   this 指向 window，严格模式下指向 undefined

```js
function fun() {
  this.name = 'aa'
  console.log(this) // window
}
fun()
```

5. 箭头函数没有 this，是根据当前词法作用域来确定，箭头函数会继承外层函数调用的 this,箭头函数的 this 也无法被修改
6. dom 　事件绑定，指向绑定事件的元素
7. 嵌套函数中 this 不会继承外层函数的 this

# 优先级

new > call、apply、bind > 对象.方法 > 直接调用。

# 改变 this 的指向　 call(),apply(),bind()

区别：

1. bind(this)返回的是改变了上下文的函数
2. apply(this,[arg1,arg2,arg3])　 apply 　接收参数数组
3. call(this,arg1,arg2,arg3) call 接收参数列表
4. apply call 是立即调用,如果传入了原始值，那么会把原始值转换成它的包装类型,如果传入了 null,undefined 在调用时会被忽略

```js
let obj = {
  getName: function fun(x, y) {
    console.log(this)
    console.log(x, y)
  },
}
let n = obj.getName
n.apply(window) //window
n.apply(obj, [1, 2]) // n 1 2
n.call(obj, 1, 2) // n 1 2
n.bind(obj) // fn
```

# 应用场景

1. 展开 一个数组

```js
function foo(a, b) {
  console.log('a:' + a, 'b:' + b)
}
foo.apply(null, [2, 3]) //a:2 b:3
```

2. 求数组的最大值，最小值

```
let arr = [34,5,3,6,54,6,-67,5,7,6,-8,687];
Math.max.apply(Math, arr);
Math.min.apply(Math, arr);

Math.max.call(Math, 34,5,3,6,54,6,-67,5,7,6,-8,687);
Math.min.call(Math, 34,5,3,6,54,6,-67,5,7,6,-8,687);
```

3. 将伪数组转换成数组，原型扩展

```
var arrayLike = {
  0: 'qianlong',
  1: 'ziqi',
  2: 'qianduan',
  length: 3
}
Array.prototype.slice.call(arrayLike)
```

4. 利用 call 和 apply 做继承

```
let Person =function (name,age){
  this.name = name;
  this.age = age;
}
let Girl = function (name) {
  Person.call(this, name);
};
var Boy = function (name, age) {
  Person.apply(this, arguments);
}
var g1 = new Girl ('qing');
var b1 = new Boy('qianlong', 100);
```

# 如何确定 this 指向的

满足一下条件：

1. 计算 MemberExpression 的结果赋值给 ref
   其实就是()左边的部分

```
function foo() {
  console.log(this)
}
 foo(); // MemberExpression 是 foo
```

2. 判断 ref 是否是 Reference 类型
   Reference 构成：
   .base value
   .referenced name
   .strict reference
   如果 ref 是 Reference,并且 IsPropertyReference(ref) 为 true，那么 this 的值为 GetBase(ref)
   如果 ref 不是 Reference，那么 this 的值为 undefined
   ```
   var foo = {
     bar: function () {
        return this;
     }
   };
   foo.bar(); // foo
   ```

var BarReference = {
base :foo,
propertyName:'bar',
strict:false
}

```
3.  IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)
上面例子IsPropertyReference(ref) 为true ,因为base value 是一个对象，所以可以确定this的值是foo

4. (foo.bar = foo.bar)() ,(false || foo.bar)(),(foo.bar, foo.bar)(), 根据规范，因为使用了 GetValue，所以返回的不是 Reference 类型，所以this 为undefined
```
