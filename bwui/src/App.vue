<template>
  <div id="app">
    <div class="demo-page">
      <header class="demo-header">
        <h1 class="title">BWUI 组件库</h1>
        <p class="subtitle">基于 Vue3 + uni-app，对齐 Vant4 组件库</p>
      </header>

      <main class="demo-main">
        <section class="demo-section">
          <h2 class="section-title">基础组件</h2>
          
          <div class="component-card">
            <h3 class="card-title">Button 按钮</h3>
            <div class="demo-row">
              <bw-button type="primary">主要按钮</bw-button>
              <bw-button type="success">成功按钮</bw-button>
              <bw-button type="warning">警告按钮</bw-button>
              <bw-button type="danger">危险按钮</bw-button>
              <bw-button type="default">默认按钮</bw-button>
            </div>
            <div class="demo-row">
              <bw-button size="small">小按钮</bw-button>
              <bw-button size="medium">中按钮</bw-button>
              <bw-button size="large">大按钮</bw-button>
            </div>
            <div class="demo-row">
              <bw-button plain>朴素按钮</bw-button>
              <bw-button round>圆角按钮</bw-button>
              <bw-button disabled>禁用按钮</bw-button>
              <bw-button loading>加载中</bw-button>
            </div>
          </div>

          <div class="component-card">
            <h3 class="card-title">Cell 单元格</h3>
            <bw-cell-group>
              <bw-cell title="单元格" value="内容" />
              <bw-cell title="单元格" label="描述信息" value="内容" />
              <bw-cell title="单元格" is-link value="内容" />
              <bw-cell title="单元格" icon="success" value="内容" />
            </bw-cell-group>
          </div>

          <div class="component-card">
            <h3 class="card-title">Tag 标签</h3>
            <div class="demo-row">
              <bw-tag type="primary">标签</bw-tag>
              <bw-tag type="success">成功</bw-tag>
              <bw-tag type="warning">警告</bw-tag>
              <bw-tag type="danger">危险</bw-tag>
              <bw-tag type="default">默认</bw-tag>
            </div>
            <div class="demo-row">
              <bw-tag plain>朴素</bw-tag>
              <bw-tag round>圆角</bw-tag>
              <bw-tag mark>标记</bw-tag>
              <bw-tag closable @close="handleTagClose">可关闭</bw-tag>
            </div>
          </div>

          <div class="component-card">
            <h3 class="card-title">Badge 微章</h3>
            <div class="demo-row">
              <bw-badge content="5">
                <div class="badge-target">消息</div>
              </bw-badge>
              <bw-badge dot>
                <div class="badge-target">通知</div>
              </bw-badge>
              <bw-badge content="99+">
                <div class="badge-target">99+</div>
              </bw-badge>
            </div>
          </div>

          <div class="component-card">
            <h3 class="card-title">Icon 图标</h3>
            <div class="demo-row demo-icons">
              <bw-icon name="success" size="24px" />
              <bw-icon name="fail" size="24px" />
              <bw-icon name="warning" size="24px" />
              <bw-icon name="info" size="24px" />
              <bw-icon name="arrow" size="24px" />
              <bw-icon name="search" size="24px" />
            </div>
          </div>

          <div class="component-card">
            <h3 class="card-title">Empty 空状态</h3>
            <bw-empty description="暂无数据" />
          </div>

          <div class="component-card">
            <h3 class="card-title">Progress 进度条</h3>
            <bw-progress :percentage="50" />
            <bw-progress :percentage="75" color="#07c160" />
            <bw-progress :percentage="100" color="#07c160" />
          </div>
        </section>

        <section class="demo-section">
          <h2 class="section-title">表单组件</h2>

          <div class="component-card">
            <h3 class="card-title">Switch 开关</h3>
            <bw-cell-group>
              <bw-cell title="开关">
                <template #right-icon>
                  <bw-switch v-model="switchValue" />
                </template>
              </bw-cell>
              <bw-cell title="禁用状态">
                <template #right-icon>
                  <bw-switch v-model="switchValue" disabled />
                </template>
              </bw-cell>
            </bw-cell-group>
          </div>

          <div class="component-card">
            <h3 class="card-title">Checkbox 复选框</h3>
            <bw-cell-group>
              <div class="demo-checkboxes">
                <bw-checkbox v-model="checkboxValue1" shape="square">复选框 1</bw-checkbox>
                <bw-checkbox v-model="checkboxValue2">复选框 2</bw-checkbox>
                <bw-checkbox model-value="true" disabled>禁用复选框</bw-checkbox>
              </div>
            </bw-cell-group>
          </div>

          <div class="component-card">
            <h3 class="card-title">Radio 单选框</h3>
            <bw-cell-group>
              <div class="demo-radios">
                <bw-radio v-model="radioValue" name="1">选项 1</bw-radio>
                <bw-radio v-model="radioValue" name="2">选项 2</bw-radio>
                <bw-radio model-value="3" name="3" disabled>禁用选项</bw-radio>
              </div>
            </bw-cell-group>
          </div>

          <div class="component-card">
            <h3 class="card-title">Field 输入框</h3>
            <bw-cell-group>
              <bw-field
                v-model="fieldValue1"
                label="文本"
                placeholder="请输入文本"
              />
              <bw-field
                v-model="fieldValue2"
                label="手机号"
                type="tel"
                placeholder="请输入手机号"
              />
              <bw-field
                v-model="fieldValue3"
                label="密码"
                type="password"
                placeholder="请输入密码"
              />
            </bw-cell-group>
          </div>
        </section>

        <section class="demo-section">
          <h2 class="section-title">反馈组件</h2>

          <div class="component-card">
            <h3 class="card-title">Popup 弹出层</h3>
            <div class="demo-row">
              <bw-button @click="showPopup('center')">居中弹出</bw-button>
              <bw-button @click="showPopup('bottom')">底部弹出</bw-button>
              <bw-button @click="showPopup('top')">顶部弹出</bw-button>
            </div>
          </div>

          <div class="component-card">
            <h3 class="card-title">Dialog 对话框</h3>
            <div class="demo-row">
              <bw-button @click="showConfirmDialog">确认对话框</bw-button>
              <bw-button @click="showAlertDialog">提示对话框</bw-button>
              <bw-button @click="showCustomDialog">自定义对话框</bw-button>
            </div>
          </div>

          <div class="component-card">
            <h3 class="card-title">Toast 轻提示</h3>
            <div class="demo-row">
              <bw-button @click="showToast('text')">文字提示</bw-button>
              <bw-button @click="showToast('success')">成功提示</bw-button>
              <bw-button @click="showToast('fail')">失败提示</bw-button>
              <bw-button @click="showToast('loading')">加载提示</bw-button>
            </div>
          </div>

          <div class="component-card">
            <h3 class="card-title">Overlay 遮罩层</h3>
            <bw-button @click="showOverlay">显示遮罩</bw-button>
            <bw-overlay :show="overlayVisible" @click="overlayVisible = false" />
          </div>
        </section>

        <section class="demo-section">
          <h2 class="section-title">导航组件</h2>

          <div class="component-card">
            <h3 class="card-title">Tabs 标签页</h3>
            <bw-tabs v-model="currentTab">
              <template #tab0>
                <div class="tab-content">标签 1 内容</div>
              </template>
              <template #tab1>
                <div class="tab-content">标签 2 内容</div>
              </template>
              <template #tab2>
                <div class="tab-content">标签 3 内容</div>
              </template>
            </bw-tabs>
          </div>

          <div class="component-card">
            <h3 class="card-title">Navbar 导航栏</h3>
            <bw-navbar title="导航栏" :left-arrow="true" @click-left="handleBack" />
            <bw-navbar title="带副标题" subtitle="这是副标题" :left-arrow="true" @click-left="handleBack" />
          </div>
        </section>
      </main>

      <footer class="demo-footer">
        <p>BWUI v1.0.0</p>
        <p>支持 H5、微信小程序、支付宝小程序</p>
      </footer>
    </div>

    <bw-popup :show="popupVisible" :position="popupPosition" @update:show="popupVisible = $event">
      <div class="popup-content">
        <p>{{ popupPosition === 'center' ? '居中弹出内容' : '底部弹出内容' }}</p>
        <bw-button @click="popupVisible = false">关闭</bw-button>
      </div>
    </bw-popup>

    <bw-dialog
      :show="dialogVisible"
      :title="dialogTitle"
      :message="dialogMessage"
      :show-confirm-button="showConfirmButton"
      :show-cancel-button="showCancelButton"
      @confirm="dialogVisible = false"
      @cancel="dialogVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BwButton from './components/button/index.vue'
