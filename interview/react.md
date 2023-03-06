# class 组件和 function 组件的区别
###  class 组件的缺点

1. 组件间的逻辑很难复用
   组件间有 state 的逻辑是相似的，class 组件只能通过高阶组件的方法来解决，需要包一层来解决,这样会导致层级会嵌套非常深
2. 复杂的逻辑会越来越复杂,想要拆分成更小粒度的组件很困难
3. 相同的逻辑被拆分在多个生命周期,容易引发很多问题
 比如监听事件，会在 didmount, willunmount 等多个生命周期中使用，逻辑分散，有的人会删掉觉得用不到的代码，造成一些问题
4. this 指向问题
###  react hooks 的优点
1.  易于逻辑的拆分，可以方便组合自定义hook 使用
2.  hook 可以在无需修改组件结构的情况下，复用逻辑,自定义 hooks
3.  相同的逻辑可以写在一起，便于查看 useEffect
4.  没有this 指向的问题

###  class 组件和 function 组件的区别

1. 类组件中有 state,生命周期,this 等，函数组件是无状态的可以通过 hook 来处理
2. 类组件之前逻辑很难复用，函数组件内可以抽出相同的 hook 来做
3. 相同逻辑被拆分在不同的生命周期里，容易引发很多问题，函数组件可以在 useEffect 中统一处理



# setState 是同步的还是异步的?

setState  本身的过程和代码都是同步的，所谓“异步”是因为合成事件和钩子函数处在 react 的更新机制造成的假象。
如果 setState 传入的是对象的话，会合并成一次执行，如果是函数的话，不会被合并，都会执行.

### 在react 的合成事和生命周期钩子中： (是异步的)
- setState 是在合成事件(react 封装的自己的一套事件机制如 onClick、onChange 这些都是合成事件) 和生命周期钩子函数里，是异步的。
- 在合成事件和生命周期钩子中 setState，并不会立即触发更新， 只会把 isBatchingUpdates 改为 true, 只会加入待更新的队列（dirtyComponent）中，
  所以在此时无法拿到更新后的值就造成了异步的假象。
- 当组件didMount后，isBatchingUpdates 为false , 此时再取出'_pendingStateQuene'和'dirtyComponent'中的state和组件进行合并更新；

### 在原生事件 和 setTimeout 中：（是同步的）
- 原生事件不会触发react 的批处理机制，所以在能够拿到更新后的值
- 在 setTimeout 中，这时上一轮的更新过程已经执行完毕，isBatchingUpdates 为 false,所以此时能拿到 setState 的值

###  setState 实现过程

1. 将 setState 传入的参数存到 \_pendingStateQueue 队列中
2. 判断当前组件是否处于批量更新阶段 isBatchingUpdates，如果是则加入待更新的队列 dirtyComponent 中，否则则执行更新事务(transcation)
3. 遍历 dirtyComponent 队列依次更新，调用 wrapper 的 initialize 方法，更新 isBatchingUpdates，state,props
4. 执行生命周期 componentWillReceiveProps。
5. 将组件的 state 暂存队列中的 state 进行合并，获得最终要更新的 state 对象，并将队列置为空。
6. 执行生命周期 componentShouldUpdate，根据返回值判断是否要继续更新。
7. 执行生命周期 componentWillUpdate。
8. 执行 render。
9. 执行生命周期 componentDidUpdate。

# 如何获取到 state 最新的值

setState 在 react 生命周期的方法里是异步的
如果是 class 组件，可以在 this.setState 的第二个参数 （回调函数）中获取该值
但如果是函数组件：

1. useEffect 可以利用依赖这个 state 来获取最新值
2. useRef 返回一个可变的对象，  ref 来保存这个变量,那 ref.current 就是最新的 state

```js
function Counter() {
  const [count, setCount] = useState(0)
  const prevCountRef = useRef()

  useEffect(() => {
    setCount(count)
    prevCountRef.current = count
  }, [])

  const handleClick = () => {
    setCount(count++)
    prevCountRef.current = count++
  }

  const prevCount = prevCountRef.current

  return (
    <h1 onClick={handleClick}>
      Now: {count}, before: {prevCount}
    </h1>
  )
}
```

