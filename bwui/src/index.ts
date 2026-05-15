import type { App } from 'vue'
import Button from './components/button/index.vue'
import Cell from './components/cell/index.vue'
import CellGroup from './components/cell-group/index.vue'
import Icon from './components/icon/index.vue'
import Loading from './components/loading/index.vue'
import Overlay from './components/overlay/index.vue'
import Popup from './components/popup/index.vue'
import Dialog from './components/dialog/index.vue'
import Toast from './components/toast/index.vue'
import Switch from './components/switch/index.vue'
import Checkbox from './components/checkbox/index.vue'
import Radio from './components/radio/index.vue'
import Field from './components/field/index.vue'

export {
  Button,
  Cell,
  CellGroup,
  Icon,
  Loading,
  Overlay,
  Popup,
  Dialog,
  Toast,
  Switch,
  Checkbox,
  Radio,
  Field
}

export interface ComponentRegister {
  (app: App): void
}

const install: ComponentRegister = (app) => {
  app.component('BwButton', Button)
  app.component('BwCell', Cell)
  app.component('BwCellGroup', CellGroup)
  app.component('BwIcon', Icon)
  app.component('BwLoading', Loading)
  app.component('BwOverlay', Overlay)
  app.component('BwPopup', Popup)
  app.component('BwDialog', Dialog)
  app.component('BwToast', Toast)
  app.component('BwSwitch', Switch)
  app.component('BwCheckbox', Checkbox)
  app.component('BwRadio', Radio)
  app.component('BwField', Field)
}

export default {
  install
}
