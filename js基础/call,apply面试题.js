var name = 'person0';
var person1 = {name: 'person1'};
var person2 = {
  name: 'person2',
  show: function() {
    return function() {
      console.log(this.name)
    }
  },
  show1: function() {
    return () => {
      console.log(this.name)
    }
  }
};
person2.show().call(person1);//person1

person2.show()();
//person0  || undefined    person2.show()返回是function ,作为单独函数调用this指向window或者undefined

person2.show.call(person1)();
//person 0 || undefined   person2.show.call(person1) === person1.show() 返回的是function,作为单独函数调用this指向window或者undefined

person2.show1().call(person1);//person2

person2.show1()();
// person2  person2.show1() 返回的是箭头函数，箭头函数没有this,this指向上下问函数中的this,perseon2 ,即person2.name

person2.show1.call(person1)();
//person1,person2.show1.call(person1)=== person1.show1(),返回的是箭头函数，this 指向上下问函数中的this，即person1.name

