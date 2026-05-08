<template>
  <view
    class="bw-notify"
    :class="`bw-notify--${type}`"
    :style="notifyStyle"
  >
    <text>{{ message }}</text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface NotifyProps {
  message: string;
  type?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  duration?: number;
  top?: number;
}

const props = withDefaults(defineProps<NotifyProps>(), {
  type: 'info',
  duration: 3000,
  top: 0,
});

const notifyStyle = computed(() => ({
  top: `${props.top}px`,
}));
</script>

<style lang="scss" scoped>
.bw-notify {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 44px;
  padding: $padding-xs $padding-md;
  font-size: $font-size-sm;
  color: #ffffff;
  line-height: 1.5;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  transform: translateY(-100%);
  transition: transform $animation-duration-normal;

  &--primary {
    background-color: lighten($primary-color, 10%);
  }

  &--info {
    background-color: lighten($info-color, 10%);
  }

  &--success {
    background-color: lighten($success-color, 10%);
  }

  &--warning {
    background-color: lighten($warning-color, 10%);
  }

  &--danger {
    background-color: lighten($danger-color, 10%);
  }
}
</style>
