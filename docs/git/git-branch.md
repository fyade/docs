# 本地分支

## 创建本地分支

创建一个本地分支`git branch 分支名`

```shell
git branch dev
```

创建一个本地分支并与远程分支建立映射关系`git checkout -b 本地分支名 远程主机名/远程分支名`

```shell
git checkout -b dev origin/dev
```

### 查看映射关系

```shell
git branch -vv
```

### 现有分支添加映射关系

先把本地分支切到要添加映射关系的分支

```shell
git branch --set-upstream-to origin/dev
```

## 切换本地分支

`git checkout 本地分支名`

```shell
git checkout dev
```

::: details 切换分支后原分支上新建的文件被带过来了？
那是因为新文件还没被纳入版本管理，切回原分支执行一下commit就好了。
:::
