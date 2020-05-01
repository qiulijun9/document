//接口:定义行为和规范

//属性接口 对json的约束
interface Info{
  name?:string;//可选属性
  age:number
}

function getInfo (info:Info):void{
  console.log(info.name)
}
let obj ={name:"123",age:12}
getInfo(obj)

//interface ajax
interface Config{
  type:string;
  url:string;
  data?:string;
  dataType:string
}
function ajax(config:Config){
  let xhr =new XMLHttpRequest();
  xhr.open(config.type,config.url,true);
  xhr.send(config.data);
  xhr.onreadystatechange =function(){
    if(xhr.readyState ===4 && xhr.status ===200){
      console.log("success")
    }
  }
}
ajax({
  type:"GET",
  url:"www.baidu.com",
  dataType:"json"
})

//函数类型接口
interface encrypt{
  (key:string,value:string):string
}
let md5:encrypt =function(key:string,value:string):string{
   return key;
}

//接口扩展
//接口可以扩展接口
interface Animal{
  eat():void;
}
interface Person2 extends Animal{
  work():void;
}

//实现接口
class Men2 implements Person2{
  public name:string;
  constructor(name:string,age:number){
     this.name = name;
  }
  eat(){

  }
  work(){}
}