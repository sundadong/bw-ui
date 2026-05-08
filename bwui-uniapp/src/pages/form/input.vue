<template>
  <view class="page">
    <view class="section">
      <view class="section__title">基础用法</view>
      <view class="section__content">
        <Input v-model="input1" placeholder="请输入文本" />
      </view>
    </view>

    <view class="section">
      <view class="section__title">禁用状态</view>
      <view class="section__content">
        <Input v-model="input2" placeholder="禁用状态" disabled />
      </view>
    </view>

    <view class="section">
      <view class="section__title">带图标</view>
      <view class="section__content">
        <Input v-model="input3" placeholder="带图标" prefix-icon="search" />
      </view>
    </view>

    <view class="section">
      <view class="section__title">可清除</view>
      <view class="section__content">
        <Input v-model="input4" placeholder="可清除" clearable />
      </view>
    </view>

    <view class="section">
      <view class="section__title">数字输入</view>
      <view class="section__content">
        <Input v-model="input5" type="number" placeholder="请输入数字" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Input from '@/components/form/input/index.vue';

const input1 = ref('');
const input2 = ref('禁用文本');
const input3 = ref('');
const input4 = ref('可清除文本');
const input5 = ref('');
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
