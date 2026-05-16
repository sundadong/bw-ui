<template>
  <demo-layout title="Popup 弹出层">
    <div class="demo-block">
      <div class="demo-title">弹出位置</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showPositionPopup('top')">顶部弹出</bw-button>
        <bw-button type="primary" @click="showPositionPopup('bottom')">底部弹出</bw-button>
        <bw-button type="primary" @click="showPositionPopup('left')">左侧弹出</bw-button>
        <bw-button type="primary" @click="showPositionPopup('right')">右侧弹出</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">关闭图标</div>
      <div class="demo-row">
        <bw-button type="primary" @click="closeableVisible = true">关闭图标</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">圆角弹窗</div>
      <div class="demo-row">
        <bw-button type="primary" @click="roundVisible = true">圆角弹窗</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">监听事件</div>
      <div class="demo-row">
        <bw-button type="primary" @click="eventVisible = true">监听事件</bw-button>
      </div>
      <div v-if="eventLogs.length" class="demo-event-log">
        <p v-for="(log, i) in eventLogs" :key="i">{{ log }}</p>
      </div>
    </div>

    <bw-popup
      :show="positionVisible"
      :position="currentPosition"
      @update:show="positionVisible = $event"
    >
      <div class="popup-content" :class="{ 'popup-content--side': currentPosition === 'left' || currentPosition === 'right' }">
        <p>{{ positionText }}</p>
        <bw-button type="primary" @click="positionVisible = false">关闭</bw-button>
      </div>
    </bw-popup>

    <bw-popup
      :show="closeableVisible"
      position="bottom"
      :closeable="true"
      title="标题"
      @update:show="closeableVisible = $event"
    >
      <div class="popup-content">
        <p>内容</p>
      </div>
    </bw-popup>

    <bw-popup
      :show="roundVisible"
      position="bottom"
      :round="true"
      @update:show="roundVisible = $event"
    >
      <div class="popup-content">
        <p>圆角弹窗内容</p>
        <bw-button type="primary" @click="roundVisible = false">关闭</bw-button>
      </div>
    </bw-popup>

    <bw-popup
      :show="eventVisible"
      position="bottom"
      :closeable="true"
      title="监听事件"
      @update:show="eventVisible = $event"
      @close="handlePopupClose"
    >
      <div class="popup-content">
        <p>点击遮罩或关闭图标查看事件</p>
      </div>
    </bw-popup>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwButton from '../components/button/index.vue'
import BwPopup from '../components/popup/index.vue'

const positionVisible = ref(false)
const currentPosition = ref<'top' | 'bottom' | 'left' | 'right'>('bottom')
const positionText = ref('')

const closeableVisible = ref(false)

const roundVisible = ref(false)

const eventVisible = ref(false)
const eventLogs = ref<string[]>([])

const showPositionPopup = (position: 'top' | 'bottom' | 'left' | 'right') => {
  currentPosition.value = position
  const texts: Record<string, string> = {
    top: '顶部弹出内容',
    bottom: '底部弹出内容',
    left: '左侧弹出内容',
    right: '右侧弹出内容'
  }
  positionText.value = texts[position]
  positionVisible.value = true
}

const handlePopupClose = () => {
  eventLogs.value.push(`close 事件触发 - ${new Date().toLocaleTimeString()}`)
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

.demo-event-log {
  margin-top: 12px;
  padding: 8px;
  background-color: #f7f8fa;
  border-radius: 4px;
  font-size: 12px;
  color: #666;

  p {
    margin: 4px 0;
  }
}

.popup-content {
  padding: 32px;
  text-align: center;

  p {
    margin-bottom: 20px;
    font-size: 16px;
    color: #323233;
  }

  &--side {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60vw;
  }
}
</style>