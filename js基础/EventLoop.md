# 浏览器

主线程执行的任务主要有：

1. 渲染事件
2. 用户交互事件
3. js 脚本执行
4. 网络请求，文件读写等

异步任务分为宏任务和微任务：
宏任务（普通任务队列和延迟队列）：script,setTimeout,setInterval,setTmmediate，I/O,messageChannel
微任务：promise.then,await,MutationObserver，process.nextTick(nodejs)，v8 垃圾回收过程

eventloop 操作步骤：

1. js 主线程是单线程的 会先执行同步任务
2. 当遇到异步任务时，会区分是宏任务还是微任务并把其放到事件队列中，宏任务放到宏任务队列，微任务放到微任务队列。
3. 继续执行代码，直到同步代码执行完毕。
4. 执行完后，会看微任务队列中有没有微任务，然后按顺序执行完微任务队列中的所有任务，再去宏任务队列中去执行第一个宏任务,回到第一步

# Node

https://juejin.im/post/5aae19b36fb9a028de447c33

node 执行的阶段：

1. 定时器回调阶段(timer):检查定时器如果到了时间，就执行回调。（setTimeout,setInterval）
2. I/O 异常回调阶段：第一段结束后，并不能直接等待异步事件的响应，可以会进入此阶段，比如说 TCP 连接遇到 ECONNREFUSED，就会在这个时候执行回调。
3. 空闲，预备阶段（第二阶段结束，poll 未触发之前）
4. 轮循阶段(poll):异步操作(文件 I/O，网络 I/O)执行完，通知（通过 data,connect 等事件）主线程，使得事件循环到达 poll 阶段
   到达这个阶段后：
   如果有定时器存在，且时间到了，将回到 timer 阶段。
   如果没有定时器，则去看回调函数对列
   。 如果对列不为空，则依次执行
   。 如果队列为空，检查是否有 setImmdiate
   有则进入 check,没有则等待 callback 加入队列
5. check 阶段：执行 setImmdiate 的回调
6. 关闭事件的回调阶段例如 socket.destroy()， 'close' 事件的回调就会在这个阶段执行。

浏览器的微任务是在每个相应的宏任务中执行的，而 nodejs 中的微任务是在不同阶段执行的。

常见微任务：

1.  process.nextTick
2.  Promise

process.nextTick 执行优先级高于 微任务的执行（promise）

setTimeout: 允许推迟一定时间间隔后运行
setInterval:一段时间间隔之后,重复执行该函数

window.requestAnimationFrame(callback):执行动画,由浏览器执行回调函数.不需要设置时间间隔.
由于 setTimeout 执行的时候可能会有延迟,发生丢帧的现象. 显示器 60Hz 的刷新频率,requestAnimationFrame 一般会根据刷新频率决定的时间,每刷新一次的间隔执行一次回调函数,不会发生丢帧的现象.也不会卡顿.
