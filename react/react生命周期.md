react 的生命周期主要包括三个阶段：挂载时，更新时，卸载时

# 挂载时

componentWillMount()
组件被渲染到页面前触发

render()
组件渲染

componentDidMount()
组件被渲染到页面后触发，此时页面有了真正的 dom，可以进行 dom 相关操作，一般会把 ajax 放在这个里面

# 更新时

shouldComponentUpdate()
组件更新前，会被自动执行

componentWillUpdate()
组件即将被更新时触发，不能调用 setSate()，在shouldComponentUpdate之后执行，如果shouldComponentUpdate 返回true，则会执行，否则不会执行。

render()
对比新旧dom阶段，修改真实的dom

componentDidUpdate()
组件更新后立即执行

# 卸载时

componentWillUnmount()
组件被销毁时触发