import BwCell from './components/cell/index.vue'
import BwCellGroup from './components/cell-group/index.vue'
import BwIcon from './components/icon/index.vue'
import BwEmpty from './components/empty/index.vue'
import BwProgress from './components/progress/index.vue'
import BwTag from './components/tag/index.vue'
import BwBadge from './components/badge/index.vue'
import BwSwitch from './components/switch/index.vue'
import BwCheckbox from './components/checkbox/index.vue'
import BwRadio from './components/radio/index.vue'
import BwField from './components/field/index.vue'
import BwPopup from './components/popup/index.vue'
import BwDialog from './components/dialog/index.vue'
import BwOverlay from './components/overlay/index.vue'
import BwTabs from './components/tabs/index.vue'
import BwNavbar from './components/navbar/index.vue'

const currentTab = ref(0)
const switchValue = ref(false)
const checkboxValue1 = ref(false)
const checkboxValue2 = ref(false)
const radioValue = ref('1')
const fieldValue1 = ref('')
const fieldValue2 = ref('')
const fieldValue3 = ref('')
const overlayVisible = ref(false)
const popupVisible = ref(false)
const popupPosition = ref<'center' | 'top' | 'bottom'>('center')
const dialogVisible = ref(false)
const dialogTitle = ref('')
const dialogMessage = ref('')
const showConfirmButton = ref(true)
const showCancelButton = ref(true)

