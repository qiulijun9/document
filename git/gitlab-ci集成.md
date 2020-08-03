自己博文地址:https://blog.csdn.net/qq_41055607/article/details/107769327

# 简介

1. gitlab CI/CD 是一种可以持续集成,持续交付和部署的一个工具.不需要人工去干涉

# 如何工作

通过构建项目中的.gitlab-ci.yml 文件.指定测试,部署的脚本.当 gitlab 监听到改脚本时,使用 gitlab runner 的工具来运行脚本.
.gitlab-ci.yml 文件中多个任务组成一个管道.管道的状态也会在 gitlab 的图形化界面上看到

# 配置过程

需要两个条件,一个 runner,一个.gitlab-ci.yml 文件.才可完成配置

## 配置 runner

文档地址:https://docs.gitlab.com/runner/install/osx.html
以 macOS 为例

1. 下载 Gitlab Runner 的二进制文件
   sudo curl --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-darwin-amd64

注意: 这时下载二进制文件可能会特别慢,可以用迅雷先下载下这个二进制文件.再用 koa-static 起一个静态服务,可以通过 url 访问到这个文件.因为 curl 需要一个 url
sudo curl --output /usr/local/bin/gitlab-runner 静态服务文件路径 将二进制文件输出到/usr/local/bin/gitlab-runner 下

2. 授予权限(因为 bin 目录下的文件都是只读的)
   sudo chmod +x /usr/local/bin/gitlab-runner

3. 注册 Runner

- 安装 Docker(https://docs.docker.com/),并启动

- 注册 Runner
  sudo gitlab-runner register

- 输入 Gitlab 实例的 URL (登录 gitlab 在 Settings -> CI/CD -> Runners 中可以查看 url 和 token)
  Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com )
  https://gitlab.com

- 输入用来注册 Runner 的 token:
  Please enter the gitlab-ci token for this runner
  xxx

- 输入 Runner 的描述，随后可在 GitLab 界面中修改：
  Please enter the gitlab-ci description for this runner
  [hostame] my-runner

- 输入与 Runner 绑定的标签（可修改）：
  Please enter the gitlab-ci tags for this runner (comma separated):
  runner

- 选择 Runner 的执行方式：
  Please enter the executor: ssh, docker+machine, docker-ssh+machine, kubernetes, docker, parallels, virtualbox, docker-ssh, shell:
  docker

- 如果选择的执行方式是 Docker，会要求填写默认的镜像，这个镜像也可以在 .gitlab-ci.yml 中定义：
  Please enter the Docker image (eg. ruby:2.1):
  alpine:latest

4. 安装并启动 Runner
   cd ~
   sudo gitlab-runner install
   sudo gitlab-runner run

## 配置.gitlab-ci.yml

文档参考地址:https://docs.gitlab.com/ee/ci/yaml/README.html

## 配置完成后在提交代码时 ci 便可工作

任务 如果在等待中,需要设置 Settings -> CI/CD -> Runners 编辑该 runner,勾选 Indicates whether this runner can pick jobs without tags 选项,同时要启动 Runner

任务拉取镜像时太慢:可以换镜像名 例如 jitesoft/node-yarn:10
