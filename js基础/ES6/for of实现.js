//实现迭代器，返回next()方法 每次调用next()返回一个对象，包含value和done
function createIterator(items){
  let i = 0;
  return {
    next: function() {
      let done= i>=items.length;
      let value = !done ?items[i++]:undefined
      return{
        done,value
      }
    }
  }
}
let iterator = createIterator([1,2,3]);
console.log(iterator.next());

// 具有Symbol.iterator 属性的 数据结构就是可遍历的
let obj ={};
obj[Symbol.iterator] = function(){
  return createIterator([1,2,3]);
}
for( let v of obj){
  console.log(v)
}
/**
 * 默认部署了Symbol.iterator 属性的，即可遍历的
 * 1. 数组
 * 2. Set
 * 3. Map
 * 4. 类数组如arguments
 * 5. Generator 对象
 * 6. 字符串
 */
//模拟实现for of
function forOf(obj, cb){
  let iterator,result;
  if (typeof obj[Symbol.iterator] !== "function") throw new TypeError(result + " is not iterable");
  if (typeof cb !== "function") throw new TypeError("cb must be callable");

  iterator = obj[Symbol.iterator]();
  result = iterator.next();
  while(!result.done){
    cb(result.value);
    result = iterator.next();
  }
}