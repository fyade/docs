import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "docs",
  description: "docs write by FeiYang",
  lang: 'zh',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: './assets/logo.jpg',
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Git', link: '/git/git-basic'},
      {text: 'Nginx', link: '/nginx/nginx-basic'},
      {text: 'Docker', link: '/docker/docker-basic'},
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
          {text: '基本使用', link: '/nginx/nginx-basic'}
        ]
      },
      {
        text: 'Docker',
        items: [
          {text: '基本使用', link: '/docker/docker-basic'}
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
  lastUpdated: true
})
