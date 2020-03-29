# 　虚拟 dom

用 js 对象 模拟 dom，在 dom 发生变化的时候，通过 diff 算法对比原生 js 对象，计算出需要改变的 dom,只对变化的 dom 进行操作，而不是整个视图。

# 　实现虚拟 dom

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

描述:就是对比新老 dom 　的变化，然后将变化的部分更新到视图上。
