## combineReducers 作用

combineReducers 是将多个子 reducer 组合起来，形成一个最终的 reucer 函数，统一调用，方便管理。

1. 收集所有传入的 reducer 函数
2. 遍历所有的 reducers,通过 reducers 下面的 key 值来匹配(reducerKey,reducer)
3. 返回的函数在 store 中自动调用，来处理 action

## store 如何自动调用 reducer 处理 action

createStore(reducer) 接收一个 reducer,在方法中调用 dispatch(reducer), 改方法中的 reducer 就是通过 combineReducers 返回的 reducer,通过 reducer 处理 action 的值

# redux 怎么把 reducer 产生的 state 组织到 store 里

createStore 需要传入一个 reducer,在创建 store 的时候 redux 调用 reducer,reducer 中会通过老数据和新 state 返回合并的 state

# action 是如何触发相应的 reducer 产生 state

action ：全局发布的动作指令,有 type 属性的对象

1. mapDispatchToProps 将 action 作为 props 绑定到组件上
2. 组件触发 action,调用 store.dispatch()，根据 actionType 类型，触发不同的 reducer 函数执行, 返回新的 state 对象
3. store 监听到 state 改变 通知 view 页面

# react 和 redux 怎么做关联的

redux 做的事是保存 state，获取 state,以及当 state 发生改变时做出响应

react-redux 是把各个 state 和 redux 连接起来的
Provider：（通过 context 实现）用 Provider 把 App 包起来，store 会通过 props 来传递。

connect(mapStateToProps,mapDispatchToProps)(app):是一个高阶函数
mapStateToProps：将 state 作为 props 绑定到组件上
mapDispatchToProps：（可选） 将 action 作为 props 绑定到组件上，如果不传这个参数 redux 会把 dispatch 作为属性注入给组件

# react 改值的优化 immer ,简化 redux 流程 redux-saga

redux-saga 是处理异步任务 action 的中间键
