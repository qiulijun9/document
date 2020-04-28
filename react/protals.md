传送门，让子组件渲染到父组件的外面

```
   ReactDOM.createPortal(props.children, 渲染的dom节点);

```

使用场景：
overflow:hidden
父组件的 z-index 值太小
fixed 需要放在 body 第一层级

如果渲染dialog,会把dialog和根组件的渲染在一起，如果设置positon:absolute,的话，需要保障上面没有position：relative 的干扰。
层级不清晰，dialog是独立于app之外的。
Portal可以帮助我们在JSX中跟普通组件一样直接使用dialog, 但是又可以让dialog内容层级不在父组件内，而是显示在独立于原来app在外的同层级组件。
