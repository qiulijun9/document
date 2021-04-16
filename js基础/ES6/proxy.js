//Object.defineProperty 可以在一个对象上定义新属性，或者修改一个对象的现有属性
/**
 * Object.defineProperty(obj, prop, descriptor)
 * obj:定义属性的对象
 * prop:定义/修改属性的名称
 * descriptor：定义/修改属性的描述符
 */
let obj = {}
Object.defineProperty(obj, 'num', {
  value: 1,
  writable: true, //能否被修改
  enumerable: true, //是否能枚举
  configurable: true, //描述符能否被改变或修改
})
//封装监听数据改变的方法
function Archiver() {
  let value = null
  let archiver = []
  Object.defineProperty(this, 'num', {
    get: function () {
      console.log('执行了get')
      return value
    },
    set: function (val) {
      console.log('执行了set')
      value = val
      archiver.push({ val: value })
    },
  })
  this.getArchiver = function () {
    return archiver
  }
}

/**
 * vue2.0 中的双向绑定使用的是Object.defineProperty
 * 缺点：
 * 需要克隆一份原始对象
 * 需要给每个对象的属性设置监听
 *
 * vue3.0 使用的是Proxy
 * 监听对象,
 */

let arc = new Archiver()
arc.num = 11
arc.num = 12
console.log(arc.getArchiver())

//Proxy代理
let proxy = new Proxy(obj, {
  get: function (target, prop) {
    console.log('get')
    return target[prop]
  },
  set: function (target, prop, value) {
    console.log('set')
    target[prop] = value
  },
})
proxy.name = 'ss'
console.log(proxy.name)

//Proxy 封装代理监听方法
;(function () {
  function watch(target, fn) {
    const proxy = new Proxy(target, {
      get: function (target, prop) {
        return target[prop]
      },
      set: function (target, prop, value) {
        target[prop] = value
        fn(prop, value)
      },
    })
    return proxy
  }
  this.watch = watch
})()

const promise1 = new Promise((resolve, reject) => {
  console.log('promise1')
})
console.log('1', promise1)

new Promise((resolve, reject) => {
  reject('error')
})
  .then(
    res => {
      console.log(res)
    },
    err => {
      console.log('err::', err)
    },
  )
  .then(err => {
    console.log(11, err)
  })
  .catch(err => {
    console.log(22, err)
  })

Promise.resolve()
  .then(() => {
    console.log(0)
    return Promise.resolve(4)
  })
  .then(res => {
    console.log(res)
  })

Promise.resolve()
  .then(() => {
    console.log(1)
  })
  .then(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
  .then(() => {
    console.log(5)
  })
  .then(() => {
    console.log(6)
  })
