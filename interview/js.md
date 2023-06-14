# 实现异步的几种方案

回调函数
promise
async await
generator
# script标签  属性 “defer”  和 “async”的区别
都是用来异步加载脚本文件的,<script> 主要用来加载js 资源

defer 属性： 异步加载完文件，在dom 加载完成后，DOMContentLoaded 之前 执行脚本文件，多个 defer 文件顺序执行

async 属性：异步加载完文件之后，立即执行，有多个 async 标签的不会按顺序依次执行，会并行的下载和执行文件
# link  标签属性 “prefetch” 和 “preload” 区别
都是用来预加载资源的，提高页面加载的速度和性能，<link> 标签主要用来加载 css, 图片，字体等，可以加载js
rel="preload" 是遇到该标签，就立刻去加载该文件，确保在实际用到该文件前就已经加载好

rel="prefetch"  是指浏览器在空闲的时候，异步去加载这些资源
# 快排

```js
function quickSort(arr) {
  if (arr.length < 1) {
    return arr
  }
  let point = Math.floor(arr.length / 2)
  let pointVal = arr.splice(point, 1)[0]
  let left = []
  let right = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pointVal) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([pointVal], quickSort(right))
}
```
# reduce

```js
Array.prototype.reduceArr = function (fn, initVal) {
  if (Object.prototype.toString.call(fn) !== '[object Function]') {
    console.log('not a function')
  }
  let arr = this
  // 默认索引 如果没传默认值参数 则使用数组的第二项开始
  let initIndex = arguments.length > 1 ? 1 : 0
  // 累计的值 如果没传默认值参数 则使用数组的第一项作为默认值
  let res = arguments.length > 1 ? this[0] : initVal

  for (let i = initIndex; i < arr.length; i++) {
    res = fn(res, arr[i], i, arr)
  }

  return res
}
```

# Object.defaultProperty ,Object.prototype 的使用

Object.defaultProperty 冻结对象
Object.prototype 原型

# call,apply,bind

- call,apply 都是用来改变 this 的指向
  call 必须是一个函数去调用，第一参数是对象，函数的调用者，从第二个参数开始可以接收任意多个数

  apply 必须是一个函数来调用，参数必须是一个数组或是类数组

  使用场景：
  对象的继承
  获取数组中最大值，最小值
  数组合并
  Array.prototype.push.apply(arr1,arr2)

- bind
  创建一个新函数，在调用时设置 this 的指向为传入的值，返回是一个函数，需要调用才执行，apply,bind 是立即执行

# js 数据类型，如何判断类型

基本类型：string,boolean,number,undefined,null,symbol,bigint
引用类型：Object,Array,Function

判断类型：

1. typeof 不能判断引用类型和 null 都会返回 object
2. instanceof 不能判断基本类型,但可以判断引用类型和装箱后的基本类型 是基于原型链的实现
3. Object.prototype.toString.call() 类型都可以判断
4. isXXX Array.isArray() isNaN()


# 如何实现浅拷贝，和深拷贝

浅拷贝 
对象的浅拷贝
- object.assign() 
- 扩展运算符 ...

数组的浅拷贝
- Array.from() 
- [].concat()  
- [].slice()


深拷贝：
-  JSON.stringify  JSON.parse
借用浅拷贝递归实现

```js
function deepClone(obj, map = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined就不进行拷贝操作
    // 基本类型的值的拷贝
  if (typeof obj !== "object") return obj;

  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  // 是对象的话就要进行深拷贝
  if (map.get(obj)) return map.get(obj);
  let cloneObj = Array.isArray(obj) ? [] :{};
  map.set(obj, cloneObj);

  for (let key in obj) {
    // 判断是否是自己的属性 而不是从原型链继承来的
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], map);
    }
  }
  return cloneObj;
}


let obj = { name: 1, address: { x: 100 } };
obj.o = obj; // 对象存在循环引用的情况
let d = deepClone(obj);
obj.address.x = 200;
console.log(d);
```
# es5 的继承 ，es6 的继承

es5

1. 原型链继承

   将子类的原型对象指向父类的实例

   ```js
   Child.prototype = new Parent()
   ```

   优点：

   - 子类继承父类的属性和方法，和父类的原型对象

   缺点：

   - 不能实现多继承
   - 如果不小心改了父类原型对象引用数据类型的值，之后所有子类实例对象也会改变
   - 创建子类时无法向构造函数传参

