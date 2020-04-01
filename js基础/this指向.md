# 如何判断 this 的指向

1. 全局上下文
   this 指向 window，严格模式下指向 undefined
1. 作为单独的函数调用
   　　 this 指向 window

```
　　　 function fun(){
        this.name = "aa"
        console.log(this)// window
      }
      fun()

```

2. 作为对象的方法被调用
   谁调用了这个方法，this 就指向谁

   ```
   let obj = {
     name:'aa',
     getName:function(){
       console.log(this)// obj
       }
     }
   obj.getName()
   ```

3. 作为构造函数被调用
   在构造方法中,当使用 new 　调用方法时， this 指向 new 出来的实例

   ```
   function Func() {
    this.name = "大白";
   }
   let fn = new Func();
   console.log(fn.name) // 大白
   ```

4. 箭头函数没有 this，继承外层上下文的 this
5. dom 　事件绑定，指向绑定事件的元素

# 改变 this 的指向　 call(),apply(),bind()

区别：

1. bind(this)返回的是改变了上下文的函数
2. apply(this,[arg1,arg2,arg3])　 apply 　接收参数数组
3. call(this,arg1,arg2,arg3) call 接收参数列表
4. apply call 是立即调用

```

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
