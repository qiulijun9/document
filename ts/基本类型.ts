/**
 * js基本类型：boolean,string,number,null,undefined,bigint,symbol
 * 
 * ts基本类型：boolean,string,number,null,undefined,元组类型，枚举，any ,void,never ,
 */
//boolean 
let flag:boolean = true;
flag = false;
//string
let str:string = "abc";
//number
let num:number = 123;
num = 123.34
//数组类型
let arr:number[] = [2,4,5,6];
let arr2:Array<string> =["34","d","v"];
//元组类型
let arr3:[string,number,boolean] = ["cc",34,false];
//枚举类型  用来定义标识符 不赋值默认为下标
enum Flag {
  success =1,
  error=-1
}
const f:Flag = Flag.error;
console.log(f);

//任意类型any
let a:any =3;
a = "123"
//任意类型的用处 要求类型是object 时

let o:any =document.getElementById("box");
o.style.color ="red"

// undefined
let n:number | undefined | null;
console.log(n)

//void 定义方法没有返回值
function fun():void{
  console.log("fun")
}
