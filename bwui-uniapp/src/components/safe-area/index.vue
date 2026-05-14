<template>
  <view class="bw-safe-area" :class="[`bw-safe-area--${position}`]">
    <slot></slot>
  </view>
</template>

<script setup>
defineProps({
  position: { type: String, default: 'bottom' }
});
</script>

<style scoped lang="scss">
.bw-safe-area {
  &--top { padding-top: env(safe-area-inset-top); }
  &--bottom { padding-bottom: env(safe-area-inset-bottom); }
  &--both { padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom); }
}
</style>
