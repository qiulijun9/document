function MyPromise {

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