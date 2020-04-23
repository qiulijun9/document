# hash 实现路由

可以触发网页跳转，改变 url 中的 hash 值是不会刷新页面的，因此可以通过 hash 来实现前端路由，从而实现无刷新的效果。
hash 永远不会提交到 server 端。
hash 值可以通过 window.loaction.hash 得到
通过 hashchange 的事件来监听 hash 的变化，在回调函数中执行显示不同页面的方法，修改视图的变化。

## hash 变化

1. js 修改 url
2. 手动修改 url
3. 浏览器前进，后退

缺点：
搜索引擎对带有 hash 的页面不太友好
带有 hash 的页面难以追踪用户行为

# history 实现路由

用 url 规范的路由，但跳转时不刷新页面,通过 history.pushState，history.replaceState，window.onpopstate 来实现，需要后端配合（让访问的路径都跳到一个地址（如 index.html），由前端控制路由跳转）
history：属性
history.length 返回回话中有多少条记录
history.state 保存了 popstate 事件所传递过来的属性对象
history：方法
history.back() 回退
history.forward()前进
history.go() 跳转某个记录页
× history.pushState(obj,title,url) 将给定的数据添加到浏览器的会话历史栈中，pushState 会改变当前 url,但是不会刷新

history.replaceState() 将当前会话的 url 替换成指定的数据，replaceState 会改变当前 url,但是不会刷新
× window.onpopstate () 监听浏览器前进后退

```
 window.onpopstate =(event)=>{
   console.log(event.state,loaction.pathname)
 }
```

如果用 history 作为路由基础， 需要用到 history.pushState() 和 history.replaceState()在不刷新页面的情况下改变 url 地址，如果页面发生回退 back 或者 forward 时，会触发 popstate 事件

hisory 为依据来实现路由的优点：
对搜索引擎友好
方便统计用户行为

缺点：
兼容性不如 hash
需要后端做相应的配置，否则直接访问子页面会出现 404 错误

React-router-dom 包来介绍常用的 BrowserRouter、HashRouter、Link 和 Route 等。

# 两者选择

to B 推荐 hash ,简单应用，不需要后端配合
to C 可以考虑 history,但需要后端配合
能简单就简单，考虑成本和收益

## BrowserRouter,HashRouter

这两个组件是路由器的容器，必须包在最外层

1. BrowserRouter 是通过 h5 的 history 来实现的无刷新的路由

```
ReactDom.render(
  <BrowserRouter>
        <Route path="/" component={Home}/>
    </BrowserRouter>
)
```

2. HashRouter 是通过 url 的 hash 属性来实现前端路由的

```
ReactDom.render(
  <HashRouter>
        <Route path="/" component={Home}/>
    </HashRouter>
)
```

## Route

Route 就是用来匹配 location 中的地址，匹配成功后渲染对应的组件

## Link

Link 是在页面内如何改变 URL 相当于 a 标签中的 href

## Redirect

匹配不上的会走

```
<Redirect from="/" to="/" />
```

## Switch

Switch 内部只能包含 Route,Redirect,Router

```
<Switch>
<Route exact path="/" component={Home}/>
<Route path="/about" component={About}/>
<Route path="/:user" component={User}/>
<Route component={NoMatch}/>
<Redirect from="/" to="/" />
</Switch>
```
