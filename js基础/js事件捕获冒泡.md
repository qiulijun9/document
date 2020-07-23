# 事件冒泡

冒泡是人类处理事件的逻辑。一般默认使用冒泡机制。
事件会从内层的元素传播,一层层传播给 document 对象

```html
<div>
	<button onclick=()=>{console.log(22)}>按钮</button>
</div>
```

click 的传播事件顺序为:
button ---> div --->body---> html---> document

# 事件捕获

鼠标通过点击操作系统计算一个位移传给浏览器。把这个坐标转换为具体元素上事件的过程就是捕获的过程。捕获是计算机处理时间的逻辑.
是层外层元素出发到里面具体的元素
事件捕获触发的顺序:
document ---> html ---> body ---> div --->button

# element.addEventListener(event, function, useCapture)

event:字符串,指定事件名称,注意用前缀,例如:使用 "click" ,而不是使用 "onclick"
function: 指定事件触发时执行的函数
useCapture: true/false true 指定事件在捕获阶段处理 false(默认) 指定事件在冒泡阶段处理
第三个参数不一定是 bool 值，也可以是个对象，它提供了更多选项。
once：只执行一次。
passive：承诺此事件监听不会调用 preventDefault，这有助于性能。
useCapture：是否捕获（否则冒泡）

# 阻止事件冒泡

1. event.stopPropagation()
2. return false 同时也阻止了事件本身的事件

# 所有的事件都有冒泡吗,以下几个事件没有冒泡

onblur
onfocus
onmouseenter
onmouseleave

# 操作焦点

document.body.focus();
document.body.blur();
