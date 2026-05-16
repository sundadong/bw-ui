<template>
  <demo-layout title="Overlay 遮罩层">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <bw-button type="primary" @click="showOverlay">显示遮罩</bw-button>
    </div>

    <bw-overlay :show="overlayVisible" @click="overlayVisible = false" />
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwButton from '../components/button/index.vue'
import BwOverlay from '../components/overlay/index.vue'

const overlayVisible = ref(false)

const showOverlay = () => {
  overlayVisible.value = true
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
}
</style>
