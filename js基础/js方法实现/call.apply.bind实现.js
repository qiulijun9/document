/**
 * 模拟实现call 
 * call() 方法是使用一个指定的this和若干个参数的前提下调用某个函数或是方法
 * 思路：
    1. 将函数设为该对象的属性
    2. 执行该函数
    3. 删除该函数

* Function.prototype.myCall = function (context){
*     context.fn = this;
*     context.fn();
*     delete context.fn;
* }
 * 
 * 
 * */

var foo = {
  value: 1,
}
function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value) //1
  return {
    value: this.value,
    name: name,
    age: age,
  }
}

// call 实现 es5
// Function.prototype.myCall = function (context) {
//   var context = context || window
//   context.fn = this
//   let args = []
//   for (let i = 1; i < arguments.length; i++) {
//     args.push('arguments[' + i + ']')
//   }
//   let result = eval('context.fn(' + args + ')')
//   delete context.fn
//   return result
// }

// bar.myCall(foo, 'lili', 20)

// call 实现 es6
// Function.prototype.myCall = function (context) {
//   context = context || window
//   context.fn = this
//   const arg = [...arguments].slice(1)
//   const result = context.fn(...arg)

//   delete context.fn

//   return result
// }
// bar.myCall(foo, 'lili', 20)

/**
 *
 * apply 实现同call 一样，只是参数的形式不一样
 */

// apply 实现 es5
// Function.prototype.myApply = function (context, arr) {
//   var context = context || window
//   context.fn = this
//   var arg = []

//   for (let i = 0; i < arr.length; i++) {
//     arg.push('arr[' + i + ']')
//   }

//   let result = eval('context.fn(' + arg + ')')
//   delete context.fn
//   return result
// }

// apply 实现 es6
// Function.prototype.myApply = function (context) {
//   context = context || window
//   context.fn = this
//   const arg = arguments[1]

//   const result = context.fn(...arg)
//   delete result
// }

// bar.myApply(foo, ['lili', 20])

/**
 * bind  接收参数，返回函数
 *
 * Function.prototype.myBind = function(context){
 *   var self = this
 *   return function(){
 *     self.apply(context)
 *   }
 * }
 */

Function.prototype.myBind = function (context) {
  var self = this
  //获取myBind 参数从第二个到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1)
  var fNOP = function () {}

  var fbound = function () {
    const bindArgs = Array.prototype.slice.call(arguments)
    self.apply(this instanceof self ? this : context, args.concat(bindArgs))
  }
  fNOP.prototype = this.prototype
  fbound.prototype = new fNOP()
  return fbound
}

bar.myBind(foo, '234', '3')()
