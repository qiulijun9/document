const obj = {};
for (let i = 0; i < len; i++) {
  !obj[arr[i]] && obj[arr[i]] = true && newArr.push(arr[i]);
}

const arr = [NaN, 1, 1, null, null, NaN, 2];
const newArr = [];
let isHaveNaN = false;
for (let i = 0; i < arr.length; i++) {
  const current = arr[i];
  let s = true;
  for (let j = i + 1; j < arr.length; j++) {
    if (current === arr[j]) {
      s = false;
    }
  }
  if (s) {
    if (Number.isNaN(current) && !isHaveNaN) {
      newArr.push(current);
      isHaveNaN = true;
    }
    if (!isHaveNaN) {
      newArr.push(current);
    }
  }
}

console.log(newArr)