// 冒泡排序
// 两两对比，大的数字往后放，每轮冒泡完成后确定一个排序好的值。 当只剩下一个数的时候就不用再冒泡了。比如 比较6个数只需要冒泡 5次即可
// 时间复杂度  O(n²)
// 空间复杂度 O(n)

function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let flag = false;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        flag = true;
      }
    }

    if (!flag) {
      break; // 当前值都是顺序是有序时 提前结束冒泡 ，比如在第四轮的时候已经比较完成是排序好的了，就提前退出排序
    }
  }

  return arr;
}

// console.log(222, bubbleSort([1, 6, 4, 6, 43, 3]));

// 快速排序  是冒泡排序的一种改进
// 在待排序的数组中定义一个中位数（pivot）,比该数小的值放入左侧数组, 比该数大的放入右侧数组
// 对左右数组递归调用排序 使其都是有序的,
// 递归数组只剩一个时则return arr
// 平均时间复杂度 O(nlogn) 最快的情况是  O(n²)
// 空间复杂度 O(log n) ,递归每次都要重新创建两个数组

function quickSort(arr) {
  if (arr.length < 1) {
    return arr;
  }
  const left = [];
  const right = [];
  // const pivotIndex = Math.floor(arr.length / 2);
  // const pivot = arr.splice(pivotIndex, 1)[0];
  const pivot = arr.splice(0, 1)[0]; // 中位数可以随便取

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// console.log(88888, quickSort([1, 6, 4, 6, 43, 3]));

// 选择排序
// 在未排序的数组中，找出最小字的数字放入数组的起始位置
// 每轮结束后都确定一个最小的数字
// 时间复杂度 O(n²)
// 空间复杂度 O(n)

function SelectionSort(arr) {
  let minIndex = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    minIndex = i;
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j; // 找出最小的数字
      }
    }
    // 放入最小值到数组的起始位置
    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }

  return arr;
}

// console.log(SelectionSort([1, 6, 4, 6, 43, 3]));

// 插入排序
// 像插入扑克牌一样， 先拿一张牌，再拿一张牌，排序的放一手， 新插入判断顺序插入

function insertSort(arr) {
  let preIndex = 0;
  let current = 0;
  for (let i = 1; i < arr.length; i++) {
    preIndex = i - 1;
    current = arr[i];

    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}

console.log(insertSort([1, 6, 4, 6, 43, 3]));
