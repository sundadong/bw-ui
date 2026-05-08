<template>
  <view class="page">
    <view class="section">
      <view class="section__title">基本用法</view>
      <Empty description="暂无数据" />
    </view>

    <view class="section">
      <view class="section__title">自定义内容</view>
      <Empty>
        <template #tip>
          <text>没有找到相关数据</text>
        </template>
        <template #default>
          <Button type="primary" size="small">刷新试试</Button>
        </template>
      </Empty>
    </view>
  </view>
</template>

<script setup lang="ts">
import Empty from '@/components/view/empty/index.vue';
import Button from '@/components/basic/button/index.vue';
</script>

<style lang="scss" scoped>
.page {
  padding: 0;
}
</style>
