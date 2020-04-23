//柯里化 是将一个多参的函数，转成多个参数的函数

function curry (fn, args){
  length = fn.length;
  args = args || [];
  return function(){
    let _args = args.slice(0);
    for(let i = 0;i<arguments.length;i++){
      _args.push(arguments[i]);
    }
    if(_args.length<length){
      return curry.call(this,fn,_args);
    }else{
      return fn.apply(this,_args);
    }
  }
}

const fn = curry(function (a, b, c){
  console.log([a, b, c]);
})

fn("a","b","c");
fn("a","b")("c");
fn("a")("b")("c");