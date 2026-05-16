<template>
  <demo-layout title="Checkbox 复选框">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-checkbox">
        <bw-checkbox v-model="value1">复选框</bw-checkbox>
        <bw-checkbox v-model="value2" shape="square">复选框</bw-checkbox>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">禁用状态</div>
      <div class="demo-checkbox">
        <bw-checkbox :model-value="true" disabled>复选框</bw-checkbox>
        <bw-checkbox :model-value="false" disabled>复选框</bw-checkbox>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">水平排列</div>
      <div class="demo-checkbox demo-checkbox--horizontal">
        <bw-checkbox v-model="value3">选项 A</bw-checkbox>
        <bw-checkbox v-model="value4">选项 B</bw-checkbox>
        <bw-checkbox v-model="value5">选项 C</bw-checkbox>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">监听事件</div>
      <div class="demo-checkbox">
        <bw-checkbox v-model="value6" @change="handleChange">切换时触发事件</bw-checkbox>
      </div>
      <div class="demo-event-tip">当前状态：{{ value6 ? '选中' : '未选中' }}</div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwCheckbox from '../components/checkbox/index.vue'

const value1 = ref(true)
const value2 = ref(false)
const value3 = ref(false)
const value4 = ref(false)
const value5 = ref(false)
const value6 = ref(false)

const handleChange = (val: boolean) => {
  alert(val ? '已选中' : '已取消选中')
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

  .demo-checkbox {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &--horizontal {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 24px;
    }
  }

  .demo-event-tip {
    margin-top: 12px;
    font-size: 13px;
    color: #323233;
  }
}
</style>