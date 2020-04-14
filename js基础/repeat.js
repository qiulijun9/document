// function repeat(fun,times,wait){
//   return (data)=>{
//     for(let i =0; i<times;i++){
//       setTimeout(()=>{
//         fun(...data)
//       },wait)
//     }
//   }
// }
// const repeatFunc =repeat(console.log,4,1000);
// repeatFunc(["hello","world"])

// String.prototype.myTrim = function(str){
//   return this.replace(/(^\s*)|(\s*$)/g,"")
// }

// let a =" ab c ";
// let b =a.myTrim();
// console.log(b)

function trim (str){
  let newStr = str;
  while(true){
    if(newStr.indexOf(' ') === 0){
      newStr = newStr.substring(1,str.length -0)
    }
    if(newStr.lastIndexOf(' ') === str.length - 1 ){
      newStr = newStr.substring(0,str.length -1)
    }else{
      return newStr
    }
  }
 
}
console.log(trim(" abnv v "))