<template>
  <view class="page">
    <view class="section">
      <view class="section__title">基础用法</view>
      <view class="section__content">
        <Textarea v-model="textarea1" placeholder="请输入文本" />
      </view>
    </view>

    <view class="section">
      <view class="section__title">自适应高度</view>
      <view class="section__content">
        <Textarea v-model="textarea2" placeholder="自适应高度" auto-height />
      </view>
    </view>

    <view class="section">
      <view class="section__title">字数统计</view>
      <view class="section__content">
        <Textarea v-model="textarea3" placeholder="显示字数统计" :maxlength="100" show-word-count />
      </view>
    </view>

    <view class="section">
      <view class="section__title">禁用状态</view>
      <view class="section__content">
        <Textarea v-model="textarea4" placeholder="禁用状态" disabled />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Textarea from '@/components/form/textarea/index.vue';

const textarea1 = ref('');
const textarea2 = ref('');
const textarea3 = ref('');
const textarea4 = ref('禁用文本');
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
    flex-direction: column;
    gap: 12px;
  }
}
</style>
