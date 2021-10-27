const arr = [1, 2, [3], [[4, 5], 6], [[[7, 8], 9], 10]]
// 方法一
// console.log(arr.flat(Infinity))

// 方法二

function myFloat(arr) {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (Array.isArray(item)) {
      newArr = newArr.concat(myFloat(item))
    } else {
      newArr.push(item)
    }
  }
  return newArr
}

// console.log(myFloat(arr))

// 方法三
function myfloat2(arr) {
  return arr.reduce((pre, current) => {
    return pre.concat(Array.isArray(current) ? myfloat2(current) : current)
  }, [])
}
// console.log(myfloat2(arr))

// 方法四

function myfloat3(arr) {
  const newArr = []

  arr.forEach(item => {
    if (Array.isArray(item)) {
      newArr.push(...arguments.callee(item))
    } else {
      newArr.push(item)
    }
  })
  return newArr
}

console.log(myfloat3(arr))
