<template>
  <view v-if="show" class="bw-loading">
    <view class="bw-loading__spinner"></view>
    <text v-if="text" class="bw-loading__text">{{ text }}</text>
  </view>
</template>

<script setup>
defineProps({
  show: { type: Boolean, default: true },
  text: { type: String, default: '' }
});
</script>

<style scoped lang="scss">
.bw-loading {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #999;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  &__text {
    margin-top: 8px;
    font-size: 12px;
    color: #999;
  }
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
