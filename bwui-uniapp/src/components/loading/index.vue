<template>
  <view v-if="show" class="bw-loading" :class="{ 'bw-loading--dark': theme === 'dark' }">
    <view v-if="fullscreen" class="bw-loading__fixed">
      <view class="bw-loading__wrap">
        <text class="bw-icon bw-icon-loading bw-loading__icon"></text>
        <view v-if="tip" class="bw-loading__tip">{{ tip }}</view>
      </view>
    </view>
    <view v-else class="bw-loading__wrap">
      <text class="bw-icon bw-icon-loading bw-loading__icon"></text>
      <view v-if="tip" class="bw-loading__tip">{{ tip }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

export interface LoadingProps {
  show?: boolean;
  tip?: string;
  theme?: 'light' | 'dark';
  fullscreen?: boolean;
}

withDefaults(defineProps<LoadingProps>(), {
  show: true,
  tip: '',
  theme: 'light',
  fullscreen: false,
});
</script>

<style lang="scss" scoped>
.bw-loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: $text-color;
  text-align: center;

  &--dark {
    .bw-loading__wrap {
      padding: $padding-sm;
      color: #ffffff;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: $border-radius-lg;

      .bw-loading__tip {
        padding: $padding-sm $padding-lg;
      }
    }

    .bw-icon-loading {
      color: #ffffff;
    }
  }

  &__fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.8);
  }

  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__icon {
    font-size: 32px;
    animation: loading-spin 1s linear infinite;
  }

  &__tip {
    margin-top: $padding-xs;
    font-size: $font-size-sm;
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
