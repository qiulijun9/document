# 节点包括：

1. element 元素型节点

- Html Element
- SVG Element

2. Document 节点
3. 字符数据

- 文本节点
- 注释
- 处理信息

4. Document Fragment :文档片段
5. Document Type：文档类型

# 浏览器 DOM API

## 查找节点

parentNode
childNodes
firstChild
lastChild
nextSibling 下一个邻居节点
previousSibling 上一个邻居节点
eg:
document.getElementById("item1").parentNode;

## 查找 element

parentElement
children
firstElementChild
lastElementChild
nextElementChild
previousElementChild

## 修改操作

appendChild
insertBefore
remoteChild ,找到父节点才能移除该节点
replaceChild

compareDocumentPosition: 可以用来对比两个 HTML 节点在文档中的位置关系，包括前后，父子，自身以及跨文档。不仅是 DOM 节点，文本节点，注释节点甚至属性节点的位置关系都可以判定
contains: 检查一个节点是否包含另一个节点的函数
isEqualNode: 检查两个节点是否完全相同，dom 树结构相同就相同
isSomeNode : 用===代替
cloneNode :克隆节点

# 浏览器事件

addEventListener(type,lisener,[true/false,options])
type:事件的类型 click,
lisener：监听类型触发的事件

options：可以为 false/true,或者是一个对象
true/false(事件的模式，默认是冒泡，false 为捕获)
once:listener 事件在添加后只执行一次
passive：默认为 false ,为了提升性能,永远不会调用 preventDefault 阻止默认事件,若想阻止浏览器的某些默认事件应为 true

eg:

```js
button.addEventListener(
  'click',
  function (e) {
    e.preventDefault()
    console.log('link clicked!')
  },
  { capture: false, once: true, passive: true },
)
```

# Range API

对 dom 树进行精确操作的 API

# CSSOM

对 css 文档 的抽象
根节点：document.stylesheet

引入方式

<style></style>
<link rel="stylesheet" title="" href=""/ >

访问
document.styleSheets[0].rules[0]

document.styleSheet.rules[0].insertRule("#blanc { color: white }", 0);
document.stylesheet.rules[0].removeRule(0)

cssStylerule
K_V 结构

修改 css 样式
document.stylesheet.rules[0].style.color = "red"
获取元素真实渲染的属性，以及伪元素的，用来获取 transform, 动画的中间态
getComputedStyle(ele)

# CSSOM view

## window

window.innerHeight ,window.innerwidth 浏览器实际渲染所需要的区域 \*
window.outHeight,window.outWidth 宽高包括浏览器自带的工具栏的尺寸

window.devicePixelRatio 实际的物理像素和代码中比值

window.open("about:blank","blank","width:200,height:100,left:0,top:20")
创建的 window 可调用的方法
window.w= window.open("about:blank","blank","width:200,height:100,left:0,top:20")
moveTo(x,y)
moveBy(x,y)
resizeTo(x,y)
resizeBy(x,y)
scrollX(x,y)
scrolly(x,y)
scroll(x,y)
scrollBy(x,y)

## scroll 有滚动条时生效

scrollTop
scrollLeft
scrollWidth
scrollHeight
scroll(x,y)
scrollBy(x,y)
scrollIntoView(x,y)

## layout

element.getClientRects 获取元素生成的所有的盒,返回 DOMRect 数组
element.getBoundingClientRect 只能取到一个，包元素包含的盒取出来,返回元素的大小及相对于窗口的位置
