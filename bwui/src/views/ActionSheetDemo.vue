<template>
  <demo-layout title="ActionSheet 动作面板">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showBasic">弹出菜单</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">展示取消按钮</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showCancel">展示取消按钮</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">展示描述信息</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showDescription">展示描述</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">选项状态</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showStatus">选项状态</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义颜色</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showCustomColor">自定义颜色</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">事件监听</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showEvents">事件监听</bw-button>
      </div>
      <div v-if="eventLogs.length" class="demo-event-log">
        <p v-for="(log, i) in eventLogs" :key="i">{{ log }}</p>
      </div>
    </div>

    <bw-action-sheet
      v-model="visible"
      :actions="currentActions"
      :cancel-text="currentCancelText"
      :description="currentDescription"
      @select="handleSelect"
      @cancel="handleCancelEvent"
    />
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwButton from '../components/button/index.vue'
import BwActionSheet from '../components/actionsheet/index.vue'

const visible = ref(false)
const currentActions = ref<any[]>([])
const currentCancelText = ref('')
const currentDescription = ref('')
const eventLogs = ref<string[]>([])

const showBasic = () => {
  currentActions.value = [
    { name: '选项一' },
    { name: '选项二' },
    { name: '选项三' }
  ]
  currentCancelText.value = ''
  currentDescription.value = ''
  visible.value = true
}

const showCancel = () => {
  currentActions.value = [
    { name: '选项一' },
    { name: '选项二' },
    { name: '选项三' }
  ]
  currentCancelText.value = '取消'
  currentDescription.value = ''
  visible.value = true
}

const showDescription = () => {
  currentActions.value = [
    { name: '选项一' },
    { name: '选项二' },
    { name: '选项三', subname: '描述信息' }
  ]
  currentCancelText.value = '取消'
  currentDescription.value = '这是一段描述信息'
  visible.value = true
}

const showStatus = () => {
  currentActions.value = [
    { name: '默认选项' },
    { name: '禁用选项', disabled: true },
    { name: '加载选项', loading: true }
  ]
  currentCancelText.value = '取消'
  currentDescription.value = ''
  visible.value = true
}

const showCustomColor = () => {
  currentActions.value = [
    { name: '普通选项' },
    { name: '红色选项', color: '#ee0a24' },
    { name: '蓝色选项', color: '#1989fa' }
  ]
  currentCancelText.value = '取消'
  currentDescription.value = ''
  visible.value = true
}

const showEvents = () => {
  eventLogs.value = []
  currentActions.value = [
    { name: '选项一' },
    { name: '选项二' }
  ]
  currentCancelText.value = '取消'
  currentDescription.value = ''
  visible.value = true
}

const handleSelect = (action: any, index: number) => {
  eventLogs.value.push(`select: ${action.name} (index: ${index}) - ${new Date().toLocaleTimeString()}`)
}

const handleCancelEvent = () => {
  eventLogs.value.push(`cancel - ${new Date().toLocaleTimeString()}`)
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
</style>