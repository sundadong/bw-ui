<template>
  <view class="bw-loadmore" :class="{ 'bw-loadmore--finished': status === 'finished' }">
    <view v-if="status === 'loading'" class="bw-loadmore__loading">
      <text class="bw-icon bw-icon-loading bw-loadmore__icon"></text>
    </view>
    <view v-else-if="status === 'finished'" class="bw-loadmore__divider">
      <view class="bw-loadmore__line"></view>
    </view>
    <view v-if="status !== 'loading'" class="bw-loadmore__tip">
      {{ statusText }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

export interface LoadmoreProps {
  status?: 'loading' | 'finished' | 'error';
  loadingText?: string;
  finishedText?: string;
  errorText?: string;
}

const props = withDefaults(defineProps<LoadmoreProps>(), {
  status: 'loading',
  loadingText: '加载中...',
  finishedText: '没有更多了',
  errorText: '加载失败，点击重新加载',
});

const statusText = computed(() => {
  const texts: Record<string, string> = {
    loading: props.loadingText,
    finished: props.finishedText,
    error: props.errorText,
  };
  return texts[props.status] || '';
});
</script>

<style lang="scss" scoped>
.bw-loadmore {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: $padding-md;
  color: $text-color-2;
  text-align: center;
  box-sizing: border-box;

  &--finished {
    .bw-loadmore__tip {
      color: $text-color-3;
    }
  }

  &__loading {
    margin-bottom: $padding-xs;
  }

  &__icon {
    font-size: 24px;
    animation: loading-spin 1s linear infinite;
  }

  &__tip {
    font-size: $font-size-sm;
    color: $text-color-2;
  }

  &__divider {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: $padding-xs;
  }

  &__line {
    flex: 1;
    height: 1px;
    background-color: $border-color;
  }
}

@keyframes loading-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
