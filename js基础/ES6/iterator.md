# Iterator 的实现是 Iterator 遍历器

Iterator 是 key 为[Symbol.iterator]，value 为实现 Itarator 接口函数返回的对象

Itarator 接口函数是指 ：返回必须是一个对象，且包含 next()方法，next 返回 value/done 属性

实现了 Iterator 接口的都可遍历：比如 Set,Map,Array.String

# for..in 和 for ...of 区别

for..in 只可以遍历对象，会遍历到原型链上的属性
for..of 是遍历的统一标准，所以实现了 Iterator 的接口的对象都可遍历，(数组，对象,set，map,字符串 等)

# forEach Map for..in 和 for ...of 区别

forEach 不能遍历对象 ，不能使用 break ,continue，return 跳出函数体
Map 返回一个新的数组
for in 只能遍历对象，不能使用 break ,continue，return 跳出函数体
for of 实现 Iterator 的接口的对象都可遍历，可以使用 break ,continue,return

# Generator

Generator 是 Iterator 接口的一种具体实现方式
Generator 会返回一个遍历器对象，yield 相当于 next()方法
