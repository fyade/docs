# 目录列表

## 目录结构

```bash
your_folder_path
  ├── files/             # 真实文件目录
  └── index/index.html   # 美化页面
```

## nginx 配置

```conf
	server {
        listen 81;
        listen [::]:81;
        server_name localhost;

		charset utf-8;

		location /files/ {
			root your_folder_path;
			autoindex on;
			autoindex_exact_size off;
			autoindex_localtime on;
		}

		location /index {
			root your_folder_path;
			index index.html;
			try_files $uri $uri @router;
		}
		location @router {
            rewrite ^.*$ /index/index.html last;
        }

		location / {
			return 302 /index;
		}
    }
```

## 美化页面

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>文件目录</title>
  <style>
    body {
      font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      background: #f4f6f8;
      margin: 0;
      padding: 20px;
      color: #333;
    }

    h1 {
      text-align: center;
      color: #0078d7;
      margin-bottom: 5px;
      font-size: 1.8rem;
    }

    .nav-bar {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin: 10px 0 20px;
      gap: 12px;
    }

    #back-btn {
      display: none;
      font-size: 18px;
      text-decoration: none;
      color: #0078d7;
      background: white;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
      transition: background 0.2s ease;
      flex-shrink: 0;
    }

    #back-btn:hover {
      background: #e6f2ff;
    }

    .breadcrumb {
      font-size: 14px;
      word-break: break-all;
    }

    .breadcrumb a {
      color: #0078d7;
      text-decoration: none;
      margin: 0 4px;
    }

    .breadcrumb a:hover {
      text-decoration: underline;
    }

    .table-wrapper {
      width: 100%;
      overflow-x: auto;
    }

    table {
      width: 85%;
      min-width: 500px;
      margin: 0 auto;
      border-collapse: collapse;
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    }

    th, td {
      padding: 12px 16px;
      text-align: left;
      white-space: nowrap;
    }

    th {
      background: #f1f3f5;
      font-weight: 600;
      border-bottom: 2px solid #e1e4e8;
    }

    tr:nth-child(even) {
      background: #fafafa;
    }

    tr:hover {
      background: #f0f7ff;
    }

    a {
      color: #0078d7;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    footer {
      margin-top: 30px;
      text-align: center;
      font-size: 13px;
      color: #666;
    }

    /* ===== 移动端适配 ===== */
    @media (max-width: 768px) {
      body {
        padding: 10px;
      }

      h1 {
        font-size: 1.4rem;
      }

      table {
        width: 100%;
        font-size: 14px;
      }

      th, td {
        padding: 8px 10px;
      }

      .breadcrumb {
        font-size: 12px;
      }
    }
  </style>
</head>
<body>
<h1>文件目录</h1>

<div class="nav-bar">
  <a id="back-btn" href="#">⬅</a>
  <div class="breadcrumb" id="breadcrumb">
    <!-- 面包屑导航 -->
  </div>
</div>

<div class="table-wrapper">
  <table id="file-list">
    <thead>
    <tr>
      <th>名称</th>
      <th>大小</th>
      <th>修改时间</th>
    </tr>
    </thead>
    <tbody id="list-body">
    <!-- JS 动态填充 -->
    </tbody>
  </table>
</div>

<footer>
  由 ChatGPT 美化 | <span id="user-note">这里写上你的留言</span>
</footer>

<script>
  async function loadFiles() {
    let currentPath = window.location.pathname.replace(/^\/index/, "") || "/";
    let fetchPath = "/files" + currentPath;

    let res = await fetch(fetchPath);
    let text = await res.text();

    let parser = new DOMParser();
    let doc = parser.parseFromString(text, "text/html");
    let pre = doc.querySelector("pre");
    if (!pre) return;

    let lines = pre.innerHTML.split("\n");

    let tbody = document.getElementById("list-body");
    tbody.innerHTML = "";

    // ====== 返回上级目录按钮 ======
    let backBtn = document.getElementById("back-btn");
    if (currentPath !== "/") {
      backBtn.style.display = "flex";
      let upPath = currentPath.replace(/\/$/, "");
      upPath = upPath.substring(0, upPath.lastIndexOf("/") + 1);
      backBtn.href = "/index" + upPath;
    } else {
      backBtn.style.display = "none";
    }
    // =============================

    // ====== 面包屑导航 ======
    let breadcrumb = document.getElementById("breadcrumb");
    breadcrumb.innerHTML = "当前位置:";
    let parts = currentPath.split("/").filter(Boolean);
    let pathAcc = "/";
    let rootLink = document.createElement("a");
    rootLink.href = "/index/";
    rootLink.textContent = "根目录";
    breadcrumb.appendChild(rootLink);

    parts.forEach((p) => {
      breadcrumb.append(" > ");
      pathAcc += p + "/";
      let link = document.createElement("a");
      link.href = "/index" + pathAcc;
      link.textContent = p;
      breadcrumb.appendChild(link);
    });
    // =========================

    // ====== 文件/文件夹列表 ======
    lines.forEach(line => {
      let match = line.match(/<a href="([^"]+)">([^<]+)<\/a>\s*(.*?)$/);
      if (!match) return;

      let href = match[1];
      let name = match[2];
      let extra = match[3].trim();

      if (name === "../") return;

      let isDir = href.endsWith("/");

      let size = "-";
      let mtime = "-";
      let extraParts = extra.split(/\s+/).filter(Boolean);
      if (extraParts.length >= 2) {
        let dateStr = extraParts[0] + " " + extraParts[1];
        let dateObj = new Date(dateStr);
        if (!isNaN(dateObj)) {
          let Y = dateObj.getFullYear();
          let M = String(dateObj.getMonth() + 1).padStart(2, "0");
          let D = String(dateObj.getDate()).padStart(2, "0");
          let h = String(dateObj.getHours()).padStart(2, "0");
          let m = String(dateObj.getMinutes()).padStart(2, "0");
          let s = String(dateObj.getSeconds()).padStart(2, "0");
          mtime = `${Y}-${M}-${D} ${h}:${m}:${s}`;
        } else {
          mtime = dateStr;
        }

        if (extraParts.length >= 3) size = extraParts[2];
      }

      let linkHref = isDir
          ? "/index" + currentPath + href
          : "/files" + currentPath + href;

      let row = document.createElement("tr");
      row.innerHTML = `
          <td><a href="${linkHref}">${isDir ? "📁 " : "📄 "}${name}</a></td>
          <td>${isDir ? "-" : size}</td>
          <td>${mtime}</td>
        `;
      tbody.appendChild(row);
    });
  }

  loadFiles();

  document.getElementById("user-note").textContent = "这里是你的专属文件目录 :)";
</script>
</body>
</html>
```
