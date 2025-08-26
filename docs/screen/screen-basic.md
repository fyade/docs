# 基本使用

## 常用命令

### 创建新会话

```shell
screen -S session_name
```

### 列出所有会话

```shell
screen -ls
```

### 连接到会话

```shell
screen -r session_name
```

### 终止会话

```shell
screen -S session_name -X quit
```

### 从会话中分离（保持后台运行）

```shell
Ctrl+A, D
```

### termux中强制终止会话

```shell
rm ~/.screen/[id].[session_name]
```
