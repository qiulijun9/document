class 组件 setState 要放到 constructor()中

# setState 是不可变的

不能直接修改 state 的值，例如 this.state.count++
必须是一个新的的值，所以只能通过 setState 方法来改，赋予新值

# setState 何时是异步的何时是同步的？ 看是否能命中 batchUpdate 机制

setState 在（直接使用）钩子函数中是异步的，在 setTimeout 或者回调中是同步的，或者自定义的 DOM 事件中是同步的
setState 在修改完之后不能立马拿到该值，可以在 setState 的第二个参数（回调函数）中拿到该值

```
const [state,setState] =useState(false)
const handleClick = function (){
  setState(true);
  console.log(state); //false
  setTimeout(() => {
      console.log(state);//true
    }, 0);
}
   <Button text="图片分组" type="primary"
    onClick={() => handleClick()}/>
```

# setState 可能被合并

setState 异步更新的话，更新前会被合并
传入对象 会被合并，执行结果只一次

react 在遇到传递给setState()多次调用时，会将其合并成一个进行批处理。（如果传递的对象有相同的键，会通过Object.assigin()将其合并成一个），因为setState存在异步更新，当需要依赖上一个值计算下一个值时，可能会出现问题，所以不应该依赖他们的值计算下一个

```
会合并成一个   count :1
  this.state({
    count : this.state.count + 1
  })
  this.state({
    count : this.state.count + 1
  })
  this.state({
    count : this.state.count + 1
  })


```

传入函数的话，不会被合并，都会被执行

```
会直接加3
  this.state((preconut)=>{
      return {
        count : preconut.count + 1
      }
  })
   this.state((preconut)=>{
      return {
        count : preconut.count + 1
      }
  })
   this.state((preconut)=>{
      return {
        count : preconut.count + 1
      }
  })
```

# setState 主流程

this.setState(newState)------newState 存入 pending 队列-----是否处于 batch update
是--------保存组件于 dirtyComponents
否--------遍历所有的 dirtyComponents 调用 updateComponent 更新 pending, state,props

# react 怎么控制同步和异步

react 的 setState 的实现中，会根据 isBatchingUpdates 　来判断是否直接更新，还是放到延迟队列中，默认是 false,表示 setState 会同步更新 state.
当 react 在调用事件处理函数（生命周期或是自己写的方法中）之前会调用 batchedUpdates 方法，把 isBatchingUpdates 改为 true,在更新完之后会把 isBatchingUpdates 改为 false .这样由 react 控制的 setState 不会同步更新 state.

# 那些可以命中 batchUpdate 机制

生命周期（和它调用的函数）
React 中注册的事件（和它调用的函数）
React 可以管理的入口

不命中：
setTimeout ,setInterval,自定义 dom 事件

# batchUpdate 机制 用的是 transaction 事务机制

先执行开始的逻辑(initalize)-----执行函数体-----执行结束机制(close)



