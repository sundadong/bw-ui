# BWUI 组件库

基于 Vue 3 + uni-app 的跨端 UI 组件库，完全对齐 Vant 4 组件库的设计规范和 API。

## 技术栈

- **Vue 3.4+** - 组合式 API
- **Vite 5.2+** - 构建工具
- **uni-app 3.0+** - 跨端框架
- **TypeScript 5.4+** - 类型系统
- **Vitest 1.3+** - 单元测试
- **Playwright 1.42+** - UI 对比测试

## 支持的平台

- H5 (网页)
- 微信小程序
- 支付宝小程序

## 已完成的组件（P0 优先级）

- Button 按钮
- Cell 单元格
- CellGroup 单元格组
- Switch 开关
- Checkbox 复选框
- Radio 单选框
- Field 输入框
- Dialog 对话框
- Popup 弹出层
- Toast 轻提示
- Loading 加载
- Overlay 遮罩层
- Tabs 标签页
- Navbar 导航栏
- Empty 空状态
- Progress 进度条
- Icon 图标
- Tag 标签
- Badge 徽标

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
# H5 开发
npm run dev

# 微信小程序开发
npm run dev:mp-weixin

# 支付宝小程序开发
npm run dev:mp-alipay
```

### 构建

```bash
# H5 构建
npm run build

# 微信小程序构建
npm run build:mp-weixin

# 支付宝小程序构建
npm run build:mp-alipay
```

### 测试

```bash
# 运行单元测试
npm run test

# 运行测试并监听变化
npm run test:watch

# 运行测试并查看覆盖率
npm run test:coverage

# 类型检查
npm run type-check

# 代码格式化
npm run format
npm run lint
```

### UI 对比测试

```bash
npx playwright test
```

## 项目结构

```
bwui/
├── src/
│   ├── components/      # 组件源码
│   ├── styles/          # 样式文件
│   │   ├── variables.scss
│   │   ├── mixins.scss
│   │   └── common.scss
│   ├── utils/           # 工具函数
│   ├── hooks/           # 组合式函数
│   ├── pages/           # 示例页面
│   ├── App.vue          # 应用入口
│   ├── main.ts          # 主入口文件
│   └── index.ts         # 组件导出
├── tests/
│   ├── unit/            # 单元测试
│   ├── e2e/             # E2E 测试
│   └── ui/              # UI 对比测试
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
└── SPEC.md
```

## 开发规范

### 组件规范

1. 组件命名使用 kebab-case（如 `button`）
2. 组件内部使用 PascalCase（如 `BwButton`）
3. CSS 类名使用 BEM 规范
4. 所有组件必须包含完整的 TypeScript 类型定义

### Props 设计原则

- 使用 modelValue 作为双向绑定的值
- Props 命名使用 camelCase
- 提供合理的默认值

### 测试要求

- 每个组件单元测试覆盖率 ≥90%
- 每个组件至少 20 个测试用例
- UI 对比测试像素级通过

## 许可证

MIT
