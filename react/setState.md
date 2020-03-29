setState 何时是异步的何时是同步的？
setState 在钩子函数中是异步的，在 setTimeout 或者回调中是同步的

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

# react 怎么控制同步和异步

react 的 setState 的实现中，会根据 isBatchingUpdates 　来判断是否直接更新，还是放到延迟队列中，默认是 false,表示 setState 会同步更新 state.
当 react 在调用事件处理函数之前会调用 batchedUpdates 方法，把 isBatchingUpdates 改为 true,这样由 react 控制的 setState 不会同步更新 state.
