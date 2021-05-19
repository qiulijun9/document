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

## 配置虚拟主机：

虚拟主机是指在一台物理主机上划分多个磁盘,每台虚拟主机都可以对外提供 web 服务，可以通过端口，IP,域名来设置不同的虚拟主机。

1. 基于端口号来设置虚拟主主机，一下配置可以配到 default.conf 中也可以配到其他的子文件中

```
server {
     listen         8001; # 更改端口号
     server_name    localhost;
     root           /usr/share/nginx/html/8001;
     index          index.html;
}
```

2. 基于 IP 设置虚拟主机, 更改 server_name 为 ip

```
server {
     listen         8001;
     server_name    101.201.80.28; # 更改为IP
     root           /usr/share/nginx/html/8001;
     index          index.html;
}
```

3. 基于域名来设置虚拟主机, 更改 server_name 为 域名

```
server {
     listen         80;
     server_name    qiulijun.top; # 更改为域名
     root           /usr/share/nginx/html;
     index          index.html;
}
```

## 配置 nginx 反向代理 （location 中设置 proxy_pass）

```
server {
    listen 80;
    location / {
        proxy_pass                 http://www.baidu.com;  # 代理的地址
        proxy_set_header Host      $host;                 # 客户端重新定义的传给后端服务器的请求头字段
        proxy_set_header X-Real-IP $remote_addr;          # 获取用户真实的IP
        proxy_set_header X-Forwarded-For $remote_addr;    # 每次经过proxy 转发都会记录该地址
        proxy_set_body             223                    # 用于重新定义传递给后端服务器的请求正文，一般用于调试目的。
        proxy_connect_timeout      86000;                 # 定义连接到后端服务器的超时时间
        proxy_read_timeout         86000;                 # 定义从后端服务器读取数据的超时时间
        proxy_send_timeout         86000;                 # 定义发送数据到后端服务器的超时时间
        proxy_ignore_client_abort   off;                  # 当客户端关闭与代理服务器的连接时，是否关闭与后端服务器的连接
    }
}


```

以下等等 ...

- proxy _cache_ 前缀开头的指令：用于定义存放缓存文件目录等。
  例如：proxy_cache、proxy_cache_key、proxy_cache_path 等。
- proxy_buffer_size :设置缓冲区的大小,该缓冲区用于存放来自后端服务器响应数据的开始部分。
- proxy_buffering: 是否缓存服务端的响应 off /on
- proxy_buffers :设置缓冲区数量和大小，用于存放从后端服务器读取的响应数据。 eg:proxy_buffers 8 4k | 8k;
- proxy_busy_buffers_size:在缓冲区中，收到后端服务器数据总大小超过该指令指定大小时，缓冲区就会被刷新，并且数据被发送到客户端
- proxy_ignore_headers：禁用来自后端服务器的某些响应头字段。可以忽略以下字段：X-Accel-Redirect、Expires、Cache-Control、Set-Cookie 和 Vary。

# 配置 nginx 适配 pc 端和 移动端

```
server{
    listen 8002;
    server_name  localhost;
    location / {
          root  /usr/share/nginx/pc;

          if ($http_user_agent ~* '(android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino)'){
          root  /usr/share/nginx/mobile;
       }
          index index.html;
    }
}
```

# 配置 gzip 压缩

```
http {
    gzip  on; # 是否启用gzip 压缩
    gzip_types  text/plain application/javascript text/css; # 配置压缩的类型
}
```
