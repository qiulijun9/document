"use strict";
//函数定义
//函数声明
function run() {
    return "abc";
}
// 匿名函数
var fun2 = function () {
    return 123;
};
//没有返回值
function fun3() {
}
// 函数传参
function getInfo1(name, age) {
    return name;
}
//可选参数 ? ，可选参数必须在参数的最后
function getInfo2(name, age) {
    return name;
}
//默认参数 =20
function getInfo3(name, age) {
    if (name === void 0) { name = "xiaoming"; }
    if (age === void 0) { age = 20; }
    return name + " +" + age;
}
//解构参数
function sun(a) {
    var result = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        result[_i - 1] = arguments[_i];
    }
}
function getStr(name) {
    return name;
}
