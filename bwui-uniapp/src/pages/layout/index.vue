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
  </view>
</template>

<script setup>
import bwLayout from '@/components/layout/index.vue';
import bwCol from '@/components/col/index.vue';
</script>

<style scoped lang="scss">
.page { padding: 16px; }
.section { margin-bottom: 24px; background: #fff; border-radius: 8px; overflow: hidden; &__title { font-size: 14px; font-weight: 600; color: #323233; padding: 16px; border-bottom: 1px solid #ebedf0; } &__content { padding: 0; } }
.grid-item { background: #e6f4ff; color: #1989fa; padding: 20px; text-align: center; font-size: 12px; border: 1px solid #fff; box-sizing: border-box; }
</style>
