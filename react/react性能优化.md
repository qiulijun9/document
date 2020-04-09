性能优化对于 react 更加重要。因为父组件有更新，它所有的子组件无条件更新，不管子组件有没有改。

# 性能优化

1. 合理使用 PureComponent,React.Memo 进行性能优化
2. 列表渲染加 key
3. 自定义事件，Dom 事件及时销毁
4. 合理使用异步组件
5. 减少函数 bind this 的次数
6. 合理使用 immutable.js
7. 前端通用的性能优化(图片懒加载等)
8. webpack 层面的优化
9. 使用 SSR

# shouldComponentUpdate

需要的时候才优化，所以 react 提供可改变 true 和 false 的方法。
通过返回的 true 和 false,来判断是否执行 render().默认返回 true
通过前后的 props 对比，来判断是否更新 render
必须配合“不可变值”一起使用

```
//自己写判断的方法
shouldComponentUpdate(nextProps,nextState){
   if(nextProps.text !== this.props.text){
      return true;
   }
   return false;
}
```

# PureComponent,React.Memo

PureComponent（纯组件），在 shouldComponentUpdate 中实现了浅比较，必须依靠 class 组件才能使用。
只需要 extends React.PureComponent 就能使组件成为 Pure Component。

```
import React from 'react';

class TestC extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }
    render() {
        return (
            <div>
            { this.state.count }
            <button onClick = {
                () => this.setState({ count: 1 })
            }> Click Me </button>
            </div >
        );
    }
}

export default TestC;
```

React.Memo()，函数组件中的 PureComponent，是一个高阶组件，使用它来包裹一个已有的函数组件。
因为函数组件中没有生命周期和 state,也不能去继承 React.PureComponent 类。
浅比较，已经适用于大部分组件，不建议用深比较，比较耗费性能、

```
const Funcomponent = ()=> {
    return (
        <div>
            Hiya! component
        </div>
    )
}
const MemodFuncComponent = React.memo(FunComponent)
```

# immutable.js

彻底拥抱“不可变值”
基于共享数据，速度快
