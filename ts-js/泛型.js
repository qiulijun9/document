"use strict";
//泛型解决 类 接口 方法的 复用性，对不特定的类型的支持，支持类型校验
//定义的时候不知道类型，在调用方法的时候指定类型
//若要同时返回string和number 类型 ,代码冗余
function getData(value) {
    return value;
}
function getData1(value) {
    return value;
}
//解决,规定传入的类型 泛型函数，
function getData2(value) {
    return value;
}
getData2(34);
getData2("abb");
var getData3 = function (value) {
    return value;
};
getData3(12);
function getData4(value) {
    return value;
}
var datafn = getData4;
datafn("dsd");
