# 节点：

1. element 元素型节点

- Html Element
- SVG Element

2. Document 节点
3. 字符数据

- 文本节点
- 注释
- 处理信息

3. Document Fragment :文档片段
4. Document Type：文档类型

# 浏览器 DOM API

## 查找节点

parentNode
childNodes
firstChild
lastChild
nextSibling 下一个邻居节点
previousSibling 上一个邻居节点

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

compareDocumentPosition: 比较两个节点中的关系
contains 检查一个节点是否包含另一个节点的函数
isEqualNode 检查两个节点是否完全相同，dom 树结构相同就相同
isSomeNode ： ===
cloneNode 克隆节点

# 浏览器事件

addEventListener(type,lisener,[true/false,options])
type:事件的类型 click,
lisener：监听类型触发的事件

options：
true/false(事件的模式，默认是冒泡，false 为捕获)
once:listener 事件在添加后只执行一次
passive：默认为 false ,为了提升性能。若想阻止浏览器的某些默认事件应为 true
