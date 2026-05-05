---
title: GA4 深度使用
description: 深入掌握 GA4 的事件模型、自定义配置、BigQuery 集成与实战应用场景
tags: [GA4, Google Analytics, 数据分析, 进阶]
level: intermediate
---

# GA4 深度使用

## GA4 vs Universal Analytics

2023 年 7 月，Google 正式停用 Universal Analytics（UA），全面转向 GA4。这不仅是版本升级，更是数据模型的根本变革。

| 维度 | Universal Analytics | GA4 |
|------|---------------------|-----|
| 数据模型 | 基于会话（Session-based） | 基于事件（Event-based） |
| 事件结构 | 固定类别/操作/标签 | 灵活的键值对参数 |
| 用户识别 | 主要依赖 Cookie | 跨平台 User-ID + Google Signals |
| 数据保留 | 最长 50 个月 | 最长 14 个月（可导出到 BigQuery） |
| 机器学习 | 基础 | 内置预测指标与异常检测 |
| 隐私合规 | 有限支持 | 内置同意模式（Consent Mode） |

核心变化：GA4 以**事件**为核心，一切用户交互都是事件。页面浏览、点击、购买、视频播放——本质上都是带有不同参数的事件。

## 核心架构

### 事件模型

GA4 的事件结构由三部分组成：

```
事件名称（Event Name）
├── 事件参数（Event Parameters）
│   ├── 自动收集参数（page_location, page_title, etc.）
│   ├── 增强型测量参数（link_url, file_name, etc.）
│   └── 自定义参数（custom_param_1, custom_param_2, etc.）
└── 用户属性（User Properties）
    └── 用户级别的持久化数据（user_type, membership_level, etc.）
```

### 事件分类

| 类型 | 说明 | 示例 |
|------|------|------|
| 自动收集事件 | GA4 默认收集，无需配置 | page_view, session_start, first_visit |
| 增强型测量事件 | 在设置中开启即可 | scroll, outbound_click, site_search, video_engagement |
| 推荐事件 | Google 推荐使用的标准化事件 | add_to_cart, purchase, sign_up, generate_lead |
| 自定义事件 | 根据业务需求自定义 | custom_event_name |

## 事件追踪实战

### 基础事件配置

通过 Google Tag Manager 配置事件追踪：

1. 创建 GA4 配置标签
2. 设置触发条件（如：按钮点击、表单提交）
3. 定义事件名称与参数
4. 发布容器

### 电商事件追踪

电商场景需要追踪完整的购物旅程：

```
view_item → add_to_cart → begin_checkout → add_payment_info → add_shipping_info → purchase
```

每个事件都需要携带对应的商品参数：

| 事件 | 必需参数 | 可选参数 |
|------|----------|----------|
| view_item | items | currency, value |
| add_to_cart | items, currency, value | coupon |
| purchase | transaction_id, value, currency, items | tax, shipping, coupon |

## 自定义配置

### 自定义维度与指标

GA4 默认不存储自定义参数的详细值。需要在管理后台注册自定义维度/指标后，才能在报告中使用。

**配置步骤**：
1. 进入「管理」→「自定义定义」
2. 创建自定义维度或指标
3. 设置参数名称（需与代码中的参数名一致）
4. 等待 24-48 小时数据生效

### 受众群体（Audiences）

基于用户行为创建受众群体，用于再营销和个性化分析：

- 过去 7 天加购但未购买的用户
- 访问定价页面超过 3 次的用户
- 完成注册但未激活的用户

## 分析报告

### 核心报告类型

| 报告 | 用途 | 关键指标 |
|------|------|----------|
| 获取报告 | 分析流量来源 | 新用户、会话、会话转化率 |
| 参与度报告 | 分析用户行为 | 活跃用户、参与度、事件计数 |
| 变现报告 | 分析收入 | 总收入、购买转化率、客单价 |
| 留存报告 | 分析用户留存 | 留存率、回访用户数 |
| 用户属性报告 | 分析用户画像 | 地区、语言、设备 |

