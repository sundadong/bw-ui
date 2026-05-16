<template>
  <demo-layout title="Tabs 标签页">
    <div class="demo-block">
      <bw-tabs v-model="currentTab">
        <template #tab0>
          <div class="tab-content">标签 1 内容</div>
        </template>
        <template #tab1>
          <div class="tab-content">标签 2 内容</div>
        </template>
        <template #tab2>
          <div class="tab-content">标签 3 内容</div>
        </template>
      </bw-tabs>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwTabs from '../components/tabs/index.vue'

const currentTab = ref(0)
</script>

<style lang="scss" scoped>
.demo-block {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.tab-content {
  padding: 20px;
  text-align: center;
  color: #646566;
  background-color: #f7f8fa;
}
</style>
