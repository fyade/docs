# 基本使用

## 安装Git

无需多言

## 配置Git

无需多言

## 创建版本库

```shell
git init
```

使用 init 命令后需手动设置远程仓库地址并手动拉取代码

所以我比较推荐下面的方法

```shell
git clone 远程仓库地址 本地路径
```

## 添加文件到版本库

```shell
git add a.md
```

- 单个文件：`git add a.md`
- 多个文件：`git add .`
- 全部文件：`git add -A`

::: warning

- 请勿将无关文件添加到版本库
- 请勿将重要配置文件添加到版本库

:::

::: details 报错无权限？
右键文件夹 → 属性 → 安全 → 高级 → 更改 → 高级 → 立即查找 → 点当前用户 → 确定 → 确定 →
勾选替换此容器...和使用可从此... → 确定 → 确定 → 确定。
:::

查看已添加的

```shell
git status
```

撤销已添加的

```shell
git reset .
```

## 提交文件

一般情况下，步骤为 commit → pull → push ：

`git commit` 随后会进入 vi 编辑器，vi 编辑器使用无需多言

也可使用 `-m "提交概述"` 来快速提交

```shell
git commit -m "提交概述"
```

`git pull 远程主机名 远程分支名:本地分支名`

```shell
git pull origin master:master
```

`git push 远程主机名 远程分支名:本地分支名`

```shell
git push origin master:master
```

::: info
设置[映射关系](git-branch.html#创建本地分支)后可以省略 pull 和 push 时的远程分支和本地分支，如果只设置了一个远程主机，甚至连远程主机名也可以省略。
:::

::: details 提交时产生冲突？
pull 后，如果有冲突，你会看到以下内容：

```
<<<<<<< HEAD
代码1
=======
代码2
>>>>>>>
```

其中代码1是本地的，代码2是线上的，如果代码1是自己写的，那就留代码1，反之，就留线上的

```
<<<<<<< HEAD // [!code --]
代码1
======= // [!code --]
代码2 // [!code --]
>>>>>>> // [!code --]
```

随后再次 commit → pull → push 即可
:::

::: details 报错 ! [rejected] master -> master (non-fast-forward)？

先把git的东西fetch到本地然后merge再push

```shell
git fetch
git merge
```

如果提示 Please, commit your changes before you merge ，则先commit下修改过的文件，再次merge，最后就能正常上传了。
:::
