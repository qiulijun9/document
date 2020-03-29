let arr = [12, 3, 43, 546, 3, 3, 5, 6, 7, 8, 9, 5, 7, 78, 45]
//set去重
// let setArr = new Set(arr);
// let newArr = Array.from(setArr);
// console.log(newArr);

//双层for 循环
const newArr = [];
let isRepeat = false;
for (let i = 0; i < arr.length; i++) {
  isRepeat = false;
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[i] === arr[j]) {
      isRepeat = true;
    }
  }
  if (!isRepeat) {
    newArr.push(arr[i]);
  }
}

console.log(newArr);


// indexOf
// let newArr = [];
// for (let i = 0; i < arr.length; i++) {
//   if (newArr.indexOf(arr[i]) === -1) {
//     newArr.push(arr[i])
//   }
// }
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