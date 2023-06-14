function MyPromise() {
  this.status = "pedding";
  this.value = undefined;
  this.reason = undefined;
  //成功态回调队列
  this.onFulfilledCallbacks = [];
  //拒绝态回调队列
  this.onRejectedCallbacks = [];
  const resolve = (data) => {
    if (this.status === "pedding") {
      this.status = "resolve";
      this.value = data;
      this.onFulfilledCallbacks.map((cb) => {
        this.value = cb(this.value);
      });
    }
  };

  const reject = (data) => {
    if (this.status === "pedding") {
      this.status = "reject";
      this.reason = data;
      this.onRejectedCallbacks.map((cb) => {
        this.reason = cb(this.reason);
      });
    }
  };

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
MyPromise.prototype.then = function (onFufilled, onRejected) {
  return new MyPromise((resolve, reject) => {
    this.onFulfilledCallbacks.push(onFulfilled);
    this.onRejectedCallbacks.push(onRejected);
  });
};

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

// 简易版的 Promise

function Bromise(executor) {
  var onResolve_ = null;
  var onReject_ = null;
  this.then = function (onResolve, onReject) {
    onResolve_ = onResolve;
    onReject_ = onReject;
  };
  // 延迟绑定回调函数
  function resolve(value) {
    setTimeout(() => {
      onResolve_(value);
    }, 0);
  }
  // 延迟绑定回调函数
  function reject(err) {
    setTimeout(() => {
      onReject_(err);
    }, 0);
  }

  executor(resolve, reject);
}

//红绿灯问题
// function red() {
//   console.log('red')
// }
// function green() {
//   console.log('green')
// }
// function yellow() {
//   console.log('yellow')
// }

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
// function Promise(excutor) {
//   var self = this
//   self.onResolvedCallback = [] // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
//   function resolve(value) {
//     self.data = value
//     self.onResolvedCallback.forEach(callback => callback(value))
//   }

//   //执行用户传入的函数
//   excutor(resolve.bind(self))
// }

// Promise.prototype.then = function (onResolved) {
//   var self = this
//   //返回新的Promise
//   return new Promise(resolve => {
//     self.onResolvedCallback.push(function () {
//       var result = onResolved(self.data)
//       if (result instanceof Promise) {
//         //prpmise 被resolve 了then
//         result.then(resolve)
//       } else {
//         resolve(result)
//       }
//     })
//   })
// }

// new Promise(resolve => {
//   setTimeout(() => {
//     resolve(1)
//   }, 500)
// })
//   .then(res => {
//     console.log(res)
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(2)
//       }, 500)
//     })
//   })
//   .then(console.log)
// console.log("yy");
// Promise.resolve().then(() => {
//   console.log("Promise1");
//   setTimeout(() => {
//     console.log("setTimeout2");
//   }, 0);
// });

// setTimeout(() => {
//   console.log("setTimeout1");
//   Promise.resolve().then(() => {
//     console.log("Promise2");
//   });
// }, 0);

//

/**
 * 实现 promise.all 返回一个Promise 实例,接收一个Promise 数组
 * 1.如果有一个Promise 失败错误,则回调reject
 * 2.如果全部成功,返回完成状态结果的resolve 数组
 * 3.如果传入的是空的对象,则同步返回一个已完成的promise
 */
Promise.prototype.all = function (promiseArr) {
  let resultArr = [];
  let index = 0;
  return new Promise((resolve, reject) => {
    if (promiseArr.length === 0) {
      resolve(resultArr);
      return;
    }
    for (let i = 0; i < promiseArr.length; i++) {
      Promise.resolve(promiseArr[i])
        .then((data) => {
          resultArr[i] = data;
          index++;
          if (index === promiseArr.length) {
            return resolve(resultArr);
          }
        })
        .catch((err) => {
          return reject(err);
        });
    }
  });
};

//实现Promise.race 只要有一个执行完,resolve就停止执行
Promise.prototype.race = function (promiseArr) {
  return new Promise((resolve, reject) => {
    if (promiseArr.length === 0) {
      return;
    }
    for (let i = 0; i < promiseArr.length; i++) {
      Promise.resolve(promiseArr[i])
        .then((data) => {
          return resolve(data);
        })
        .catch((err) => {
          return reject(err);
        });
    }
  });
};

function myPromiseAll(arr, limit) {
  const result = [];
  let activeCount = 0;
  let index = 0;

  return new Promise((resolve, reject) => {
    const handNext = () => {
      if (index === arr.length) {
        resolve(result);
        return;
      }

      if (activeCount < limit) {
        const currentIndex = index;
        const promise = arr[currentIndex];

        index++;
        activeCount++;
        promise
          .then((res) => {
            result[currentIndex] = res;
            activeCount--;
            handNext();
          })
          .catch((err) => {
            return reject(err);
          });
      }
    };

    handNext();
  });
}

// async function asyncPool(limit, array) {
//   const ret = []; // 用于存放所有的promise实例
//   const executing = []; // 用于存放目前正在执行的promise
//   for (const item of array) {
//     const p = Promise.resolve(item); // 防止回调函数返回的不是promise，使用Promise.resolve进行包裹
//     ret.push(p);

//     if (limit <= array.length) {
//       // then回调中，当这个promise状态变为fulfilled后，将其从正在执行的promise列表executing中删除
//       const e = p.then(() => executing.splice(executing.indexOf(e), 1));
//       executing.push(e);
//       if (executing.length >= limit) {
//         // 一旦正在执行的promise列表数量等于限制数，就使用Promise.race等待某一个promise状态发生变更，
//         // 状态变更后，就会执行上面then的回调，将该promise从executing中删除，
//         // 然后再进入到下一次for循环，生成新的promise进行补充
//         await Promise.race(executing);
//       }
//     }
//   }

//   return Promise.all(ret);
// }

function myPromiseAllWithLimit(arr, limit) {
  const result = [];
  let index = 0;
  let activeCount = 0;

  return new Promise((resolve, reject) => {
    const runPromise = (promise) => {
      const currentIndex = index;
      index++;
      activeCount++;

      promise
        .then((res) => {
          result[currentIndex] = res;
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          activeCount--;
          if (index === arr.length) {
            resolve(result);
          } else {
            runNextPromise();
          }
        });
    };

    const runNextPromise = () => {
      while (activeCount < limit && index < arr.length) {
        const promise = arr[index];
        runPromise(promise);
      }
    };

    runNextPromise();
  });
}
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Resolved after ${time} ms`), time);
  });
}

const asyncTasks = [
  delay(200),
  delay(1000),
  delay(500),
  delay(800),
  delay(300),
];

myPromiseAllWithLimit(asyncTasks, 1)
  .then((results) => console.log("Results:", results))
  .catch((error) => console.error("Error:", error));
