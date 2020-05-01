"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//定义类
//修饰符 public（都可以访问） protected（类和子类可以访问,外面不能访问）   private(类里面可以访问，子类和外面都不能访问)
var Person = /** @class */ (function () {
    //实例化类的时候触发的方法
    function Person(n, a) {
        this.name = n;
        this.age = a;
    }
    Person.prototype.getName = function () {
        return name;
    };
    Person.prototype.setName = function () {
        this.name = name;
    };
    return Person;
}());
var p = new Person("xiaoming", 23);
//继承
var Men = /** @class */ (function (_super) {
    __extends(Men, _super);
    function Men(name, age) {
        return _super.call(this, name, age) || this;
    }
    return Men;
}(Person));
var m = new Men("xiaozxao", 23);
m.getName();
