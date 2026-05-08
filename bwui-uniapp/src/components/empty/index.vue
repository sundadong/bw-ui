<template>
  <view class="bw-empty">
    <view class="bw-empty__icon">📦</view>
    <text class="bw-empty__desc">{{ description || '暂无数据' }}</text>
    <view v-if="$slots.default" class="bw-empty__footer"><slot></slot></view>
  </view>
</template>

<script setup>
defineProps({ image: { type: String, default: '' }, description: { type: String, default: '' } });
</script>

<style scoped lang="scss">
.bw-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  &__icon { font-size: 64px; margin-bottom: 16px; opacity: 0.5; }
  &__desc { font-size: 14px; color: #969799; text-align: center; margin-bottom: 16px; }
  &__footer { margin-top: 8px; }
}
</style>
