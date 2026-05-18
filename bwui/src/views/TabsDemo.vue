<template>
  <demo-layout title="Tabs 标签页">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <bw-tabs v-model="active1" :tabs="basicTabs">
        <template #tab0>
          <div class="tab-content">内容 1</div>
        </template>
        <template #tab1>
          <div class="tab-content">内容 2</div>
        </template>
        <template #tab2>
          <div class="tab-content">内容 3</div>
        </template>
        <template #tab3>
          <div class="tab-content">内容 4</div>
        </template>
      </bw-tabs>
    </div>

    <div class="demo-block">
      <div class="demo-title">通过名称匹配</div>
      <bw-tabs v-model="active2" :tabs="nameTabs" @change="onNameTabChange">
        <template #tab0>
          <div class="tab-content">{{ nameTabContent }}</div>
        </template>
        <template #tab1>
          <div class="tab-content">{{ nameTabContent }}</div>
        </template>
        <template #tab2>
          <div class="tab-content">{{ nameTabContent }}</div>
        </template>
      </bw-tabs>
    </div>

    <div class="demo-block">
      <div class="demo-title">禁用标签</div>
      <bw-tabs v-model="active3" :tabs="disabledTabs">
        <template #tab0>
          <div class="tab-content">内容 1</div>
        </template>
        <template #tab1>
          <div class="tab-content">内容 2</div>
        </template>
        <template #tab2>
          <div class="tab-content">内容 3</div>
        </template>
      </bw-tabs>
    </div>

    <div class="demo-block">
      <div class="demo-title">样式风格</div>
      <bw-tabs
        v-model="active4"
        :tabs="styleTabs"
        color="#ee0a24"
        background="#f7f8fa"
        :line-width="20"
      >
        <template #tab0>
          <div class="tab-content">内容 1</div>
        </template>
        <template #tab1>
          <div class="tab-content">内容 2</div>
        </template>
        <template #tab2>
          <div class="tab-content">内容 3</div>
        </template>
      </bw-tabs>
    </div>

    <div class="demo-block">
      <div class="demo-title">切换动画</div>
      <bw-tabs v-model="active5" :tabs="animatedTabs" :animated="true">
        <template #tab0>
          <div class="tab-content">内容 1</div>
        </template>
        <template #tab1>
          <div class="tab-content">内容 2</div>
        </template>
        <template #tab2>
          <div class="tab-content">内容 3</div>
        </template>
      </bw-tabs>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwTabs from '../components/tabs/index.vue'

const active1 = ref(0)
const basicTabs = [
  { title: '标签 1' },
  { title: '标签 2' },
  { title: '标签 3' },
  { title: '标签 4' }
]

const active2 = ref(0)
const nameTabs = [
  { title: '标签 1' },
  { title: '标签 2' },
  { title: '标签 3' }
]

const nameTabContent = ref('内容 a')

const onNameTabChange = (index: number) => {
  const contentMap: Record<number, string> = {
    0: '内容 a',
    1: '内容 b',
    2: '内容 c'
  }
  nameTabContent.value = contentMap[index] || '内容 a'
}

const active3 = ref(0)
const disabledTabs = [
  { title: '标签 1' },
  { title: '标签 2', disabled: true },
  { title: '标签 3' }
]

const active4 = ref(0)
const styleTabs = [
  { title: '标签 1' },
  { title: '标签 2' },
  { title: '标签 3' }
]

const active5 = ref(0)
const animatedTabs = [
  { title: '标签 1' },
  { title: '标签 2' },
  { title: '标签 3' }
]
</script>

<style lang="less" scoped>
.demo-block {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;

  .demo-title {
    font-size: 14px;
    color: #969799;
    padding: 16px 16px 0;
  }
}

.tab-content {
  padding: 20px;
  text-align: center;
  color: #646566;
  background-color: #f7f8fa;
}
</style>