# Promise 注意事项

1、promise 在.then()或.catch()的时候都会在内部生成一个新的 Promise 再返回
2、promise 在.then() 只有在状态改变的时候才会执行
3、promise 的状态只能改一次，改变后可以在.then().catch()中获取
4、catch 不管在哪里都能捕获到上层错误
5、 返回任意一个非 promise 的值都会包裹成 poomise 对象
6、.then .catch 返回值不能是 promise 本身，否则会造成死循环
7、.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。
8、用 throw 抛出来的异常.catch 会捕捉到， 用 new Error()抛出的错会被.then 捕捉到
9、链式调用后面的内容要等前一个调用执行完才会执行，才会将其加入微任务队列
10、.all()接受一组异步任务，执行一组异步任务，在所有操作执行完后执行回调。Promise.all().then()和 promise.all()接收到的数组顺序一样
11、.race()只会获得最先执行完成的那个结果，其他异步任务也会进行，但是执行结果会抛弃掉

# async/await

1、await 后面的内容相当与放到了 Promise.then()里面，要加入微任务队列
