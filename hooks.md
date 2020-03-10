# jsx 
react 使用jsx代替javaScript,利用html来创建虚拟DOM,return出来的内容
上面的内容(方法)会执行一次,只有jsx依赖的值改变了，才会重新渲染页面

# hooks
只能在最顶层使用hook

## useState()
useStaste 是按顺序来存储值，修改值的,不能放在if条件语句或是方法中
const [ count, setCount] =useState(0) //数组解构

## useEffect()

useEffect(()=>{
  return ()=>{
    //依赖解除时调用的方法
  }
}，[依赖])

没有和变量关联的方法尽量放在组件外面,放组件内部可能会由于依赖一直重复加载
如果只有useEffect 用到的方法，放在useEffect()里面，放在外面可能被其他函数调用，让useEffect 的依赖增加
如果多个useEffect用到同一个方法，可以用userCallback()和useMemo()

# useContext 父子组件传值

//父组件
const countContext = createContext()  //创建上下文
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
获取dom
const inputEl = useRef(null)

<input ref ={inputEl}  type="text> //获取dom 元素
 inputEl.current.value="hello"
 保存变量
 