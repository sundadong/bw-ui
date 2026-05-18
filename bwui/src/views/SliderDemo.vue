<template>
  <demo-layout title="Slider 滑块">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-slider v-model="value1" />
        <div class="demo-value">当前值: {{ value1 }}</div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义范围</div>
      <div class="demo-row">
        <bw-slider v-model="value2" :min="-50" :max="50" />
        <div class="demo-value">当前值: {{ value2 }}</div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">指定步长</div>
      <div class="demo-row">
        <bw-slider v-model="value3" :step="10" />
        <div class="demo-value">当前值: {{ value3 }}</div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义颜色</div>
      <div class="demo-row">
        <bw-slider v-model="value4" active-color="#ee0a24" inactive-color="#f2f3f5" />
        <div class="demo-value">当前值: {{ value4 }}</div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义样式</div>
      <div class="demo-row">
        <bw-slider
          v-model="value5"
          :bar-height="4"
          :button-size="28"
          active-color="#07c160"
        />
        <div class="demo-value">当前值: {{ value5 }}</div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">禁用状态</div>
      <div class="demo-row">
        <bw-slider v-model="value6" disabled />
        <div class="demo-value">当前值: {{ value6 }}</div>
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwSlider from '../components/slider/index.vue'

const value1 = ref(50)
const value2 = ref(0)
const value3 = ref(0)
const value4 = ref(30)
const value5 = ref(40)
const value6 = ref(60)
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

.demo-row {
  padding: 0 16px 16px;
}

.demo-value {
  margin-top: 8px;
  font-size: 14px;
  color: #323233;
}
</style>