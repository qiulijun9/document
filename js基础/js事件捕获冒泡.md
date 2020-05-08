# 事件冒泡

事件会从内层的元素传播,一层层传播给 document 对象

```html
<div>
	<button onclick=()=>{console.log(22)}>按钮</button>
</div>
```

click 的传播事件顺序为:
button ---> div --->body---> html---> document

# 事件捕获

是层外层元素出发到里面具体的元素
事件捕获触发的顺序:
document ---> html ---> body ---> div --->button

# element.addEventListener(event, function, useCapture)

event:字符串,指定事件名,注意用前缀,例如:使用 "click" ,而不是使用 "onclick"
function: 指定事件触发时执行的函数
useCapture: true/false true 指定事件在捕获阶段处理 false(默认) 指定事件在冒泡阶段处理

# 阻止事件冒泡

1. event.stopPropagation()
2. return false 同时也阻止了事件本身的事件
