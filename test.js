let timeId = 0
const mySetInterval = (callback, time) => {
  const fn = () => {
    callback()

    timeId = setTimeout(() => {
      fn()
    }, time)
  }

  timeId = setTimeout(() => {
    fn()
  }, time)
  return timeId
}

const myClearInterval = id => {
  clearTimeout(timeIdMap[id])
  delete timeIdMap[id]
}
// const timer = mySetInterval(() => {
//   console.log(new Date())
// }, 1000)

// console.log(999, timer)
// myClearInterval(2000)

const deps = {
  'a.js': { deps: ['b.js', 'e.js'] },
  'b.js': { deps: ['c.js'] },
  'c.js': { deps: ['d.js'] },
  'd.js': { deps: ['a.js'] },
}

function checkCircularReference(obj) {
  let result = []
  let flag = false
  for (let key of Object.keys(obj)) {
    if (flag) {
      break
    }

    const checkItem = (dep, depsMemo, chain) => {
      if (depsMemo[dep]) {
        flag = true
        result = [...chain, dep]
        return
      }
      depsMemo[dep] = true
      chain.push(dep)

      obj[dep]?.deps.forEach(item => {
        checkItem(item, depsMemo, [...chain])
      })
    }
    checkItem(key, {}, [])
  }
  return result
}
console.log(checkCircularReference(deps))
