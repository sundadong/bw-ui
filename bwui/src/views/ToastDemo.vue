<template>
  <demo-layout title="Toast 轻提示">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showToast('text')">文字提示</bw-button>
        <bw-button type="primary" @click="showToast('success')">成功提示</bw-button>
        <bw-button type="primary" @click="showToast('fail')">失败提示</bw-button>
        <bw-button type="primary" @click="showToast('loading')">加载提示</bw-button>
      </div>
    </div>

    <bw-toast
      :show="toastVisible"
      :type="toastType"
      :message="toastMessage"
      @update:show="toastVisible = $event"
    />
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwButton from '../components/button/index.vue'
import BwToast from '../components/toast/index.vue'

const toastVisible = ref(false)
const toastType = ref<'text' | 'loading' | 'success' | 'fail' | 'warning'>('text')
const toastMessage = ref('')

const showToast = (type: string) => {
  toastType.value = type as any
  toastMessage.value = type === 'text' ? '提示文字' : type === 'success' ? '成功' : type === 'fail' ? '失败' : type === 'loading' ? '加载中...' : '提示'
  toastVisible.value = true
  
  if (type !== 'loading') {
    setTimeout(() => {
      toastVisible.value = false
    }, 2000)
  }
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
