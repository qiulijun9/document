"use strict";
//接口:定义行为和规范
function getInfo(info) {
    console.log(info.name);
}
var obj = { name: "123", age: 12 };
getInfo(obj);
function ajax(config) {
    var xhr = new XMLHttpRequest();
    xhr.open(config.type, config.url, true);
    xhr.send(config.data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("success");
        }
    };
}
ajax({
    type: "GET",
    url: "www.baidu.com",
    dataType: "json"
});
var md5 = function (key, value) {
    return key;
};
//实现接口
var Men2 = /** @class */ (function () {
    function Men2(name, age) {
        this.name = name;
    }
    Men2.prototype.eat = function () {
    };
    Men2.prototype.work = function () { };
    return Men2;
}());
