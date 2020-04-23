# 并发和并行
并发 是具有处理多个任务的能力，但不一定是同时，一会儿做什么，一会儿做什么
并行 是可以同时处理多个任务， 同时一起做什么

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
Filber 把当前执行的任务分成一个个微任务，安排优先级，然后依次处理，每过一段时间（毫秒级别）就会暂停当前任务，看有没有优先级更高的任务、然后暂停之前的执行任务，跳到下一个任务去执行。

# filber 数据结构

Filber 节点拥有return，child，subling 三个属性，目前使用的是链表 child 指向第一个子节点，subling 指向下一个兄弟节点,return 对应父节点

# filber 调度执行的过程
1. 将state更新需要执行的同步任务拆分成一个Filber任务队列
2. 在任务队列中列出优先级更高的Filber 执行，如果执行时间超过了dethLine,则设置pedding 为挂起状态
3. 在 Filber 执行结束或挂起，会调用基于requestIdleCallback/requestAnimationFrame 实现的调度器，返回新的任务队列继续进行上诉过程。
