<template>
  <view class="page">
    <view class="section">
      <view class="section__title">基本用法</view>
      <view class="section__content">
        <Loading />
      </view>
    </view>

    <view class="section">
      <view class="section__title">带提示</view>
      <view class="section__content">
        <Loading tip="加载中..." />
      </view>
    </view>

    <view class="section">
      <view class="section__title">深色主题</view>
      <view class="section__content">
        <Loading tip="加载中..." theme="dark" />
      </view>
    </view>

    <view class="section">
      <view class="section__title">全屏加载</view>
      <view class="section__content">
        <Button type="primary" @click="showFullscreenLoading">显示全屏加载</Button>
        <Loading v-if="loading" fullscreen tip="正在加载..." />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Loading from '@/components/feedback/loading/index.vue';
import Button from '@/components/basic/button/index.vue';

const loading = ref(false);

const showFullscreenLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
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
    flex-direction: column;
    gap: 12px;
  }
}
</style>
