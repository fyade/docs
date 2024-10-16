# 基本使用

## 安装

首先要安装node，随后执行`npm i -g pm2`安装PM2

## 启动应用

```shell
pm2 start main.js --name [name]
```

## 管理进程

```shell
pm2 restart [name/id]
```

```shell
pm2 reload [name/id]
```

```shell
pm2 stop [name/id]
```

```shell
pm2 delete [name/id]
```

## 命令行监控面板

```shell
pm2 monit
```
