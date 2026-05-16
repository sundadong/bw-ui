<template>
  <demo-layout title="Dialog 对话框">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showConfirmDialog">确认对话框</bw-button>
        <bw-button type="primary" @click="showAlertDialog">提示对话框</bw-button>
        <bw-button type="primary" @click="showCustomDialog">自定义对话框</bw-button>
      </div>
    </div>

    <bw-dialog
      :show="dialogVisible"
      :title="dialogTitle"
      :message="dialogMessage"
      :show-confirm-button="showConfirmButton"
      :show-cancel-button="showCancelButton"
      @confirm="dialogVisible = false"
      @cancel="dialogVisible = false"
    />
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwButton from '../components/button/index.vue'
import BwDialog from '../components/dialog/index.vue'

const dialogVisible = ref(false)
const dialogTitle = ref('')
const dialogMessage = ref('')
const showConfirmButton = ref(true)
const showCancelButton = ref(true)

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