# fiber
React Fiber 解决的目的：
在 React 15 之前，react 在加载 dom 或更新组件库时不会中断，当计算的任务重，或者渲染元素复杂时就会出现卡顿和用户交互无响应的情况。为了解决这些问题，引入了 fiber 架构（异步可中断）。
React Fiber 采用分片的方式，把耗时长的任务分成多个小片，这些分片可以被中断，给高优先级的任务让位，把控制权交给浏览器，这样当遇到对一些比较大的 js 计算和 dom 计算，也不会出现太卡顿的现象。

1. generator 也可以中断任务执行，为什么不采用 generator 实现

- 需要把所有的函数封装成 generator 的形式，工程量较大
- generator 内部是有状态的
  ```js
  function* run(a, b, c) {
    const x = doWorkA(a)
    yield
    const y = doWorkB(b)
    yield
    const z = doWorkC(x, y, c)
    return z
  }
  ```
  如果执行完了 doWorkA，doWorkB,还未执行 doWorkC 那在新的时间片内，如果 B 更新了，此时 doWorkC 还是只能拿到之前的 doWorkB 返回的结果

2. js 如何判断当前有高优先级的任务
   js 是无法知道当前最高优先级任务是哪个，所以采用了给每个任务约定一个合理的执行时间，当超过了该时间，就中断任务，把控制权交给浏览器

   requestIdleCallback 这个 API 可以在浏览器空闲的时候可以执行的回调

3. 什么时候浏览器有空闲时间？
   浏览器在一帧中要处理的事情：

- 用户交互事件
- js 执行
- requestAnimation 回调
- 布局
- 绘制

等执行完这些任务空余的时间

4. 如果浏览器很忙怎么办？ 利用下面方法
  window.requestIdleCallback(callback[, options]) 兼容性差
   callback:空闲时被执行的回调参数
   options: timeout 超时时间，如果浏览器很忙，超过 timeout 这个时间还未执行，浏览器会在下一帧强制执行回调

- https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback

react 使用 messageChannel 来模拟 requestIdleCallback 的功能

5. requestIdleCallback   timeout 超时之后会一定执行吗
    不一定，会按照 react 中任务的优先级来去执行： 高优先级会执行，低优先级的任务会往后排

- Immdiate 立即执行的任务
- userBlocking 用户交互的任务
- normal : 不需要用户交互的 如请求
- low: 任务会优先级低，但一定会执行的任务
- Idle : 不必要的任务，无限期延后

fiber 树
根据 dom 树生成 fiber 树，fiber 树包含 
```js
{
  child:{}（此节点的第一个子节点）
  sibling:{}（此节点的兄弟节点）
  return:{}（指向父节点） 等属性
}

```

采用后序遍历 从顶点开始遍历，先子节点，再兄弟节点，完成所有子节点后自己才完成
fiber 的更新过程分为两个阶段：
render 阶段：任务可被中断，找出所有节点的变更  

```js
 ReactDOM.render( <App/>, document.getElementById('root'));
```
commit 阶段：任务不能中断，执行所有的变更



# React 中的 key 作用是什么

不使用key:
1. 就地复用节点，在针对一些简单列表，如果不用 key ,则 key 都为 undefined,
  如果只是改一些节点属性，在比较时不会删除和更新节点，只会对比其属性，速度上相比带key 是快一点的
2. 也有可能会带来性能下降，如果涉及到删除和添加节点多时，比较也会增多，性能就会有所下降
3. 无法维持组件的状态 

使用key:
1. 维持组件的状态，保证组件的复用。因为有 key 唯一标识了组件，key 相同时就直接复用节点，不会再新增或者删除组件。
2. 查找更快，根据 key 是vnode 的唯一标识，在 diff 比较时可以更准确，更快的查找到旧的vnode 对应的节点
3. 节点复用带来的提升，在对比相同key时可以直接复用，减少了dom 的新增和删除工作

不建议使用数组索引作为 key ,如果数组的第一项发生了改变（删除了），会导致后面的内容索引都变了，所有的dom 元素都得删除重建，如果有唯一的key ,只需要改变当前节点的dom 就可

# react 项目中的优化

- 减少不必要的渲染,减少计算

1. PureComponent,React.memo
   对 props 和 state 进行浅比较,减少子组件的重复渲染。
2. shouldComponentUpdate
   通过对子组件使用的一些属性判断，发生改变才返回 true,能避免子组件重新 render
3. useMemo(),useCallback
   返回一个计算的值，避免依赖不变情况下的重新计算和重新渲染
4. 列表项使用 key
5. 减少 bind,this 的次数
6. hooks 正确依赖
7. 长列表优化,懒加载,React.lazy()

