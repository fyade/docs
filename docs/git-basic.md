---
outline: deep
---

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
git add 文件路径
```

比如：

```shell
git add a.md # 添加a.md
git add /a/a.md # 添加a目录下的a.md
git add /a/*.md # 添加a目录下的所有md文件
```

## 提交文件

一般情况下，步骤为 commit → pull → push ：

```shell
git commit -m "提交信息"
```