2. 构造函数继承

   在子类的构造函数内部通过 call,apply 调用父类的构造函数

   ```js
   function Child() {
     Parent.call(this,...)
   }
   ```

   优点：

   - 解决了原型链继承的所有问题
     可以实现多继承，可向父类传参，解决了原型链继承中子类实例共享父类引用类型的问题

   缺点：

   - 不能继承父类原型链上的属性和方法
   - 实例并不是父类的实例，而是子类的实例
   - 无法实现函数复用,方法都在构造函数中定义，每次创建实例就会创建一遍方法

3. 组合继承
   组合继承是原型链继承和构造函数组合使用的一种方式

   ```js
   Chid.prototype = new Parent()
   Child.prototype.constructor = Child

   function Child() {
     Parent.call(this,...)
   }
   ```

   优点：

   - 可继承父类，以及父类原型上的属性和方法
   - 解决了原型链继承中共享引用数据类型的问题
   - 可传参，可复用

   缺点：

   - 父类的构造函数会被调用两次，第一次是在 new Parent()上，为了继承父类的属性和方法，第二次是在 实例化时调用的构造函数方法 new Child()
   - 生成了两个实例，子类上的属性和方法会覆盖原型上的属性和方法，增加了不必要的内存

4. 寄生组合继承
   通过 Child.prototype = Object.create(Parent.prototype) 来确定 Child.prototype 的指向 Child._proto_ 指向 Parent.prototype

   ```js
   Child.prototype = Object.create(Parent.prototype)
   Child.prototype.constructor = Child
   ```

   是 es5 比较常用的方法

5. 原型式继承
   该方法的原理是创建一个构造函数，构造函数的原型指向对象，然后调用 new 操作符创建实例，并返回这个实例，本质是一个浅拷贝。 是没有 Object.create 之前的写法

   ```js
   function create(obj) {
     var newObj = {}
     newObj.__proto__ = obj
     return newObj
   }
   ```

6. 寄生式继承

```js
function createAnother(original) {
  var clone = Object.create(original) // 通过调用 Object.create() 函数创建一个新对象
  clone.fn = function () {} // 以某种方式来增强对象
  return clone // 返回这个对象
}
```

es6

7. class 中的 extend 继承
   依靠 extend 和 super ,效果和组合继承一样

   class 通过 extends 继承父类的属性和方法，子类没有 constructor 方法，会默认添加 constructor
   super 的调用代表着父类构造函数

# es5 与 es6 继承的区别

e5 的继承是创建子类的实例对象，再创建父类的方法添加到 this 上（Parent.apply(this）)

es6 先创建父类的实例对象 this(也就是使用 super())，然后再用子类的构造函数修改 this

# 数组遍历 for,for...in,for...of,forEach,map

forEach,map相同点
都是循环遍历数组中的每一项 forEach 和 map 方法里每次执行匿名函数都支持 3 个参数，参数分别是 item（当前每一项）、index（索引值）、arr（原数组）
不能使用 break ,continue ，但能使用 return 跳出循环

map :
- 数组的自带方法之一，返回一个新数组
- 不改变原数组。
```js
const newArray = array.map(function(value, index, arr) {
    return value * 2;
});
```

forEach : 
- 数组的自带方法之一，对于数组中每一个元素都执行这个回调函数，匿名函数都支持 3 个参数，参数分别是 item（当前每一项）、index（索引值）、arr（原数组）
- forEach 没有返回值

```js
array.forEach(function(value, index, arr) {
    console.log(value);
});
```

for :
传统的循环结构，可以使用 break ,continue, return 来跳出循环或者当前循环。

for of: 
- 用来遍历实现了 Iterator 接口的， 如 数组，类数组，Map,Set,字符串等,
- 遍历对象需要通过和 Object.keys(),
- 可以使用 break ,continue, return 来跳出循环或者当前循环。

```js
let iterable = [10, 20, 30];

for (let value of iterable) {
    value += 1;
    console.log(value); // 11,21,31
}
```

for in :
- 一般用来遍历对象，可以遍历到<b>原型链上的属性</b> （i {} in 对象，在对象里）
- 如果用 for in 遍历数组只能打印出<b>索引值</b>，不推荐，
- 可以使用 break ,continue, return 来跳出循环或者当前循环。
```js
Object.prototype.objCustom = function () {}; // 原型链上的属性
Array.prototype.arrCustom = function () {};  // 原型链上的属性

const iterable = [3, 5, 7];
iterable.foo = "hello";

for (const i in iterable) {
  console.log(i);
}
// "0", "1", "2", "foo", "arrCustom", "objCustom"  只能打印出索引值

for (let prop in ['a', 'b', 'c'])
  console.log(prop);            // 0, 1, 2 (array indexes)

for (let prop in 'str')
  console.log(prop);            // 0, 1, 2 (string indexes)

for (let prop in {a: 1, b: 2, c: 3})
  console.log(prop);            // a, b, c (object property names)

for (let prop in new Set(['a', 'b', 'a', 'd']))
  console.log(prop);            // undefined (no enumerable properties)
```

