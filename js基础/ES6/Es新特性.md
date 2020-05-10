# Es7

Array.prototype.includes():判断数组是否包含某个值

```
 const arr = ['a','b','c']
 if(arr.includes('a')){
   console.log('存在')
 }
```

指数运算符 ×× 同 Math.pow()一样
2×× 10 = 1024

Es8

1. async/await
2. Object.values()
3. Object.entries()
4. Object.getOwnPropertyDescriptors()函数用来获取一个对象的所有自身属性的描述符
5. String.padStart(targetLength,[padString])
   将字符串添加到原始字符串的头部
6. String.padEnd(targetLength,[padString])
   将字符串添加到原始字符串的尾部
7. 允许最后一个参数有尾逗号

Es9

1. 扩展运算符(...)
2. Promise finally()
3. 正则扩展

Es10

1. 对象扩展
   Object.fromEntries() 键和值组成的对象
2. 数组扩展
   sort()稳定 flat()扁平化数组 flatMap() 映射且扁平化数组
3. toString()
4. catch() 省略参数

Es11

1. BigInt
2. 可选链
   obj?.props function?.(...args)
3. 判断空操作符(??) 是否为 undefined 和 null
   ？？
4. class
   增加了静态属性 static ,私有属性，私有方法 ，装饰器
5. Promise.try()
