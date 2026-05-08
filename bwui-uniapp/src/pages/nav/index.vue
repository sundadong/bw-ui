<template>
  <view class="page">
    <bw-tabs v-model="activeTab" :tabs="tabs">
      <template #tab0><view class="tab-content"><text>标签页1的内容</text></view></template>
      <template #tab1><view class="tab-content"><text>标签页2的内容</text></view></template>
      <template #tab2><view class="tab-content"><text>标签页3的内容</text></view></template>
    </bw-tabs>
    <view class="section mt-md">
      <view class="section__title">标签页控制</view>
      <view class="section__content">
        <text class="label">当前索引：{{ activeTab }}</text>
        <view class="flex gap-sm">
          <bw-button size="small" @click="activeTab = 0">切换到标签1</bw-button>
          <bw-button size="small" @click="activeTab = 1">切换到标签2</bw-button>
          <bw-button size="small" @click="activeTab = 2">切换到标签3</bw-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import bwTabs from '@/components/tabs/index.vue';
import bwButton from '@/components/button/index.vue';
const activeTab = ref(0);
const tabs = [{ title: '标签1', name: 'tab0' }, { title: '标签2', name: 'tab1' }, { title: '标签3', name: 'tab2' }];
</script>

<style scoped lang="scss">
.page { padding: 16px; }
.section { background: #fff; border-radius: 8px; overflow: hidden; &__title { font-size: 14px; font-weight: 600; color: #323233; padding: 16px; border-bottom: 1px solid #ebedf0; } &__content { padding: 16px; } }
.tab-content { background: #fff; padding: 20px; text-align: center; border-radius: 4px; color: #646566; }
.label { display: block; font-size: 12px; color: #646566; margin-bottom: 8px; }
.flex { display: flex; }
.gap-sm { gap: 8px; }
.mt-md { margin-top: 16px; }
</style>
