<template>
  <view class="page">
    <view class="section">
      <view class="section__title">基础用法</view>
      <view class="section__content">
        <Countdown :time="time1" @finish="onFinish" />
      </view>
    </view>

    <view class="section">
      <view class="section__title">显示天数</view>
      <view class="section__content">
        <Countdown :time="time2" show-day />
      </view>
    </view>

    <view class="section">
      <view class="section__title">自定义格式</view>
      <view class="section__content">
        <Countdown :time="time1" :show-colon="false" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Countdown from '@/components/view/countdown/index.vue';

const time1 = ref(30 * 60 * 1000);
const time2 = ref(2 * 24 * 60 * 60 * 1000);

const onFinish = () => {
  uni.showToast({ title: '倒计时结束', icon: 'none' });
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
    align-items: center;
  }
}
</style>
