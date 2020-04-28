# 回调地狱

传统实现异步请求的时候，会在回调函数里处理返回的结果值。如果还有异步请求，会又在回调函数里调用又一个网络请求。。。嵌套层级太多就形成了回调地狱。

# promise

promise 　是一种异步编程的解决方案。 引入解决了回调地狱的问题。promise 通过.then 　执行回调函数，会返回新的 promise 对象用来使用，错误通过冒泡让 catch 捕捉到
手段：

1. 回调函数延迟绑定
2. 返回值穿透
3. 错误冒泡

## promise 的状态
pending --进行中  fulfilled-- 成功 rejected --失败
状态改变不可逆，一旦改了就不能再改

# Promise 注意事项

1、promise 在.then()或.catch()的时候都会在内部生成一个新的 Promise 再返回
2、promise 在.then() 只有在状态改变的时候才会执行
3、promise 的状态只能改一次，改变后可以在.then().catch()中获取
4、catch 不管在哪里都能捕获到上层错误
5、 返回任意一个非 promise 的值都会包裹成 promise 对象
6、.then .catch 返回值不能是 promise 本身，否则会造成死循环
7、.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。
8、用 throw 抛出来的异常.catch 会捕捉到， 用 new Error()抛出的错会被.then 捕捉到
9、链式调用后面的内容要等前一个调用执行完才会执行，才会将其加入微任务队列
10、.all()接受一组异步任务，执行一组异步任务，在所有操作执行完后执行回调。Promise.all().then()和 promise.all()接收到的数组顺序一样
11、.race()只会获得最先执行完成的那个结果，其他异步任务也会进行，但是执行结果会抛弃掉
12、 .finally() 不管状态如何都会执行，但不接受任何参数，.finally()无法知道 Promise 的状态

# async/await 解决异步问题提出的一种方案

1. await 后面的内容相当与放到了 Promise.then()里面，要加入微任务队列
2. await 会阻塞后面代码的执行
3. async 函数返回值是 Promise 对象，await 必须在 async 函数里使用
4. async 函数返回的 Promise 对象 ，必须等到内部所有的 await 命令的 Promise 对象执行完，才会发生状态改变（才会执行.then）
5. async 函数中只要一个 await 出现 reject 状态，后面的 await 都不会执行，解决办法添加 try/catch

# Generator

1、Generator 函数 function 关键字和函数名之间有个\*，函数体内使用 yield 表达式
2、函数内部调用 next()方法，就会返回 value（yield 表示式后的值） 和 down（是否遍历结束） 两个属性
