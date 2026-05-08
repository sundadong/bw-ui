<template>
  <view class="page">
    <view class="section">
      <view class="section__title">基本用法</view>
      <Alert title="这是一条提示信息" type="primary" />
    </view>

    <view class="section">
      <view class="section__title">不同类型</view>
      <Alert title="主要提示" type="primary" />
      <Alert title="成功提示" type="success" />
      <Alert title="警告提示" type="warning" />
      <Alert title="危险提示" type="danger" />
    </view>

    <view class="section">
      <view class="section__title">带关闭按钮</view>
      <Alert title="可关闭的提示" closable @close="handleClose" />
    </view>
  </view>
</template>

<script setup lang="ts">
import Alert from '@/components/view/alert/index.vue';

const handleClose = () => {
  uni.showToast({ title: '已关闭', icon: 'none' });
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
}
</style>
