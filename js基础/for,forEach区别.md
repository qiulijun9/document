forEach 会按数组中的有效的每一项执行一次 callback 函数

# forEach 和 for 循环的不同

1. forEach 中不能使用 promise 或者 async/await
   因为 forEach 仅仅帮我们执行了 callback 函数，
   await 只有执行 promise 等异步函数才生效，而 forEach 中的方法都是同步的

2. forEach 中不能 break,不能 return，就是无法终止和跳出循环

如果想终止或跳出循环

1. try catch 中抛出错误
2. 使用 for in / for of
3. 简单的 for 循环

```js
Array.prototype.forEach = function (callback, thisArg) {
  let index = 0

  while (index < this.length) {
    let keyVal = this[index]
    callback(keyVal, index, this)
    index++
  }
}
```
