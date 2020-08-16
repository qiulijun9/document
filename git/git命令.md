# git 保存文件

暂存 git stash
查看暂存 git status
添加到暂存区 git add 文件名/ git add .(文件的修改和新建添加到暂存区) /git add -u(将文件的修改和删除添加到暂存区) git add -A(将文件的修改,删除,新建添加到暂存区)
添加 commit 把暂存区的集合添加到 git 的历史版本中: git commit -m 'commit 信息'

# 添加到暂存区

git add 文件名
git add 后面可以加单个或多个文件名，或文件夹
git add -u 把 git 管理的文件一次加入暂存区
git add . 把所有的文件都添加到暂存区

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
查看最近的几个 commit git log -n4
查阅其他 log 命令 git help --web log
显示文件改动 git log - p 文件名
以图表的方式查看日志 git log -graph
查看工作树和缓存区的区别 git diff
最新的提交差别 git diff HEAD
查看图形化的日志 git log --graph
打开图形化界面 gitk
查看 hash 类型 git cat-file -t 哈希
查看 hash 内容 git cat-file -f 哈希

# 分离头指针

当前的 commit 没有和分支挂钩，就为分离头指针
如在分离头指针上开发，在切到其他分支时，这些 commit 可能会丢失，被 git 当做垃圾回收掉
要在切换分支的时候新建分支把这次 commit
按照提示信息，保存下来 git branch 新分支名 commit hash

# 更新 commit message

## 多行的 commit 信息

提交时输入多行信息
git commit
第一行 大概描述
空行
第三行以后 详细描述

## 更新最近的一次 commit message

git commit --amend

如果出现如下错误 int: Waiting for your editor to close the file... error: There was a problem with the editor 'vi'.
可以运行
git config --global core.editor 'vim'

## 修改之前的 commit 的 message

采用变基的操作，基是基于被变的 commit 的父亲的 hash
交互式的命令
reword 只修改某个 message，弹出修改 message 的窗口，修改 message

## 更新旧的 commit 历史树上的任何一个 commit

git reabse -i commithash（指的是要改的 commit 的上一个 commithash）
|
|
r 你要修改的那条记录
|
|
修改 coomit 信息，保存退出，即可查看

## 把连续的 commit 整理成一个

git rebase -i commithash(要合并的 commit 之前的,父亲的 hash )
|
|
s 所有要合并的 commit,选择一个 pick 的 commit
|
|
添加 commit 信息，保存退出

## 把不连续的 commit 合并成一个

git rebase -i commithash(要合并的 commit 之前的 )
|
|
整理 commit 的顺序，该合并的 s,改 pick 的 pick 不动
|
|
添加 commit 信息，保存退出

## 本地 commit 之后,未提交到远程,要取消时本次 commit 并保存更改时

git reset --mixed HEAD^ 或者 HEAD~1 会撤销到 git add. 之前
git reset --soft HEAD^ 或者 HEAD~1 会撤销到 git add. 之时
git reset commithash (上一个 commit 的 hash) 会撤销到 git add. 之前
回到某个版本
git reset --hard 哈希值

# 更新本地库,拉取远端的代码

git fetch 拉取远端的代码和远端的代码还没有关联
git pull === git fetch + git merge 拉取远端的代码，并把本地的和远端的进行 merge

# 提交到远程分支

git push origin 分支名

## 不同人在同一分支上修改了不同文件

人一 修改后并 push
人二 需要 merge 主分支，再进行 push

## 不同人同一分支上修改了相同文件的不同区域

人一 修改后并 push
人二 需要 git pull，再进行 commit 和 push git 会帮我们把相同文件的不同区域一起合并

## 不同人同一分支上修改了相同文件的相同区域

人一 修改后并 push
人二 需要 git pull ----解决冲突 --- git commit ---git push

## 禁止的一些操作

不要向远程集成分支做 push -f 的操作
不要对远程的集成分支进行 rebase 的操作，可以造成其他人需要修改很多冲突

# 查看之前的提交记录

git log -p
输入自己要找的内容

# 重命名文件

git mv 源文件名 新文件名

# 正确删除文件

git rm 文件名

# 临时保存

git stash
git stash pop stash 的 list 记录不保存
git stash apply stash 的 list 记录保存

# 对比差异

对比暂存区和 head 差异
git diff --cached
对比工作区和暂存区的区别
git diff
git diff 文件名

## 对比不同 commit 的差异

git diff commithash1 commithash2 文件名

## 让暂存区内容都恢复到 head

git reset HEAD
也可指定规定文件名

## 让工作区的内容变更为和暂存区相同

git checkout 文件名
