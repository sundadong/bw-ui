# BWUI 组件库规范文档

## 1. 项目概述

### 项目名称
**BWUI** - 基于 Vue3 + uniapp 的跨端 UI 组件库

### 核心功能
- 提供一套完整的 Vant4 风格 UI 组件
- 支持 H5、微信小程序、支付宝小程序多端运行
- 组件设计完全对齐 Vant4 API 和视觉规范
- 提供完整的单元测试和 UI 对比测试

### 目标用户
- 使用 uniapp 开发跨端应用的开发者
- 需要快速构建小程序/H5 项目的团队
- 熟悉 Vant4 组件库的前端开发者

---

## 2. 技术栈

### 核心框架
- **Vue 3.4+**: 组合式 API + `<script setup>` 语法
- **Vite 5.2+**: 构建工具
- **uni-app 3.0+**: 跨端框架
- **TypeScript 5.4+**: 类型系统

### 测试工具
- **Vitest 1.3+**: 单元测试框架
- **Playwright 1.42+**: UI 对比测试框架
- **Happy-dom**: DOM 环境模拟

### 开发工具
- **ESLint 8.57+**: 代码规范检查
- **Prettier**: 代码格式化
- **Sass**: CSS 预处理器

---

## 3. 组件列表

### 3.1 基础组件
| 组件名 | 英文名 | 描述 | 优先级 |
|--------|--------|------|--------|
| 按钮 | Button | 基础按钮组件 | P0 |
| 图标 | Icon | 图标组件 | P0 |
| 单元格 | Cell | 单元格组件 | P0 |
| 单元格组 | CellGroup | 单元格分组 | P0 |

### 3.2 表单组件
| 组件名 | 英文名 | 描述 | 优先级 |
|--------|--------|------|--------|
| 输入框 | Field | 表单输入组件 | P0 |
| 文本域 | Textarea | 多行文本输入 | P0 |
| 开关 | Switch | 开关组件 | P0 |
| 复选框 | Checkbox | 复选框组件 | P0 |
| 单选框 | Radio | 单选框组件 | P0 |
| 步进器 | Stepper | 数字输入组件 | P0 |
| 滑块 | Slider | 滑块选择组件 | P1 |
| 评分 | Rate | 评分组件 | P1 |
| 日历 | Calendar | 日历选择组件 | P1 |
| 日期选择器 | DatePicker | 日期选择 | P1 |
| 地区选择器 | AreaPicker | 地区选择 | P1 |
| 选择器 | Picker | 通用的选择器 | P1 |
| 搜索框 | Search | 搜索框组件 | P1 |

### 3.3 反馈组件
| 组件名 | 英文名 | 描述 | 优先级 |
|--------|--------|------|--------|
| 气泡提示 | Toast | 轻提示组件 | P0 |
| 对话框 | Dialog | 模态对话框 | P0 |
| 弹出层 | Popup | 弹出层组件 | P0 |
| 遮罩层 | Overlay | 遮罩层组件 | P0 |
| 加载 | Loading | 加载状态组件 | P0 |
| 空状态 | Empty | 空状态组件 | P1 |
| 通知栏 | Notify | 通知消息组件 | P1 |
| 动作面板 | ActionSheet | 底部动作面板 | P1 |
| 徽标 | Badge | 徽标组件 | P1 |
| 标签 | Tag | 标签组件 | P1 |

### 3.4 布局组件
| 组件名 | 英文名 | 描述 | 优先级 |
|--------|--------|------|--------|
| 宫格 | Grid | 宫格布局组件 | P1 |
| 间距 | Space | 间距组件 | P1 |
| 安全区域 | SafeArea | 安全区域适配 | P1 |

### 3.5 导航组件
| 组件名 | 英文名 | 描述 | 优先级 |
|--------|--------|------|--------|
| 标签页 | Tabs | 标签页组件 | P0 |
| 侧边导航 | Sidebar | 侧边导航组件 | P1 |
| 标签栏 | Tabbar | 底部标签栏 | P1 |
| 导航栏 | Navbar | 顶部导航栏 | P1 |
| 分页 | Pagination | 分页组件 | P1 |
| 返回顶部 | BackTop | 返回顶部组件 | P2 |