const handleBack = () => {
  alert('返回上一页')
}

const handleTagClose = () => {
  alert('标签关闭')
}

const showPopup = (position: 'center' | 'top' | 'bottom') => {
  popupPosition.value = position
  popupVisible.value = true
}

const showConfirmDialog = () => {
  dialogTitle.value = '确认'
  dialogMessage.value = '确定要执行此操作吗？'
  showConfirmButton.value = true
  showCancelButton.value = true
  dialogVisible.value = true
}

const showAlertDialog = () => {
  dialogTitle.value = ''
  dialogMessage.value = '这是一个提示对话框'
  showConfirmButton.value = true
  showCancelButton.value = false
  dialogVisible.value = true
}

const showCustomDialog = () => {
  dialogTitle.value = '自定义'
  dialogMessage.value = '支持自定义标题和内容'
  showConfirmButton.value = true
  showCancelButton.value = true
  dialogVisible.value = true
}

const showToast = (type: string) => {
  alert(`Toast: ${type}`)
}

const showOverlay = () => {
  overlayVisible.value = true
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f7f8fa;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.demo-page {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.demo-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 48px 20px;
  text-align: center;

  .title {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .subtitle {
    font-size: 14px;
    opacity: 0.9;
  }
}

.demo-main {
  padding: 20px;
  padding-bottom: 80px;
}

.demo-section {
  margin-bottom: 32px;

  .section-title {
    font-size: 20px;
    font-weight: 500;
    color: #323233;
    margin-bottom: 16px;
    padding-left: 8px;
    border-left: 4px solid #1989fa;
  }
}

.component-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .card-title {
    font-size: 16px;
    font-weight: 500;
    color: #323233;
    margin-bottom: 16px;
  }
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }

  > * {
    margin-bottom: 8px;
  }
}

.demo-icons {
  gap: 16px;

  > * {
    margin-bottom: 0;
  }
}

.demo-checkboxes,
.demo-radios {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.badge-target {
  width: 44px;
  height: 44px;
  background: #f7f8fa;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #646566;
}

.tab-content {
  padding: 20px;
  text-align: center;
  color: #646566;
  background-color: #f7f8fa;
  border-radius: 8px;
  margin-top: 12px;
}

.popup-content {
  padding: 32px;
  text-align: center;

  p {
    margin-bottom: 20px;
    font-size: 16px;
    color: #323233;
  }
}

.demo-footer {
  text-align: center;
  padding: 32px 20px;
  background-color: #ffffff;
  border-top: 1px solid #ebedf0;

  p {
    font-size: 12px;
    color: #969799;
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
