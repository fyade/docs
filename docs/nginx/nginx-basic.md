# 基本使用

## 常用命令

启动

```shell
start nginx
```

重载配置

```shell
nginx -s reload
```

推出

```shell
nginx -s quit
```

强行推出

```shell
nginx -s stop
```

## 常用配置

```conf
    # xxx.com
    server {
        listen 80;
        listen [::]:80;
        server_name xxx.com;

        listen 443 ssl;
        listen [::]:443 ssl;
        ssl_certificate your_ssl_file_path(.crt);
        ssl_certificate_key your_ssl_file_path(.key);

        client_max_body_size 10M;

        gzip on; # 是否开启gzip，可选on/off
        gzip_buffers 32 4K; # 压缩所需缓冲区的大小
        gzip_comp_level 6; # 压缩级别1-9，数字越大压缩越好，同时也越占用CPU资源
        gzip_min_length 10k; # 允许压缩的最小字节
        gzip_types application/javascript text/css text/html; # 压缩的文件类型
        gzip_disable "MSIE [1-6]\."; # 禁用gzip压缩的条件
        gzip_vary on; # 添加响应头信息
        
        # WebSocket
        location /websocket {
			proxy_pass http://ip:port;
			proxy_http_version 1.1;
			proxy_set_header Upgrade $http_upgrade;
			proxy_set_header Connection "Upgrade";
			proxy_set_header Host $host;
		}

        # 后端
        location /api/ {
            rewrite ^/api(/.*)$ $1 break;
            proxy_pass http://ip:port;
            add_header Content-Type application/json;
        }
        # 静态资源
        location /api-file/ {
            alias your_file_folder_path;
            try_files $uri =404;
        }
        location / {
            root your_index.html_folder_path;
            index index.html;
            try_files $uri $uri @router; # 前端路由历史模式
        }
        location @router {
            rewrite ^.*$ /index.html last;
        }
    }
```