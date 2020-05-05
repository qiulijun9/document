# 如何判断 this 的指向

1. 全局上下文
   this 指向 window，严格模式下指向 undefined
2. 作为单独的函数调用
   　　 this 指向 window

```
　　　 function fun(){
        this.name = "aa"
        console.log(this)// window
      }
      fun()

```

3. 作为对象的方法被调用
   谁调用了这个方法，this 就指向谁

```js
let obj = {
  name:'aa',
    getName:function(){
     console.log(this)// obj
    }
}
obj.getName()
```

4. 作为构造函数被调用
   在构造方法中,当使用 new 　调用方法时， this 指向 new 出来的实例
```js
   function Func() {
    this.name = "大白";
   }
   let fn = new Func();
   console.log(fn.name) // 大白
```

5. 箭头函数没有 this，this会指向当前最近的非箭头函数的this
6. dom 　事件绑定，指向绑定事件的元素

# 优先级
new > call、apply、bind > 对象.方法 > 直接调用。
# 改变 this 的指向　 call(),apply(),bind()

区别：

1. bind(this)返回的是改变了上下文的函数
2. apply(this,[arg1,arg2,arg3])　 apply 　接收参数数组
3. call(this,arg1,arg2,arg3) call 接收参数列表
4. apply call 是立即调用

```js

let obj = {
  getName:function fun(x,y){
  console.log(this)
  console.log(x,y)
}}
let n= obj.getName;
n.apply(window) //window
n.apply(obj,[1,2])// n 1 2
n.call(obj,1,2)// n 1 2
n.bind(obj)// fn
```

# 应用场景

1. 求数组的最大值，最小值

```
let arr = [34,5,3,6,54,6,-67,5,7,6,-8,687];
Math.max.apply(Math, arr);
Math.min.apply(Math, arr);

Math.max.call(Math, 34,5,3,6,54,6,-67,5,7,6,-8,687);
Math.min.call(Math, 34,5,3,6,54,6,-67,5,7,6,-8,687);
```

2. 将伪数组转换成数组，原型扩展

```
var arrayLike = {
  0: 'qianlong',
  1: 'ziqi',
  2: 'qianduan',
  length: 3
}
Array.prototype.slice.call(arrayLike)
```

3. 利用 call 和 apply 做继承

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

# 如何确定this 指向的
满足一下条件：
1. 计算MemberExpression 的结果赋值给ref
  其实就是()左边的部分
  ```
  function foo() {
    console.log(this)
  }
   foo(); // MemberExpression 是 foo
  ```


2. 判断ref 是否是Reference 类型
  Reference构成：
   .base value
   .referenced name
   .strict reference
  如果 ref 是Reference,并且IsPropertyReference(ref) 为true，那么 this 的值为 GetBase(ref)
  如果 ref 不是Reference，那么 this 的值为 undefined
   ```
   var foo = {
     bar: function () {
        return this;
     }
   };
  foo.bar(); // foo

  var BarReference = {
    base :foo,
    propertyName:'bar',
    strict:false
  }
   ```
3.  IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)
 上面例子IsPropertyReference(ref) 为true ,因为base value 是一个对象，所以可以确定this的值是foo

4. (foo.bar = foo.bar)() ,(false || foo.bar)(),(foo.bar, foo.bar)(), 根据规范，因为使用了 GetValue，所以返回的不是 Reference 类型，所以this 为undefined