# react-router 实现，区别

react-router 分为 BrowserRouter， HashRouter

BrowserRouter 是通过 h5 的 API, history.pushState,replaceState 实现的
HashRouter 是通过 hashChange 来实现的

区别：

1. 表现形式不一样
2. 刷新后对路由 state 参数的影响
   BrowserRouter 没有任何影响，state 的值保存的 history 对象中
   HashRouter 刷新后会导致路由 state 参数的丢失

# useMemo 和 useCallback 区别

useMemo() 返回一个经过计算的值,可以是属性，可以是函数（包括组件）减少计算
不要滥用 useMemo：
在优化子组件渲染，或者当前组件依赖一个复杂计算的值的时候

useCallback 返回一个函数,只有在依赖项发生变化的时候才会重新渲染,通常用在父组件传参时,减少子组件渲染的次数，配合子组件 React.memo()使用
不要滥用 useCallback：
用来优化子组件因函数不同造成重复渲染的问题
使用 useCallback 形成的闭包，将保持对回调函数和依赖项的引用


# useMemo 和 useState 的区别

useState 没有依赖项，state 在每次调用时都会重新计算
useMemo 只有在依赖发生变化了才会重新计算

# 虚拟 dom ,react diff

虚拟dom 实际上是包含了（自身元素）如下属性的一个对象，来表示一个节点，原生的dom会包含很多不用的元素比较庞大

、、、js
{
  type：h1, 节点类型，实际的标签 如 ui,div
  props：{id:'title',class:"name"},标签内部的属性（除key和ref会特殊处理）
  children: 节点内容
}
、、、


浏览器在渲染dom时 会比较慢，虚拟dom 是将所有的操作聚集到一块，计算出所有的变化后，统一更新一次虚拟DOM。
### 虚拟dom 一定会比 dom 快吗
只是针对于大型dom 全部重新渲染的条件下
在一个大型列表所有数据都变了的情况下，重置 innerHTML 其实是一个还算合理的操作... 真正的问题是在 “全部重新渲染” 的思维模式下，即使只有一行数据变了，它也需要重置整个 innerHTML，这时候显然就有大量的浪费。
Virtual DOM  的计算主要是在js ,dom 操作的相对较少，在复杂应用，数据多的情况下，每次重绘的性能都是可接收的

正常的diff 时间复杂度为 O(n3)
对比新旧两颗树，在老树上遍历新树的节点，找到新树的每个节点，需要O(n^2) ，找到不同后还需要计算最短修改路径修改节点 ,时间复杂度为 O(n^3)

react.diff 时间复杂度 为 O(n)
1. 只比较同一层级，跨层级的不比较
2. 同一层级的 tag 不相同，则直接删掉重建，相同不再深度比较
3. 再对比 tag 和 key ，两者都相同，则认为是相同节点，不再深度比较 ，不相同则删除重建

# react 生命周期

componentWillMount: 在渲染之前执行的方法
componentDidMount: 第一次挂载时执行的方法
componentWillReceiveProps:初始化 render 的时候不会执行，会在接收到新的 props 时触发
shouldComponentUpdate: 确定组件是否更新，默认为 true
render:render()
getSnapshotBeforeUpdate: 更新 dom 之前做的一些操作
componentDidUpdate:更新 props,state 触发的方法
componentWillUnMount: 组件销毁时执行的方法

监听 props 变化会在哪个生命周期中？ componentWillReceiveProps

# React.pureCompoent 和 React.Component 有什么区别
- React.Component 使用时，父组件重新渲染时，无论子组件 props 和 state 有没有变化，子组件都会重新render，浪费性能。
- React.pureCompoent 纯组件，对props 和state 进行浅比较（内部自己实现shouldComponentUpdate），减少render次数，省去了diff,重建dom的过程进行性能优化。
如果是引用类型的数据，只进行浅比较，只比较地址，如果地址不变，render不会被触发。但也因为深层的数据不监听会导致组件不更新。
- React.pureCompoent 纯组件 更适用于无状态的展示组件。

# React 合成事件，为什么要有合成事件
原生事件: 在 componentDidMount生命周期里边进行addEventListener绑定的事件
合成事件：react 自己实现的浏览器原生事件的包装器，通过 JSX 方式绑定的事件，比如 onClick={() => this.handle()}
当你需要使用浏览器的底层事件时，只需要使用 nativeEvent 属性来获取即可。

