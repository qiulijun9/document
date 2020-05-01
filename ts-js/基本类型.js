"use strict";
/**
 * js基本类型：boolean,string,number,null,undefined,bigint,symbol
 *
 * ts基本类型：boolean,string,number,null,undefined,元组类型，枚举，any ,void,never ,
 */
//boolean 
var flag = true;
flag = false;
//string
var str = "abc";
//number
var num = 123;
num = 123.34;
//数组类型
var arr = [2, 4, 5, 6];
var arr2 = ["34", "d", "v"];
//元组类型
var arr3 = ["cc", 34, false];
//枚举类型  用来定义标识符 不赋值默认为下标
var Flag;
(function (Flag) {
    Flag[Flag["success"] = 1] = "success";
    Flag[Flag["error"] = -1] = "error";
})(Flag || (Flag = {}));
var f = Flag.error;
console.log(f);
//任意类型any
var a = 3;
a = "123";
//任意类型的用处 要求类型是object 时
var o = document.getElementById("box");
o.style.color = "red";
// undefined
var n;
console.log(n);
//void 定义方法没有返回值
function fun() {
    console.log("fun");
}
