let arr = [12, 3, 43, 546, 3, 3, 5, 6, 7, 8, 9, 5, 7, 78, 45]
//set去重
// let setArr = new Set(arr);
// let newArr = Array.from(setArr);
// console.log(newArr);

//双层for 循环
// const newArr = [];
// let isRepeat = false;
// for (let i = 0; i < arr.length; i++) {
//   isRepeat = false;
//   for (let j = i + 1; j < arr.length; j++) {
//     if (arr[i] === arr[j]) {
//       isRepeat = true;
//     }
//   }
//   if (!isRepeat) {
//     newArr.push(arr[i]);
//   }
// }

// console.log(newArr);

// indexOf底层实现也是for 循环，时间复杂度同双层for 循环
// let newArr = [];
// for (let i = 0; i < arr.length; i++) {
//   if (newArr.indexOf(arr[i]) === -1) {
//     newArr.push(arr[i])
//   }
// }
// console.log(newArr);

// filter + indexOf
// let newArr = arr.filter((item, index) => {
//   return arr.indexOf(item) === index
// })
// console.log(newArr);

//obj
// let obj = {}
// let newArr = [];
// for (let i = 0; i < arr.length; i++) {
//   if (!obj[arr[i]]) {
//     obj[arr[i]] = true;
//     newArr.push(arr[i])
//   }
// }
// console.log(newArr);

//　去重包含NaN, 1,"1" ,{}
let ary = [
  false,
  true,
  undefined,
  null,
  NaN,
  0,
  1,
  1,
  '1',
  '1',
  {},
  {},
  'a',
  'a',
  NaN,
]
let obj = {}
let newArr = ary.filter(item => {
  let key = typeof item + item
  return obj.hasOwnProperty(key) ? false : (obj[key] = true)
})
console.log(newArr)
