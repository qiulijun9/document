# git 保存文件

暂存 git stash
查看暂存 git status
添加到暂存区 git add 文件名/ git add .(文件的修改和新建添加到暂存区) /git add -u(将文件的修改和删除添加到暂存区) git add -A(将文件的修改,删除,新建添加到暂存区)
添加 commit 把暂存区的集合添加到 git 的历史版本中: git commit -m 'commit 信息'

# 文件重命名

1. 重命名文件
2. git add 重命名文件
3. git rm 之前的文件

## 简便的文件重命名

git mv 源文件名 新文件名

# 查看日志

查看所有分支的日志 git log --all/ git log -all --graph (图形化)
查看自己所有的日志 git log
查看简短的日志 git log --oneline
查看前几条次数 git log -2
查阅其他 log 命令 git help --web log
