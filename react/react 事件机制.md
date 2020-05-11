# react event

react 的所有事件没有绑定到具体的 dom 上,而是绑在的 document 节点上.通过冒泡绑定到 document 上,通过 dispatchEvent 事件统一派发.只有真实 dom 触发后冒泡到 document 后才会对 react 事件进行处理.

1. 不需要注册那么多事件.只在 document 上注册一次,减少内存消耗

# 合成事件

react 中并没有使用原生的浏览器事件,而是使用了合成事件(SyntheticEvent);
SyntheticEvent 与原生浏览器一样有相同的接口,包括 stopPropagation() 和 preventDefault().如果要访问原生的 dom 对象,可以通过 event.NativeEvent 来获得

1. 对原生事件做处理和封装
2. 对浏览器事件的兼容性做处理,addEventListener 兼容 ie attachEvent

优点:
合成事件采用了事件池,这样可以大大节省内存,不会频繁创建和销毁事件对象.浏览器将事件类型创建为合成事件,达到了浏览器兼容.

# 事件注册

ReactDOMComponent 通过 lastProps、nextProps 对传入的组件,判断是新增,删除,分别调用事件注册,事件卸载.

1. 调用 EventPluginHub(插件插槽) 的 enqueuePutListener 进行事件存储
2. 获取 document 对象
3. 根据事件名称 onclick，onchange 等,判断进行事件捕获还是冒泡,判断是否有 addEventListener 方法
4. 给 document 注册原生事件,回调函数为 dispatchEvent

# 事件触发

1. 调用 document 上的 dispatchEvent 事件,派发函数
2. 找到最深层级的元素,即当前节点对应的 ReactDOMComponent 对象
3. 遍历所有的父元素,对每层元素做处理
4. 构成合成事件
   (1)将每一个层的合成事件存储在 eventQueue
   (2)遍历 eventQueue 队列
   (3)通过 isPropagationStopped 判断当前事件是否冒泡,不冒泡则合成事件,冒泡则停止遍历
5. 处理完成的事件

# react 事件为什么绑定 this

react 事件挂载到 document 上由 dispatchEvent 统一派发,函数是直接调用的,没有指定调用的组件,所以要手动将当前 this 绑定到组件上

# react 事件和原生事件的执行顺序是什么, 可以混用?

react 的事件都是由 document 统一派发,只有当真实的 dom 对象冒泡到 document 以后才会对 react 事件进行处理.

原生事件是绑定在 dom 元素上的,所以原生事件会先执行,然后执行合成事件,在执行 document 上挂载的事件.

原生事件和 react 事件最好不要混用,原生事件中如果执行了 stopPropagation 方法，则会导致其他 React 事件失效。因为元素无法冒泡到 document 上,导致 react 事件都无法触发
