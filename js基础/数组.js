/**
 * splice slice 方法
  删除数组某一项(会改变原数组) splice(index,删除个数，[添加元素可选])
 * 
 *  */ 

  let arr = [1,2,3,4];
  arr.splice(1,1);
  console.log(arr);//1,3,4
  let arr2 = [1,2,3,4];
  arr.splice(1,1,5);
  console.log(arr2);//1,5,3,4
  
/**
 * 
  截取数组(不会改变原数组，会生成新数组)slice(start位置index,end不包含end)
  slice(start) 不设置end默认截取到数组尾部
  slice(start,end) 包含起始，不包含结束
 */

  let arr3 = [1,2,3,4];
  // console.log( arr3.slice(1));// 2 3 4
  // console.log( arr3 );//1 2 3 4
  // console.log( arr3.slice(1,3));//  2 3
  // console.log( arr3 );//1 2 3 4
  
  // push() 向数组末尾添加元素，返回数组长度
  let arrp = [2,3,4];
   //console.log(arrp.push(5),arrp);//4 [2,3,4,5]

  //pop() 删除末尾元素,返回被删除的元素
  // console.log( arrp.pop())//4

  //shift()删除数组第一个元素，返回被删除元素
  //console.log( arrp.shift(),arrp)//2 [3,4]

  //unshift() 向数组开头添加元素，返回数组的长度
  //console.log(arrp.unshift(1),arrp)

  //reverse ()反转数组
  //console.log(arrp.reverse())//[4,3,2]
  
  //concat() 连接两个数组 
  //console.log(arrp.concat([3,4,5]))//[ 2, 3, 4, 3, 4, 5 ]

  //join() 通过指定的分隔符来分隔成字符串
  console.log(arrp.join(".."), typeof arrp.join(".."))//2..3..4 string

  //判断数组中是否包含某个值
  //indexOf ,如果存在返回元素下标，否则返回-1

  let arr4 = [3,4,5,6,7,7];
  console.log(arr4.indexOf(7))//4
  
  // includes 如果存在返回true,否则返回fasle

  console.log(arr4.includes(3))// true

  //find(callback) 返回满足条件的第一元素的值，没有返回undefined
  let result  =  arr4.find((item)=>{return item >3})
  console.log(result);

  //findIndex(callback) 返回满足条件的第一元素的下标，没有返回-1
  let result2  =  arr4.findIndex((item)=>{return item >3})
  console.log(result2);


  //数组扁平化
  let ary = [1, [2, [3, [4, 5]]], 6];
  let str = JSON.stringify(ary);
  // 方法一  console.log(ary.flat(Infinity))
  
  //方法二 console.log(str.replace(/(\[|\])/g,'').split(","))
