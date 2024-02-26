# worktree

有时候一个项目有多个分支，且有至少两个分支都需要开发，那么此时，在多个分支间反复切换并不优雅，也不方便，那么此时，`worktree`就派上用场了。

它与`clone`很像但不一样，`worktree`会同步本地仓库，本质上使用的是同一个仓库，而`clone`则是重开一个仓库。

## 基本使用

### 查询`worktree`列表

```shell
git worktree list
```

### 添加`worktree`

```shell
git worktree add 新路径 分支
```

### 删除`worktree`

直接在文件资源管理器中删除目录，随后执行命令：
```shell
git worktree prune
```
