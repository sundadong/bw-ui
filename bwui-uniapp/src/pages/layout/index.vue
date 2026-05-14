<template>
  <view class="page">
    <view class="section">
      <view class="section__title">布局 - 宫格</view>
      <view class="section__content">
        <bw-layout>
          <bw-col :span="8"><view class="grid-item">1/3</view></bw-col>
          <bw-col :span="8"><view class="grid-item">1/3</view></bw-col>
          <bw-col :span="8"><view class="grid-item">1/3</view></bw-col>
          <bw-col :span="12"><view class="grid-item">1/2</view></bw-col>
          <bw-col :span="12"><view class="grid-item">1/2</view></bw-col>
        </bw-layout>
      </view>
    </view>
    <view class="section">
      <view class="section__title">间距</view>
      <view class="section__content section__content--col">
        <view class="label">横向排列（自动换行）：</view>
        <bw-space wrap :size="12">
          <view v-for="i in 12" :key="i" class="space-box">{{ i }}</view>
        </bw-space>
        <view class="label mt-md">纵向排列：</view>
        <bw-space direction="vertical" :size="12">
          <view class="space-box">内容1</view>
          <view class="space-box">内容2</view>
          <view class="space-box">内容3</view>
        </bw-space>
      </view>
    </view>
    <view class="section">
      <view class="section__title">安全区域</view>
      <view class="section__content section__content--col">
        <view class="demo-box">
          <view class="safe-area-demo safe-area-demo--top">顶部安全区域</view>
          <bw-safe-area position="top" />
        </view>
        <view class="demo-box">
          <view class="safe-area-demo safe-area-demo--bottom">底部安全区域</view>
          <bw-safe-area position="bottom" />
        </view>
        <view class="demo-box">
          <view class="safe-area-demo safe-area-demo--both">上下安全区域</view>
          <bw-safe-area position="both" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import bwLayout from '@/components/layout/index.vue';
import bwCol from '@/components/col/index.vue';
import bwSpace from '@/components/space/index.vue';
import bwSafeArea from '@/components/safe-area/index.vue';
</script>

<style scoped lang="scss">
.page { padding: 16px; }
.section { margin-bottom: 24px; background: #fff; border-radius: 8px; overflow: hidden; &__title { font-size: 14px; font-weight: 600; color: #323233; padding: 16px; border-bottom: 1px solid #ebedf0; } &__content { padding: 16px; &--col { display: block; } } }
.grid-item { background: #e6f4ff; color: #1989fa; padding: 20px; text-align: center; font-size: 12px; border: 1px solid #fff; box-sizing: border-box; }
.label { font-size: 12px; color: #646566; margin-bottom: 8px; }
.mt-md { margin-top: 16px; }
.space-box { width: 60px; height: 40px; background: #e6f4ff; color: #1989fa; display: flex; align-items: center; justify-content: center; border-radius: 4px; font-size: 14px; }
.safe-area-demo {
  background: #e6f4ff;
  color: #1989fa;
  padding: 12px;
  text-align: center;
  font-size: 14px;
  border-radius: 4px;
  &--top { border-radius: 4px 4px 0 0; }
  &--bottom { border-radius: 0 0 4px 4px; background: #fff3e0; color: #ff976a; }
  &--both { border-radius: 4px; }
}
.demo-box { margin-bottom: 12px; }
</style>
