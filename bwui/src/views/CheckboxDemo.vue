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
        <bw-checkbox model-value="true" disabled>复选框</bw-checkbox>
        <bw-checkbox model-value="false" disabled>复选框</bw-checkbox>
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwCheckbox from '../components/checkbox/index.vue'

const value1 = ref(true)
const value2 = ref(false)
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
  }
}
</style>
