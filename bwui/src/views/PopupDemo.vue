<template>
  <demo-layout title="Popup 弹出层">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showPopup('center')">居中弹出</bw-button>
        <bw-button type="primary" @click="showPopup('bottom')">底部弹出</bw-button>
        <bw-button type="primary" @click="showPopup('top')">顶部弹出</bw-button>
      </div>
    </div>

    <bw-popup :show="popupVisible" :position="popupPosition" @update:show="popupVisible = $event">
      <div class="popup-content">
        <p>{{ getPopupText() }}</p>
        <bw-button type="primary" @click="popupVisible = false">关闭</bw-button>
      </div>
    </bw-popup>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwButton from '../components/button/index.vue'
import BwPopup from '../components/popup/index.vue'

const popupVisible = ref(false)
const popupPosition = ref<'center' | 'top' | 'bottom'>('center')

const showPopup = (position: 'center' | 'top' | 'bottom') => {
  popupPosition.value = position
  popupVisible.value = true
}

const getPopupText = () => {
  const texts = {
    center: '居中弹出内容',
    bottom: '底部弹出内容',
    top: '顶部弹出内容'
  }
  return texts[popupPosition.value]
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

.popup-content {
  padding: 32px;
  text-align: center;

  p {
    margin-bottom: 20px;
    font-size: 16px;
    color: #323233;
  }
}
</style>
