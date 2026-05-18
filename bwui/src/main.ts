import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/common.scss'
import '@vant/icons/src/index.less'

const app = createApp(App)
app.use(router)
app.mount('#app')
