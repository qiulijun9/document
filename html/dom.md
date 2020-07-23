操作对象或者获取对象的 length 都比数组慢，在获取对象的某个值，或者获取对象的长度时都需要将对象遍历一遍，才可得到。一般会把对象的 length 存到一个变量中再使用。
当要多次访问一个 dom 属性或方法时，应把该成员用阿变量缓存起来，把 length 也用一个变量存储。

# Dom API

节点，与 dom 树节点相关的 API
事件，触发和监听事件的 API
Range，操作文字相关的 API
遍历，遍历 dom 所需要的 API

## 操作 dom 树的 api

appendChild
insertBefore
removeChild
replaceChild

compareDocumentPosition 是一个用于比较两个节点中关系的函数。
contains 检查一个节点是否包含另一个节点的函数。
isEqualNode 检查两个节点是否完全相同。
isSameNode 检查两个节点是否是同一个节点，实际上在 JavaScript 中可以用“===”。
cloneNode 复制一个节点，如果传入参数 true，则会连同子元素做深拷贝。
Attribute:
getAttribute
setAttribute
removeAttribute
hasAttribute

## 查找 dom 元素

querySelector
querySelectorAll
getElementById
getElementsByName
getElementsByTagName
getElementsByClassName

# Dom 构建

通过栈可以模拟 dom 树的构建：
栈顶元素就是当前节点；
遇到属性，就添加到当前节点；
遇到文本节点，如果当前节点是文本节点，则跟文本节点合并，否则入栈成为当前节点的子节点；
遇到注释节点，作为当前节点的子节点；
遇到 tag start 就入栈一个节点，当前节点就是这个节点的父节点；
遇到 tag end 就出栈一个节点（还可以检查是否匹配）。

# Css 树构建

在拿到上一个生成的 dom 节点，去查找匹配的 css。选择器的出现顺序，必定跟 dom 树的构建顺序一致。css 会通过词法分析和语法分析，生成 css 抽象语法树

# 浏览器渲染

把 url 解析成字符流，再把字符流解析成 token 流，把 token 流解析成 dom 树，通过 cssdom 渲染样式，再通过样式规则计算出元素的位置，再把元素渲染到(绘制位图）对应的位置上。
