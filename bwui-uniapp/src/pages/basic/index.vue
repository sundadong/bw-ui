<template>
  <view class="page">
    <view class="section">
      <view class="section__title">按钮类型</view>
      <view class="section__content">
        <bw-button>默认</bw-button>
        <bw-button type="primary">主要</bw-button>
        <bw-button type="success">成功</bw-button>
        <bw-button type="warning">警告</bw-button>
        <bw-button type="danger">危险</bw-button>
      </view>
    </view>
    <view class="section">
      <view class="section__title">按钮尺寸</view>
      <view class="section__content">
        <bw-button size="small">小按钮</bw-button>
        <bw-button size="medium">中按钮</bw-button>
        <bw-button size="large">大按钮</bw-button>
      </view>
    </view>
    <view class="section">
      <view class="section__title">按钮样式</view>
      <view class="section__content">
        <bw-button plain>朴素按钮</bw-button>
        <bw-button round>圆角按钮</bw-button>
        <bw-button loading>加载中</bw-button>
        <bw-button disabled>禁用</bw-button>
      </view>
    </view>
    <view class="section">
      <view class="section__title">图标</view>
      <view class="section__content">
        <bw-icon name="star" size="32px" color="#1989fa"></bw-icon>
        <bw-icon name="heart" size="32px" color="#ee0a24"></bw-icon>
        <bw-icon name="check" size="32px" color="#07c160"></bw-icon>
      </view>
    </view>
  </view>
</template>

<script setup>
import bwButton from '@/components/button/index.vue';
import bwIcon from '@/components/icon/index.vue';
</script>

<style scoped lang="scss">
.page { padding: 16px; }
.section { margin-bottom: 24px; background: #fff; border-radius: 8px; overflow: hidden; &__title { font-size: 14px; font-weight: 600; color: #323233; padding: 16px; border-bottom: 1px solid #ebedf0; } &__content { padding: 16px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; } }
</style>
