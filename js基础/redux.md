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
   主要职能：
   存储整个应用的 state
   提供 getState() 方法获取 state
   提供 dispatch(action) 方法更新 state
   提供 subscribe(listener) 来注册、取消监听器

2. 创建 reducer
   纯函数，用来处理事件，指明如何更新 state
3. 创建 action，actionType
   viewer 组件 发出 action 动作 ，action 是一个对象，必须要有 type 参数，定义 action 类型
4. 创建 store,使用 createStore 方法
   store 可以理解为有多个加工机器的总工厂
   提供 subscribe，dispatch，getState 这些方法。

用户通过 view 发出 action
然后 store 自动调用 reducer,并传入两个参数：当前 state 和 action ，reducer 会返回新的 state
state 一旦有变化，store 就会调用监听函数
listener 可以通过 store.getState() 得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。

# mobx

MobX 允许有多个 store，而且这些 store 里的 state 可以直接修改，不用像 Redux 那样每次还返回个新的。
一个 observable 对应一个 action

# 对比

https://juejin.im/post/58bcb5821b69e6006b24ede0

1. Redux 数据流流动很自然，可以充分利用时间回溯的特征，增强业务的可预测性；
   MobX 没有那么自然的数据流动，也没有时间回溯的能力，但是 View 更新很精确，粒度控制很细。
2. Redux 通过引入一些中间件来处理副作用；
   MobX 没有中间件，副作用的处理比较自由。
