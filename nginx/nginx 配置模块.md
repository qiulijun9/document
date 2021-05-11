# 配置文件语法 nginx.conf

- #代表注释
- 配置项 由一个配置项名和一对大括号组成,结尾必须跟分号
  eg：

```
# user nobody;
worker_processes 4;
events {
    worker_connections 1024;
}
```

# nginx 配置文件基本模块

main 模块（全局模块），events 模块，http 模块

1. main 模块

位于配置文件的根部，提供进程，安全管理等能力

2. events 模块（影响 nginx 与用户网络的连接）

events 事件模块可以用来配置网络机制

```js

events {
    worker_connections  1024;   定义一个worker进程能够同时连接的数量
    accept_mutex  on;           默认值on，启用或禁用使用一个接受互斥锁来打开套接字监听。
    use epoll;                  指定nginx所使用的网络事件模型，可选值有/dev/poll,epoll,kqueue等，通常不需要显式指定它，默认情况下nginx将使用最有效方法。
}


```

3. http 模块 分为全局块和服务块
   全局块包括文件引入（includes ），日志定义，连接超时， 请求上限等

## 配置 nginx 反向代理

```js
server {
    listen 80;
    location / {
        proxy_pass   http://www.baidu.com;  # 代理的地址
    }
}

```
