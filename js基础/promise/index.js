function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}

function promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      const argsWithCallback = [
        ...args,
        function (error, content) {
          if (error) {
            return reject(error)
          }
          resolve(content)
        },
      ]

      func.apply(func, argsWithCallback)
    })
  }
}
function initMoveObserver() {
  //...

  const handlers = [
    on('mousemove', updatePosition, doc),
    on('touchmove', updatePosition, doc),
    on('drag', updatePosition, doc),
  ]
  return () => {
    handlers.forEach(h => h())
  }
}
