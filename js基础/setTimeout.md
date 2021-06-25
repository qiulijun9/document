# setTimeout

setTimeout: 允许推迟一定时间间隔后运行
setInterval:一段时间间隔之后,重复执行该函数

window.requestAnimationFrame(callback):执行动画,由浏览器执行回调函数.不需要设置时间间隔.
由于 setTimeout 执行的时候可能会有延迟,发生丢帧的现象. 显示器 60Hz 的刷新频率,requestAnimationFrame 一般会根据刷新频率决定的时间,每刷新一次的间隔执行一次回调函数,不会发生丢帧的现象.也不会卡顿.

# setTimeout 是如何实现的？

浏览器遇到 setTimeout 这类 会创建一个延迟执行的消息对列，当遇到 setTimeout 这样的回调函数的时候，会创建一个 回调任务，类似于这样,并把这个任务添加到延迟执行的消息队列中

```js

struct DelayTask{
  int64 id；
  CallBackFunction cbf;
  int start_time;
  int delay_time;
};
DelayTask timerTask;
timerTask.cbf = showName;
timerTask.start_time = getCurrentTime(); //获取当前时间
timerTask.delay_time = 200;//设置延迟执行时间
```

利用事件循环机制，就是在主任务对列的任务执行完毕之后，会调用执行延迟执行消息对列中的任务 , 等该任务执行完之后,继续循环主任务的对列

# setTimeout 的注意事项

1. 如果当前任务执行久，可能会影响定时器任务的执行
   比如，如下，定时器并不会在规定时间执行，它会在循环结束之后才会执行

```js
function bar() {
  console.log('bar')
}
function foo() {
  setTimeout(bar, 0)
  for (let i = 0; i < 5000; i++) {
    let i = 1 + 2
    console.log(i)
  }
}
foo()
```

2. 如果 setTimeout 存在嵌套调用，那系统设置最短时间间隔为 4 毫秒
   是因为在 Chrome 中，定时器被嵌套调用 5 次以上，系统会判断该函数方法被阻塞了，如果定时器的调用时间间隔小于 4 毫秒，那么浏览器会将每次调用的时间间隔设置为 4 毫秒。
   一些实时性较高的动画就不适合用到 setTimeout 了。
3. 未激活的页面，setTimeout 的延迟时间是 1000 毫秒
4. 延迟时间有最大值的限制，32bit 的最大只能存放的数字是 2147483647 毫秒
   如果超过了该限制，会把到期事件设为 0，定时器则会立即执行
5. 不建议在 setTimeout 中设置 this
   解决方法：
   - 利用箭头函数
   - 利用 bind,call,apply 显示绑定

```js
var name = 1
var MyObj = {
  name: 2,
  showName: function () {
    console.log(this.name)
  },
}
setTimeout(MyObj.showName, 1000) // 1秒后输出 1  这时的this 指向全局，并不是MyObj
```

# requestAnimationFrame 和 setTimeout 工作机制的区别

raf 不需要设置延迟的时间，它是根据系统来决定回调函数的时机，系统会自动调用回调函数来执行动画，所以要比 setTimeout 执行的动画要流畅，因为它不需要等到延迟的时间
会根据系统的刷新频率计算出执行的时间，如果系统的绘制是 60 帧， 执行时间就是 1000 /60 ~ 16.7ms

参考文章：
极客时间 《浏览器工作原理与实践》
