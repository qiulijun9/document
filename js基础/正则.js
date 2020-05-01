/**
 * \t 制表符
 * \n 换行符
 * \r 回车符
 * \s 空白符
 * \S 非空白符
 * \d [0-9]
 * \D [^0-9]
 * \w [a-zA-Z0-9_]
 * \W [^a-zA-Z0-9_]
 * 
 * 
 * 
 * 重复
 * {n,m} 最少n次，最多m次
 * {n,} 最少n次
 * {n} 重复n次
 * ? 等价于 {0, 1}
 * + 等价于 {1,}
 * *  等价于 {0,}
 * 
 * 修饰符
 * i 不区分大小写
 * m  匹配多行（使用^ $指定起止时候能通融\n换行)
 * g  全局匹配
 * 
 * 
 * 通过String的模式匹配
 * search(reg) 成功返回起始位置，失败返回-1
 * match(reg) 匹配失败返回null,匹配成功返回的是一个由匹配结果组成的数组
 * replace(reg , replaceStr|function) 替换匹配到的
 * split(reg) 根据正则分割返回新数组
 */

// 下划线转驼峰
let str = "get_element_by_id"
let reg = /_\w/g;//匹配下划线之后的一个字符，g 全局匹配
function getCamelCase(str){
  return str.replace(reg,(first)=>{
    return first.slice(1).toUpperCase(); //匹配到_后的一个字符，_e _b _i字符截取后一个字符转成大写
  })
}
console.log(getCamelCase(str));

//去除首尾空格
let str1 = "  dfdf dfd ";
let reg1 = /(^\s*)|(\s*$)/g;
console.log(str1.replace(reg1,""))