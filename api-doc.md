# 客户端API接口文档

## 目录
- [1. 概述](#1-概述)
- [2. 接口规范](#2-接口规范)
- [3. 内容接口](#3-内容接口)
- [4. 订单支付接口](#4-订单支付接口)
- [5. 用户接口](#5-用户接口)
- [6. 代理商接口](#6-代理商接口)
- [7. 其他接口](#7-其他接口)

## 1. 概述

### 1.1 接口说明
本文档为客户端API接口说明文档，所有接口均以 `/api/ds` 作为基础路径。

### 1.2 公共参数
所有接口都可能包含以下公共参数：
- `daili`: 代理商ID
- `sign`: 接口签名
- `tk`: 可选的令牌参数

### 1.3 响应格式
接口统一返回JSON格式数据，基本结构如下：
```json
{
    "code": 0,       // 0表示成功，非0表示失败
    "msg": "success", // 响应消息
    "data": {}       // 响应数据
}
```

## 2. 接口规范

### 2.1 安全规范
- 部分接口使用 `@SecurityParameter` 注解进行参数加密
- 接口调用需要进行签名验证
- 系统实现了CC攻击防护

### 2.2 错误码说明
| 错误码 | 说明 |
|--------|------|
| 0 | 成功 |
| 500 | 系统错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |

## 3. 内容接口

### 3.1 视频相关接口

#### 3.1.1 获取视频列表
- 接口路径：`/api/ds/videolist`
- 请求方式：GET
- 请求参数：
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | daili | Long | 是 | 代理商ID |
  | tag | String | 否 | 视频标签 |
  | minId | Long | 否 | 最小ID，用于分页 |
  | ps | Integer | 否 | 每页数量，默认10 |
  | tk | String | 否 | 令牌 |

#### 3.1.2 获取视频详情
- 接口路径：`/api/ds/video`
- 请求方式：GET
- 请求参数：
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | daili | Long | 是 | 代理商ID |
  | zykey | String | 是 | 视频唯一标识 |

### 3.2 漫画相关接口

#### 3.2.1 获取漫画列表
- 接口路径：`/api/ds/cartoonlist`
- 请求方式：GET
- 请求参数：
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | daili | Long | 是 | 代理商ID |
  | ps | Integer | 否 | 每页数量，默认10 |

#### 3.2.2 获取漫画详情
- 接口路径：`/api/ds/cartoon`
- 请求方式：GET
- 请求参数：
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | daili | Long | 是 | 代理商ID |
  | bookid | Long | 是 | 漫画ID |

#### 3.2.3 获取漫画章节
- 接口路径：`/api/ds/cartoonchapter`
- 请求方式：GET
- 请求参数：
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | daili | Long | 是 | 代理商ID |
  | chapterid | Long | 是 | 章节ID |

## 4. 订单支付接口

### 4.1 订单相关接口

#### 4.1.1 创建订单
- 接口路径：`/api/ds/createorder`
- 请求方式：POST
- 请求参数：
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | daili | Long | 是 | 代理商ID |
  | zykey | String | 是 | 内容标识 |
  | vip | String | 否 | VIP类型 |

#### 4.1.2 检查订单状态
- 接口路径：`/api/ds/checkOrderStatus`
- 请求方式：GET
- 请求参数：
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | orderno | String | 是 | 订单号 |

### 4.2 支付接口

#### 4.2.1 微信支付
- 接口路径：`/api/ds/createWechatPay`
- 请求方式：POST
- 请求参数：
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | orderno | String | 是 | 订单号 |
  | openid | String | 否 | 微信openid |

#### 4.2.2 云钱包支付
- 接口路径：`/api/ds/createYunqianba`
- 请求方式：POST
- 请求参数：
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | orderno | String | 是 | 订单号 |
  | openid | String | 是 | 用户标识 |

### 4.3 支付回调接口

#### 4.3.1 统一支付回调
- 接口路径：`/api/ds/apiPayCallback/{paychannel}`
- 请求方式：POST
- 路径参数：
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | paychannel | String | 是 | 支付渠道标识 |

## 5. 用户接口

### 5.1 微信授权
- 接口路径：`/api/ds/oauth`
- 请求方式：GET
- 请求参数：
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | code | String | 是 | 微信授权码 |
  | callback | String | 是 | 回调地址 |

### 5.2 用户信息
- 接口路径：`/api/ds/wxMsg`
- 请求方式：POST
- 说明：处理微信消息和事件

### 5.3 记录用户电话
- 接口路径：`/api/ds/logUserTel`
- 请求方式：POST
- 请求参数：
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | tel | String | 是 | 用户电话 |

## 6. 代理商接口

### 6.1 获取代理域名
- 接口路径：`/api/ds/getDomain`
- 请求方式：GET
- 请求参数：
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | daili | Long | 是 | 代理商ID |
  | callback | String | 是 | JSONP回调函数名 |

### 6.2 获取订单统计
- 接口路径：`/api/ds/getDingdanMoneySum`
- 请求方式：GET
- 说明：获取代理商订单金额统计

## 7. 其他接口

### 7.1 举报功能
- 接口路径：`/api/ds/jubao`
- 请求方式：POST
- 请求参数：
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | content | String | 是 | 举报内容 |
  | type | String | 是 | 举报类型 |

### 7.2 获取动态配置
- 接口路径：`/api/ds/getDynamic`
- 请求方式：GET
- 说明：获取系统动态配置信息

## 附录

### A. 签名算法
签名规则：
1. 将所有参数按照字母顺序排序
2. 拼接成key=value形式，中间用&连接
3. 在最后加上密钥
4. 进行MD5加密，得到签名

### B. 错误处理
所有接口在发生错误时会返回统一格式的错误信息：
```json
{
    "code": 错误码,
    "msg": "错误描述"
}
``` 