# let const var

作用域
变量提升
暂时性死区
重复声明
默认值

# 事件循环机

https://github.com/qiulijun9/Q-A/issues/1
事件循环机制是指在执行宏任务的过程中，如果遇到了微任务，会将其添加到微任务队列中，在该次宏任务执行完毕之后，会依次执行微任务队列中的任务，如果遇到了宏任务则添加到下次的宏任务队列中，依次循环。
由宿主（浏览器）发起的任务（比如 settimeout)是宏任务，由 js 引擎发起的任务是微任务。js 引擎等待宿主环境给它分配宏任务，这段时间需要事件循环机制。
宏任务中可能会有 promise 发起的异步任务，为了保障这些异步任务都在同一个宏任务中执行，所以每个宏任务中会有一个微任务队列，从而可以进行事件轮询。

常见的宏任务：主线程的任务 ,setTimeout,setInterval,setTmmediate，I/O,messageChannel

主线程执行的宏任务主要有：
渲染事件
用户交互事件
js 脚本执行
网络请求，文件读写等
宏任务的执行过程：


微任务
常见的微任务：promise.then ,await 之后的内容,MutationObserver，process.nextTick(nodejs)，v8 垃圾回收过程



# node 事件循环机制

    node 中也有宏任务和微任务
     宏任务： setTimeout,setInterval,setImmediate,I/O 操作等
     微任务： process.nextTick(), promise.then()等

node 中时间轮询执行的顺序：
输入数据-->轮询阶段--->check 阶段 --->close 阶段 ---> timer 阶段 ---> pending 阶段 ---> idle 空闲阶段 --->轮询阶段

1. timer: 定时器阶段，setTimeout,setInterval ,如果到达时间，执行回调
2. I/O callbacks： 上一轮循环中未执行的 I/O 回调
3. idle, prepare: 仅系统内部使用
4. poll
   到达这个阶段后：

   - 如果存在定时器，并且到达时间了，则回到 timer 阶段
   - 如果没有定时器，则执行 poll 队列中的事件
     （1）如果队列不为空，则依次执行，直到队列为空
     (2) 如果队列为空，检查是否有 setImmediate，有则进入 check 阶段， 没有则等待 callback 加入队列

5. check: 检查阶段 ,setImmediate 回调
6. close: 关闭阶段，一些关闭事件的回调，如 socket.on('close', ...)

process.nextTick 是一个独立于 eventLoop 的任务队列。 一般是在 poll 阶段执行，也有可能在 check 阶段执行，
在每一个 eventLoop 阶段完成后会去检查 nextTick 队列，如果里面有任务，会让这部分任务优先于微任务执行。

node 中宏任务和微任务的执行顺序：
v10 之前：

执行完阶段中的所有任务
执行 nextTick 队列中的任务
清空微任务队列中的任务
v10 之后与浏览器中的宏任务和微任务执行顺序一样，都是在执行完本次宏任务之后就立即执行微任务队列中的任务

node 和浏览器 事件轮询的区别：
在浏览器中微任务是在每个宏任务之后执行的，而 node 中的微任务是在每个阶段都会执行


# 前端的存储

cookie

- 存储大小限制，只有 4k,一般用于验证用户的身份如
- 设置 HttpOnly,防止 cookie 被 js 访问
- cookie 有过期时间，过期自动销毁
- 发起同域下的 http 请求时，都会携带 cookie

localStorage:

- 本地存储，不会过期
- 大小在 5M-10M
- 所有页面都可共享该值

sessionStorage:

- 只存在于当前的会话，当页面关闭或刷新之后数据就会清除

indexedDB:

- 存储空间大，可达到几百 M
- 可以存储二进制

# 跨域解决办法
协议，端口和 IP 满足同源
1. JSONP
   利用<script>发出请求，带着 callback 函数，由服务端传递值，客户端执行回调函数来获取

   缺点：只支持 get 请求，不安全可能会遭到 xss 攻击

