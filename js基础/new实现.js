//使用 let person = ObjectFactory()
/**
 * new 的实现步骤：
 * 1. 创建一个对象
 * 2. 将对象的原型指向 构造函数的的prototype
 * 3. 修改this的指向 Person.apply(obj)
 * 4. 返回该对象
 */

function ObjectFactory(){
  const obj = new Object();
  //取出第一个参数，作为构造函数
  Constructor = [].shift.call(arguments);
  //可以让obj 访问到构造函数上的属性
  obj._proto_ = Constructor.prototype;
  const  result = Constructor.apply(obj,arguments);
  return typeof result === "object" ? result : obj;
}


function Otaku (name, age) {
  this.name = name;
  this.age = age;

  this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
  console.log('I am ' + this.name);
}

var person = ObjectFactory(Otaku,"xiaohuang",18);
console.log(person.name);
console.log(person.habit);
