---
title: SQL 基础：数据分析师的必备技能
description: 系统学习 SQL 的核心语法与数据分析常用技巧，通过留存率和漏斗计算等实战场景，掌握用 SQL 从数据库提取和加工数据的能力。
tags:
  - SQL
  - 数据库
  - 查询
  - 进阶
level: intermediate
module: data-analytics
---

# SQL 基础：数据分析师的必备技能

## 什么是 SQL

SQL（Structured Query Language，结构化查询语言）是用于管理和操作关系型数据库的标准编程语言。对于数据分析师而言，SQL 是从数据库中提取、转换和分析数据的核心工具。

几乎所有主流的关系型数据库都支持 SQL，包括：
- **MySQL**：最流行的开源数据库
- **PostgreSQL**：功能强大的开源数据库
- **SQL Server**：微软企业级数据库
- **Oracle**：甲骨文企业级数据库
- **ClickHouse**：高性能分析型数据库

## SQL 基础语法

### SELECT：查询数据

```sql
SELECT user_id, name, email
FROM users
WHERE status = 'active'
ORDER BY created_at DESC
LIMIT 100;
```

### WHERE：条件过滤

```sql
SELECT *
FROM orders
WHERE amount > 100
  AND status = 'paid'
  AND created_at >= '2024-01-01';
```

常用操作符：
- **比较**：`=`、`>`、`<`、`>=`、`<=`、`!=`
- **范围**：`BETWEEN`、`IN`
- **模糊匹配**：`LIKE`（`%` 通配符）
- **空值**：`IS NULL`、`IS NOT NULL`
- **逻辑**：`AND`、`OR`、`NOT`

### GROUP BY：分组聚合

```sql
SELECT
  DATE(created_at) AS order_date,
  COUNT(*) AS order_count,
  SUM(amount) AS total_amount,
  AVG(amount) AS avg_amount
FROM orders
GROUP BY DATE(created_at)
ORDER BY order_date DESC;
```

常用聚合函数：
- `COUNT()`：计数
- `SUM()`：求和
- `AVG()`：平均值
- `MAX()` / `MIN()`：最大/最小值

### JOIN：表连接

```sql
SELECT
  u.user_id,
  u.name,
  COUNT(o.order_id) AS order_count,
  SUM(o.amount) AS total_spent
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id, u.name;
```

JOIN 类型：
- **INNER JOIN**：只返回两个表都有匹配的行
- **LEFT JOIN**：返回左表所有行，右表无匹配则为 NULL
- **RIGHT JOIN**：返回右表所有行，左表无匹配则为 NULL
- **FULL JOIN**：返回两个表的所有行

## 数据分析常用 SQL

### 窗口函数

窗口函数在不改变结果集行数的情况下进行聚合计算，是数据分析的利器。

```sql
SELECT
  user_id,
  order_date,
  amount,
  SUM(amount) OVER (
    PARTITION BY user_id
    ORDER BY order_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS cumulative_amount,
  ROW_NUMBER() OVER (
    PARTITION BY user_id
    ORDER BY order_date
  ) AS order_rank
FROM orders;
```

常用窗口函数：
- `ROW_NUMBER()`：行号
- `RANK()` / `DENSE_RANK()`：排名
- `LAG()` / `LEAD()`：前/后一行数据
- `SUM() OVER` / `AVG() OVER`：累计求和/移动平均

### CASE 表达式

```sql
SELECT
  user_id,
  amount,
  CASE
    WHEN amount < 100 THEN '低价值'
    WHEN amount < 500 THEN '中价值'
    ELSE '高价值'
  END AS value_level
FROM orders;
```

### 子查询与 CTE

```sql
-- CTE（Common Table Expression）
WITH monthly_stats AS (
  SELECT
    DATE_FORMAT(created_at, '%Y-%m') AS month,
    COUNT(*) AS order_count,
    SUM(amount) AS revenue
  FROM orders
  GROUP BY DATE_FORMAT(created_at, '%Y-%m')
)
SELECT
  month,
  order_count,
  revenue,
  revenue / LAG(revenue) OVER (ORDER BY month) - 1 AS mom_growth
FROM monthly_stats
ORDER BY month;
```