2. cors（Cross-Origin Resource Sharing）
   cors 是一种机制，使用额外的http 头来告诉浏览器允许执行哪些代码（  浏览器端设置请求头 origin 字段），需要服务端指定响应头Access-Control-Allow-Origin来允许特定来源.
   如果设置为* ，表示允许任何来源的跨域请求。
   - 配置Access-Control-Allow-Methods 头，允许哪些Http 方法（post,get）来获取服务端的资源。
   ```
   header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
   ```
   -  配置Access-Control-Allow-Headers头，允许设置哪些请求头
    ```
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    ```

   简单请求，复杂请求
   简单请求是满足以下条件的请求：
   - 使用get,post ,head 方法之一
   - Content-Type 只能是application/x-www-form-urlencoded、multipart/form-data或text/plain中的一种。
   简单请求会在真正发请求前，先发送一个options 请求，服务端会在响应头上加上 Access-Control-Allow-Origin 和 Access-Control-Allow-Methods 字段，告诉浏览器允许哪些方法来获取资源

   复杂请求
   - 使用PUT、DELETE等非GET/POST/HEAD方法
   - 不满足简单请求的头部字段
   复杂请求也会在真正请求前，发送一个options 请求，会比简单请求多一个 Access-Control-Request-Headers 字段，只有请求头都满足这些字段头，才允许进行真正的发请求。

3. postMessage
   postMessage()方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递
4. webSocket 链接后，与 http 协议无关
5. nginx 反向代理

# 作用域

作用域是用来决定代码变量和其他资源的可访问性

分为 全局作用域，函数作用域，块级作用域

全局作用域：在最外层定义的函数，变量，以及未定义直接赋值的变量会提升到全局作用域。

函数作用域：声明在函数内部的变量，一般只在该函数内能访问到

块级作用域：一个函数内部，一个代码块内部
es5 之前是没有块级作用域的，let const 引入的块级作用域 解决 for 循环中 var 的问题

# 原型，原型链

- 什么是原型？

原型：也是原型对象，每个 js 对象在创建的时候就会关联另一个原型对象，并继承共享原型的属性和方法，节省内存。

- js 中每个对象都有一个 _proto_ 属性，这个 _proto_ 属性 会指向对象的原型（即构造函数的 prototype）
- 每个函数都有一个 prototype 属性
- 每个原型都有一个 constructor 属性 指向关联的构造函数 Person.prototype.constructor === Person

- 什么是原型链？
  当查找实例的属性时，如果找不到，就会查找原型对象的属性，如果还查不到会查找原型的原型，一层一层向上查找，直到查到最顶层为止，也就是 Object.prototype,所形成的链条就是原型链

每一个可以被 new 调用的 构造函数 都有一个 prototype 属性 这个属性就是原型的值，比如 实例化 new Array() Array.prototype 就是 Array 实例化后的原型

Function.prototype 为所有对象的原型如 Function、String、Number、Boolean、Array 这几个。
[]._proto_ === Array.prototype
Array.prototype._proto_ === Object.prototype
Object.prototype._proto_ === null

Function.prototype._proto_ === Object.prototype

- 数字 1 有没有原型？
  基本类型的 1 是没有原型的,
  Number() 是一个构造函数, 如果使用 Number(1) 创建的实例 1 是有原型的 Number(1)._proto_ === Number.prototype Number.prototype._proto_ === Object.prototype

# 箭头函数和普通函数的区别

1. 箭头函数没有 this ,在定义的时候就已经确定 this 了
2. 箭头函数不能 作为构造函数使用
3. 箭头函数没有 arguments
4. 不能通过 call,apply,bind 改变 this 的指向
5. 箭头函数没有 prototype



# h5 的新特性

1. 语义化标签
2. audio ,video
3. 本地存储
4. websocket
5. history


# new 的过程

1.  创建一个新对象
2.  取出第一个参数作为构造函数
3.  将对象的 _proto_ 指向构造函数的 prototype
4.  改变 this 指向，将构造函数的 this 指向 new 出来的对象
5.  返回该对象

```js
function ObjectFactory() {
  const obj = Object.create(null)
  Constructor = [].shift.call(argument)
  obj._proto_ = Constructor.prototype
  const result = Constructor.apply(obj, argument)

  return typeof result === 'object' ? result : obj
}
```

# promise 的 catch 和 try catch 有什么区别

try catch 只能捕获同步代码错误，无法捕获代异步错误。不能捕获 promise.reject()的错误
只能捕获到主线程执行到 try catch 中的错误， 比如一些语法错误，在检查的时候就报错了，不会走到 try catch 代码块

promise 对象错误具有冒泡性质，会一直向后传递直到捕获为止



# new Number("123") 和 Number("123") 区别

