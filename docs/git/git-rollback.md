# 回滚

## 回滚步骤

先查询目标版本号

```shell
git log
```

随后复制目标版本号，并用以下命令回退

```shell
git reset --hard 目标版本号
```

如果需要恢复本地代码，可直接使用pull命令

如果要回滚线上代码，需强行push，否则会报错

```shell
git push -f
```
