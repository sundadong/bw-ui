<template>
  <view class="page">
    <view class="section">
      <view class="section__title">基础用法</view>
      <view class="section__content">
        <Tag>标签</Tag>
        <Tag type="primary">主要</Tag>
        <Tag type="success">成功</Tag>
        <Tag type="warning">警告</Tag>
        <Tag type="danger">危险</Tag>
      </view>
    </view>

    <view class="section">
      <view class="section__title">空心样式</view>
      <view class="section__content">
        <Tag plain>标签</Tag>
        <Tag type="primary" plain>主要</Tag>
        <Tag type="success" plain>成功</Tag>
      </view>
    </view>

    <view class="section">
      <view class="section__title">圆角样式</view>
      <view class="section__content">
        <Tag round>标签</Tag>
        <Tag type="primary" round>主要</Tag>
      </view>
    </view>

    <view class="section">
      <view class="section__title">小尺寸</view>
      <view class="section__content">
        <Tag size="small">小标签</Tag>
        <Tag type="primary" size="small">小标签</Tag>
      </view>
    </view>

    <view class="section">
      <view class="section__title">可关闭</view>
      <view class="section__content">
        <Tag closable @close="handleClose">可关闭</Tag>
        <Tag type="primary" closable>可关闭</Tag>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Tag from '@/components/view/tag/index.vue';

const visible = ref(true);

const handleClose = () => {
  uni.showToast({ title: '标签已关闭', icon: 'none' });
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
    gap: 8px;
  }
}
</style>
