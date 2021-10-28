# 简介

pm2 是 node 进程管理工具,开启守护进程,防止关闭了控制台,就关闭了后台服务.功能如性能监控,自动重启,负载均衡等.

https://www.kancloud.cn/daiji/pm2/395280

# 安装

npm install -g pm2

# 运行

pm2 start 项目路径

# 查看进程

pm2 list

# 杀死进程

pm2 delete 进程 id

# 查看日志

pm2 log

# 设置重启

pm2 start 项目路径 --watch

# 开机启动

npm install pm2-windows-startup -g
pm2-startup install
