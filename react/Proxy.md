# Object.defineProperty 缺点

1.  深度监听需要一次性递归 ，层级太深，容易卡
2.  无法监听新增/删除属性
3.  无法监听原生数组，需要特殊处理

# Proxy

Proxy 能规避 Object.definedProperty 的问题
Proxy 无法兼容所有的浏览器
基本使用：

```
  const proxyData= new Proxy (data,{
     get(target,key,receiver){
        const result = Reflect.get(target,key,receiver)
        return result;
     },
     sey(target,key,value,receiver){
        const result = Reflect.set(target,key,value,receiver)
        return result;
     },
     deleteProperty(target,key){
        const result = Reflect.deleteProperty(target,key)
        return result;
     }

   })
```
