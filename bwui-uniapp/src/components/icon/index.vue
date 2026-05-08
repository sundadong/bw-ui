<template>
  <view class="bw-icon" :style="{ fontSize: size, color: color }">
    <text>{{ iconMap[name] || '●' }}</text>
  </view>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: String, default: '24px' },
  color: { type: String, default: '#323233' }
});

const iconMap = {
  star: '★',
  heart: '♥',
  check: '✓',
  close: '✕',
  search: '🔍',
  home: '🏠'
};
</script>

<style scoped lang="scss">
.bw-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
