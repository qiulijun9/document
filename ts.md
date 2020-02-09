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
