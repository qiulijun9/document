//Object.defineProperty 可以在一个对象上定义新属性，或者修改一个对象的现有属性
/**
 * Object.defineProperty(obj, prop, descriptor)
 * obj:定义属性的对象
 * prop:定义/修改属性的名称
 * descriptor：定义/修改属性的描述符
 */
let obj ={};
Object.defineProperty(obj,"num",{
  value:1,
  writable:true,//能否被修改
  enumerable:true,//是否能枚举
  configurable:true//描述符能否被改变或修改
})
//封装监听数据改变的方法
function Archiver(){
  let value = null;
  let archiver = [];
  Object.defineProperty(this,"num",{
    get:function(){
      console.log('执行了get');
      return value;
    },
    set:function(val){
      console.log("执行了get");
      value = val;
      archiver.push({val:value});
    }
  })
  this.getArchiver = function (){
    return archiver;
  }
}

let arc = new  Archiver();
arc.num =11;
arc.num =12;
console.log(arc.getArchiver());

//Proxy代理
let proxy = new Proxy({},{
  get:function(obj, prop){
    console.log("get");
    return obj[prop]
  },
  set:function(obj, prop, value){
    console.log("set");
    obj[prop] =value;
  }
})
proxy.name = "ss";
console.log(proxy.name);

//Proxy 封装代理监听方法
(function (){
  function watch(target, fn){
    const proxy = new Proxy(target,{
      get:function(target, prop){
        return target[prop];
      },
      set:function(target,prop,value){
        target[prop] =value;
        fn(prop,value);
      }
    })
    return proxy;
  }
  this.watch = watch;
})()