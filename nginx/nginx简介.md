# nginx 简介

什么是 nginx？
nginx 是高性能的 http 和反向代理的 web 服务器

特点：
占用内存少(约 1M)，并发能力强（接收 50000 个）开发连接数
反向代理
负载均衡
动静分离

# 使用场景

1. 高并发场景

### 正向代理（代理客户端）

在客户端（浏览器端） 通过配置代理服务器再访问 服务端的过程
eg:访问 google, 通过 vpn，代理到国外的服务器

### 反向代理（代理服务器端）

客户端无需对反向代理进行配置，通过客户端进行访问 到反向代理服务器 ，反向代理服务器根据请求转发到不同的目标服务器

- 反向代理的好处？

1.  安全性：  客户端访问的并不是真实的服务器，所以为服务器的安全性提供了保障
2.  可以实现负载均衡，缓存等功能

### 负载均衡

在并发的情况下，由之前的一个服务器 通过反向代理服务器将请求平均分发到多个服务器上
轮询和加权轮询

### 动静分离

为了加快网页的渲染速度，反向代理会把静态资源和动态资源分开进行部署

## 下载

http://nginx.org/en/download.html

// aliyun 服务

## 登录服务器

## 安装 linux 必备的工具

yum -y install gcc gcc-c++ autoconf pcre-devel make automake
yum -y install wget httpd-tools vim

### 查看是否安装 yum

yum list | grep nginx

### 安装 nginx

yum install nginx

### 安装 nginx 目录：

/etc/nginx

### nginx 默认的主页面

/usr/share/nginx/html

### 查看 nginx 安装的目录

rpm -ql nginx

# nginx 命令

1. nginx 启动服务

- nginx

2. 系统启动 nginx 服务

- systemctl start nginx.service

3. nginx 关闭

- nginx -s quit
- nginx -s stop
- killall nginx
- systemctl stop nginx.service

4. 重启 nginx

- nginx -s reload
- systemctl restart nginx.service

5. 其他

- nginx -v 查看 nginx 版本
- nginx -h 查看帮助
- nginx -t 查看是否有语法错误
- ps -ef|grep nginx 查看 nginx 进程号
- netstat -tlnp 查看端口
