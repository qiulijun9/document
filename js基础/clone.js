function clone(source){
  //判断是否是object
  if(!isObject(source)) return source;
  let target = {};
  //模拟树
  const looplist = [
    {
      parent:target,
      key:undefined,
      data:source
    }
  ];
 //深度优先遍历
   while(looplist.length){
     const node = looplist.pop();
     const parent = node.parent;
     const key = node.key;
     const data = node.data;

     let res = parent;
     if(typeof key !== 'undefined'){
       res = parent[key] ={}
     }
     for(let i in data){
      if(data.hasOwnProperty(i)){
        if(typeof data[i] === "object"){
          //  target[i] = clone(source[i])
          looplist.push({
            parent:res,
            key:i,
            data:data[i]
          })
        }else{
           res[i] = data[i];
        }
      }
    }
   }
 
  return target;
 }

 function isObject (obj){
   return Object.prototype.toString.call(obj) === '[object Object]'
 }

let a = {
  name: "muyiy",
  book: {
      title: "You Don't Know JS",
      price: "45",
      type:{
        page:200
      }
  },
  a1: undefined,
  a2: null,
  a3: 123
}
let b =clone(a);
a.name ="aaa";
console.log(b)