typeof new Number("123") 返回 object
typeof Number("123") 返回 number

new Number("123") = Number{123} 返回包装后的类型
Number("123") = 123

# 函数柯里化
### 定义：
在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

```js
function add(a, b) {
    return a + b;
}

// 执行 add 函数，一次传入两个参数即可
add(1, 2) // 3

// 假设有一个 curry 函数可以做到柯里化
var addCurry = curry(add);
addCurry(1)(2) // 3
```

对于已经柯里化后的fn 函数来说，如果实参的数量 === 形参的数量，那就执行原函数，当传入的实参数量小于实参数量时，那就返回一个函数用于接收剩余的参数，直到实参数量于形参数量相同，执行原函数。

### 何时使用？
调用方法时，参数复用。 
1. 求和函数
2. redux
3. 比如获取对象的某个属性的方法
```
var prop = curry(function (key, obj) {
    return obj[key]
});

var name = person.map(prop('name')) // 能让代码更加易懂
```


eg:
```js
function ajax(type, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.send(data);
}

// 虽然 ajax 这个函数非常通用，但在重复调用的时候参数冗余
ajax('POST', 'www.test.com', "name=kevin")
ajax('POST', 'www.test2.com', "name=kevin")
ajax('POST', 'www.test3.com', "name=kevin")

// 利用 curry
var ajaxCurry = curry(ajax);

// 以 POST 类型请求数据
var post = ajaxCurry('POST');
post('www.test.com', "name=kevin");

// 以 POST 类型请求来自于 www.test.com 的数据
var postFromTest = post('www.test.com');
postFromTest("name=kevin");
```

### 实现

当实参 === 形参时返回该函数 ，否则继续执行返回剩余的参数


```js

function  sub_curry(fn){
  const args= [].slice.call(arguments,1)

  return function(){
    const currentArgs = args.concat([].slice.call(arguments))
   return fn.apply(this,currentArgs)
  }
}


function curry(fn,length){
   length = length || fn.length;

   return function(){
     if(arguments.length < length){
        var combined = [fn].concat(Array.prototype.slice.call(arguments));
        const currentArgs = sub_curry.apply(this, combined)
       return curry(currentArgs,length - arguments.length)

     }else{
      return fn.apply(this,arguments)
     }

   }
}

// 简单版 1
function curry(fn, args = []) {
  return function () {
    const _args = [...args, ...arguments];
    // 参数长度不够，等待下一次调用补齐
    if (_args.length < fn.length) {
      return curry.call(this, fn, _args);
    }
    // 执行函数
    return fn.apply(this,_args);
  };
}
// 简单版 2
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...moreArgs) {
        return curried.apply(this, [...args,...moreArgs]);
      };
    }
  };
}

function curry(fn, args =[]) {
    return function() {
        const _args = [...args, ...arguments];
        if (_args.length < fn.length) {
            return curry.call(this, fn, _args);
        }
        else {
            return fn.apply(this, _args);
        }
    }
}

const fn = curry(function (a, b, c) {
  console.log([a, b, c]);
});

fn("a", "b", "c");
fn("a", "b")("c");
fn("a")("b")("c");



```

# 闭包 ， 闭包使用场景
在函数内部定义一个函数，并且该函数能够访问内部变量时，就形成了闭包。

闭包中的变量会一直保存在内存中，不会被垃圾回收机制回收，有可能造成内存泄漏。

```js
function createCounter() {
  let count = 0;

  return function() {
    count++;
    console.log(count);
  };
}
```

应用：

1. 保护变量，在定义模块开发时，保护局部变量不被外部访问和修改，每个js模块都是一个独立的作用域，当在这模块中提供了可供外部访问的变量和方法时就产生了闭包
2. 给对象设置私有属性
3. 立即执行函数,能够获取正确的值，模仿块级作用域

for(var i=0;i<10;i++){
 ((j)=>{
 setTimeout(function(){
        console.log(j)//1-10
    },1000)
  })(i)
}
4. 函数柯里化
5.  在react hook 中使用的闭包
eg
```js
// state.js
let stateArr = null;
let index = 0 
export const useState = (value: number) => {
  // 第一次调用时没有初始值，因此使用传入的初始值赋值
  stateArr[index]  = stateArr[index] || value;

  function dispatch(newValue) {
    stateArr[index]  = newValue;
    // 假设此方法能触发页面渲染
    render();
  }
  index++;
  return [stateArr[index] , dispatch];
}


import React from 'react';
import {useState} from './state';

function Demo() {
  // 使用数组解构的方式，定义变量
  const [counter, setCounter] = useState(0);

  return (
    <div onClick={() => setCounter(counter + 1)}>hello world, {counter}</div>
  )
}

export default Demo();
```
当在Demo 中使用useState 时就访问了state 内部的变量，此时就产生了闭包

