# 　虚拟 dom

dom 操作非常耗时。所以引入了虚拟 dom。虚拟 dom 是用 js 对象 模拟 dom，在 dom 发生变化的时候，通过 diff 算法对比原生 js 对象，计算出最小的变更,只对变化的 dom 进行操作，而不是整个视图。

## js 模拟 dom vnode 数据结构

```
tag + props +children
<div id="div1" className="container">
 <p>vdom</p>
</div>
{
    tag:"div",
    props:{
        className:"container",
        id:"div1"
    },
    children:[
        {
            tag:"p",
            children:"vdom"
        }
    ]
}
```

# 　模拟实现虚拟 dom

自定义 createElement(tag,props,children)方法，
tag:标签类型
props:元素属性
children: 子节点

```

// 虚拟DOM元素的类，构建实例对象，用来描述DOM
class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}
// 创建虚拟DOM，返回虚拟节点(object)
function createElement(type, props, children) {
    return new Element(type, props, children);
}

export {
    Element,
    createElement
}
```

# 浏览器如何渲染 dom

如果是字符串或者数字，创建一个文本节点

创建真实 dom，设置属性，遍历子节点，并获取创建真实 dom，插入到当前节点。
　虚拟 dom 中缓存真实的 dom 节点，返回 dom 节点
　将虚拟 dom 渲染成真实的 dom 之后，插入到对应的根节点

# diff 算法

所谓 diff 算法，就是找出两段文本之间差异的一种算法。是一个广泛的概念，如 linux diff ,git diff

## 为什么要用 diff 算法

dom 操作是很昂贵的，因此我们要减少 dom 操作。就需要找出必须更新的节点来更新，其他的不用更新，找的过程就需要用到 diff 算法。

描述:就是对比新老 dom 的变化，然后将变化的部分更新到视图上。通过比较新老树的节点，如果发现有类型和值不一样的节点，直接替换掉这个节点以下的所有节点。

diff 算法的过程中，会先将新旧节点的守卫交叉对比，无法匹配的额时候就用新节点的 key 和旧节点的 key 进行对比，从而找到旧节点。

# diff 算法改进

1. 只比较同一层级，不跨级比较
2. tag 不相同，则直接删掉重建，不再深度比较
3. tag 和 key ，两者都相同，则认为是相同节点，不再深度比较

# id 作为 key，列表渲染，为何要用 key

有 key 的话，直接移动过来就可以，没有的话，需要删除重建

1.  用组件唯一的 id 作为 key,
2.  尽量不用 index 作为 key
3.  不能用随机数作为 key,旧节点会被删掉，新节点重新创建
4.  diff 算法中通过 key 和 tag 来判断，是否是 sameNode
5.  减少渲染次数，提高渲染性能

# h 函数

https://github.com/snabbdom/snabbdom 使用

h 函数返回一个 vnode 对象
return vnode(sel,data,children,text,undefined)

```
example:
var snabbdom = require('snabbdom');
var patch = snabbdom.init([ // Init patch function with chosen modules
  require('snabbdom/modules/class').default, // makes it easy to toggle classes
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
  require('snabbdom/modules/style').default, // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default, // attaches event listeners
]);
var h = require('snabbdom/h').default; // helper function for creating vnodes

var container = document.getElementById('container');

var vnode = h('div#container.two.classes', {on: {click: someFn}}, [
  h('span', {style: {fontWeight: 'bold'}}, 'This is bold'),
  ' and this is just normal text',
  h('a', {props: {href: '/foo'}}, 'I\'ll take you places!')
]);
// Patch into empty DOM element – this modifies the DOM as a side effect
patch(container, vnode);
```

# patch 函数

patch(VNnode|element,VNnode)
实现过程：
如果传入不是 VNnode，会先创建一个 VNode
如果两个 VNnode 相同(通过判断 key 和 sel)，执行 patchVode 方法(该方法中判断 vnode 及其 children)
如果两个 VNnode 不同，重建立 VNode removeVnodes addVnodes

patchVode：
addVnodes removeVnodes
updateChildren

# patch 被分为两个阶段

1. 执行算法阶段 --纯 js 计算
2. 结果渲染 dom
