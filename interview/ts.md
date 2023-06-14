### 有了解过 TypeScript 吗，讲一下泛型？
1. 泛型可以定义重用组件，在使用时传入不同类型来使用组件。
2. 泛型是指在定义函数、接口、类时可以不预先指定类型，而是使用时确定类型。
3. 泛型一般用`<T>` 来表示，`T` 相当于一个占位符或者变量，当使用时才将类型当入参数传入。
4. 泛型约束： 在成员之间提供了有意义的约束，这些成员可以是 函数参数，函数返回值，类的属性，类型的方法等。

### interface 和 type 区别 （都可以定义函数）
1. type 可以定义原始值、联合类型、元组、对象、函数以及其他任务你需要手写的类型。
  interface 只能定义函数。
2. type  不能重复定义
   interface 可重复定义，会合并声明
3. type 和 interface 都允许继承，可以混合继承，也就是说 `interface`
 可以扩展 `type`，`type`也可以扩展 `interface`。接口的扩展是继承（ `extends`
 ）。类型别名的扩展就是交叉类型（通过 `&`实现）。

### TS 中 any 和 unknow 的区别。
- any 表示任意类型，它可以赋值给任意类型，可以让任意类型赋值给它
- unknow 表示未知类型，它只可以赋值给 any 和 unknow 的类型的变量。 同 any 一样任意类型的值可以赋值给 unknow

### void 和 never 区别。
- void 表示无任何类型，在方法无返回值或返回值undefined 时使用，也可以定义 void 类型的变量，但只能 null 和 undefined 类型的赋值给它
- never 表示永远不存在的类型，例如 抛出异常的方法和死循环的代码。任何类型的值都不能赋值给never类型，除了本身的never 类型。


### 一个对象，每一个 {key:value} 单独取出来声明一个联合对象？
使用keyof  typeof
```ts
interface Person {
  name: string;
  age: number;
  gender: "male" | "female";
}

type PersonKey = keyof typeof Person;  //type PersonKey = 'name'|'age'|'gender';

function getValueByKey(obj: Person, key: PersonKey) {
  return obj[key];
}
let val = getValueByKey({ name: "tom", age: 18, gender: "male" }, "name");
console.log(val); // tom

```

### infer 关键字。
infer 关键字用于在条件类型中推断类型变量， 通常与 extends 结合使用。 ReturnType 可以得到一个函数的返回类型。
```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
function add(a: number, b: number): number {
  return a + b;
}
type AddReturnType = ReturnType<typeof add>; // 推断为 'number'

```

### 常用的ts 使用方式
1. 用枚举定义常量
2. 使用 interface 定义对象类型。 提高代码的可读性和可维护性。
3. 使用断言  避免类型错误
4. 使用泛型增强代码的可复用性

# ts 和js 的区别
ts 优点：

1. 静态类型检查，能够检测出错误并修改，在编译阶段就能发现因为变量类型导致的错误，配合编辑器，有强大的提示功能
2. 类型推断：ts 会自动推断变量的类型
2. 语言扩展,是 js 的超集，引入类，继承，接口，泛型，枚举，元组 可以用一些新的语法（可选链） 
3. 更像一个工具,可以编译成 js
4. 引入了模块，可以把声明，数据，函数封装在模块中
5. 利于重构，更好的可维护性和可读性，有助于代码结构


缺点：
1. any script，推广不容易
2. 增加代码量
3. 需要长时间比编译代码
4. 要使用第三方库，必须要定义文件。lib.b.ts
5. 不能直接在浏览器中运行


# 内置工具类型
pick

从一个类型中摘取某一部分属性

```ts
// eg:公共的类型
 interface userInfo{
   name:string;
   password:string;
   id:number;
   age:number;
 }
// 只想摘取一部分属性作为类型约束
 type loginDataType = Pick<userInfo,'name'|'password'>

 const loginData:loginDataType ={
   name:"tom",
   password:"123"
 }
```

omit

从一个类型剔除某些属性

```ts
// eg:公共的类型
 interface userInfo{
   name:string;
   password:string;
   id:number;
   age:number;
 }

 // 剔除一部分属性, 从哪个对象中剔除，剔除哪些属性
 type resDataType =Omit<userInfo,'password'>
 const resData:resDataType={
  name:"jack",
  id:1,
  age:22
}
```

Partial<T> -- 将 T 中的所有属性变成可选。
Readonly<T> -- 将 T 中的所有属性变成只读。
Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
Extract<T, U> -- 提取T中可以赋值给U的类型。
NonNullable<T> -- 从T中剔除null和undefined。
ReturnType<T> -- 获取函数返回值类型。
InstanceType<T> -- 获取构造函数类型的实例类型。

