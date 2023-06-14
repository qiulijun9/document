# 反转链表 
```js

function reverseList(head){
    if(head === null || head.next === null){
        return head;
    }
    const last = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return last;
}
```

# k 个链表反转

```js
function reverse(a,b){
    let pre =null;
    let current = a;
    let next = a;

    while(current !== b){
        next = current.next;
        current.next =pre;
        pre = current;
        current = next;
    }
    return pre;
}

function reverseKGroup(head,k){
  if(head === null){
      return null
  }

  let a = head;
  let b = head;

  for(let i =0;i< k;i++){
      if(b === null){
          return head
      }
      b= b.next
  }

  let newHead = reverse(a,b);
  a.next = reverseKGroup(b,k);
  return newHead;
}
```

# 有效的括号
```js
function isValid(str) {
  let arr = [];
  let map = {
    ")": "(",
    "]": "[",
    "}": "}",
  };
  str.forEach((item) => {
    if (item === "(" || item === "[" || item === "{") {
      arr.push(item);
    } else if (map[item] !== arr.pop()) {
      return false;
    }
  });

  return arr.length;
}
```

# 最长有效括号

# 两个有序数组 第k大

# b 是不是 a 的子树


```js
function isSubTree(root,subRoot){
    if(root ===null){
        return false
    }

    if(compare(root,subRoot)){
     return true
    }

    return isSubTree(root.left,subRoot) || isSubTree(root.right,subRoot);
}


function compare(left,right){

    if(left === null && right === null){
        return  true;
    }else if(left === null && right !== null || 
             right === null && left !== null ||
             left.val !== right.val
    ){
      return false
    }


    return compare(left.left,right.left) && compare(left.right,right.right)

}
```


# 接雨水

```js
var trap2 = function (height) {
   let res = 0;
   let left =0;
   let right = height -1;
   let l_max =0;
   let r_max =0;

   while(left < right){
    l_max =Math.max(l_max,height[left]);
    r_max =Math.max(r_max,height[right]);

    if(l_max < r_max){
      res += l_max - height[left];
      left++;
    }else{
      res += r_max - height[right];
      right--;
    }
   }
   return res;
}
```

# 两数之和
```js

  function twoSum(nums,target){
      let map =new Map();

      for(let i =0;i <nums.length;i++){
          if(map.has(target -nums[i])){
              return [map.get(target -nums[i]),i]
          }
          else{
              map.set(nums[i],i)
          }
      }
  }
```


# 冒泡排序
```js 
function bubbleSort(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
      }
    }
  }
  return nums;
}
```
# 快速排序

```js
function quickSort(nums){
    let left =[];
    let right = [];

    let index = Math.floor(nums.length / 2);
    let base = nums.splice(index, 1)[0];

    for (let i = 0; i < nums.length; i++) {
        if(nums[i] > base){
         right.push(nums[i]) 
        }else{
         left.push(nums[i])
        }
    }

    return quickSort(left).concat(base).concat(quickSort(right));

}
```


# 实现了将一个由键值对对象组成的数组转换成一个键为对象中key属性值、值为value属性值的对象
function change(arr) {
    return arr.reduce((pre, { key, value }) => {
        pre[key] = value;
        return pre
    }, {})
}
​
let a = change([{ key: 'a', value: '1' }, { key: 'b', value: '2' }])
console.log(a)

# 代码题，已知数据格式，实现一个函数 fn ，给一个 id 找出链条中其对应的所有的父级 name （用DFS写了一遍）能用广度优先写一遍吗？


# 找一个字符串中最长的不含重复字符的子串，滑动窗口可做。



# 实现一个并发量限制函数 例子如下


//function fetch(url) {
//  return Promise.resolve(url);
//}

// let urls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
// promiseLimit(urls, 3).then(resList => console.log(resList));
// 并发量限制

function promiseLimit(urls, limit) {
  // ... 具体实现
}


```js
function promiseLimit(urls, limit) {
  const results = [];
  let currentIndex = 0;
  let activeCount = 0;

   const handleNextRequest = () => {
      if (results.length === urls.length) {
        return resolve(results);
      }

      if (activeCount > limit) {
        setTimeout(() => {
          handleNextRequest;
        }, 10000);
        return;
      }

      const currentUrl = urls[currentIndex];
      currentIndex++
      activeCount++;
      
      fetch(currentUrl)
        .then((result) => {
          results.push(result);
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
           activeCount--;
           handleNextRequest();
        });
    };



  return new Promise((resolve, reject) => {
   
   urls.forEach(() => {
      handleNextRequest();
    });
    
  });
}

function fetch(url) {
  return Promise.resolve(url);
}

let urls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
promiseLimit(urls, 3).then((resList) => console.log(resList));
```

# 实现一个curry
```js
function curry(fn){
  return  function curried(...args){
    if(args.length >= fn.length){
      return fn.apply(this,args)
    }else{
      return function (...moreArg){
        return curried.apply(this,args.concat(moreArg))
      }
    }

  }
}
```