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

# 更新 commit message

## 更新最近的一次 commit message

git commit --amend

如果出现如下错误 int: Waiting for your editor to close the file... error: There was a problem with the editor 'vi'.
可以运行
git config --global core.editor 'vim'

## 更新旧的 commit 历史树上的任何一个 commit

git reabse -i commithash（指的是要改的 commit 的上一个 commithash）
|
|
r 你要修改的那条记录
|
|
修改 coomit 信息，保存退出，即可查看

## 把连续的 commit 整理成一个

git rebase -i commithash(要合并的 commit 之前的 )
|
|
s 所有要合并的 commit
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
