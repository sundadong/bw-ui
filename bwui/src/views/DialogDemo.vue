<template>
  <demo-layout title="Dialog 对话框">
    <div class="demo-block">
      <div class="demo-title">消息提示</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showAlert">消息提示</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">消息确认</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showConfirm">消息确认</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">异步关闭</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showAsyncDialog">异步关闭</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">组件调用</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showCustomDialog">组件调用</bw-button>
      </div>
    </div>

    <bw-dialog
      :show="alertVisible"
      title="提示"
      message="这是一条消息提示，只包含确认按钮"
      :show-cancel-button="false"
      confirm-button-text="我知道了"
      @confirm="alertVisible = false"
    />

    <bw-dialog
      :show="confirmVisible"
      title="确认"
      message="确定要执行此操作吗？"
      confirm-button-text="确定"
      cancel-button-text="取消"
      @confirm="handleConfirm"
      @cancel="confirmVisible = false"
    />

    <bw-dialog
      :show="asyncVisible"
      title="异步关闭"
      message="点击确认后需要等待 2 秒才能关闭"
      confirm-button-text="确认"
      cancel-button-text="取消"
      :before-close="handleBeforeClose"
      @confirm="asyncVisible = false"
      @cancel="asyncVisible = false"
    />

    <bw-dialog
      :show="customVisible"
      title="组件调用"
      @confirm="customVisible = false"
      @cancel="customVisible = false"
    >
      <div class="custom-dialog-body">
        <p>支持在默认插槽中传入任意内容</p>
        <p>例如按钮、图片等</p>
      </div>
    </bw-dialog>

    <bw-toast
      :show="loadingVisible"
      type="loading"
      message="处理中..."
    />
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwButton from '../components/button/index.vue'
import BwDialog from '../components/dialog/index.vue'
import BwToast from '../components/toast/index.vue'

const alertVisible = ref(false)
const confirmVisible = ref(false)
const asyncVisible = ref(false)
const customVisible = ref(false)
const loadingVisible = ref(false)

const showAlert = () => {
  alertVisible.value = true
}

const showConfirm = () => {
  confirmVisible.value = true
}

const handleConfirm = () => {
  confirmVisible.value = false
}

const showAsyncDialog = () => {
  asyncVisible.value = true
}

const handleBeforeClose = (action: 'confirm' | 'cancel'): Promise<boolean> => {
  if (action === 'confirm') {
    loadingVisible.value = true
    return new Promise((resolve) => {
      setTimeout(() => {
        loadingVisible.value = false
        resolve(true)
      }, 2000)
    })
  }
  return Promise.resolve(true)
}

const showCustomDialog = () => {
  customVisible.value = true
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

.custom-dialog-body {
  text-align: center;
  padding: 8px 0;

  p {
    margin: 4px 0;
    font-size: 14px;
    color: #666;
  }
}
</style>