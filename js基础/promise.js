
function MyPromise (){

  this.status = 'pedding';
  this.value = undefined;
  this.reason = undefined;
  //成功态回调队列
  this.onFulfilledCallbacks = [];
  //拒绝态回调队列
  this.onRejectedCallbacks = [];
  const resolve = (data) => {
    if (this.status === 'pedding') {
      this.status = 'resolve';
      this.value = data;
      this.onFulfilledCallbacks.map(cb => {
        this.value = cb(this.value)
      })

    }
  }

  const reject = (data) => {
    if (this.status === "pedding") {
      this.status = "reject";
      this.reason = data;
      this.onRejectedCallbacks.map(cb => {
        this.reason = cb(this.reason);
      });
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

    this.onFulfilledCallbacks.push(onFulfilled);
    this.onRejectedCallbacks.push(onRejected);
  })
}

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}


//红绿灯问题
function red(){
  console.log("red");
}
function green(){
  console.log("green");
}
function yellow(){
  console.log("yellow")
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
  var self = this;
  self.onResolvedCallback = []; // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
  function resolve(value) {
    self.data = value
    self.onResolvedCallback.forEach(callback => callback(value))
  }

  //执行用户传入的函数
  excutor(resolve.bind(self))
}
Promise.prototype.then = function(onResolved) {
  var self = this;
  //返回新的Promise
  return new Promise(resolve =>{
    self.onResolvedCallback.push(function (){
      var result = onResolved(self.data);
      if(result instanceof Promise){
        //prpmise 被resolve 了then 
        result.then(resolve);
      }else{
        resolve(result);
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