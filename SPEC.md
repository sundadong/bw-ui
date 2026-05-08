# BWUI 组件库 - uni-app 重构规范

## 1. 项目概述

### 项目背景
- **原项目**: BWUI - 基于 Wepy 框架的微信小程序组件库
- **重构目标**: 使用最新的 uni-app 框架重构，实现多端小程序适配
- **目标平台**: 微信小程序、支付宝小程序、H5、App（iOS/Android）

### 技术栈升级

| 类别 | 原技术 | 重构后技术 |
|------|--------|-----------|
| 框架 | Wepy 1.6.x | uni-app (Vue 3 + Composition API) |
| 样式 | Less | SCSS |
| 构建 | wepy-cli | Vite (HBuilderX / CLI) |
| 类型 | 无 | TypeScript |

## 2. 组件清单

### 2.1 基础组件
| 组件 | 说明 | 优先级 |
|------|------|--------|
| Button | 按钮组件，支持多种类型、尺寸、状态 | P0 |
| Icon | 图标组件，支持多种图标库 | P0 |

### 2.2 表单组件
| 组件 | 说明 | 优先级 |
|------|------|--------|
| Input | 输入框组件 | P0 |
| Textarea | 多行文本输入 | P0 |
| Stepper | 步进器组件 | P1 |

### 2.3 反馈组件
| 组件 | 说明 | 优先级 |
|------|------|--------|
| Loading | 加载状态组件 | P0 |
| Notify | 通知提示组件 | P1 |
| Popup | 弹出层组件 | P0 |

### 2.4 布局组件
| 组件 | 说明 | 优先级 |
|------|------|--------|
| Cell | 单元格组件 | P0 |
| Layout | 布局组件（Row/Col） | P1 |

### 2.5 导航组件
| 组件 | 说明 | 优先级 |
|------|------|--------|
| Tabs | 标签页组件 | P0 |

### 2.6 视图组件
| 组件 | 说明 | 优先级 |
|------|------|--------|
| Alert | 警告提示 | P1 |
| Article | 文章展示 | P1 |
| Avatar | 头像组件 | P1 |
| Badge | 徽章组件 | P1 |
| Countdown | 倒计时组件 | P1 |
| Empty | 空状态组件 | P1 |
| Loadmore | 加载更多组件 | P1 |
| Tag | 标签组件 | P1 |
| Timeline | 时间线组件 | P1 |

## 3. 目录结构

```
bwui-uniapp/
├── src/
│   ├── components/          # 组件源码
│   │   ├── basic/           # 基础组件
│   │   │   ├── button/
│   │   │   └── icon/
│   │   ├── form/            # 表单组件
│   │   │   ├── input/
│   │   │   ├── textarea/
│   │   │   └── stepper/
│   │   ├── feedback/         # 反馈组件
│   │   │   ├── loading/
│   │   │   ├── notify/
│   │   │   └── popup/
│   │   ├── layout/           # 布局组件
│   │   │   ├── cell/
│   │   │   └── layout/
│   │   ├── nav/              # 导航组件
│   │   │   └── tabs/
│   │   └── view/             # 视图组件
│   │       ├── alert/
│   │       ├── article/
│   │       ├── avatar/
│   │       ├── badge/
│   │       ├── countdown/
│   │       ├── empty/
│   │       ├── loadmore/
│   │       ├── tag/
│   │       └── timeline/
│   ├── pages/                # 示例页面
│   │   ├── index/
│   │   ├── basic/
│   │   ├── form/
│   │   ├── feedback/
│   │   ├── layout/
│   │   ├── nav/
│   │   └── view/
│   ├── styles/                # 全局样式
│   │   ├── variables.scss    # 主题变量
│   │   ├── mixins.scss       # 混入
│   │   └── common.scss       # 公共样式
│   ├── utils/                 # 工具函数
│   └── App.vue
├── package.json
├── vite.config.ts
├── tsconfig.json
└── project.config.json
```

## 4. 设计规范

### 4.1 主题变量
```scss
// 颜色系统
$primary-color: #1989fa;
$success-color: #07c160;
$warning-color: #ff976a;
$danger-color: #ee0a24;
$text-color: #323233;
$text-color-2: #646566;
$text-color-3: #969799;
$border-color: #ebedf0;
$background-color: #f7f8fa;

// 字体大小
$font-size-xs: 10px;
$font-size-sm: 12px;
$font-size-md: 14px;
$font-size-lg: 16px;
$font-size-xl: 18px;

// 圆角
$border-radius-sm: 2px;
$border-radius-md: 4px;
$border-radius-lg: 8px;

// 间距
$padding-xs: 8px;
$padding-sm: 12px;
$padding-md: 16px;
$padding-lg: 24px;
```

### 4.2 组件 API 设计原则
1. **Props 命名**: 使用 PascalCase 或 camelCase，与 Vue 规范一致
2. **Events**: 使用 kebab-case 命名，与 HTML 规范一致
3. **Slots**: 使用默认 slot、具名 slot 方式
4. **Class 前缀**: `bw-` 作为组件前缀，如 `bw-button`

## 5. 多端适配策略

### 5.1 平台差异处理
```typescript
// 使用 uni-app 平台判断
import { platform } from '@/utils/platform';

// 条件编译
// #ifdef MP-WEIXIN
// 微信小程序特有代码
// #endif

// #ifdef MP-ALIPAY
// 支付宝小程序特有代码
// #endif
```

### 5.2 API 适配
- 使用 `uni.showToast()` 替代微信 `wx.showToast()`
- 使用条件编译处理平台差异 API
- 抽象通用接口，平台特定实现分离

## 6. 性能优化

1. **组件懒加载**: 非首屏组件使用 `defineAsyncComponent`
2. **样式隔离**: 启用 `scoped` 样式和 CSS Modules
3. **Tree Shaking**: 确保构建时只打包使用的组件
4. **分包加载**: 将示例页面放入分包，减少主包体积

## 7. 测试计划

- [ ] 单元测试: Vitest
- [ ] 组件测试: Vue Test Utils
- [ ] E2E 测试: Playwright / 手动测试
- [ ] 多端真机测试: 微信、支付宝、H5

## 8. 里程碑

| 阶段 | 内容 | 状态 |
|------|------|------|
| Phase 1 | 项目初始化、基础架构搭建 | ⏳ |
| Phase 2 | 基础组件重构 | 🔲 |
| Phase 3 | 表单组件重构 | 🔲 |
| Phase 4 | 反馈组件重构 | 🔲 |
| Phase 5 | 布局和导航组件重构 | 🔲 |
| Phase 6 | 视图组件重构 | 🔲 |
| Phase 7 | 示例页面和文档 | 🔲 |
| Phase 8 | 多端适配和测试 | 🔲 |
