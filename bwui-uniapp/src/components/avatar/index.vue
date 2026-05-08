<template>
  <view class="bw-avatar" :class="`bw-avatar--${size}`" :style="customStyle">
    <image v-if="src" class="bw-avatar__image" :src="src" mode="aspectFill" />
    <text v-else class="bw-avatar__text">{{ initials }}</text>
  </view>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  src: { type: String, default: '' },
  size: { type: String, default: 'medium' },
  color: { type: String, default: '' },
  bgColor: { type: String, default: '' },
  initials: { type: String, default: '' }
});
const customStyle = computed(() => ({
  ...(props.color ? { color: props.color } : {}),
  ...(props.bgColor ? { backgroundColor: props.bgColor } : {})
}));
</script>

<style scoped lang="scss">
.bw-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  background: #e6e6e6;
  &--small { width: 32px; height: 32px; font-size: 12px; }
  &--medium { width: 44px; height: 44px; font-size: 14px; }
  &--large { width: 64px; height: 64px; font-size: 16px; }
  &__image { width: 100%; height: 100%; }
  &__text { color: #fff; font-weight: 500; }
}
</style>