为什么有合成事件？
- 抹平不同浏览器事件的兼容性差距 ，便于跨平台
- 便于统一管理事件机制，利用事件委托机制，支持动态绑定，简化了 DOM 事件处理逻辑，减少了内存开销

合成事件的特点？
- 合成事件渲染的dom 都会挂载到document 上 （react17已经没有线程池，事件委托放到到了根元素上了）
- 通过冒泡机制冒到最顶层，由dispatchEvent统一分发 

# 什么是高阶组件，什么场景用到了高阶组件，写过什么高阶组件

高阶组件接收一个组件返回一个新组件的函数，对组件的状态并不会去更改

作用：

1. 逻辑功能共享
2. 属性代理
3. 操作组件实例
4. 渲染劫持,在 wrapComponent 组件中,可以对原来的组件进行，条件渲染，懒加载等

使用场景：
redux 的 connect
react-router withRouter
DrawerHOC  封装的抽屉组件
接收一个组件，返回一个组件，，接收一个每个单据的抽屉页详情组件，返回一个用<Drawer> 包装的有控制状态的组件

# react.Fragment react.Node ...的区别

react.Fragment 为了包裹多个元素，不会生成额外的 dom

react 15 之前 render() 返回必须有一个根节点
react 16 render() 允许返回一个数组

react.Node 可以是 react.Fragment,react.element,string,number...等

# redux  
https://juejin.cn/post/6844904036013965325
### redux  用来存储状态 

getState 获取状态
dispatch 设置状态
subscribe 广播事件 观察者模式

模拟 redux 实现：

```js
export const createStore =()=>{
 let currentState = {};
 let observers = [];     

  function getState(){
    return currentState;
  }

  // 这里可以抽离成 reducer.js 文件
  function dispatch(action,state){
    switch(action){
      case'plus':
      currentState={
        ...state,
        count:currentState.count+1;
      };
    }
  
    // 广播
    observers.forEach((fn)=>{
    fn()
    })
  }


  function subscribe(fn) {
    observers.push(fn)   
  }    
  return { getState, subscribe, dispatch }
}
```


### react-redux
如果要获取redux 中的状态： 需要以下4步，代码重复冗余， react-redux 帮助提供了 Provider 和 connect 来帮助我们简写这个过程
1. 引入 store
2. getState 获取状态
3. dispatch修改状态
4. subscribe订阅更新


Provider 把store 放入this.context 中，省掉引入store 这一步
connect  更新值，并自动订阅更新

Provider 实现：
```js

export class Provider extends React.Component {  
    constructor(props, context) {    
      super(props, context)    
      this.store = props.store  
    }  
   // 需要声明静态属性childContextTypes来指定context对象的属性,是context的固定写法  
    static childContextTypes = {    
        store: PropTypes.object  
    } 
    // 实现getChildContext方法,返回context对象,也是固定写法  
    getChildContext() {    
        return { store: this.store }  
    }  
    // 渲染被Provider包裹的组件  
    render() {    
        return this.props.children  
    }
}

  <Provider store={store}><App/></Peovider>
```

connect 实现:

connect 返回一个高阶函数，这个函数接收一个组件，返回一个新组件，把一些属性和方法绑定到上面
```js
  connect(mapStateToProps, mapDispatchToProps)(App)
```


```js
export function connect(mapStateToProps, mapDispatchToProps){

  return function(Component){
       class Connect extends React.Component {     
            componentDidMount() {          
              //从context获取store并订阅更新          
              this.context.store.subscribe(this.handleStoreChange.bind(this));        
            }
            handleStoreChange() {          
              // 触发更新          
              // 触发的方法有多种,这里为了简洁起见,直接forceUpdate强制更新,读者也可以通过setState来触发子组件更新          
              this.forceUpdate()        
            }   
            
            render(){
              return(
                   <Component              
                        // 传入该组件的props,需要由connect这个高阶组件原样传回原组件              
                        { ...this.props }              
                        // 根据mapStateToProps把state挂到this.props上              
                        { ...mapStateToProps(this.context.store.getState()) }               
                        // 根据mapDispatchToProps把dispatch(action)挂到this.props上              
                        { ...mapDispatchToProps(this.context.store.dispatch) }                 
                    />  
              )
            }       
        }   

      //接收context的固定写法      
         Connect.contextTypes = {        
            store: PropTypes.object      
        }  

       return Connect
  }
}
```


