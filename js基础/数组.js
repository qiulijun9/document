/**
 * splice 
  删除数组某一项(会改变原数组) splice(index,删除个数，[添加元素可选])
 * 
 *  */

let arr = [1, 2, 3, 4];
arr.splice(1, 1);
console.log(arr); //1,3,4
let arr2 = [1, 2, 3, 4];
arr.splice(1, 1, 5);
console.log(arr2); //1,5,3,4

/**
 * 
  截取数组(不会改变原数组，会生成新数组)slice(start位置index,end不包含end)
  slice(start) 不设置end默认截取到数组尾部
  slice(start,end) 包含起始，不包含结束
 */

let arr3 = [1, 2, 3, 4];
// console.log( arr3.slice(1));// 2 3 4
// console.log( arr3 );//1 2 3 4
// console.log( arr3.slice(1,3));//  2 3
// console.log( arr3 );//1 2 3 4
console.log(999, arr3.slice(0));

// push() 向数组末尾添加元素，返回数组长度
let arrp = [2, 3, 4];
//console.log(arrp.push(5),arrp);//4 [2,3,4,5]

//pop() 删除末尾元素,返回被删除的元素
// console.log( arrp.pop())//4

//shift()删除数组第一个元素，返回被删除元素
//console.log( arrp.shift(),arrp)//2 [3,4]

//unshift() 向数组开头添加元素，返回数组的长度
//console.log(arrp.unshift(1),arrp)

//reverse ()反转数组
//console.log(arrp.reverse())//[4,3,2]

//concat() 连接两个数组
//console.log(arrp.concat([3,4,5]))//[ 2, 3, 4, 3, 4, 5 ]

//join() 通过指定的分隔符来分隔成字符串，返回的是字符串
console.log(arrp.join('..'), typeof arrp.join('..')); //2..3..4 string

//判断数组中是否包含某个值
//indexOf ,如果存在返回元素下标，否则返回-1，实现原理也是通过for循环来返回下标值

let arr4 = [3, 4, 5, 6, 7, 7];
console.log(arr4.indexOf(7)); //4

// includes 如果存在返回true,否则返回fasle

console.log(arr4.includes(3)); // true

//find(callback) 返回满足条件的第一元素的值，没有返回undefined
let result = arr4.find(item => {
	return item > 3;
});
console.log(result);

//findIndex(callback) 返回满足条件的第一元素的下标，没有返回-1
let result2 = arr4.findIndex(item => {
	return item > 3;
});
// console.log(result2);

//sort 排序 返回排序好的数组,参数必须是函数,默认是按升序排列的,是按字符串的unicode 编码来进行排序
let err = ['George', 'John', 'Thoma', 'James', 'Adrew', 'Martin'];
// console.log(err.sort());
// let err = [2, 353, 4, 2, 34, 5, 66, 0];
console.log(
	err.sort((a, b) => {
		return a - b;
	})
);
// sort 还可以对对象的属性进行排序,通过传入的参数来进行排序
let obj = [
	{ name: 'a', age: 21 },
	{ name: 'b', age: 20 },
	{ name: 'c', age: 22 },
];
let newObj = obj.sort((a, b) => {
	return a.age - b.age;
});
// console.log(111, newObj);

//filter(fnunction(currentValue,index,arr),this)  根据函数返回一个过滤后(符合条件)的新数组,不会改变原数组

let farr = [11, 34, 45, 6, 8, 9];
console.log(
	farr.filter(a => {
		return a > 10;
	})
);

// reduce(function(累加器上一次返回的值,当前值,index,array),初始值) 不会改变原数组

let rarr = [1, 2, 3, 4];
let results = rarr.reduce((perval, currentVal, index) => {
	return perval + currentVal;
}, 0);
console.log(rarr, results);
// reduce  应用
//reduce 去重
let arrR = [1, 2, 3, 1, 3, 4, 5, 6, 3];
// let arrRes = arrR.reduce((pre, value, index) => {
// 	if (!pre.includes(value)) {
// 		return pre.concat(value);
// 	} else {
// 		return pre;
// 	}
// }, []);

// reduce 扁平化数组
let flarr = [1, 2, [3, 4], [[[3, 5, 6]]]];
// let arrRes = function (arr) {
// 	return arr.reduce((pre, val) => {
// 		return pre.concat(Array.isArray(val) ? arrRes(val) : val);
// 	}, []);
// };

//reduce  计算元素出现的次数
let reduceCountArr = [1, 2, 3, 4, 4, 5, 5];
let reduceCountRes = reduceCountArr.reduce((pre, val) => {
	let count = 0;
	if (val in pre) {
		pre[val]++;
	} else {
		pre[val] = 1;
	}
	return pre;
}, {});

console.log(5555, reduceCountRes);

//数组扁平化
let ary = [1, [2, [3, [4, 5]]], 6];

// 方法一  console.log(ary.flat(Infinity))
let str = JSON.stringify(ary);
//方法二 console.log(str.replace(/(\[|\])/g,'').split(","))；

function flat(arr) {
	let arrs = [];
	arr.forEach(item => {
		if (Array.isArray(item)) {
			arrs = arrs.concat(flat(item));
		} else {
			arrs.push(item);
		}
	});
	return arrs;
}
console.log(11111, flat(flarr));

function getBrackets(len) {
	let str = '';
	for (let i = 0; i <= len; i++) {
		if (Math.floor(Math.random() * 10) >= 5) {
			str += '(';
		} else {
			str += ')';
		}
	}
	return str;
}

let str2 = getBrackets(8);
console.log(str2);

let s = '()())()((';

function getNotBracketsIndex(str) {
	let arr = [];
	for (let i = 0; i < str.length; i++) {
		if (str[i] === '(') {
			arr.push(i);
		} else {
			arr.pop();
		}
	}
	return arr;
}
console.log(getNotBracketsIndex(s));

// 很大的两个数相加
let a = '9007199254740991';
let b = '1234567899999999999';
function add(a, b) {
	let maxLength = Math.max(a.length, b.length);
	a = a.padStart(maxLength, 0);
	b = b.padStart(maxLength, 0);
	let t = 0;
	let f = 0;
	let sum = '';
	for (let i = maxLength - 1; i >= 0; i--) {
		t = parseInt(a[i]) + parseInt(b[i]) + f;
		f = Math.floor(t / 10);
		sum = (t % 10) + sum;
	}
	if (f == 1) {
		sum = '1' + sum;
	}
	return sum;
}
console.log(add(a, b));

//数组转数字
let arrn = [2, 3, 5, 6, 7];
let strn = arrn.join('');
//  console.log(parseInt(strn));

//类数组转数组  Array.prototype.slice.apply(类数组) 把类数组当做参数传入数组
