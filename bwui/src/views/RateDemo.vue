<template>
  <demo-layout title="Rate 评分">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-rate v-model="value1" />
        <div class="demo-value">当前评分: {{ value1 }}</div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义数量</div>
      <div class="demo-row">
        <bw-rate v-model="value2" :count="8" />
        <div class="demo-value">当前评分: {{ value2 }}</div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义颜色和大小</div>
      <div class="demo-row">
        <bw-rate v-model="value3" color="#07c160" :size="28" />
        <div class="demo-value">当前评分: {{ value3 }}</div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义间隔</div>
      <div class="demo-row">
        <bw-rate v-model="value4" :gutter="8" />
        <div class="demo-value">当前评分: {{ value4 }}</div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">半星模式</div>
      <div class="demo-row">
        <bw-rate v-model="value5" :allow-half="true" />
        <div class="demo-value">当前评分: {{ value5 }}</div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">只读状态</div>
      <div class="demo-row">
        <bw-rate v-model="value6" readonly />
        <div class="demo-value">当前评分: {{ value6 }}</div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">禁用状态</div>
      <div class="demo-row">
        <bw-rate v-model="value7" disabled />
        <div class="demo-value">当前评分: {{ value7 }}</div>
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwRate from '../components/rate/index.vue'

const value1 = ref(3)
const value2 = ref(5)
const value3 = ref(4)
const value4 = ref(2)
const value5 = ref(2.5)
const value6 = ref(3.5)
const value7 = ref(4)
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

.demo-value {
  margin-top: 8px;
  font-size: 14px;
  color: #323233;
}
</style>