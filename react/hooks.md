# jsx

react 使用 jsx 代替 javaScript,利用 html 来创建虚拟 DOM,return 出来的内容
上面的内容(方法)会执行一次,只有 jsx 依赖的值改变了，才会重新渲染页面
jsx 本质：React.createElement 即 h 函数，返回 vnode
第一个参数可能是 tag 或者 html ,组件名大写

# hooks

只能在最顶层使用 hook
因为在第一次加载时会使用默认值，然后把值存入顺序链表中
在以后每次修改时，是修改的链表中的值，所以要保证是顺序存储的，放在 if 或者方法中存储的顺序可能改变，会报错

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
