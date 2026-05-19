<template>
  <demo-layout title="Switch 开关">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <bw-cell-group>
        <bw-cell title="开关">
          <template #right-icon>
            <bw-switch v-model="value1" />
          </template>
        </bw-cell>
        <bw-cell title="禁用状态">
          <template #right-icon>
            <bw-switch v-model="value2" disabled />
          </template>
        </bw-cell>
      </bw-cell-group>
    </div>

    <div class="demo-block">
      <div class="demo-title">加载状态</div>
      <bw-cell-group>
        <bw-cell title="加载中">
          <template #right-icon>
            <bw-switch v-model="value3" loading />
          </template>
        </bw-cell>
      </bw-cell-group>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义颜色</div>
      <bw-cell-group>
        <bw-cell title="绿色开关">
          <template #right-icon>
            <bw-switch v-model="value4" active-color="#07c160" inactive-color="#ee0a24" />
          </template>
        </bw-cell>
        <bw-cell title="蓝色开关">
          <template #right-icon>
            <bw-switch v-model="value5" active-color="#1989fa" inactive-color="#c9c9c9" />
          </template>
        </bw-cell>
      </bw-cell-group>
    </div>

    <div class="demo-block">
      <div class="demo-title">异步控制</div>
      <div class="async-control">
        <span class="async-label">确认切换</span>
        <bw-switch v-model="value6" :beforeChange="handleAsyncSwitch" />
        <span class="async-status">{{ value6 ? '开启' : '关闭' }}</span>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">测试用v-model</div>
      <div class="async-control">
        <span class="async-label">简单测试</span>
        <div class="switch-wrapper">
          <bw-switch v-model="value7" />
        </div>
        <span class="async-status">{{ value7 ? '开启' : '关闭' }}</span>
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwCell from '../components/cell/index.vue'
import BwCellGroup from '../components/cell-group/index.vue'
import BwSwitch from '../components/switch/index.vue'

const value1 = ref(false)
const value2 = ref(true)
const value3 = ref(false)
const value4 = ref(false)
const value5 = ref(true)
const value6 = ref(false)
const value7 = ref(false)

const handleAsyncSwitch = (val: boolean) => {
  console.log('handleAsyncSwitch called with:', val)
  return window.confirm('是否确认切换开关状态？')
}
</script>

<style lang="less" scoped>
.demo-block {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 0;
  margin-bottom: 16px;
  overflow: hidden;

  .demo-title {
    font-size: 14px;
    color: #969799;
    padding: 16px 16px 8px;
  }
}

.async-control {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;

  .async-label {
    flex: 1;
    font-size: 14px;
    color: #323233;
  }

  .switch-wrapper {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    z-index: 1;
  }

  .async-status {
    font-size: 14px;
    color: #969799;
    min-width: 40px;
  }
}
</style>