# 浮点数的处理

1. toFixed(2) 会对小数点后的位置做四舍五入
2. 使用第三方库 如 Math.js

# call ,apply,bind 的实现

1.  将函数设为对象的属性 context.fn = this
2.  执行该方法 context.fn(...arg)
3.  删除该属性 delete context.fn

```js
Function.prototype.myCall = function (context) {
  context = context || window
  context.fn = this
  const arg = [...arguments].slice(1)
  const result = context.fn(...arg)

  delete context.fn

  return result
}

// 同call 一样，只是参数不一样
Function.prototype.myApply = function (context) {
  context = context || window
  context.fn = this
  const arg = arguments[1]

  const result = context.fn(...arg)
  delete result
}
// bind 接收参数，返回参数

Function.prototype.myBind = function (context) {
  var self = this
  //获取myBind 参数从第二个到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1)
  var fNOP = function () {}

  var fbound = function () {
    const bindArgs = Array.prototype.slice.call(arguments)
    self.apply(this instanceof self ? this : context, args.concat(bindArgs))
  }
  fNOP.prototype = this.prototype
  fbound.prototype = new fNOP()
  return fbound
}
```

# 排序，时间复杂度，空间复杂度

时间复杂度：衡量算法运行的时间

空间复杂度：是算法在运行过程中占用存储大小的量度

# object 数组遍历

object 遍历:
Object.keys()
Object.values()
Object.entries()
for in

数组遍历：
for,for of ,forEach
map
filter
some 有一项为 true 则为 true
every 每一项为 true 则为 true
reduce
find
findIndex

# 节流，防抖，使用场景

// 写一个防抖方法
```js
function debounce(fn, interval) {
  let timer = null

  return function () {
    let self = this
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }

    setTimeout(() => {
      fn.apply(self, args)
    }, interval)
  }
}
```

防抖： input 联想 ,窗口大小改变
节流： 滚动事件，鼠标不断点击
```js
function throttle(func,delay){
  let time =null;
  let lastTime =0;

  return function(...args){
    const now = new Date().getTime();

    if(now - lastTime >= delay){
      func.apply(this,args);
      lastTime =now;

    }else{
      clearTimeout(time);
      time = setTimeout(()=>{
        fuc.apply(this,args);
        lastTime = new Date().getTime();
      },delay -(now - lastTime))
    }
  }
}
```


# ?. !. || 符号的作用
1. ?. 可选链 用来访问对象 避免中间某个属性 是 null 或 undefined 而抛出异常 eg: Uncaught TypeError: Cannot read properties of undefined (reading 'name') at <anonymous>:8:32
2. !. 非空类型断言 ，表示这个值一定不为 null 或 undefined ,跳过ts 类型检查。 x!.foo()  表示 x 一定不为null 或 undefined
3. || 逻辑或运算符，a||b  如果当 a表达式为 false 时 则返回 b 表达式，，反之，返回a 表达式
 
# 以下代码输出

```js
setTimeout(_ => {
  Promise.resolve('h').then(r => {
    console.log(r) // h
  })
  console.log('g')
})
setTimeout(_ => {
  console.log('t')
})
async function pFn() {
  return new Promise(resolve => {
    resolve('r')
    console.log('o')
  })
}
async function entry() {
  console.log('y')
  const p = await pFn()
  Promise.resolve('i').then(r => console.log(r))
  console.log(p) // r
}
entry()
console.log('u')
// y o u r i g h t
```

# 页面上有一个 Input 输入框，假设 id 为 "example" JS 中有一个对象 test，要求 test.value 和输入框的值实现双向数据绑定 当在输入框中输入任意内容时，test.value 则变成相应值，并在控制台输入该值 当在 JS 中将 test.value 赋值为任意内容时，输入框内容显示相应内容

```html
<input id="example" /> <button onclick="handleClick()">改变test</button>
```

```js
const test = { value: '' }
const inputTarget = document.getElementById('example')

function changeValue(v) {
  test.value = v
  inputTarget.value = test.value
}

function handleOnchange() {
  changeValue(inputTarget.value)
  console.log('value', inputTarget.value, 'test', test)
}

function handleClick() {
  changeValue(1234)
}
```

