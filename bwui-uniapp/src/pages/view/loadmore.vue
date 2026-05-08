<template>
  <view class="page">
    <view class="section">
      <view class="section__title">加载中</view>
      <Loadmore status="loading" />
    </view>

    <view class="section">
      <view class="section__title">加载完成</view>
      <Loadmore status="finished" />
    </view>

    <view class="section">
      <view class="section__title">加载失败</view>
      <Loadmore status="error" />
    </view>
  </view>
</template>

<script setup lang="ts">
import Loadmore from '@/components/view/loadmore/index.vue';
</script>

<style lang="scss" scoped>
.page {
  padding: 16px;
}

.section {
  margin-bottom: 16px;
  background-color: #ffffff;

  &__title {
    font-size: 14px;
    color: #969799;
    padding: 16px;
    border-bottom: 1px solid #ebedf0;
  }
}
</style>
