//柯里化 是将一个多个参数的函数转换成接收单一参数的技术,

function curry1(fn) {
  let args = [].slice.call(arguments, 1)
  return function () {
    let newArgs = args.concat([].slice.call(arguments))
    return fn.apply(this, newArgs)
  }
}
// fn 需要被柯里化的函数
function curry(fn, args) {
  let length = fn.length //fn.length fn 参数的个数
  args = args || []
  return function () {
    let _args = args.slice(0)
    for (let i = 0; i < arguments.length; i++) {
      _args.push(arguments[i])
    }
    if (_args.length >= length) {
      return fn.apply(this, _args)
    } else {
      return curry.call(this, fn, _args)
    }
  }
}
function curry(fn, ...args) {
  if (args.length >= fn.length) {
    fn(...args)
  } else {
    ;(...args) => curry(fn, ...args, ...args)
  }
}
function dsd() {}
function add(a, b) {
  return a + b
}
const fn = curry(function (a, b, c) {
  console.log([a, b, c])
})

fn('a', 'b', 'c')
fn('a', 'b')('c')
fn('a')('b')('c')

// const addCurry = curry1(add);
// console.log(addCurry(2, 3));
