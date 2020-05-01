//泛型解决 类 接口 方法的 复用性，对不特定的类型的支持，支持类型校验
//定义的时候不知道类型，在调用方法的时候指定类型

//若要同时返回string和number 类型 ,代码冗余
function getData(value:string):string{
  return value;
}
function getData1(value:number):number{
  return value;
}

//解决,规定传入的类型 泛型函数，
function getData2<T>(value:T):T{
 return value;
}

getData2<number>(34);
getData2<string>("abb");

//泛型接口,
//方法一
interface ConfigFn{
  <T>(value:T):T
}
let getData3:ConfigFn = function<T>(value:T):T{
  return value;
}
getData3<number>(12)

//方法二
interface Config2<T>{
  (value:T):T;
}
function getData4<T>(value:T):T{
  return value;
 }
 let datafn:Config2<string>  = getData4;
 datafn("dsd")
 