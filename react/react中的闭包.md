# 过时的闭包
```js
function createIncrement(i) {
  let value = 0;
  function increment() {
    value += i;
    console.log(value);
    const message = `Current value is ${value}`;
    return function logValue() {
      console.log(message);
    };
  }
  
  return increment;
}

const inc = createIncrement(1);
const log = inc(); // 打印 1
inc();             // 打印 2
inc();             // 打印 3
// 无法正确工作
log();             // 打印 "Current value is 1"----log 就是过时的闭包，保存的是旧值
```
解决过时闭包的一种方法是获取最新的闭包

const newLog = inc();
newLog()//"Current value is 3"---提供最新的闭包

# react hook 闭包

```js
function WatchCount() {
  const [count, setCount] = useState(0);

  useEffect(function() {
    setInterval(function log() {
      console.log(`Count is: ${count}`);
    }, 2000);
  }, []);

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1) }>
        加1
      </button>
    </div>
  );
}
在多次点击按钮之后，每次打印出来的是 count is 0 ,

```

1. hook 提供最新的闭包，useEffect(依赖) ，从传入的依赖中捕获新的闭包
解决办法给useEffect传入count依赖

2. useState 中使用函数方法来更新count 状态，就是传一个函数，函数的参数就当前的state
```
  const [count, setCount] = useState(0);
  setCount(count => count + 1); 
```
3. 当父组件给子组件传入一个函数的时候，函数中传入一个变量，就会产生闭包问题，通过useRef解决
```
  const uploadingFileListRef = useRef('');
  uploadingFileListRef.current = uploadingFileList // 父组件的函数
```
4. useReducer (),state 作为参数传入reducer中，无论何时调用dispatch,reducer中得到的state中都是最新的
  const [state, dispatch] = useReducer(reducer, initState);

5. 把参数提到函数外面