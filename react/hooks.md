# jsx

react 使用 jsx 代替 javaScript,利用 html 来创建虚拟 DOM,return 出来的内容
上面的内容(方法)会执行一次,只有 jsx 依赖的值改变了，才会重新渲染页面
jsx 本质：React.createElement 即 h 函数，返回 vnode
第一个参数可能是 tag 或者 html ,组件名大写

# hooks 和原生类组件的区别

1.  在无需编写类的情况下也就是在使用函数组件时可以通过 hooks 来使用 state,和生命周期等特性。
2.  hook 可以在无需修改组件结构的情况下复用逻辑状态，比如直接使用 useDispatch ,useSelector 来获取 store 中的数据，不用在用高阶函数的方法层层嵌套
3.  在原生 class 组件中，可能在 componentDidMount,和 componentDidUpdate 中获取数据，之后在 componentWillUnmount 中清除。逻辑被拆分开，不相关的逻辑写在一起，容易造成 bug.在 hook 中可以使用 useEffect 来处理这些副作用。
4.  在 class 组件中需要注意 this 的绑定，在子类中必须先调用 super,然后才能使用 this,class 不能进行很好的压缩、
5.  可以通过自定义 hook 把一些公用的逻辑提取出来，方便使用
6.  写一个 class 组件可能比较重，代码繁多，通过 hook 可以精简结构。

# hooks 缺点

1.  hooks 每次渲染都执行，所以要解决依赖的问题
2.  在闭包场景中可能用到旧的 state 和 props
3.  内部实现不直观,依赖一份可变的状态,不在那么纯

# hooks 注意

1. 只能在最顶层使用 hook
   因为在第一次加载时会使用默认值，然后把值存入顺序链表中
   在以后每次修改时，是修改的链表中的值，所以要保证是顺序存储的，放在 if 或者方法中存储的顺序可能改变，会报错
2. 只能在函数组件或自定义 hook 中使用 hook

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

useEffect 中的 return 方法是在组件销毁的时候执行一些清除操作.

没有和变量关联的方法尽量放在组件外面,放组件内部可能会由于依赖一直重复加载
如果只有 useEffect 用到的方法，放在 useEffect()里面，放在外面可能被其他函数调用，让 useEffect 的依赖增加
如果多个 useEffect 用到同一个方法，可以用 userCallback()和 useMemo() 包裹起来

## useEffect()模拟生命周期

模拟 componentDidMount

```jsx
useEffect(() => {
  consle.log('didmount')
}, [])
```

模拟 componentDidUpdate

```jsx
const [flag, setFlag] = useState(true)
useEffect(() => {
  if (!flag) {
    console.log('执行 update')
  }
  setFlag(false)
  return () => {
    console.log('销毁触发')
  }
}, [flag])
```

模拟 componentWillUnmount
useEffect(()=>{
return ()=>{
console.log("销毁")
}
},[])

# useContext 父子组件传值

//父组件
const countContext = createContext() //创建上下文
<countContext.Provider value = {count}> 子组件 </countContext.Provider> //提供参数

//子组件
之前使用通过 context 的 consumer 组件来使用

```jsx
const UserContext = createContext()
class UseUserInfoComponent extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {context => (
          <div>
            <p>{context.name}</p>
          </div>
        )}
      </UserContext.Consumer>
    )
  }
}
```

let count = useContext(countContext) //使用父组件传的值

# useReducer

const [count,dispatch]=useReducer((state,action)=>{
//state 用户的值 action 改变值的方法
},默认值)

# useMemo

解决子组件重复执行的问题,返回一个值.当后面依赖的值改变的时候才会执行第一个传入的函数.不变则不会去执行
useMemo(()=>{},[])
解决问题：
如果父组件传给组件一个对象，每次都会生成一个新的对象，子组件的 props 改变就要重新渲染

```
//const info = { name, age }
const info = useMemo(()=>{{ name, age }},[name,age])//只有当数组中的依赖改变时，才会返回一个新的对象
<div>
    <ChildComp info={info} onClick={changeName}/>
</div>
```

# useCallback(callback,[])

同 useMemo 解决问题相同.返回一个函数，通过引用相等性，来决定组件是否渲染，可以解决组件重复渲染的问题.如果后面的参数不变,则会缓存第一个传进来的函数
const callback = useCallback(()=>{
dosomething(a,b)
},[a,b])

## 为什么子组件重复执行,如下例

const handleCount = () => setCount(count => count + 1);
<button onClick={handleCount}>Increment Count</button>
每次都会生成一个新的函数,当 handleCount 作为 props 传给子组件时,那子组件都会进行重新渲染,导致 React.PureComponent ,React.Memo 失效
解决问题:当依赖没有变时,则不会生成新的函数
const handleCount = useCallback(()=> setCount(count => count + 1),[])

# useRef

获取 dom
const inputEl = useRef(null)

<input ref ={inputEl} type="text> //获取 dom 元素
inputEl.current.value="hello"
保存变量

# useSelector 获取 redux 中的值

```jsx
import { useSelector, useDispatch } from 'react-redux'
const counter = useSelector(state => state.counter)

const dispatch = useDispatch()
const incrementCounter = useCallback(
  () => dispatch({ type: 'increment-counter' }),
  [dispatch],
)
```

# useDispatch()修改 redux 的值

为了防止 dispatch 的回调函数传递给子组件时，建议用 useCallback 将它包起来

```
const dispatch = useDispatch()
  const incrementCounter = useCallback(
    () => dispatch({ type: 'increment-counter' }),
    [dispatch]
  )
```
