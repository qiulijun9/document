# jsx

react 使用 jsx 代替 javaScript,利用 html 来创建虚拟 DOM,return 出来的内容
上面的内容(方法)会执行一次,只有 jsx 依赖的值改变了，才会重新渲染页面
jsx 本质：React.createElement 即 h 函数，返回 vnode
第一个参数可能是 tag 或者 html ,组件名大写

# hooks 和原生类组件的区别
 1. 在无需编写类的情况下也就是在使用函数组件时可以通过hooks来使用state,和生命周期等特性。
 2. hook 可以在无需修改组件结构的情况下复用逻辑状态，比如直接使用useDispatch ,useSelector 来获取store中的数据，不用在用高阶函数的方法层层嵌套
 3. 在原生class组件中，可能在componentDidMount,和componentDidUpdate 中获取数据，之后在componentWillUnmount 中清除。逻辑被拆分开，不相关的逻辑写在一起，容易造成bug.在hook中可以使用useEffect来处理这些副作用。
 4. 在class组件中需要注意this的绑定，在子类中必须先调用super,然后才能使用this,class 不能进行很好的压缩、
 5. 可以通过自定义hook把一些公用的逻辑提取出来，方便使用
 6. 写一个class组件可能比较重，代码繁多，通过hook可以精简结构。

# hooks缺点
 1. hooks每次渲染都执行，所以要解决依赖的问题

# hooks注意

1. 只能在最顶层使用 hook
因为在第一次加载时会使用默认值，然后把值存入顺序链表中
在以后每次修改时，是修改的链表中的值，所以要保证是顺序存储的，放在 if 或者方法中存储的顺序可能改变，会报错
2. 只能在函数组件或自定义hook中使用hook

## useState()

useStaste 是按顺序来存储值，修改值的,不能放在 if 条件语句或是方法中
const [ count, setCount] =useState(0) //数组解构

## useEffect()
可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。

useEffect(()=>{
return ()=>{
//依赖解除时调用的方法
}
}，[依赖])

没有和变量关联的方法尽量放在组件外面,放组件内部可能会由于依赖一直重复加载
如果只有 useEffect 用到的方法，放在 useEffect()里面，放在外面可能被其他函数调用，让 useEffect 的依赖增加
如果多个 useEffect 用到同一个方法，可以用 userCallback()和 useMemo() 包裹起来

# useContext 父子组件传值

//父组件
const countContext = createContext() //创建上下文
<countContext.Provider value = {count}> 子组件 </countContext.Provider> //提供参数

//子组件
let count = useContext(countContext) //使用父组件传的值

# useReducer

const [count,dispatch]=useReducer((state,action)=>{
//state 用户的值 action 改变值的方法
},默认值)

# useMemo

解决子组件重复执行的问题
useMemo(()=>{},[])

# useCallback
返回一个函数，通过引用相等性，来决定组件是否渲染，可以解决组件重复渲染的问题

# useRef

获取 dom
const inputEl = useRef(null)

<input ref ={inputEl} type="text> //获取 dom 元素
inputEl.current.value="hello"
保存变量

# useSelector 获取 redux 中的值

const counter = useSelector(state => state.counter)

# useDispatch()修改 redux 的值

为了防止 dispatch 的回调函数传递给子组件时，建议用 useCallback 将它包起来

```
const dispatch = useDispatch()
  const incrementCounter = useCallback(
    () => dispatch({ type: 'increment-counter' }),
    [dispatch]
  )
```
