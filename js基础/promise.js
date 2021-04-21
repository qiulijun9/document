function MyPromise() {
  this.status = 'pedding'
  this.value = undefined
  this.reason = undefined
  //成功态回调队列
  this.onFulfilledCallbacks = []
  //拒绝态回调队列
  this.onRejectedCallbacks = []
  const resolve = data => {
    if (this.status === 'pedding') {
      this.status = 'resolve'
      this.value = data
      this.onFulfilledCallbacks.map(cb => {
        this.value = cb(this.value)
      })
    }
  }

  const reject = data => {
    if (this.status === 'pedding') {
      this.status = 'reject'
      this.reason = data
      this.onRejectedCallbacks.map(cb => {
        this.reason = cb(this.reason)
      })
    }
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}
MyPromise.prototype.then = function (onFufilled, onRejected) {
  return new MyPromise((resolve, reject) => {
    this.onFulfilledCallbacks.push(onFulfilled)
    this.onRejectedCallbacks.push(onRejected)
  })
}

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

// 简易版的 Promise

function Bromise(executor) {
  var onResolve_ = null
  var onReject_ = null
  this.then = function (onResolve, onReject) {
    onResolve_ = onResolve
    onReject_ = onReject
  }
  // 延迟绑定回调函数
  function resolve(value) {
    setTimeout(() => {
      onResolve_(value)
    }, 0)
  }
  // 延迟绑定回调函数
  function reject(err) {
    setTimeout(() => {
      onReject_(err)
    }, 0)
  }

  executor(resolve, reject)
}

/**
 * promise.all 返回一个Promise 实例,接收一个Promise 数组
 * 1.如果有一个Promise 失败错误,则回调reject
 * 2.如果全部成功,返回完成状态结果的resolve 数组
 * 3.如果传入的是空的对象,则同步返回一个已完成的promise
 */
Promise.prototype.all = function (promiseArr) {
  let resultArr = []
  let count = 0
  return new Promise((resolve, reject) => {
    if (promiseArr.length === 0) {
      resolve(resultArr)
      return
    }
    for (let i = 0; i < promiseArr.length; i++) {
      Promise.resolve(promiseArr[i])
        .then(data => {
          resultArr[i] = data
          count++
          if (count === promiseArr.length) {
            resolve(resultArr)
          }
        })
        .catch(err => {
          reject(err)
        })
    }
  })
}

// let p1 = Promise.resolve(1),
//   p2 = Promise.resolve(2),
//   p3 = Promise.resolve(3)

let p1 = Promise.reject(1),
  p2 = Promise.resolve(2),
  p3 = Promise.resolve(3)

function myPromiseAll(promises) {
  let resultArr = []
  let count = 0

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then(data => {
          resultArr[index] = data
          count++

          if (count === promises.length) {
            resolve(resultArr)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  })
}

myPromiseAll([p1, p2, p3])
  .then(res => console.log('res', res))
  .catch(err => {
    console.log('err', err)
  })

//Promise.race 只要有一个执行完,resolve就停止执行
Promise.prototype.race = function (promiseArr) {
  return new Promise((resolve, reject) => {
    if (promiseArr.length === 0) {
      return
    }
    for (let i = 0; i < promiseArr.length; i++) {
      Promise.resolve(promiseArr[i])
        .then(data => {
          resolve(data)
          return
        })
        .catch(err => {
          reject(err)
          return
        })
    }
  })
}

//红绿灯问题
function red() {
  console.log('red')
}
function green() {
  console.log('green')
}
function yellow() {
  console.log('yellow')
}

// function light(timmer, cb){
//   return new Promise(function(resolve, reject){
//     setTimeout(()=>{
//       cb();
//       resolve();
//     },timmer)
//   })
// }

// function step (){
//   Promise.resolve().then(function(){
//     return light(3000,red);
//   }).then(function(){
//     return light(2000,green);
//   }).then(function(){
//     return light(1000,yellow)
//   }).then(function(){
//     step();
//   })
// }
// step();

//实现Promise promise构造函数
function Promise(excutor) {
  var self = this
  self.onResolvedCallback = [] // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
  function resolve(value) {
    self.data = value
    self.onResolvedCallback.forEach(callback => callback(value))
  }

  //执行用户传入的函数
  excutor(resolve.bind(self))
}

Promise.prototype.then = function (onResolved) {
  var self = this
  //返回新的Promise
  return new Promise(resolve => {
    self.onResolvedCallback.push(function () {
      var result = onResolved(self.data)
      if (result instanceof Promise) {
        //prpmise 被resolve 了then
        result.then(resolve)
      } else {
        resolve(result)
      }
    })
  })
}

new Promise(resolve => {
  setTimeout(() => {
    resolve(1)
  }, 500)
})
  .then(res => {
    console.log(res)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2)
      }, 500)
    })
  })
  .then(console.log)
