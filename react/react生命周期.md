react 的生命周期主要包括三个阶段：挂载时，更新时，卸载时

# 挂载时

componentWillMount()
组件被渲染到页面前触发

render()
组件渲染

componentDidMount()
组件被渲染到页面后触发，此时页面有了真正的 dom，可以进行 dom 相关操作，一般会把 ajax 放在这个里面

# 更新时

componentWillReceiveProps()
组件接收到属性时触发，接收到新的 props 触发

shouldComponentUpdate()
当组件接收到新属性，或者状态改变时触发

componentWillUpdate()
组件即将被更新时触发，不能调用 setSate()

componentDidUpdate()
组件更新完成后触发

# 卸载时

componentWillUnmount()
组件被销毁时触发
