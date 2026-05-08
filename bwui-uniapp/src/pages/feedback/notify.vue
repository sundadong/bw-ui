<template>
  <view class="page">
    <view class="section">
      <view class="section__title">基本用法</view>
      <view class="section__content">
        <Button @click="showNotify('这是一条通知', 'info')">显示通知</Button>
      </view>
    </view>

    <view class="section">
      <view class="section__title">通知类型</view>
      <view class="section__content">
        <Button type="primary" @click="showNotify('主要通知', 'primary')">主要</Button>
        <Button type="success" @click="showNotify('成功通知', 'success')">成功</Button>
        <Button type="warning" @click="showNotify('警告通知', 'warning')">警告</Button>
        <Button type="danger" @click="showNotify('危险通知', 'danger')">危险</Button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/basic/button/index.vue';

const showNotify = (message: string, type: string) => {
  uni.showToast({
    title: message,
    icon: 'none',
    duration: 2000,
  });
};
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

  &__content {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>