###  redux 中间件，洋葱模型

在redux中，我们中间件拦截的是dispatch提交到reducer这个过程，从而增强dispatch的功能。

dispath ----> logger ---->thunk ----->reducer ---->store

中间件模拟实现：

```js
// 打印日志的中间件
function logger(store) {    
    let next = store.dispatch    
    return (action) => {        
        console.log('logger1')        
        let result = next(action)        
        return result    
    }
}


// thunk 中间件
function thunk(store) {    
    let next = store.dispatch    
    return (action) => {        
        console.log('thunk')        
        return typeof action === 'function' ? action(store.dispatch) : next(action)    
    }
}


function applyMiddleware(store, middlewares) {    
    middlewares = [ ...middlewares ]      
    middlewares.reverse()    // 由于循环替换dispatch时,前面的中间件在最里层,因此需要翻转数组才能保证中间件的调用顺序  
    middlewares.forEach(middleware =>      
        store.dispatch = middleware(store)    
    )
}

applyMiddleware(store, [ logger, thunk, logger2 ])


```

redux-thunk 实现

```js
// 函数柯里化
const thunk = store => next =>action => {
    console.log('thunk')    
    const { dispatch, getState } = store    
    return typeof action === 'function' ? action(store.dispatch) : next(action)
}
```


洋葱模型：洋葱模型中的每一层都是一个中间件，每次都会从最外层一层一层的经过中间件，等到了最里层的中间件后开始逐层的返回。所以在一次请求和响应的时机中都有两次时机来添加不同的处理逻辑


```js
logger1(    
    console.log('进入logger1')    
        logger2(        
            console.log('进入logger2')        
                logger3(            
                    console.log('进入logger3')            
                    //dispatch()            
                    console.log('离开logger3')        
                )        
            console.log('离开logger2')    
        )    
    console.log('离开logger1')
)
```
# redux 过程

1. view 通过 store.getState() 获取 state 的值
2. 当需要更改数据时通过 view 页面发出 action
3. action 通过调用 store.dispatch()，把 action 和 state 传给 reducer
4. reducer 通过 actionType 返回对应的 state
5. state 一旦发生变化，就会调用监听函数 store.subscribe，来通知 view 页面数据发生了变化
6. state 改变就需要重新 render

# immer 原理

react 中数据是不可变的，如果是通过 redux 来修改 state 值时需要返回一个新的值，假如是修改一个对象，就需要对它做层层解构或者深拷贝,来生成一个新的对象来返回，这样书写上会麻烦，并且会新拷贝一个无用的新对象

immer 主要是为了解决复杂对象修改麻烦的问题。是利用 ES6 的 proxy 对象，当修改某个值时会生成 state 的草案，通过 set,get 方法修改某个属性对应的值，其他没有修改的不做修改，性能得到很大的提升



------------------------------

# react 中父组件调子组件的方法

主要是需要拿到子组件的实例，在调用子组件的方法

1. 通过传递 this 实例的方法， 父组件定义实例的方法 onRef(ref){ this.child =ref}, 子组件调用该方法传入实例 this.props.onRef(this)
2. useRef
3. useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。

# 受控组件，非受控组件的区别

受控组件，非受控组件是 react 处理表单的入口

受控组件就是通过事件改变 value 的值
比如：<input/> <textarea> 默认是非受控组件，如果通过设置 value 和 onChange 进行了数据绑定，就转化成了受控组件

# createRef 和 useRef 的区别

1. useRef 只能用在 function 组件
2. createRef 建议用在 class 组件，因为如果用在 function 组件，每次都会生成新的引用，新的 ref,每次都得初始化



# router 跳转 state 中的值

1. 把数据存到 storage 中
2. 通过路由传参
3. 在同一个页面处理，跳转路由，返回不同的组件


# React.lazy 的实现

# 你看过 react 源码不
filter 
function createReactElement(type,props,children){
  return {
    type:type,
    props:props
  }

}



# redux 中执行异步方法

通常会借助异步中间件来处理，比较流行的是 redux-chunk,redux-saga

redux-chunk
优点： 代码体积小，使用简单
缺点： 样板代码多
redux-chunk 使用
redux-saga:

缺点：代码体积大，语法比较复杂



```js
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'

// 设置中间件，可设置多个中间件
const enhancer = compose(applyMiddleware(thunk))

const store = createStore(reducer, enhancer)

export default store
```


