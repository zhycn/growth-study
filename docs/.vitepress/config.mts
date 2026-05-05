import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import { katex } from '@mdit/plugin-katex'
import container from 'markdown-it-container'

export default withPwa(defineConfig({
  lang: 'zh-CN',
  title: 'Growth Study',
  description: '增长学习库 - 从小白到全栈增长官',
  base: '/growth-study/',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://zhycn.github.io/growth-study/'
  },
  vite: {},
  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg'],
    manifest: {
      name: 'Growth Study',
      short_name: 'Growth',
      description: '增长学习库 - 从小白到全栈增长官',
      theme_color: '#10b981',
      icons: [
        {
          src: '/growth-study/favicon.svg',
          sizes: '32x32',
          type: 'image/svg+xml'
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico,txt,woff2}']
    }
  },
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true
    },
    config: (md) => {
      md.use(katex)
      md.use(container, 'card-grid')
      md.use(container, 'steps')
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#10b981' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'msapplication-TileColor', content: '#10b981' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous'
      }
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
      }
    ],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:site_name', content: 'Growth Study' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }]
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '学习路线', link: '/roadmap/' },
      { text: '增长认知', link: '/growth-mindset/' },
      { text: '营销策略', link: '/marketing/' },
      { text: '运营体系', link: '/operations/' },
      { text: '互联网运营', link: '/internet-ops/' },
      { text: '数据分析', link: '/data-analytics/' },
      { text: '工具栈', link: '/tools/' }
    ],
    sidebar: {
      '/growth-mindset/': [
        {
          text: '🟢 基础篇',
          collapsed: false,
          items: [
            { text: '什么是增长', link: '/growth-mindset/basics/what-is-growth' },
            { text: 'AARRR 模型详解', link: '/growth-mindset/basics/aarrr-model' },
            { text: '增长黑客的起源与演变', link: '/growth-mindset/basics/growth-hacker' }
          ]
        },
        {
          text: '🟡 进阶篇',
          collapsed: true,
          items: [
            { text: '增长飞轮与循环', link: '/growth-mindset/intermediate/growth-loops' },
            { text: '北极星指标', link: '/growth-mindset/intermediate/north-star-metric' }
          ]
        },
        {
          text: '🔴 高阶篇',
          collapsed: true,
          items: [
            { text: '增长型组织建设', link: '/growth-mindset/advanced/growth-culture' },
            { text: '经典增长案例拆解', link: '/growth-mindset/advanced/case-studies' }
          ]
        }
      ],
      '/marketing/': [
        {
          text: '🟢 基础篇',
          collapsed: false,
          items: [
            { text: '营销漏斗', link: '/marketing/basics/marketing-funnel' },
            { text: '渠道选择策略', link: '/marketing/basics/channel-strategy' },
            { text: '内容营销基础', link: '/marketing/basics/content-marketing' }
          ]
        },
        {
          text: '🟡 进阶篇',
          collapsed: true,
          items: [
            { text: 'SEO/SEM 实战', link: '/marketing/intermediate/seo-sem' },
            { text: '社交媒体增长', link: '/marketing/intermediate/social-media' },
            { text: '裂变增长策略', link: '/marketing/intermediate/viral-growth' },
            { text: 'KOL/KOC 营销', link: '/marketing/intermediate/influencer-marketing' }
          ]
        },
        {
          text: '🔴 高阶篇',
          collapsed: true,
          items: [
            { text: '增长黑客实战', link: '/marketing/advanced/growth-hacking' },
            { text: '品牌增长飞轮', link: '/marketing/advanced/brand-growth' },
            { text: '全渠道增长策略', link: '/marketing/advanced/omnichannel' }
          ]
        }
      ],
      '/operations/': [
        {
          text: '🟢 基础篇',
          collapsed: false,
          items: [
            { text: '运营的本质', link: '/operations/basics/what-is-operations' },
            { text: '用户运营基础', link: '/operations/basics/user-operations' },
            { text: '内容运营基础', link: '/operations/basics/content-operations' }
          ]
        },
        {
          text: '🟡 进阶篇',
          collapsed: true,
          items: [
            { text: '活动策划与执行', link: '/operations/intermediate/activity-operations' },
            { text: '社群运营', link: '/operations/intermediate/community-ops' },
            { text: '私域流量运营', link: '/operations/intermediate/private-traffic' },
            { text: '留存策略', link: '/operations/intermediate/retention-strategy' }
          ]
        },
        {
          text: '🔴 高阶篇',
          collapsed: true,
          items: [
            { text: '用户生命周期管理', link: '/operations/advanced/lifecycle-management' },
            { text: '运营自动化', link: '/operations/advanced/ops-automation' },
            { text: '运营指标体系', link: '/operations/advanced/ops-metrics' }
          ]
        }
      ],
      '/internet-ops/': [
        {
          text: '🟢 基础篇',
          collapsed: false,
          items: [
            { text: '产品运营入门', link: '/internet-ops/basics/product-ops' },
            { text: '数据运营基础', link: '/internet-ops/basics/data-ops' },
            { text: '用户研究方法', link: '/internet-ops/basics/user-research' }
          ]
        },
        {
          text: '🟡 进阶篇',
          collapsed: true,
          items: [
            { text: '电商运营实战', link: '/internet-ops/intermediate/ecommerce-ops' },
            { text: 'SaaS 增长策略', link: '/internet-ops/intermediate/saas-growth' },
            { text: '平台型产品运营', link: '/internet-ops/intermediate/platform-ops' },
            { text: 'App 增长模型', link: '/internet-ops/intermediate/app-growth' }
          ]
        },
        {
          text: '🔴 高阶篇',
          collapsed: true,
          items: [
            { text: '行业增长模式', link: '/internet-ops/advanced/industry-patterns' },
            { text: '跨境业务增长', link: '/internet-ops/advanced/cross-border' },
            { text: 'AI 驱动的运营创新', link: '/internet-ops/advanced/ai-ops' }
          ]
        }
      ],
      '/data-analytics/': [
        {
          text: '🟢 基础篇',
          collapsed: false,
          items: [
            { text: '指标体系搭建', link: '/data-analytics/basics/metrics-framework' },
            { text: '漏斗分析', link: '/data-analytics/basics/funnel-analysis' },
            { text: '同期群分析', link: '/data-analytics/basics/cohort-analysis' }
          ]
        },
        {
          text: '🟡 进阶篇',
          collapsed: true,
          items: [
            { text: 'A/B 测试实战', link: '/data-analytics/intermediate/ab-testing' },
            { text: '归因分析', link: '/data-analytics/intermediate/attribution' },
            { text: '数据可视化', link: '/data-analytics/intermediate/data-visualization' },
            { text: 'SQL 基础', link: '/data-analytics/intermediate/sql-basics' }
          ]
        },
        {
          text: '🔴 高阶篇',
          collapsed: true,
          items: [
            { text: '预测性分析', link: '/data-analytics/advanced/predictive-analytics' },
            { text: 'LTV 模型', link: '/data-analytics/advanced/ltv-model' },
            { text: '增长建模', link: '/data-analytics/advanced/growth-modeling' }
          ]
        }
      ],
      '/tools/': [
        {
          text: '🟢 基础篇',
          collapsed: false,
          items: [
            { text: '分析工具入门', link: '/tools/basics/analytics-tools' },
            { text: '营销技术栈概览', link: '/tools/basics/marketing-stack' }
          ]
        },
        {
          text: '🟡 进阶篇',
          collapsed: true,
          items: [
            { text: 'GA4 深度使用', link: '/tools/intermediate/ga4-deep-dive' },
            { text: '自动化工具实战', link: '/tools/intermediate/automation-tools' },
            { text: 'CRM 系统选型', link: '/tools/intermediate/crm-systems' },
            { text: 'CDP 客户数据平台', link: '/tools/intermediate/cdp-platforms' }
          ]
        },
        {
          text: '🔴 高阶篇',
          collapsed: true,
          items: [
            { text: 'MarTech 架构', link: '/tools/advanced/martech-architecture' },
            { text: 'AI 增长工具', link: '/tools/advanced/ai-tools' },
            { text: '自定义数据看板', link: '/tools/advanced/custom-dashboard' }
          ]
        }
      ],
      '/': [
        {
          text: '快速开始',
          collapsed: false,
          items: [
            { text: '学习路线图', link: '/roadmap/' }
          ]
        }
      ]
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '输入',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'Esc'
                }
              }
            }
          }
        },
        miniSearch: {
          options: {
            tokenize: (text: string) => text.match(/[\p{L}\p{N}]+/gu) ?? []
          }
        }
      }
    },
    editLink: {
      pattern: 'https://github.com/zhycn/growth-study/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2026 zhycn'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    notFound: {
      quote: '抱歉，您访问的页面不存在或已被移除',
      linkLabel: '返回首页',
      linkText: '回到首页'
    },
    externalLinkIcon: true,
    socialLinks: [{ icon: 'github', link: 'https://github.com/zhycn/growth-study' }]
  }
}))
