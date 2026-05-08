<template>
  <view class="page">
    <view class="section">
      <view class="section__title">基础用法</view>
      <view class="section__content">
        <Stepper v-model="stepper1" />
      </view>
    </view>

    <view class="section">
      <view class="section__title">步长设置</view>
      <view class="section__content">
        <Stepper v-model="stepper2" :step="2" />
      </view>
    </view>

    <view class="section">
      <view class="section__title">范围限制</view>
      <view class="section__content">
        <Stepper v-model="stepper3" :min="1" :max="10" />
      </view>
    </view>

    <view class="section">
      <view class="section__title">禁用状态</view>
      <view class="section__content">
        <Stepper v-model="stepper4" disabled />
      </view>
    </view>

    <view class="section">
      <view class="section__title">小数</view>
      <view class="section__content">
        <Stepper v-model="stepper5" :step="0.1" :decimal-length="1" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Stepper from '@/components/form/stepper/index.vue';

const stepper1 = ref(1);
const stepper2 = ref(1);
const stepper3 = ref(1);
const stepper4 = ref(1);
const stepper5 = ref(1.0);
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
