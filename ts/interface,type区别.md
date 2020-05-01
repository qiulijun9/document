# 相同点
1. 都可以描述一个对象或函数
```
interface User {
  name: string
  age: number
}
type User = {
  name: string
  age: number
}
```
2. 都允许扩展 extends

# 不同点
1. type 可以声明 基本类型，联合类型，元组类型，interface不可以
```
// 基本类型别名
type Name = string
 
// 联合类型
interface Dog {
    wong();
}
interface Cat {
    miao();
}
 
type Pet = Dog | Cat
 
// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]
```
2. type 语句中还可以使用 typeof 获取实例的 类型进行赋值
let div = document.createElement('div');
type B = typeof div

3. interface 能够声明合并
```
interface User {
  name: string
  age: number
}
 
interface User {
  sex: string
}
 

User {
  name: string
  age: number
  sex: string 
}



```