# 实现异步的几种方案

回调函数
promise
async await
generator

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
2. instance of 不能判断基本类型,但可以判断引用类型和装箱后的基本类型 是基于原型链的实现
3. Object.prototype.toString.call() 类型都可以判断
4. isXXX Array.isArray() isNaN()

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

# 数组 forEach map

相同点
都是循环遍历数组中的每一项 forEach 和 map 方法里每次执行匿名函数都支持 3 个参数，参数分别是 item（当前每一项）、index（索引值）、arr（原数组）

不同点
forEach 没有返回值
map 有返回值 返回一个新数组

# let const var

作用域
变量提升
暂时性死区
重复声明
默认值

# 事件循环机制

https://github.com/qiulijun9/Q-A/issues/1

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

1. JSONP
   利用<script>发出请求，带着 callback 函数，由服务端传递值，客户端执行回调函数来获取

   缺点：只支持 get 请求，不安全可能会遭到 xss 攻击

2. cors
   浏览器端设置请求头 origin 字段，服务端设置响应头 Access-Control-Allow-Methods， 等

   简单请求，复杂请求

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



# 如何实现浅拷贝，和深拷贝

浅拷贝 object.assign()

深拷贝：
借用浅拷贝递归实现

```js
function deepClone(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}
    // 循环引用
    if (map.get(target)) {
      return map.get(target)
    }

    map.set(target, cloneTarget)

    for (key in target) {
      cloneTarget[key] = deepClone(target[key], map)
    }
    return cloneTarget
  } else {
    return target
  }
}
```

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

# for of for in

for in 一般用来遍历对象，可以遍历到原型链上的属性 （i {} in 对象，在对象里） ，如果用 for in 遍历数组只能打印出索引值，不推荐，不能用 break ,continue ,return 跳出函数体

for of 用来遍历实现了 Iterator 接口的， 如 数组，类数组，map,set,字符串等,遍历对象需要通过和 Object.keys(),可以使用 break ,continue ,return 跳出函数体

# 闭包 ， 闭包使用场景

闭包就是能够访问函数内部变量的函数，创建方法是在函数内部创建另一个函数

应用：

1. 定义模块，将模块内部的函数暴露给外部
2. 给对象设置私有属性
3. 立即执行函数

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

function throttle(fn, interval) {
  let last = null

  return function () {
    let now = Date.now()
    let self = this
    let args = arguments

    if (last - now > interval) {
      clearTimeout(timer)
    }
    last = now

    setTimeout(() => {
      fn.apply(self, args)
    }, interval)
  }
}

function throttle(fn, interval) {
  let timer = null

  return function () {
    let self = this
    let args = arguments
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(self, args)

        timer = null
      }, interval)
    }
  }
}

function throttle(fn, interval) {
  let timer = null
  let startTime = 0

  return function () {
    let self = this
    let args = arguments
    let currentTime = Date.now()
    let running = interval - (currentTime - startTime)

    clearTimeout(timer)

    if (running <= 0) {
      fn.apply(this, args)
      startTime = Date.now()
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
        startTime = Date.now()
      }, running)
    }
  }
}
```

防抖： input 联想 ,窗口大小改变
节流： 滚动事件，鼠标不断点击



# Type interface 什么时候用

- 如是在定义一些库的话可以使用 interface ,方便使用者去扩展
- 如果是定义一些属性的话可以使用 type
- type 和 interface 能达到一样的效果，但 interface 可以做合并，可以做添加，type 不能做二次修改,type 可以定义一些基本类型的变量，interface 不可以
- type 可以动态计算属性,interface 不可以

```js
type Keys = "小王" | "小文"
type X = {
  [k in keys]:string
}
```

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

# webpack 的优化

1. exclude/include
2. cache-loader
3. happypack
4. noParse
5. IgnorePlugin

# webpack loader css 顺序

less-loader 加载.less 文件
css-loader 加载 .css 文件
styled-loader 将样式通过<style>标签插入到 header 中

执行顺序是 less-loader ---> css-loader --->styled-loader
webpack 加载是从右往左加载
use: [
'style-loader',
'css-loader',
'less-loader'
]

# loader plugin，常用

常用的 loader
image-loader,sass-loader,css-loader,style-loader,babel-loader...

常用的 plugin
html-webpack-plugin,ignore-plugin,mini-css-extract-plugin (分离样式文件)，happypack-plugin



# generator 实现

# promise 规范

# 观察者设计者模式

# 如何终止异步方法

# websocket

# 怎么接收后端传进来的 long 型的数据

# antd 3 和 antd 4 的区别

# node 原生的 API 有哪些，node sync 和普通的有什么区别

# webpack 如何动态加载的

# Async 的并发实现:同时处理一组请求，返回一组处理完的结果，错误也返回

# Webpack 的优化，大小速度，tree-shaking

# 热更新原理 是 id 还是内容

# Promise 的合成事件是同步的还是异步的，哪个方法返回一个新的 promise，缺点


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
参数复用，本质上降低通用性，提高适用性，

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

// 简单版
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

const fn = curry(function (a, b, c) {
  console.log([a, b, c]);
});

fn("a", "b", "c");
fn("a", "b")("c");
fn("a")("b")("c");
```
