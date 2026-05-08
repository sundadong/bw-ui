<template>
  <view class="page">
    <view class="section">
      <view class="section__title">主要按钮</view>
      <view class="section__content">
        <Button type="primary">主要操作</Button>
        <Button type="primary" disabled>主要操作</Button>
      </view>
    </view>

    <view class="section">
      <view class="section__title">默认按钮</view>
      <view class="section__content">
        <Button>默认操作</Button>
        <Button disabled>默认操作</Button>
      </view>
    </view>

    <view class="section">
      <view class="section__title">通栏按钮</view>
      <view class="section__content">
        <Button type="primary" block>主要操作</Button>
        <Button block>默认操作</Button>
      </view>
    </view>

    <view class="section">
      <view class="section__title">空心按钮</view>
      <view class="section__content">
        <Button type="primary" plain>主要操作</Button>
        <Button plain>默认操作</Button>
      </view>
    </view>

    <view class="section">
      <view class="section__title">圆角按钮</view>
      <view class="section__content">
        <Button type="primary" size="small" round>主要操作</Button>
        <Button type="primary" size="small" round plain>主要操作</Button>
        <Button type="primary" size="small" round disabled>主要操作</Button>
      </view>
      <view class="section__content" style="margin-top: 12px;">
        <Button size="small" round>默认操作</Button>
        <Button size="small" round plain>默认操作</Button>
      </view>
    </view>

    <view class="section">
      <view class="section__title">小按钮</view>
      <view class="section__content">
        <Button type="primary" size="small">主要操作</Button>
        <Button type="primary" size="small" plain>主要操作</Button>
        <Button type="primary" size="small" disabled>主要操作</Button>
      </view>
      <view class="section__content" style="margin-top: 12px;">
        <Button size="small">默认操作</Button>
        <Button size="small" plain>默认操作</Button>
      </view>
    </view>

    <view class="section">
      <view class="section__title">加载状态</view>
      <view class="section__content">
        <Button type="primary" loading>加载中</Button>
        <Button loading>加载中</Button>
      </view>
    </view>

    <view class="section">
      <view class="section__title">图标按钮</view>
      <view class="section__content">
        <Button type="primary" icon="check">确认</Button>
        <Button icon="close">关闭</Button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Button from '@/components/basic/button/index.vue';
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
    align-items: center;
  }
}
</style>
