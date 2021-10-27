let timeId = null
function mySetInterval(fn, delay, ...arg) {
  const currentFn = function () {
    timeId = setTimeout(() => {
      fn.apply(this, arg)
      // 递归
      currentFn()
    }, delay)
  }

  currentFn()
}

function myClearInterval(id) {
  clearTimeout(id)
}

mySetInterval(() => {
  console.log(1111)
}, 1000)

setTimeout(() => {
  myClearInterval(timeId)
}, 4000)
