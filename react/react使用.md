# React 事件和 Dom 事件的区别，事件中的 event 参数

1.  event 是 SyntheticEvent 是模拟出来的 DOM 所有能力
2.  event.nativeEvent 是原生事件对象
3.  所有的事件都挂载在 document 上
4.  和 dom 对象不同，和 vue 也不同

# 异步组件(懒加载)

```
引入异步组件，用React.lazy包一下
const constDemo = React.lazy(()=>import('...'))

<React.Suspense fallback={<div>loading</div>}>
<constDemo/>
</React.Suspense>
```

# 多个组件有公共逻辑，如何抽离？

1. 高阶组件

定义一个组件，传图一个组件，再返回一个组件，通过属性传值。还需要透传 props {... props}
用高组件来包裹子组件。

2. Render Props

通过一个函数将 class 组件的 state 作为 props 传递给纯函数组件

# 函数组件和 class 组件区别

1. 纯函数，输入 props ,输出 jsx
2. 没有实例，没有 state，没有生命周期
3. 不能扩展其他方法
