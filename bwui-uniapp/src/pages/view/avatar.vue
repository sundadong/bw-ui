<template>
  <view class="page">
    <view class="section">
      <view class="section__title">基础用法</view>
      <view class="section__content">
        <Avatar text="头像" />
      </view>
    </view>

    <view class="section">
      <view class="section__title">不同尺寸</view>
      <view class="section__content">
        <Avatar text="小" size="small" />
        <Avatar text="中" size="medium" />
        <Avatar text="大" size="large" />
      </view>
    </view>

    <view class="section">
      <view class="section__title">圆形头像</view>
      <view class="section__content">
        <Avatar text="圆形" shape="circle" />
      </view>
    </view>

    <view class="section">
      <view class="section__title">带图片</view>
      <view class="section__content">
        <Avatar src="https://via.placeholder.com/120" size="large" shape="circle" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Avatar from '@/components/view/avatar/index.vue';
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
    align-items: flex-end;
    gap: 16px;
  }
}
</style>
