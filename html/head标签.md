## head 标签

它主要是作为盛放其它语义类标签的容器使用。

## title 标签

表示文档的标题

## base 标签

base 标签实际上是个历史遗留标签。它的作用是给页面上所有的 URL 相对地址提供一个基础。
base 标签最多只有一个，它改变全局的链接地址，它是一个非常危险的标签，容易造成跟 JavaScript 的配合问题，所以在实际开发中，我比较建议你使用 JavaScript 来代替 base 标签。

## meta 标签

meta 是一组键值对,是一种通用的元信息表示标签
head 中可以有多个 meta 标签,一般由 name 和 content 两个属性来定义

```html
<meta name="application-name" content="lsForums" />
```

### 具有 charset 属性的 meta

添加了 charset 属性的无需再有 name 和 content,描述文档的编码形式放在 head 的第一个.
浏览器读到这个标签之前，处理的所有字符都是 ASCII 字符,ASCII 是 UTF-8 字符的子集,所以在这之前不会出现乱码

```html
<meta charset="utf-8" />
```

### 具有 http-equiv 属性的 meta

http-equiv 表示执行一个命令,就不需要 name 属性了

```html
指定了http头,和http的编码方式
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
```

除了 content-type，还有以下几种命令：

- content-language 指定内容的语言；
- default-style 指定默认样式表；
- refresh 刷新；
- set-cookie 模拟 http 头 set-cookie，设置 cookie；
- x-ua-compatible 模拟 http 头 x-ua-compatible，声明 ua 兼容性；
- content-security-policy 模拟 http 头 content-security-policy，声明内容安全策略

### name 为 viewport 的 meta

是移动端开发的标准
name 为 viewport 的,content 是一组键值对

```html
指定了宽度和缩放

<meta name="viewport" content="width=500, initial-scale=1" />
```

- width：页面宽度，可以取值具体的数字，也可以是 device-width，表示跟设备宽度相等。
- height：页面高度，可以取值具体的数字，也可以是 device-height，表示跟设备高度相等。
- initial-scale：初始缩放比例。minimum-scale：最小缩放比例。
- maximum-scale：最大缩放比例。user-scalable：是否允许用户缩放。

其他:

- author: 页面作者。
- description：页面描述，这个属性可能被用于搜索引擎或者其它场合。-
- generator: 生成页面所使用的工具，主要用于可视化编辑器，如果是手写 HTML 的网页，不需要加这个 meta。
- keywords: 页面关键字，对于 SEO 场景非常关键。
- referrer: 跳转策略，是一种安全考量。
- theme-color: 页面风格颜色，实际并不会影响页面，但是浏览器可能据此调整页面之外的 UI（如窗口边框或者 tab 的颜色）。