### 3.6 展示组件
| 组件名 | 英文名 | 描述 | 优先级 |
|--------|--------|------|--------|
| 头像 | Avatar | 头像组件 | P1 |
| 卡片 | Card | 卡片组件 | P1 |
| 进度条 | Progress | 进度条组件 | P1 |
| 骨架屏 | Skeleton | 骨架屏组件 | P1 |
| 折叠面板 | Collapse | 折叠面板组件 | P1 |
| 时间线 | Timeline | 时间线组件 | P2 |
| 文章 | Article | 文章组件 | P2 |
| 分割线 | Divider | 分割线组件 | P2 |
| 圆形进度 | Circle | 圆形进度组件 | P2 |
| 图片 | Image | 图片组件 | P1 |
| 轮播 | Swipe | 轮播组件 | P1 |
| 通告栏 | NoticeBar | 通告栏组件 | P1 |
| 粘性定位 | Sticky | 粘性定位组件 | P1 |

---

## 4. 组件规范

### 4.1 命名规范
- **组件目录**: kebab-case (如 `button`、`cell-group`)
- **组件名称**: PascalCase (如 `BwButton`、`BwCell`)
- **组件标签**: kebab-case (如 `<bw-button>`、`<bw-cell-group>`)
- **Props**: camelCase (如 `modelValue`、`is-link`)
- **Events**: camelCase (如 `update:modelValue`、`onClick`)
- **CSS 类名**: BEM 规范 (如 `bw-button__loading-icon`)

### 4.2 Props 设计规范
```typescript
interface Props {
  // v-model 绑定
  modelValue?: any;
  'update:modelValue'?: (value: any) => void;

  // 尺寸
  size?: 'small' | 'medium' | 'large';

  // 类型
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'default';

  // 状态
  disabled?: boolean;
  loading?: boolean;

  // 布尔值简写
  loading?: boolean;  // 不使用 isLoading
  disabled?: boolean; // 不使用 isDisabled
}
```

### 4.3 Events 设计规范
```typescript
// 双向绑定
'update:modelValue': (value: any) => void;

// 点击事件
click: (event: Event) => void;

// 聚焦失焦
focus: (event: FocusEvent) => void;
blur: (event: FocusEvent) => void;

// 变更事件
change: (value: any) => void;
```

### 4.4 Slot 设计规范
```typescript
// 默认插槽
default: () => VNode[];

// 具名插槽
icon: () => VNode[];
label: () => VNode[];
extra: () => VNode[];
```

---

## 5. 样式规范

### 5.1 CSS 变量
```scss
// 基础变量
$bw-primary-color: #1989fa;
$bw-success-color: #07c160;
$bw-warning-color: #ff976a;
$bw-danger-color: #ee0a24;
$bw-text-color: #323233;
$bw-text-color-2: #969799;
$bw-text-color-3: #c8c9cc;
$bw-white: #ffffff;
$bw-border-color: #ebedf0;
$bw-active-color: #f2f3f5;

// 字体大小
$bw-font-size-xs: 10px;
$bw-font-size-sm: 12px;
$bw-font-size-md: 14px;
$bw-font-size-lg: 16px;

// 圆角
$bw-border-radius-sm: 2px;
$bw-border-radius-md: 4px;
$bw-border-radius-lg: 8px;
$bw-border-radius-round: 999px;

// 间距
$bw-padding-xs: 8px;
$bw-padding-sm: 12px;
$bw-padding-md: 16px;
$bw-padding-lg: 24px;

// 动画
$bw-animation-duration-base: 0.3s;
$bw-animation-timing-function-base: ease-out;
```

### 5.2 样式穿透
```vue
<!-- 使用 CSS 变量 -->
<style scoped>
.bw-button {
  color: var(--bw-primary-color);
}
</style>

<!-- 深度选择器 -->
<style scoped>
:deep(.bw-button) {
  color: red;
}
</style>
```

---

## 6. 测试规范

### 6.1 单元测试要求
- **覆盖率**: 每个组件至少 90% 代码覆盖率
- **测试用例数**: 每个组件至少 20 个测试用例
- **测试内容**:
  - Props 验证
  - Events 触发
  - Slots 渲染
  - 状态变化
  - 边界条件
  - 错误处理

### 6.2 UI 对比测试要求
- 使用 Playwright 截取组件示例图
- 与 Vant4 官方示例进行像素级对比
- 差异容忍度: 0% (必须完全一致)
- 测试分辨率: 375px (iPhone 6/7/8)

