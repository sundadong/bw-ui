<template>
  <view class="page">
    <view class="section">
      <view class="section__title">基础用法</view>
      <Tabs :tabs="tabs1" v-model:current-index="currentIndex1" />
      <view class="tabs-content">
        <view v-for="(tab, index) in tabs1" :key="index" v-show="currentIndex1 === index">
          {{ tab.title }} 内容
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section__title">禁用状态</view>
      <Tabs :tabs="tabs2" v-model:current-index="currentIndex2" />
    </view>

    <view class="section">
      <view class="section__title">卡片样式</view>
      <Tabs :tabs="tabs1" :line="false" v-model:current-index="currentIndex3" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Tabs from '@/components/nav/tabs/index.vue';

const tabs1 = [
  { title: '标签1' },
  { title: '标签2' },
  { title: '标签3' },
];

const tabs2 = [
  { title: '标签1' },
  { title: '标签2', disabled: true },
  { title: '标签3' },
];

const currentIndex1 = ref(0);
const currentIndex2 = ref(0);
const currentIndex3 = ref(0);
</script>

<style lang="scss" scoped>
.page {
  padding: 16px;
}

.section {
  margin-bottom: 24px;

  &__title {
    font-size: 14px;
    color: #969799;
    margin-bottom: 12px;
  }
}

.tabs-content {
  padding: 20px 16px;
  background-color: #ffffff;
}
</style>
