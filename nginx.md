# nginx 命令

- nginx -h 查看帮助
- nginx -t 查看是否有语法错误

# 配置文件语法

- #代表注释
- 配置项 由一个配置项名和一对大括号组成

```
# user nobody;
worker_processes 4;
events {
    worker_connections 1024;
}
```

# nginx 基本模块

main 模块 ,events 模块，include 包含指令

## main 模块

位于配置文件的根部，提供进程，安全管理等能力

```
user  nobody; #worker进程运行的用户和组，如果没有提供则使用nginx的master进程的用户和用户组。
worker_processes  4;#定义worker进程数量一般和cpu核数一致。
pid; 存放nginx 守护线程pid文件的路径
log_not_found on; #开启或禁用记录404错误。
```

## events

events 事件模块可以用来配置网络机制

```
accept_mutex:on; #默认值on，启用或禁用使用一个接受互斥锁来打开套接字监听。
use epoll; #指定nginx所使用的网络事件模型，可选值有/dev/poll,epoll,kqueue等，通常不需要显式指定它，默认情况下nginx将使用最有效方法。
worker_connections 1024; #定义一个worker进程能够同时连接的数量
```

# includes 指令

用来引入子文件的配置

```
include /file/path.conf;
```

## events 模块

```
http {
    #在http区段中启用gzip压缩
    gzip on;
    server {
        server_name localhost;
        listen 80;
        location /downloads/ {
             #在此location区段禁用gzip压缩
            gzip off;
        }

    }

}
```
