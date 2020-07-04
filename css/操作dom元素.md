https://www.jianshu.com/p/724d854b7728

## 查找 HTML 元素

1. 通过 id 查找 HTML 元素,查出来的是单个的 HTML 元素,不存在返回 null
   document.getElementById("intro")

2. 通过标签名查找元素，得到的是一个对应元素数组，通过下标来获取元素
   document.getElementsByTagName("p");

3. 通过 类名　查找元素，得到的是一个对应元素数组，通过下标来获取元素
   document.getElementsByClassName('wrapper')

4. 通过 css 选择器查找元素
   document.querySelector('选择器')　，只能获取第一个元素
   document.querySelectorAll()　获取的是所有的元素数组，需要通过下标来获取每个元素

## 创建 Dom 元素

document.createElement("标签名")
//document.createElement("div")

## 追加元素

element.appendChild(node)

## 删除节点

element.removeChild(node)

# 获取页面标签的个数

1. 获取所有的标签 dom 节点 document.querySelectorAll('\*')
2. 将节点集合转化成数组
3. 获取每个节点的标签名 tagName
4. 数组去重

new Set([...document.querySelectorAll('*')].map(e=>e.tagName)).size

# 注意

操作对象或者获取对象的 length 都比数组慢，在获取对象的某个值，或者获取对象的长度时都需要将对象遍历一遍，才可得到。一般会把对象的 length 存到一个变量中再使用。

当要多次访问一个 dom 属性或方法时，应把该成员用阿变量缓存起来，把 length 也用一个变量存储。
