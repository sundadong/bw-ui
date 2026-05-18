<template>
  <demo-layout title="Overlay 遮罩层">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-button type="primary" @click="overlayVisible = true">显示遮罩</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">嵌入内容</div>
      <div class="demo-row">
        <bw-button type="primary" @click="contentOverlayVisible = true">嵌入内容</bw-button>
      </div>
    </div>

    <bw-overlay :show="overlayVisible" @click="overlayVisible = false" />

    <bw-overlay :show="contentOverlayVisible" @click="contentOverlayVisible = false">
      <div class="overlay-content" @click.stop>
        <p>遮罩层中嵌入内容</p>
        <bw-button type="primary" @click="contentOverlayVisible = false">关闭</bw-button>
      </div>
    </bw-overlay>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwButton from '../components/button/index.vue'
import BwOverlay from '../components/overlay/index.vue'

const overlayVisible = ref(false)
const contentOverlayVisible = ref(false)
</script>

<style lang="less" scoped>
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

.overlay-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  z-index: 2001;

  p {
    margin-bottom: 20px;
    font-size: 16px;
    color: #323233;
  }
}
</style>