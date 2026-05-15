// BWUI 组件库统一导出

// 基础组件
export { default as BwButton } from './components/button/index.vue'
export { default as BwCell } from './components/cell/index.vue'
export { default as BwCellGroup } from './components/cell-group/index.vue'
export { default as BwIcon } from './components/icon/index.vue'
export { default as BwEmpty } from './components/empty/index.vue'
export { default as BwProgress } from './components/progress/index.vue'
export { default as BwTag } from './components/tag/index.vue'
export { default as BwBadge } from './components/badge/index.vue'

// 表单组件
export { default as BwField } from './components/field/index.vue'
export { default as BwSwitch } from './components/switch/index.vue'
export { default as BwCheckbox } from './components/checkbox/index.vue'
export { default as BwRadio } from './components/radio/index.vue'

// 反馈组件
export { default as BwLoading } from './components/loading/index.vue'
export { default as BwDialog } from './components/dialog/index.vue'
export { default as BwPopup } from './components/popup/index.vue'
export { default as BwToast } from './components/toast/index.vue'
export { default as BwOverlay } from './components/overlay/index.vue'

// 导航组件
export { default as BwTabs } from './components/tabs/index.vue'
export { default as BwNavbar } from './components/navbar/index.vue'

// 样式导出
import './styles/variables.scss'
import './styles/mixins.scss'
import './styles/common.scss'

// 类型导出
export type { ButtonProps } from './components/button/index.vue'
export type { CellProps } from './components/cell/index.vue'
