<template>
  <demo-layout title="Radio 单选框">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-radio">
        <bw-radio v-model="value" name="1">选项 1</bw-radio>
        <bw-radio v-model="value" name="2">选项 2</bw-radio>
        <bw-radio v-model="value" name="3">选项 3</bw-radio>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">禁用状态</div>
      <div class="demo-radio">
        <bw-radio v-model="disabledValue" name="1" disabled>禁用选项</bw-radio>
        <bw-radio v-model="disabledValue" name="2" disabled>禁用选项</bw-radio>
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwRadio from '../components/radio/index.vue'

const value = ref('1')
const disabledValue = ref('1')
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

  .demo-radio {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
