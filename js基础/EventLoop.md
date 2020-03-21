# 浏览器

异步任务分为宏任务和微任务：
宏任务：script,setTimeout,setInterval,setTmmediate，I/O,messageChannel
微任务：promise.then,await,MutationObserver，process.nextTick(nodejs)

eventloop 操作步骤：

1. js 主线程是单线程的 会先执行同步任务
2. 当遇到异步任务时，会区分是宏任务还是微任务并把其放到事件队列中，宏任务放到宏任务队列，微任务放到微任务队列。
3. 继续执行代码，直到同步代码执行完毕。
4. 执行完后，会看微任务队列中有没有微任务，然后按顺序执行完微任务队列中的所有任务，再去宏任务队列中去执行第一个宏任务,回到第一步

# Node

https://juejin.im/post/5aae19b36fb9a028de447c33

node 任务队列：
timer(计时器)，执行 setTimeout ,setInterval 的 callback
I/O 处理网络，流，tcp 的错误 callback
idle,prepare.node 内部的一些事件
poll(轮循)，执行 poll 中 I/O 队列检查定时器是否到时，执行完毕后，为空闲状态时会检查是否到达调用时间，如果到了执行 timer
check(检查)，存放 setImmediate 的 callback
close,关闭回调,如 socket

node 会先将宏任务队列执行完之后再去执行微任务队列

常见微任务：

1.  process.nextTick
2.  Promise

process.nextTick 执行优先级高于 Promise
