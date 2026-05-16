<template>
  <demo-layout title="Stepper 步进器">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-stepper v-model="value1" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">设置步长</div>
      <div class="demo-row">
        <bw-stepper v-model="value2" :step="2" :min="0" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">限制范围</div>
      <div class="demo-row">
        <bw-stepper v-model="value3" :min="5" :max="20" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">整数模式</div>
      <div class="demo-row">
        <bw-stepper v-model="value4" :integer="true" :min="0" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">禁用状态</div>
      <div class="demo-row">
        <bw-stepper v-model="value5" disabled />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">圆形按钮</div>
      <div class="demo-row">
        <bw-stepper v-model="value6" theme="round" :min="0" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义大小</div>
      <div class="demo-row">
        <bw-stepper
          v-model="value7"
          :input-width="60"
          :button-size="36"
          :min="0"
        />
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwStepper from '../components/stepper/index.vue'

const value1 = ref(1)
const value2 = ref(0)
const value3 = ref(5)
const value4 = ref(0)
const value5 = ref(3)
const value6 = ref(0)
const value7 = ref(0)
</script>

<style lang="scss" scoped>
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

.demo-row {
  padding: 0 16px 16px;
}
</style>