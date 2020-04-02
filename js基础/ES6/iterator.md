# Iterator 的实现是 Iterator 遍历器

Iterator 是 key 为[Symbol.iterator]，value 为实现 Itarator 接口函数返回的对象

Itarator 接口函数是指 ：返回必须是一个对象，且包含 next()方法，next 返回 value/done 属性

实现了 Iterator 接口的都可遍历：比如 Set,Map,Array.String

# for..in 和 for ...of 区别

for..in 只可以遍历对象，会遍历到原型链上的属性
for..of 是遍历的统一标准，所以实现了 Iterator 的接口的对象都可遍历，(数组，对象,set，map,字符串 等)

# forEach Map for..in 和 for ...of 区别

forEach：

1.  不能遍历对象
2.  不能使用 break ,continue，return 跳出函数体
3.  对于异步代码，forEach 并不能保证按顺序执行
    中断方法：
    　 try 　抛出异常，用 every 或 some 替换

Map 返回一个新的数组
for in 只能遍历对象，不能使用 break ,continue，return 跳出函数体
for of ：

1.  实现 Iterator 的接口的对象都可遍历，
2.  可以使用 break ,continue,return
3.  可以保障异步任务按顺序执行

# Generator

Generator 是 Iterator 接口的一种具体实现方式
Generator 会返回一个遍历器对象，yield 相当于 next()方法
