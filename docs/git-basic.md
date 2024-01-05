# 基本使用

## 安装Git

无需多言

## 配置Git

无需多言

## 创建版本库

```shell
git init # 随后手动设置远程仓库地址
```

或者

```shell
git clone 远程仓库地址 本地路径 # 本地路径可不填
```

## 添加文件到版本库

```shell
# git add 文件路径
git add a.md # 添加a.md
git add /a/a.md # 添加a目录下的a.md
git add /a/*.md # 添加a目录下的所有md文件
```

::: details 报错无权限？
右键文件夹 → 属性 → 安全 → 高级 → 更改 → 高级 → 立即查找 → 点当前用户 → 确定 → 确定 →
勾选替换此容器...和使用可从此... → 确定 → 确定 → 确定。
:::

## 提交文件

一般情况下，步骤为 add → commit → pull → push ：

```shell
# git add 文件名
git add .
```

```shell
# git commit # 随后会进入vi编辑器，vi编辑器使用无需多言
git commit -m "提交概述"
```

```shell
# git pull 远程主机名 远程分支名:本地分支名
git pull origin master:master
```

```shell
# git push 远程主机名 远程分支名:本地分支名
git push origin master:master
```

::: tip
设置[映射关系](git-branch.html#创建本地分支)后可以不用指定pull和push时的分支。
:::

::: details 报错 ! [rejected] master -> master (non-fast-forward)？

先把git的东西fetch到本地然后merge再push

```shell
git fetch
git merge
```

如果提示 Please, commit your changes before you merge ，则先commit下修改过的文件，再次merge，最后就能正常上传了。
:::
