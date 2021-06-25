# 事件冒泡

冒泡是人类处理事件的逻辑。一般默认使用冒泡机制。
事件会从内层的元素传播,一层层传播给 document 对象

```html
<div>
	<button onclick=()=>{console.log(22)}>按钮</button>
</div>
```

click 的传播事件顺序为:
button ---> div --->body---> html---> document --->window

# 事件捕获

鼠标通过点击操作系统计算一个位移传给浏览器。把这个坐标转换为具体元素上事件的过程就是捕获的过程。捕获是计算机处理时间的逻辑.
是层外层元素出发到里面具体的元素
事件捕获触发的顺序:
window ---> document ---> html ---> body ---> div --->button

# element.addEventListener(event, function, useCapture)

- event:字符串,指定事件名称,注意用前缀,例如:使用 "click" ,而不是使用 "onclick"
- function: 指定事件触发时执行的函数
- useCapture: true/false
  true 指定事件在捕获阶段处理
  false(默认) 指定事件在冒泡阶段处理

  第三个参数不一定是 boolean 值，也可以是个对象，它提供了更多选项。

  once：为 true 时，只执行一次。listener 会在执行一次后自动清除
  passive：为 true 时，承诺此事件监听不会调用 preventDefault，这有助于性能。
  signal：该 AbortSignal 的 abort() 方法被调用时，移除 listener。

# 哪些场景下会用到 addEventListener

1.  事件委托
    事件委托：是指利用事件的捕获和冒泡将多个有相同处理事件的元素，放到其公共祖先上执行，不必为每个元素添加处理事件
    eg：利用事件委托，把事件绑定把 li 的事件绑定到 ul 上处理一些绑定事件

```js
;<ul id="myUL">
  <li id="1">aaa</li>
  <li id="2">bbb</li>
  <li id="3">ccc</li>
</ul>

const myUL = document.getElementById('myUL')

myUL.addEventListener('click', e => {
  if (e.target.nodeName.toLocaleLowerCase === 'li') {
    console.log('do something')
  }
})
```

2.  如处理封禁事件，点击页面上任何元素，弹出被封禁的提示（在捕获阶段处理）

```js
window.addEventListener(
  'click',
  () => {
    if (banned) {
      e.stopPropagation()
    }
  },
  true,
)
```

# 阻止事件冒泡

1. e.stopPropagation()
2. e.stopImmediatePropagation(); 阻止事件冒泡并且阻止该元素上同事件类型的监听器被触发
3. IE： e.cancelBubble = true

# 取消默认操作

1. e.preventDefault()
2. IE： e.returnValue = false

# 所有的事件都有冒泡吗,以下几个事件没有冒泡

blur
focus
mouseenter
mouseleave

media 触发的事件如（onplay(),onpause()...等)

参考文章：
https://zhuanlan.zhihu.com/p/164844013