## 实战场景

### 场景一：计算用户留存率

```sql
WITH user_first_order AS (
  SELECT
    user_id,
    MIN(DATE(created_at)) AS first_order_date
  FROM orders
  GROUP BY user_id
),
cohort_retention AS (
  SELECT
    DATE_FORMAT(f.first_order_date, '%Y-%m') AS cohort_month,
    DATEDIFF(DATE(o.created_at), f.first_order_date) / 30 AS month_after,
    COUNT(DISTINCT o.user_id) AS retained_users
  FROM user_first_order f
  JOIN orders o ON f.user_id = o.user_id
  GROUP BY cohort_month, month_after
)
SELECT
  cohort_month,
  month_after,
  retained_users,
  retained_users / FIRST_VALUE(retained_users) OVER (
    PARTITION BY cohort_month ORDER BY month_after
  ) * 100 AS retention_rate
FROM cohort_retention
ORDER BY cohort_month, month_after;
```

### 场景二：计算漏斗转化率

```sql
WITH funnel_steps AS (
  SELECT
    COUNT(DISTINCT CASE WHEN event = 'page_view' THEN user_id END) AS step1_views,
    COUNT(DISTINCT CASE WHEN event = 'add_to_cart' THEN user_id END) AS step2_cart,
    COUNT(DISTINCT CASE WHEN event = 'checkout' THEN user_id END) AS step3_checkout,
    COUNT(DISTINCT CASE WHEN event = 'purchase' THEN user_id END) AS step4_purchase
  FROM user_events
  WHERE event_date = CURRENT_DATE
)
SELECT
  step1_views,
  step2_cart,
  step3_checkout,
  step4_purchase,
  ROUND(step2_cart * 100.0 / step1_views, 2) AS view_to_cart_rate,
  ROUND(step3_checkout * 100.0 / step2_cart, 2) AS cart_to_checkout_rate,
  ROUND(step4_purchase * 100.0 / step3_checkout, 2) AS checkout_to_purchase_rate,
  ROUND(step4_purchase * 100.0 / step1_views, 2) AS overall_conversion_rate
FROM funnel_steps;
```

### 场景三：计算用户 LTV

```sql
SELECT
  DATE_FORMAT(first_order_date, '%Y-%m') AS cohort,
  COUNT(DISTINCT user_id) AS user_count,
  SUM(total_revenue) AS total_revenue,
  SUM(total_revenue) / COUNT(DISTINCT user_id) AS avg_ltv
FROM (
  SELECT
    user_id,
    MIN(DATE(created_at)) AS first_order_date,
    SUM(amount) AS total_revenue
  FROM orders
  GROUP BY user_id
) user_ltv
GROUP BY DATE_FORMAT(first_order_date, '%Y-%m')
ORDER BY cohort;
```

## SQL 最佳实践

### 1. 格式化代码

保持 SQL 代码的可读性：关键字大写、缩进一致、每行一个字段。

### 2. 使用 CTE 替代嵌套子查询

CTE（WITH 语句）让复杂查询更清晰、更易维护。

### 3. 避免 SELECT *

明确指定需要的字段，减少不必要的数据传输。

### 4. 合理使用索引

在 WHERE、JOIN、ORDER BY 常用的字段上建立索引，大幅提升查询性能。

### 5. 注意数据倾斜

大数据量查询时，注意 GROUP BY 字段的数据分布，避免单个节点负载过高。

## 学习资源

- **在线练习**：LeetCode Database 题目、SQLZoo、HackerRank SQL 挑战
- **书籍推荐**：《SQL 必知必会》《SQL 进阶教程》
- **工具推荐**：DBeaver（免费数据库客户端）、DataGrip（专业 IDE）

## 下一步学习

- 学习 [数据可视化](/data-analytics/intermediate/data-visualization) 掌握将 SQL 查询结果可视化的方法
- 学习 [漏斗分析](/data-analytics/basics/funnel-analysis) 深入了解漏斗分析的业务逻辑
- 学习 [预测性分析](/data-analytics/advanced/predictive-analytics) 探索如何用 SQL 准备机器学习训练数据
