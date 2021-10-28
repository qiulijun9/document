# react event

react 的所有事件没有绑定到具体的 dom 上,而是绑在的 document 节点上.通过冒泡绑定到 document 上,通过 dispatchEvent 事件统一派发.只有真实 dom 触发后冒泡到 document 后才会对 react 事件进行处理.如果要访问原生的 dom 对象,可以通过 event.NativeEvent 来获得

1. 不需要注册那么多事件.只在 document 上注册一次,减少内存消耗

# 什么是合成事件

react 实现了一套自己的事件机制：

1. 并没有使用原生的浏览器事件，而是在 dom 体系上做了改进。将事件绑定到 document 元素上统一做处理，减少了内存的消耗
2. 提供全浏览器一致性的事件系统，抹平不同系统间的差异，解决了浏览器的不兼容问题。

优点:
合成事件采用了事件池,这样可以大大节省内存,不会频繁创建和销毁事件对象.浏览器将事件类型创建为合成事件,达到了浏览器兼容.

# 为什么要有合成事件

由于 fiber 机制的特点，在生成 fiber 节点时，它对用的 dom 可能还没有挂载，所以无法 b 绑定到真实的 dom 上,所以 react 提供了一套自己的合成事件。如 onClick,onChange 等

# 合成事件和原生事件的区别

1. react 中事件需要以驼峰的方式来调用，需要传递一个函数，而不是字符串
2. 不能使用 return false 阻止冒泡，必须调用 preventDefault（）方法来阻止冒泡

# 合成事件的实现

https://juejin.cn/post/6955636911214067720

利用浏览器的事件机制，冒泡到 document 元素，（react 17 是冒泡到 root 元素上）再由 dispatchEvent()事件统一做处理

结论

1.  在 react 中绑定的事件并没有绑定到真实的 dom 上，而是绑定在 document 上统一管理的
2.  真实 dom 上的事件如 onclick,被 react 替换成空函数 noop(){}
3.  react 并不是一开始就将所有的事件绑定到 document 上，而是按需绑定，遇到了 click 事件，把 click 事件绑定到 document 上

从事件初始化，事件绑定，事件触发三部分分析

## 事件初始化 （插件机制）

1. 构建初始化 React 事件和原生事件的关系
2. 合成事件和对应的事件处理插件的关系

```js
// React 事件和原生事件的关系
{
    onBlur: ['blur'],
    onClick: ['click'],
    onClickCapture: ['click'],
    onChange: ['blur', 'change', 'click', 'focus', 'input', 'keydown', 'keyup', 'selectionchange'],
    onMouseEnter: ['mouseout', 'mouseover'],
    onMouseLeave: ['mouseout', 'mouseover'],
    ...
}



// 合成事件和对应的事件处理插件的关系
{
    onBlur: SimpleEventPlugin,
    onClick: SimpleEventPlugin,
    onClickCapture: SimpleEventPlugin,
    onChange: ChangeEventPlugin,
    onChangeCapture: ChangeEventPlugin,
    onMouseEnter: EnterLeaveEventPlugin,
    onMouseLeave: EnterLeaveEventPlugin,
    ...
}

// 插件做了哪些事情
const SimpleEventPlugin = {
    eventTypes:{
        'click':{ /* 处理点击事件  */
            phasedRegistrationNames:{
                bubbled: 'onClick',       // 对应的事件冒泡 - onClick
                captured:'onClickCapture' //对应事件捕获阶段 - onClickCapture
            },
            dependencies: ['click'], //事件依赖
            ...
        },
        'blur':{ /* 处理失去焦点事件 */ },
        ...
    }
    extractEvents:function(topLevelType,targetInst,){ /* eventTypes 里面的事件对应的统一事件处理函数，接下来会重点讲到 */ }
}


```

## 事件绑定

ReactDOMComponent 通过 lastProps、nextProps 对传入的组件,判断是新增,删除,分别调用事件注册,事件卸载.

1. 调用 EventPluginHub(插件插槽) 的 enqueuePutListener 进行事件存储
2. 获取 document 对象
3. 根据事件名称 onclick，onchange 等,判断进行事件捕获还是冒泡,判断是否有 addEventListener 方法,调用 addTrappedEventListener 进行真正的事件绑定，绑定在 document 上
4. 给 document 注册原生事件,回调函数为 dispatchEvent

## 事件触发

1. 调用 document 上的 dispatchEvent 事件,派发函数做批量更新 batchUpdate
2. 找到最深层级的元素,即当前节点对应的 ReactDOMComponent 对象
3. 遍历所有的父元素,对每层元素做处理
4. 构成合成事件
   (1)将每一个层的合成事件存储在 eventQueue
   (2)遍历 eventQueue 队列
   (3)通过 isPropagationStopped 判断当前事件是否冒泡,不冒泡则合成事件,冒泡则停止遍历
5. 处理完成的事件

# react 事件为什么绑定 this

react 事件挂载到 document 上由 dispatchEvent 统一派发,dispatchEvent 调用了该 invokeGuardedCallback 事件

```js
function invokeGuardedCallback(name, func, a) {
  try {
    func(a)
  } catch (x) {
    if (caughtError === null) {
      caughtError = x
    }
  }
}
```

可见函数是直接调用的,没有指定调用的组件,所以要手动将当前 this 绑定到组件上，不绑定的话获取的 this 就是 undefined

# react 事件和原生事件的执行顺序是什么, 可以混用?

原生事件 ----》合成事件 ----》绑定在 document 上的事件

结论

1. react 的事件都是由 document 统一派发,只有当真实的 dom 对象冒泡到 document 以后才会对 react 事件进行处理.
2. 原生事件和 react 事件最好不要混用,原生事件中如果执行了 stopPropagation 方法，则会导致其他 React 事件失效。因为元素无法冒泡到 document 上,导致 react 事件都无法触发

```js
  componentDidMount() {
    this.parent.addEventListener('click', (e) => {
      console.log('dom parent');
    })
    this.child.addEventListener('click', (e) => {
      console.log('dom child');
    })
    document.addEventListener('click', (e) => {
      console.log('document');
    })
  }

  childClick = (e) => {
    console.log('react child');
  }

  parentClick = (e) => {
    console.log('react parent');
  }

  render() {
    return (
      <div onClick={this.parentClick} ref={ref => this.parent = ref}>
        <div onClick={this.childClick} ref={ref => this.child = ref}>
          test
        </div>
      </div>)
  }
 // dom child   ---> dom parent ---> react child ---> react parent ---> document
```
