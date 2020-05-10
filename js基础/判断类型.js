/**
 * typeof 对原始类型来除了null 都可以判断,返回的是字符串， null 返回 object
 *        对引用类型的不能判断返回的都是object
 */
console.log(typeof 'str'); //string
console.log(typeof 123); //number
console.log(typeof true); //boolean
console.log(typeof undefined); //undefined
console.log(typeof 3n); //bigint
console.log(typeof Symbol()); //symbol
console.log(typeof null); //object
console.log(typeof {}); //object
console.log(typeof []); //object

/**
 * instanceof 不能检测基本类型,主要检测某构造函数的原型对象是不是在对象的原型链上
 * instanceof 可以用来判断对象,返回true/false，instanceof 是基于原型链的查询，只要处于原型链就为true
 */
console.log('------------------');
const str = 'ste';
console.log(str instanceof String); //false
const str1 = new String();
console.log(str1 instanceof String); //true
console.log({} instanceof Object); //true
console.log([] instanceof Array); //true

/**
 * 判断为null 的方法
 */
function isNull(val) {
	if (val === null) {
		return true;
	}
	return false;
}
function isNull2(val) {
	if (!val && val !== undefined && val != 0) {
		return true;
	}
	return false;
}
console.log(111, isNull2({}));

// 判断NaN   NaN不等于 === NaN
console.log('nan', isNaN(NaN));
//Object.is() 比较两个对象完全相等
console.log(Object.is(NaN, NaN));

/**
 * 判断数组
 *
 */
let arra = [34, 4, 6, 7];
console.log(33, arra instanceof Array);
console.log(Object.prototype.toString.call(arra) === '[object Array]');
console.log(33, Array.isArray(arra)); //Array.isArray()也是用Object.prototype.toString.call 来实现的
//instanceof 能否判断基本类型？？？？  能，需通过symbol.hasInstance方法重写instanceof 方法
class yanzhengNumber {
	static [Symbol.hasInstance](x) {
		return typeof x === 'number';
	}
}
console.log('isNumber', 111 instanceof yanzhengNumber);

//自己实现instanceof

function myInstanceof(left, right) {
	//如果是基本类型返回false
	if (typeof left !== 'object' || left === null) return false;
	//Object.getProtypeOf 可以拿到参数的原型对象
	let proto = Object.getPrototypeOf(left);
	while (true) {
		if (proto === null) {
			return false;
		}
		//如果原型对象=== 对象的原型
		if (proto === right.prototype) {
			return true;
		}
		proto = Object.getPrototypeOf(proto);
	}
}
console.log(myInstanceof(new String('111'), String)); //true

/**
 * Object.prototype.toString
 */
console.log('------------------');
console.log(Object.prototype.toString.call(1)); //"[object Number]"
console.log(Object.prototype.toString.call('sfsdf')); //"[object String]"
console.log(Object.prototype.toString.call(true)); // "[object Boolean]"
console.log(Object.prototype.toString.call(null)); //"[object Null]"
console.log(Object.prototype.toString.call(undefined)); //"[object Undefined]"
console.log(Object.prototype.toString.call({ name: 'xue' })); //"[object Object]"
console.log(Object.prototype.toString.call(() => {})); // "[object Function]"
console.log(Object.prototype.toString.call(['A', 'b', 'c'])); //"[object Array]"
