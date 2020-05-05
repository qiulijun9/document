
const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null;

function deepClone(source, map = new Map()){
  if(map.get(source)) return source;
  if(isObject(source)){
     map.set(source, true);
    let cloneTarget = Array.isArray(source) ? []: {};
    for(let i  in source){
      if(source.hasOwnProperty(i)){
       cloneTarget[i] = deepClone(source[i])
      }
    }
    return cloneTarget;
  }else{
    return source;
  }
 
}

let a = {val:"ewew"};
let b= deepClone(a);
console.log(b);