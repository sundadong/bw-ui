<template>
  <demo-layout title="Notify 消息通知">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showPrimaryNotify">主要通知</bw-button>
        <bw-button type="success" @click="showSuccessNotify">成功通知</bw-button>
        <bw-button type="warning" @click="showWarningNotify">警告通知</bw-button>
        <bw-button type="danger" @click="showDangerNotify">危险通知</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">通知位置</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showTopNotify">顶部通知</bw-button>
        <bw-button type="primary" @click="showBottomNotify">底部通知</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义样式</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showCustomBgNotify">自定义背景色</bw-button>
        <bw-button type="primary" @click="showCustomColorNotify">自定义文字色</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义时长</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showShortNotify">1秒消失</bw-button>
        <bw-button type="primary" @click="showLongNotify">5秒消失</bw-button>
        <bw-button type="primary" @click="showPermanentNotify">不自动消失</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">函数调用</div>
      <div class="demo-row">
        <bw-button type="primary" @click="handleCreateNotify">createNotify 调用</bw-button>
      </div>
    </div>

    <bw-notify
      v-model="notifyVisible"
      :type="notifyType"
      :message="notifyMessage"
      :position="notifyPosition"
      :duration="notifyDuration"
      :background="notifyBackground"
      :color="notifyColor"
    />
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwButton from '../components/button/index.vue'
import BwNotify from '../components/notify/index.vue'
import { createNotify } from '../components/notify/index.ts'

const notifyVisible = ref(false)
const notifyType = ref<'primary' | 'success' | 'warning' | 'danger'>('danger')
const notifyMessage = ref('')
const notifyPosition = ref<'top' | 'bottom'>('top')
const notifyDuration = ref(3000)
const notifyBackground = ref('')
const notifyColor = ref('')

const resetNotify = () => {
  notifyBackground.value = ''
  notifyColor.value = ''
  notifyDuration.value = 3000
  notifyPosition.value = 'top'
}

const showPrimaryNotify = () => {
  resetNotify()
  notifyType.value = 'primary'
  notifyMessage.value = '这是一条主要通知'
  notifyVisible.value = true
}

const showSuccessNotify = () => {
  resetNotify()
  notifyType.value = 'success'
  notifyMessage.value = '操作成功！'
  notifyVisible.value = true
}

const showWarningNotify = () => {
  resetNotify()
  notifyType.value = 'warning'
  notifyMessage.value = '请注意：这是一条警告通知'
  notifyVisible.value = true
}

const showDangerNotify = () => {
  resetNotify()
  notifyType.value = 'danger'
  notifyMessage.value = '操作失败，请重试'
  notifyVisible.value = true
}

const showTopNotify = () => {
  resetNotify()
  notifyType.value = 'primary'
  notifyMessage.value = '顶部通知'
  notifyPosition.value = 'top'
  notifyVisible.value = true
}

const showBottomNotify = () => {
  resetNotify()
  notifyType.value = 'primary'
  notifyMessage.value = '底部通知'
  notifyPosition.value = 'bottom'
  notifyVisible.value = true
}

const showCustomBgNotify = () => {
  resetNotify()
  notifyType.value = 'primary'
  notifyMessage.value = '自定义背景色'
  notifyBackground.value = '#7232dd'
  notifyVisible.value = true
}

const showCustomColorNotify = () => {
  resetNotify()
  notifyType.value = 'primary'
  notifyMessage.value = '自定义文字颜色'
  notifyColor.value = '#fff9c4'
  notifyVisible.value = true
}

const showShortNotify = () => {
  resetNotify()
  notifyType.value = 'success'
  notifyMessage.value = '1秒后消失'
  notifyDuration.value = 1000
  notifyVisible.value = true
}

const showLongNotify = () => {
  resetNotify()
  notifyType.value = 'warning'
  notifyMessage.value = '5秒后消失'
  notifyDuration.value = 5000
  notifyVisible.value = true
}

const showPermanentNotify = () => {
  resetNotify()
  notifyType.value = 'danger'
  notifyMessage.value = '不会自动消失（需手动关闭）'
  notifyDuration.value = 0
  notifyVisible.value = true
}

const handleCreateNotify = () => {
  createNotify({
    message: '通过 createNotify 创建的通知',
    type: 'success',
    duration: 2000
  })
}
</script>

<style lang="scss" scoped>
.demo-block {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;

  .demo-title {
    font-size: 14px;
    color: #969799;
    margin-bottom: 16px;
  }

  .demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>