### 6.3 测试文件结构
```
tests/
├── unit/                    # 单元测试
│   └── components/
│       ├── button.test.ts
│       ├── cell.test.ts
│       └── ...
├── e2e/                     # E2E 测试
│   └── demo.spec.ts
└── ui/                      # UI 对比测试
    ├── button/
    │   ├── primary.png
    │   └── secondary.png
    └── compare.js
```

---

## 7. 组件开发流程

### 7.1 步骤
1. **需求分析**: 阅读 Vant4 官方文档，理解组件功能
2. **API 设计**: 对齐 Vant4 Props/Events/Slots
3. **编码实现**: 按照样式规范编写组件
4. **单元测试**: 编写测试用例并运行
5. **示例页面**: 创建组件示例页面
6. **UI 对比**: 截图对比并调整样式
7. **多端验证**: 在 H5/微信/支付宝小程序中测试

### 7.2 验收标准
- ✅ 单元测试 100% 通过
- ✅ UI 对比测试 0% 差异
- ✅ 三端运行正常
- ✅ ESLint 检查通过
- ✅ TypeScript 类型检查通过

---

## 8. 文件结构

```
bwui/
├── src/
│   ├── components/          # 组件源码
│   │   ├── button/
│   │   │   ├── index.vue
│   │   │   └── index.scss
│   │   ├── cell/
│   │   └── ...
│   ├── pages/               # 示例页面
│   │   ├── basic/           # 基础组件
│   │   ├── form/            # 表单组件
│   │   ├── feedback/        # 反馈组件
│   │   └── ...
│   ├── styles/              # 样式文件
│   │   ├── variables.scss   # 变量定义
│   │   ├── mixins.scss      # 混入
│   │   └── common.scss       # 公共样式
│   ├── utils/               # 工具函数
│   ├── hooks/               # 组合式函数
│   ├── index.ts             # 入口文件
│   └── App.vue              # 应用实例
├── tests/
│   ├── unit/                # 单元测试
│   ├── e2e/                 # E2E 测试
│   └── ui/                  # UI 对比测试
├── package.json
├── vite.config.ts
├── tsconfig.json
└── SPEC.md
```

---

## 9. 优先级说明

### P0 - 核心组件 (必须完成)
- Button, Cell, Dialog, Popup, Toast, Loading, Tabs, Field, Switch, Checkbox, Radio, Input

### P1 - 重要组件 (应完成)
- Tag, Badge, Empty, Notify, ActionSheet, Grid, Image, Search, Calendar, DatePicker, Area, Picker, Card, Avatar, Progress, Skeleton, Navbar, Tabbar, Sidebar, Pagination

### P2 - 增强组件 (可选完成)
- Timeline, Article, Divider, Circle, Swipe, NoticeBar, Sticky, BackTop, Collapse

---

## 10. 质量保证

### 10.1 代码质量
- ESLint: 0 errors, 0 warnings
- TypeScript: strict mode
- 代码覆盖率: ≥ 90%

### 10.2 性能要求
- 首屏加载: < 500ms (gzip)
- 组件按需加载
- Tree-shaking 支持

### 10.3 兼容性
- iOS 10+
- Android 5.0+
- 微信小程序 v2.0+
- 支付宝小程序 v10.0+

---

## 11. 文档要求

### 11.1 组件文档
- 组件名称和描述
- API 说明 (Props/Events/Slots)
- 代码示例
- 注意事项

### 11.2 示例页面
- 每个组件至少 3 个示例
- 展示所有 Props 效果
- 提供完整代码

---

## 12. 版本规划

### v1.0.0 (MVP)
- 完成 P0 + P1 所有组件
- 单元测试覆盖率 ≥ 90%
- UI 对比测试通过
- 支持 H5/微信小程序/支付宝小程序

### v1.1.0
- 完成 P2 所有组件
- 优化组件性能
- 补充文档

---

## 13. 注意事项

1. **uniapp 限制**:
   - 不使用 `<teleport>` (H5 不支持)
   - 注意 `uni-app` 的编译优化
   - 使用 `uni.getSystemInfoSync()` 获取设备信息

2. **多端适配**:
   - 所有组件使用 Flexbox 布局
   - 使用 rpx 作为长度单位
   - 注意不同端的 API 差异

3. **样式一致性**:
   - 严格按照 Vant4 样式实现
   - 使用 CSS 变量保证主题一致性
   - 避免使用平台特定的 CSS 属性

4. **TypeScript 类型**:
   - 所有 Props 必须有类型定义
   - 所有 Events 必须有类型定义
   - 导出完整的类型声明

---

*本文档最后更新: 2024-07-19*
