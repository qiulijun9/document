# 性能问题

js 是单线程的，且和 dom 渲染共用一个线程
当组件足够复杂，组件更新时计算和渲染压力大，
同时再有 dom 操作（动画，鼠标拖拽等）将卡顿

# 解决方案

将阶段进行任务拆分计算阶段（commit 无法拆分）
Dom 需要渲染时暂停（通过 window.requestIdleCallback），空闲时恢复。

# 何为 fiber

React Fiber 是 React Reconciliaction 协调核心算法的重新实现。是把任务分成多个小任务，如果在中途执行时出现了更高优先级的任务，就去执行，执行完再返回来执行小任务。分片任务随时可以中断。
render 在创建的时候也会生成一个 filber tree。filber 在更新的时候会克隆出另一棵 filber tree,来对比更新。

# filber 数据结构

目前使用的是链表 child 指向第一个子节点，subling 指向下一个兄弟节点