# 前端代码中， require 机制可能存在循环依赖的问题。比如实际代码依赖链路可能存在这种情况： a.js -> b.js -> c.js -> d.js -> b.js ，出现了循环依赖。 如下给出了某个项目 A 的模块依赖关系样例数据：deps, 请实现一个方法，检测其中是否存在的循环引用，并打印出现循环依赖的引用链条。

```js
const deps = {
  'a.js': { deps: ['b.js', 'e.js'] },
  'b.js': { deps: ['c.js'] },
  'c.js': { deps: ['d.js'] },
  'd.js': { deps: ['a.js'] },
}

function checkCircularReference(obj) {
  let result = []
  let flag = false
  for (let key of Object.keys(obj)) {
    if (flag) {
      break
    }

    const checkItem = (dep, depsMemo, chain) => {
      if (depsMemo[dep]) {
        flag = true
        result = [...chain, dep]
        return
      }
      depsMemo[dep] = true
      chain.push(dep)

      obj[dep]?.deps.forEach(item => {
        checkItem(item, depsMemo, [...chain])
      })
    }
    
    checkItem(key, {}, [])
  }
  return result
}
console.log(checkCircularReference(deps))
```

# Node 多个大文件处理 一个目录下有较多内容较大的文本文件，假设该目录为 /tmp/source 需要在每个文件最后一行加上 Hello, Lazada~ 的文本，并将所有文件移到另一个目录，目录路径假设为 /tmp/dest 用 Node 实现，尽量考虑机器性能

```js
const fs = require('fs')
const path = require('path')
function copyFile(src, dist) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dist))
}

function dealFile(originPath, targetPath) {
  fs.readdir(originPath, (_, file) => {
    file.forEach(item => {
      const filePath = path.join(originPath, item)
      fs.writeFileSync(filePath, 'hello', () => {
        console.log('写入成功')
      })

      copyFile(filePath, path.join(targetPath, item))
    })
  })
}
dealFile(__dirname + '/source', __dirname + '/dest')
```

# 实现一个方法，若干的请求，有任意两个失败，也返回失败，全部成功在返回成功

```js
function createNewRequest(rejectCount, promiseArr) {
  const result = []
  let rejectCnt = 0
  let resolveCnt = 0

  return new Promise((resolve, reject) => {
    promiseArr.forEach((promise, index) => {
      promise
        .then(data => {
          resolveCnt++
          result[index] = data

          if (resolveCnt === promiseArr.length) {
            resolve(result)
          }
          console.log(data)
        })
        .catch(err => {
          rejectCnt++
          if (rejectCnt === rejectCount) {
            reject(err)
            new Function()
          }
        })
    })
  })
}

let p1 = Promise.resolve(1)
let p2 = Promise.resolve(2)
let p3 = Promise.reject(3)
let p4 = Promise.resolve(4)

createNewRequest(1, [p1, p2, p3, p4]).then(res => {
  console.log(999999999, res)
})
```

# 缓存的图片路径不变，图片发生了改变，如何获取最新的图片

1. 给图片地址后面拼接一个 hash 值如 Math.random()
2. 修改 html

   <meta http-equiv="Pragma" content="no-cache">
   <meta http-equiv="Cache-Control" content="no-cache">
   <meta http-equiv="Expires" content="0">

3. js 更新缓存
   window.applicationCache.update();



## 图片懒加载如何做
图片懒加载的目的是在用户滚动到图片可见区域时进行加载，以提高页面初始加载速度。以下是一种使用IntersectionObserver实现图片懒加载的方法：

首先，在HTML中为图片元素添加一个data-src属性，该属性包含实际的图片URL。将src属性留空或设置为占位符图片。

```htmL
<img class="lazy" data-src="path/to/your/image.jpg" src="path/to/placeholder.jpg" alt="Image description">
```

接下来，编写JavaScript代码以实现懒加载功能：

```js
document.addEventListener('DOMContentLoaded', function () {
  // 获取所有带有类名 'lazy' 的图片元素
  const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));

  // 创建 IntersectionObserver 实例
  const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // 判断图片元素是否进入可见区域
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        // 将 data-src 属性的值设置为 src 属性，开始加载图片
        lazyImage.src = lazyImage.dataset.src;
        // 移除 'lazy' 类名
        lazyImage.classList.remove('lazy');
        // 取消观察该图片元素
        lazyImageObserver.unobserve(lazyImage);
      }
    });
  });

  // 观察所有 'lazy' 图片元素
  lazyImages.forEach((lazyImage) => {
    lazyImageObserver.observe(lazyImage);
  });
});
```

