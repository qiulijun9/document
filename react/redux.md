# redux

获取 store 中存储公用状态：
引入 store ，getState 获取状态
dispatch 修改状态
subscribe 订阅更新

react-redux
提供 Provider 和 connect 两个 API,Provide 将 store 放到 props 中，省去了 import 这一步
connect 将 getState,dispatch 合并进了 props,并自动订阅更新
connect(mapStateToProps, mapDispatchToProps)(MyComponent)

使用步骤：

1. 创建 store
   store 用来存放整个应用的 state,并将 action 和 reducer 联系起来
   主要职能：存储整个应用的 state

   createStore 返回四个重要的属性 getState,subscribe,dispatch,replaceReducer
   getState():获取 state
   subscribe():采用发布订阅模式，进行观察者的订阅
   dispatch()：派发 action
   replaceReducer():用新的 reducer 替换现在的
   createStore 接收三个参数：reducer,preloadedState,enhancer
   reducer: 必须是函数
   preloadedState： 初始状态

   subscribe 方法其实是基于发布订阅模式的:
   nextListeners 中存放之前订阅的数组

2) 创建 reducer
   纯函数，用来处理事件，指明如何更新 state
3) 创建 action，actionType
   viewer 组件 发出 action 动作 ，action 是一个对象，必须要有 type 参数，定义 action 类型
4) 创建 store,使用 createStore 方法
   store 可以理解为有多个加工机器的总工厂
   提供 subscribe，dispatch，getState 这些方法。
   异步 action createStore 中传入 redux-thunk 中间键
   ```
   对dispatch 进行改造
   const store = createStore(reducer,applyMiddleware(thunk,logger))
   ```
5) 组件通过 useSelector, useDispatch 　来获取和修改 state 的值

```
   import { useSelector, useDispatch } from 'react-redux';

   //获取state中的值
   const {isDraging } = useSelector(state => {
   return state;
   });
   //修改state中的值
   const dispatch = useDispatch();
   const handlePictureGrouping = useCallback(() => {
   dispatch({ type: 'IS_GROUPING', data: true });
   }, [dispatch]);

```

用户点击按钮 `通过 dispatch 发出 action
然后 store 自动调用 reducer,并传入两个参数：当前 state 和 action ，reducer 会返回新的 state
state 一旦有变化，store 就会调用监听函数
listener 可以通过 store.getState() 得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。

# mobx

MobX 允许有多个 store，而且这些 store 里的 state 可以直接修改，不用像 Redux 那样每次还返回个新的。
一个 observable 对应一个 action

# 对比

https://juejin.im/post/58bcb5821b69e6006b24ede0

1. redux 将数据保存在单一的 store 中，mobx 将数据保存在多个 store 中
2. redux 中的状态是不可变的，不能直接修改，要返回一个新的状态。
   mobx 可以直接对数据进行更改
3. mobx 相对比较简单，更多的使用面向对象的思维，redux 需要借助中间节来处理异步和副作用

```

```
