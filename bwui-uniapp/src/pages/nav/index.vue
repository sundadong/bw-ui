<template>
  <view class="page">
    <view class="section">
      <view class="section__title">标签页</view>
      <view class="section__content">
        <bw-tabs v-model="activeTab" :tabs="tabs">
          <template #tab0><view class="tab-content"><text>标签页1的内容</text></view></template>
          <template #tab1><view class="tab-content"><text>标签页2的内容</text></view></template>
          <template #tab2><view class="tab-content"><text>标签页3的内容</text></view></template>
        </bw-tabs>
      </view>
    </view>
    <view class="section">
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
    <view class="section">
      <view class="section__title">导航栏</view>
      <view class="section__content section__content--col">
        <view class="demo-box">
          <bw-navbar title="默认导航栏" />
        </view>
        <view class="demo-box">
          <bw-navbar title="固定导航栏" fixed />
        </view>
        <view class="demo-box">
          <bw-navbar title="无返回按钮" :show-back="false" />
        </view>
      </view>
    </view>
    <view class="section">
      <view class="section__title">标签栏</view>
      <view class="section__content section__content--col">
        <view class="demo-box">
          <bw-tabbar v-model="activeTabbar" :tabs="tabbarItems" />
        </view>
        <view class="mt-md"><text class="label">当前索引：{{ activeTabbar }}</text></view>
        <view class="flex gap-sm">
          <bw-button size="small" @click="activeTabbar = 0">首页</bw-button>
          <bw-button size="small" @click="activeTabbar = 1">分类</bw-button>
          <bw-button size="small" @click="activeTabbar = 2">购物车</bw-button>
          <bw-button size="small" @click="activeTabbar = 3">我的</bw-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import bwTabs from '@/components/tabs/index.vue';
import bwButton from '@/components/button/index.vue';
import bwNavbar from '@/components/navbar/index.vue';
import bwTabbar from '@/components/tabbar/index.vue';
const activeTab = ref(0);
const tabs = [{ title: '标签1', name: 'tab0' }, { title: '标签2', name: 'tab1' }, { title: '标签3', name: 'tab2' }];
const activeTabbar = ref(0);
const tabbarItems = [
  { title: '首页', icon: '🏠' },
  { title: '分类', icon: '📦' },
  { title: '购物车', icon: '🛒' },
  { title: '我的', icon: '👤' }
];
</script>

<style scoped lang="scss">
.page { padding: 16px; }
.section { margin-bottom: 24px; background: #fff; border-radius: 8px; overflow: hidden; &__title { font-size: 14px; font-weight: 600; color: #323233; padding: 16px; border-bottom: 1px solid #ebedf0; } &__content { padding: 16px; display: flex; flex-wrap: wrap; gap: 8px; &--col { display: block; } } }
.tab-content { background: #fff; padding: 20px; text-align: center; border-radius: 4px; color: #646566; }
.label { display: block; font-size: 12px; color: #646566; margin-bottom: 8px; }
.flex { display: flex; }
.gap-sm { gap: 8px; }
.mt-md { margin-top: 12px; }
.demo-box { margin-bottom: 12px; }
</style>
