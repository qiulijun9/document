import { useRef, useEffect } from "react";

// leading 第一次触发  trailing 最后一次触发
const useThrottle = (
  callback,
  wait,
  options = { leading: true, trailing: true }
) => {
  const timeoutIdRef = useRef(null);
  const lastRunTimeRef = useRef(null);
  const lastArgsRef = useRef(null);

  useEffect(() => {
    const runCallback = () => {
      if (options.leading) {
        callback(...lastArgsRef.current);
        lastRunTimeRef.current = Date.now();
      }

      if (options.trailing) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(() => {
          if (Date.now() - lastRunTimeRef.current >= wait) {
            callback(...lastArgsRef.current);
            lastRunTimeRef.current = Date.now();
          }
        }, wait);
      }
    };

    runCallback();
  }, [callback, wait, options.leading, options.trailing]);

  const throttledFn = (...args) => {
    lastArgsRef.current = args;
  };

  return throttledFn;
};

import { useState } from "react";
import useThrottle from "./useThrottle";

const App = () => {
  const [count, setCount] = useState(0);
  const throttledSetCount = useThrottle(setCount, 1000, {
    leading: true,
    trailing: false,
  });

  return (
    <div>
      <button onClick={() => throttledSetCount(count + 1)}>
        Increase Count
      </button>
      <p>Count: {count}</p>
    </div>
  );
};

export default App;

function useDebounceFn(fn, delay, options = {}) {
  const { leading = false } = options;
  const [isDebounced, setIsDebounced] = useState(false);
  const [lastArgs, setLastArgs] = useState([]);
  const timeoutRef = useRef(null);

  const execute = (args) => {
    fn(...args);
    setIsDebounced(true);
  };

  useEffect(() => {
    if (leading && !isDebounced) {
      execute(lastArgs);
    } else {
      timeoutRef.current = setTimeout(() => {
        setIsDebounced(false);
        if (!leading) {
          execute(lastArgs);
        }
      }, delay);
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [lastArgs]);

  const debouncedFn = (...args) => {
    if (!isDebounced) {
      execute(args);
    } else {
      setLastArgs(args);
    }
  };

  return debouncedFn;
}

const allDeps = [];
let effectIndex = 0;
export function useEffect(callback, depArr) {
  // 没有依赖
  if (!depArr) {
    callback();
    allDeps[effectIndex] = depArr;
    effectIndex++;
    return;
  }

  //依赖发生变化
  const deps = allDeps[effectIndex]; // 上次的依赖项
  const hasChange = deps ? depArr.some((item, i) => item !== deps[i]) : true;
  if (hasChange) {
    callback();
    allDeps[effectIndex] = depArr;
  }
  effectIndex++;
}

let index = 0;
let stateArr = [];

export function useState(initialState) {
  const currentIndex = index;
  stateArr[currentIndex] = stateArr[currentIndex] || initialState;

  function changeState(newState) {
    stateArr[currentIndex] = newState;
    render();
  }

  index++;

  return [stateArr[currentIndex], changeState];
}

export function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Counter />
    </React.StrictMode>,
    document.getElementById("root")
  );
  // 渲染后完 索引也归0
  index = 0;
}
