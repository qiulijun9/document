//函数定义
//函数声明
function run():string{
  return "abc"
}
// 匿名函数
let fun2 = function():number{
  return 123;
}
//没有返回值
function fun3():void{
  
}
// 函数传参
function getInfo1(name:string,age:number):string{
  return name
}
//可选参数 ? ，可选参数必须在参数的最后
function getInfo2(name:string,age?:number):string{
  return name
}
//默认参数 =20
function getInfo3(name:string = "xiaoming",age:number =20):string{
  return `${name} +${age}`
}
//解构参数
function sun(a:number,...result:number[]){
}

//函数重载
function getStr (name:string):string;
function getStr (name:number):number;
function getStr(name:any):any{
  return name;
}