### 探索报告（Explorations）

探索报告是 GA4 最强大的分析功能，支持：

- **漏斗探索**：可视化转化路径，定位流失环节
- **路径探索**：发现用户的实际浏览路径
- **细分重叠**：对比不同用户群体的特征
- **用户生命周期**：分析用户从获取到流失的全周期

## 实战应用场景

### 场景一：内容网站优化

**目标**：提升文章阅读完成率

**方案**：
1. 启用增强型测量中的「滚动」事件
2. 创建自定义事件 `article_read_complete`（滚动深度 > 90%）
3. 在探索报告中分析高完成率文章的特征
4. 基于发现优化内容结构

### 场景二：SaaS 产品激活分析

**目标**：提升新用户激活率

**方案**：
1. 定义激活事件（完成核心功能使用）
2. 创建从注册到激活的漏斗
3. 分析流失环节的用户特征
4. 针对性优化 onboarding 流程

### 场景三：电商转化优化

**目标**：提升加购到支付的转化率

**方案**：
1. 配置完整的电商事件追踪
2. 分析 checkout 漏斗各环节流失率
3. 对比不同流量渠道的转化效率
4. 优化高流失环节的页面体验

### 场景四：App 与网站跨平台分析

**目标**：统一分析用户跨端行为

**方案**：
1. 配置 User-ID 实现跨平台用户识别
2. 启用 Google Signals 增强跨设备追踪
3. 创建跨平台转化漏斗
4. 分析用户跨端旅程特征

## BigQuery 集成

GA4 免费版即可导出原始数据到 BigQuery，这是 GA4 相比 UA 的重大升级。

### 集成步骤

1. 在 GA4 管理后台链接 BigQuery 项目
2. 选择每日导出或流式导出
3. 在 BigQuery 中查询数据

### 常用查询示例

```sql
-- 查询每日活跃用户数
SELECT
  event_date,
  COUNT(DISTINCT user_pseudo_id) AS daily_active_users
FROM `project.dataset.events_*`
WHERE event_name = 'session_start'
GROUP BY event_date
ORDER BY event_date DESC
```

### 应用场景

- 自定义复杂分析（GA4 界面无法满足）
- 与其他数据源（CRM、广告平台）联合分析
- 构建自定义数据看板
- 长期数据归档（突破 GA4 14 个月限制）

## 电商 GA4 配置案例

### 背景
某跨境电商网站，日均 UV 5000，月 GMV 200 万。

### 配置方案

| 配置项 | 方案 |
|--------|------|
| 数据流 | Web + iOS + Android 三个数据流 |
| 增强型测量 | 开启全部 7 项（滚动、出站点击、站内搜索等） |
| 电商事件 | 完整追踪 8 个电商事件 |
| 自定义维度 | 商品类目、用户等级、促销活动 |
| 受众群体 | 加购未购、高价值用户、流失预警 |
| BigQuery | 每日导出，用于深度分析 |

### 成果
- 发现移动端支付流程流失率高达 65%，优化后降至 40%
- 通过受众再营销，复购率提升 25%
- BigQuery 分析发现高价值用户特征，指导精准投放

## 常见挑战

### 数据采样
GA4 在大数据量时会进行采样，导致数据不精确。**解决方案**：使用 BigQuery 导出原始数据进行精确分析。

### 学习曲线
GA4 的报告结构与 UA 差异较大。**解决方案**：系统学习事件模型，善用探索报告功能。

### 历史数据对比
UA 数据无法直接迁移到 GA4。**解决方案**：在过渡期并行运行两个系统，建立数据映射关系。

## 下一步学习

- 搭建自动化工作流：[自动化工具实战](/tools/intermediate/automation-tools)
- 构建自定义看板：[自定义数据看板](/tools/advanced/custom-dashboard)
- 了解 MarTech 架构：[MarTech 架构](/tools/advanced/martech-architecture)
