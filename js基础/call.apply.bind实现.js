/**
 * 模拟实现call 
 * 思路：
    1. 将函数设为该对象的属性
    2. 执行该函数
    3. 删除该函数
 * 
 * 
 * */

// Function.prototype.call2 = function (context){
//   context.fn = this;
//   context.fn();
//   delete context.fn;
// }
// var foo ={
//   value:1
// }
// function bar (){
//   console.log(this.value) //1
// }
// bar.call2(foo);

// 配置参数
Function.prototype.call3 = function (context) {
	var context = context || window;
	context.fn = this;
	let args = [];
	for (let i = 1; i < arguments.length; i++) {
		args.push('arguments[' + i + ']');
	}
	let result = eval('context.fn(' + args + ')');
	delete context.fn;
	return result;
};

var foo = {
	value: 1,
};
function bar(name, age) {
	console.log(name);
	console.log(age);
	console.log(this.value); //1
	return {
		value: this.value,
		name: name,
		age: age,
	};
}
// bar.call3(foo,"lili",20);

//es6 实现call
Function.prototype.mycall = function (context, ...args) {
	context = context || window;
	let fn = Symbol('fn');
	context.fn = this;
	const result = eval(`context.fn(...args)`);
	delete context.fn;
	return result;
};
bar.mycall(foo, 'lili', 20);

//es6实现 apply
Function.prototype.myApply = function (context, args) {
	var context = context || window;
	let fn = Symbol('fn');
	context.fn = this;
	const result = eval('context.fn(...args)');
	delete context.fn;
	return result;
};

// apply 实现

Function.prototype.apply2 = function (context, arr) {
	var context = context || window;
	context.fn = this;
	var result;
	if (!arr) {
		result = context.fn();
	} else {
		var args = [];
		for (let i = 0; i < arguments.length; i++) {
			args.push('arr[' + i + ']');
		}
		result = eval('context.fn(' + args + ')');
	}
	delete context.fn;
	return result;
};

var foo = {
	value: 1,
};
function bar(name, age) {
	console.log(name);
	console.log(age);
	console.log(this.value); //1
	return {
		value: this.value,
		name: name,
		age: age,
	};
}
// bar.apply2(foo,["lili",20]);
// bar.myApply(foo,["lili",20]);

//bind  接收参数，返回函数
Function.prototype.myBind = function (context) {
	if (typeof this !== 'function') {
		throw new Error('not is a function');
	}
	var self = this;
	//获取myBind 参数从第二个到最后一个参数
	var args = Array.prototype.slice.call(arguments, 1);
	var fNOP = function () {};
	var fbound = function () {
		var bindArgs = Array.prototype.slice.call(arguments);
		self.apply(this instanceof self ? this : context, args.concat(bindArgs));
	};
	fNOP.prototype = this.prototype;
	fbound.prototype = new fNOP();
	return fbound;
};
// bar.myBind(foo);