在这个例子中，我们使用了IntersectionObserver API 来监听带有类名 'lazy' 的图片元素。当图片元素进入可见区域时，我们将data-src属性的值设置为src属性，从而开始加载图片。最后，我们移除图片元素的'lazy'类名并取消对该图片元素的观察。


# ESM 和 CommonJS 规范的区别
1. 语法区别
EXM 采用 import 和export导入/导出模块，CommonJS 采用require/module.exports 导入导出模块
2. 加载方式不同
   ESM 在编译的时候，就会确定依赖关系和加载顺序
   CommonJs 是动态加载，在运行的时候才能确定依赖关系，
   是同步加载模块，模块的加载会阻塞js的加载，在浏览器端不太适用
3. 导出方式不同
ESM 导出的是值的引用，而 CommonJS 导出的是值的浅拷贝。 ESM 导出值变化，导入也会变化，但是在CommonJS 中不会受到影响。

ESM 可以导出多个值，CommonJs 只能导出一个值
ESM  只能写在最顶层，CommonJS 可以写在判断里
4. 兼容性
ESM 目前的主流浏览器已经支持 ，commJS 在使用是需要转换

# 如何终止异步方法

```js
const controller = new AbortController();
const signal = controller.signal;

fetch(url, { signal })
  .then(response => {
    // 处理响应数据
  })
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('请求已被中止');
    } else {
      console.error('请求错误', error);
    }
  });


// 终止请求
controller.abort();
```
# generator 实现

# promise 规范

# 观察者设计者模式

# node 原生的 API 有哪些，node sync 和普通的有什么区别

# Async 的并发实现:同时处理一组请求，返回一组处理完的结果，错误也返回

# Promise 的合成事件是同步的还是异步的，哪个方法返回一个新的 promise，缺点

# 数组和链表的区别
数组 必须是一块连续的内存区域，根据元素下标查找元素，查找速度快， 插入和删除元素较复杂
链表的存储空间可以不连续 ，查找某个元素较慢需要从链表出发查找，插入和删除元素比较方便

# 堆栈的区别

- 空间
栈 是自动分配的相对固定大小的空间
堆 是动态分配的 大小不固定的内存空间

- 回收
栈内存的变量基本上使用完毕之后内存就回收了
堆内存的 不会立即销毁，要检查是否还有其他变量对其的引用

- 基本类型和引用类型
基本类型一般存储在栈中
引用类型的值存储在堆中 ，栈中存储指针

基本类型拷贝时传递的是值
引用类型传递的是值的地址

# async/await 
用同步的方式来处理异步操作
async / await 是异步操作的解决方案，是Generator 的语法糖，使用 async 来表示，函数内部使用await 来表示异步
1.  Aysnc 函数自带执行器，调用方式跟普通函数的调用一样
2. async 函数的 await 命令后面则可以是 Promise 或者 原始类型的值（Number，string，boolean）
3. 返回值是Promise 对象


# new Proxy

new Proxy(target,handlers)

target 要代理的对象
handlers 代理对象的操作符

# set 和 weakSet 区别
set
接收的是实现 iterable 接口的数据结构
1. 类似于数组，但成员都是唯一的，无重复值
2. 可以遍历,方法：forEach(),keys(),values(),entries()
3. 操作方法：add()has()delete()clear()
数组去重：
function dedepe(array){
return Array.from(new Set(array))
}

# weakSet
1. 值不能重复，成员只能是对象，不能是其他类型的值
2. 无法遍历
3. 操作方法：add() has() delete()
4. 成员都是弱引用，可以随时消失，不用就会被垃圾回收，不容易造成内存泄露


# vue 和 react 区别

1. 设计：Vue.js 采用模板和声明式渲染，强调 HTML 和 JavaScript 的分离，易于理解和学习；
React.js 则采用组件和函数式编程，强调数据和 UI 的一致性，更适合处理复杂的交互逻辑。

2. 数据绑定：Vue.js 提供了双向数据绑定，可以自动更新视图和数据；即数据的变化可以自动更新视图
   React.js 则采用单向数据流，数据的更新需要通过状态和属性来实现。

3. 组件化：Vue.js 的组件化非常灵活，可以使用模板编写组件，也可以使用 JS 写组件；
React.js 的组件化则采用 JSX 语法，将 HTML 和 JavaScript 相结合，更加直观。

共同点
1. 性能优化： 虚拟dom
2. 数据驱动视图
3. 组件化的思想
4. 生态系统：Vue.js ，React.js 的生态系统较为完善，有大量的第三方库和插件；