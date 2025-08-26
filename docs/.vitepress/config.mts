import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "docs",
  description: "docs write by FeiYang",
  lang: 'zh',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Git', link: '/git/git-basic'},
      {text: 'Nginx', link: '/nginx/nginx-basic'},
      {text: 'PM2', link: '/pm2/pm2-basic'},
      {text: 'screen', link: '/screen/screen-basic'}
    ],
    sidebar: [
      {
        text: 'Git',
        items: [
          {text: '基本使用', link: '/git/git-basic'},
          {text: '本地分支', link: '/git/git-branch'},
          {text: '暂存', link: '/git/git-stash'},
          {text: '回滚', link: '/git/git-rollback'},
          {text: 'worktree', link: '/git/git-worktree'},
          // {text: '补丁', link: '/git/git-cherry'}
        ]
      },
      {
        text: 'Nginx',
        items: [
          {text: '基本使用', link: '/nginx/nginx-basic'},
          {text: '目录列表', link: '/nginx/nginx-autoindex'}
        ]
      },
      {
        text: 'PM2',
        items: [
          {text: '基本使用', link: '/pm2/pm2-basic'}
        ]
      },
      {
        text: 'screen',
        items: [
          {text: '基本使用', link: '/screen/screen-basic'}
        ]
      }
    ],
    socialLinks: [
      {icon: 'github', link: 'https://github.com/fyade'}
    ]
  },
  markdown: {
    lineNumbers: true
  },
  lastUpdated: true,
  outDir: '../dist'
})
