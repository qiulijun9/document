class PromiseQueue {
  constructor(options = {}) {
    this.concurrency = options.concurrency || 1
    this.currentCount = 0
    this.paddingList = []
  }

  add(task) {
    this.paddingList.push(task)
    this.run()
  }

  run() {
    if (
      this.paddingList.length === 0 ||
      this.currentCount === this.concurrency
    ) {
      return
    }

    this.currentCount++
    // const promise = this.pendingList.shift()
    // 以下排序是为了处理更高优先级的请求
    const { fn } = this.paddingList
      .sort((a, b) => a.priority - b.priority)
      .shift()
    const promise = fn()

    promise.then(() => this.completeOne()).catch(() => this.completeOne())
  }

  completeOne() {
    this.currentCount--
    this.run()
  }
}

const URLSearchParams = [
  {
    priority: 1,
    time: '1000',
    info: 'url1',
  },
  {
    priority: 2,
    time: '2000',
    info: 'url2',
  },
  {
    priority: 1,
    time: '1000',
    info: 'url3',
  },
  {
    priority: 1,
    time: '2000',
    info: 'url4',
  },
  {
    priority: 1,
    time: '3000',
    info: 'url5',
  },
]
function loadImag(url) {
  return new Promise((resolve, reject) => {
    console.log(url.info, 'start-------')

    setTimeout(() => {
      console.log(url.info, '-------ok')
      resolve()
    }, url.time)
  })
}

const queue = new PromiseQueue({ concurrency: 3 })

const formatTask = url => {
  return {
    fn: () => loadImag(url),
    priority: url.priority,
  }
}

// 加入优先级
// URLSearchParams.forEach(url => {
//   queue.add(formatTask(url))
// })

// const hightPriorityTask = {
//   priority: 10,
//   time: '1000',
//   info: 'height---',
// }
// queue.add(formatTask(hightPriorityTask))

function createRequest(limit) {
  let count = 0
  const pool = []

  return function request(options, _resolve, _reject) {
    return new Promise((__resolve, __reject) => {
      const resolve = _resolve || __resolve
      const reject = _reject || __reject

      if (count <= limit) {
        pool.push({ options, resolve, reject })
        return
      }

      count++

      fetch(options)
        .then(res => resolve(res))
        .catch(err => reject(err))
        .finally(() => {
          count--

          const { options, resolve, reject } = pool.shift()
          request(options, resolve, reject)
        })
    })
  }
}

function createRequests(limit) {
  const pendingList = []
  let count = 0

  return function request(options, _resolve, _reject) {
    return new Promise((resolve, reject) => {
      if (count >= limit) {
        pendingList.push({ options, resolve, reject })
        return
      }
      count++

      fetch(options)
        .then(res => resolve(res))
        .catch(err => reject(err))
        .finally(() => {
          count--
          const { options, resolve, reject } = pool.shift()
          request(options, resolve, reject)
        })
    })
  }
}

function createNewRequest(rejectCount, promiseArr) {
  const result = []
  let rejectCnt = 0
  let resolveCnt = 0

  return new Promise((resolve, reject) => {
    promiseArr.forEach((promise, index) => {
      promise
        .then(data => {
          resolveCnt++
          result[index] = data

          if (resolveCnt === promiseArr.length) {
            resolve(result)
          }
          console.log(data)
        })
        .catch(err => {
          rejectCnt++
          if (rejectCnt === rejectCount) {
            reject(err)
            new Function()
          }
        })
    })
  })
}

let p1 = Promise.resolve(1)
let p2 = Promise.resolve(2)
let p3 = Promise.reject(3)
let p4 = Promise.resolve(4)

createNewRequest(1, [p1, p2, p3, p4]).then(res => {
  console.log(999999999, res)
})

function limitLoad(urls, handler, limit) {
  const sequence = [].concat(urls)
  let promises = []

  promises.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      return index
    })
  })

  // 返回promise 最快执行的结果
  let p = Promise.race(promises)

  for (let i = 0; i < sequence.length; i++) {
    p = p.then(res => {
      promises[res] = handler(sequence[i]).then(res => res)
      return Promise.race(promises)
    })
  }
}
