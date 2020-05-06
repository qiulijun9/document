//map
Array.prototype.myMap = function (callback ,thisArg){
    let o = Object(this);
    let t = thisArg;
    let len = o.length;
    let result  = new Array(len);
    for(let k= 0; k< len;k ++) {
        if(k in o){
          let keyVal = o[k];
          let mapVal = callback.call(t,keyVal,k,o);
          result[k] = mapVal;
        }
  
    }
  return result;

}

let  arr = [2,4,5,6,6,2,3,1,2,4];
// let arr2 = arr.myMap((item)=>{
//     return item > 4
// })



//filter
Array.prototype.myFilter = function(callback, thisArg){
  let O = Object(this);
  let len = O.length;
  let resLen = 0;
  let res = [];
  for(let i = 0; i < len; i++) {
    if (i in O) {
      let element = O[i];
        if (callback.call(thisArg, element, i, O)) {
            res[resLen++] = element;
        }
    }
}
 return res;

}
let arr2 = arr.myFilter((item)=>{
    return item > 4
});
console.log(arr2);

//push 
Array.prototype.push = function (...items){
  let O = Object(this);
  let len = O.length;
  let argCount = items.length; 
  for(let i = 0;i<= argCount;i++){
      O[len + i] = items[i];
  }
  let newLength = len + argCount;
  O.length = newLength;
  return newLength;
}

 arr.push("fd");
console.log(arr);

//pop
Array.prototype.pop = function(){
    let O = Object(this);
    let len = O.length;
    if(len === 0) {
        O.length = 0;
        return undefined;
    }
    len -- ;
    let value = O[len];
    delete O[len];
    O.length = len;
    return value;
}
arr.pop();
console.log(arr,arr.pop());