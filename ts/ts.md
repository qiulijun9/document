## 安装
npm install -g typescript
## 版本
tsc -v
## 编译ts
tsc index.ts
## 配置自动编译.ts文件
tsc --init
终端 --- 运行任务 ---监听ts

## 基本类型
   数字类型(number)
   布尔类型(boolean) 
   字符串类型(string)
   数组类型(array)    let arr:number[ ] = [1,2,4]    let arr:Array<number> = [1,2,4]
   元组类型(tuple) 给数组中每个元素指定类型  let arr:[number,string] = [123,"ssss"]
   枚举类型(enum)  enum Flag {success = 1,error  = 2}
   任意类型(any) let a:any = 1
   never unll ,undefined
   void 没有返回值  function fun():void { }
  
## 定义函数
函数声明 function fun(name:string="张三" 默认参数,age?:number可选参数，...result:number[] 剩余参数):string { return "123" }

## 类定义 类继承
class Person {
   name:string;
   constructor(name:string){ this.name =name}
   run ():string{return "run"}
}
class bob extends Person{ constructor(name:string){
  super(name)
}}

## 泛型
type GenericObject<T> = { key: T };
var numberT: GenericObject<number> = { key: 123 };

## 命名空间
在代码外通过namespace{} 包裹，主要组织代码，避免命名冲突，支持嵌套
不同命名空间的变量可以重复，在外部要使用，是要export 暴露出来
```
namespace Utility {
  export function log(msg) {
    console.log(msg);
  }
  export function error(msg) {
    console.log(msg);
  }
}

// usage
Utility.log('Call me');
Utility.error('maybe');
```