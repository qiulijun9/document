/**
 * typeof 对原始类型来除了null 都可以判断,返回的是字符串， null 返回 object
 *        对引用类型的不能判断返回的都是object
 */
console.log(typeof 'str') //string
console.log(typeof 123) //number
console.log(typeof true) //boolean
console.log(typeof undefined) //undefined
console.log(typeof 3n) //bigint
console.log(typeof Symbol()) //symbol
function a() {}
console.log(typeof a) //function
console.log(typeof null) //object
console.log(typeof {}) //object
console.log(typeof []) //object
var date = new Date()
console.log(typeof date) //object
var error = new Error()
console.log(typeof error) //object

/**
 * instanceof 不能检测基本类型,主要检测某构造函数的原型对象是不是在对象的原型链上
 * instanceof 可以用来判断对象,返回true/false，instanceof 是基于原型链的查询，只要处于原型链就为true
 * 
 * 
 * ## 装箱转换

装箱转换就是包装后的对象
基础类型的包装类,装箱转换
在调用.或［］时，会自动调用装箱过程
1 => new Number(1)，
aaa => new String(aaa),
true => new Boolean(true),
Symbol(a) => new Object(Symbol(a))

## 拆箱转换

把 object 转换成基本的类型
对象的转换会调用这几个方法 toString, value of ,symbol.toPrimitive
进行加法运算时会调用 toString 方法，eg,new Number(1) + 1 = 2

```js

 */
console.log('------------------')
const str = 'ste'
console.log(str instanceof String) //false
const str1 = new String()
console.log(str1 instanceof String) //true
console.log(new String('aa') instanceof String) // true 存在装箱转换，所以 new String('aa') instanceof String 为true
console.log(String('aa') instanceof String) //false   String() 方法会默认调用toString 方法，转成string 类型
console.log('instanceof', {} instanceof Object) //true
console.log({} instanceof Object) //true
console.log([] instanceof Array) //true

/**
 * 判断为null 的方法
 */
function isNull(val) {
  if (val === null) {
    return true
  }
  return false
}
function isNull2(val) {
  if (!val && val !== undefined && val != 0) {
    return true
  }
  return false
}
console.log(111, isNull2({}))

// 判断NaN   NaN不等于 === NaN
console.log('nan', isNaN(NaN))
//Object.is() 比较两个对象完全相等
console.log(Object.is(NaN, NaN))

/**
 * 判断数组
 *
 */
let arra = [34, 4, 6, 7]
console.log('判断数组', arra instanceof Array)
console.log(Object.prototype.toString.call(arra) === '[object Array]')
console.log("'判断数组2'", arra.__proto__ === Array.prototype)
console.log(33, Array.isArray(arra)) //Array.isArray()也是用Object.prototype.toString.call 来实现的
//instanceof 能否判断基本类型？？？？  能，需通过symbol.hasInstance方法重写instanceof 方法
class yanzhengNumber {
  static [Symbol.hasInstance](x) {
    return typeof x === 'number'
  }
}
console.log('isNumber', 111 instanceof yanzhengNumber)

//自己实现instanceof

function myInstanceof(left, right) {
  //如果是基本类型返回false
  if (typeof left !== 'object' || left === null) return false
  //Object.getProtypeOf 可以拿到参数的原型对象
  let proto = Object.getPrototypeOf(left)
  while (true) {
    if (proto === null) {
      return false
    }
    //如果原型对象=== 对象的原型
    if (proto === right.prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
}
console.log(myInstanceof(new String('111'), String)) //true

/**
 * Object.prototype.toString
 * 会返回一个由 "[object " 和 class 和 "]" 组成的字符串
 * class 是要判断的类型的内部属性
 */
console.log('------------------')
console.log(Object.prototype.toString.call(1)) //"[object Number]"
console.log(Object.prototype.toString.call('sfsdf')) //"[object String]"
console.log(Object.prototype.toString.call(true)) // "[object Boolean]"
console.log(Object.prototype.toString.call(null)) //"[object Null]"
console.log(Object.prototype.toString.call(undefined)) //"[object Undefined]"
console.log(Object.prototype.toString.call({ name: 'xue' })) //"[object Object]"
console.log(Object.prototype.toString.call(() => {})) // "[object Function]"
console.log(Object.prototype.toString.call(['A', 'b', 'c'])) //"[object Array]"
console.log(Object.prototype.toString.call(date)) //"[object Date]"
console.log(Object.prototype.toString.call(error)) //"[object Error]"
console.log(Object.prototype.toString.call(/a/g)) //"[object RegExp]"
console.log(Object.prototype.toString.call(Math)) // [object Math]
console.log(Object.prototype.toString.call(JSON)) // [object JSON]

// function foo() {
//   console.log(123)
// }
// foo()
// function foo() {
//   console.log(234)
// }
// foo()

// foo()

// function foo() {
//   console.log(123)
// }

// var foo = 456

// showName()
// var showName = function () {
//   console.log(2)
// }
// function showName() {
//   console.log(1)
// }

// foo2() // 123  忽略 var foo2 的声明
// function foo2() {
//   console.log(123)
// }

// var foo2 = 456
// console.log(foo2)
// function f() {
//   var a = 2
//   console.log(a)

//   {
//     let a = 3
//     console.log(a)
//   }
// }

// f()

let foo = () => bar
let bar = 'bar'
console.log(foo())

var myname = '极客时间'
function showName() {
  console.log(myname)
  if (1) {
    var myname = '极客邦'
    console.log(1)
  }
  console.log(myname)
}
showName()

function myInstanceOf(left, right) {
  // 基本类型
  if (typeof left !== 'object' || left === null) {
    return false
  }
  let O = left.__proto__

  while (true) {
    if (O === null) {
      return false
    }

    if (O === right.prototype) {
      return true
    }
    O = O.__proto__
  }
}

console.log(myInstanceOf({ a: '1' }, Object))
