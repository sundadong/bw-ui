<template>
  <view class="bw-skeleton" :class="{ 'bw-skeleton--animate': animate }">
    <view v-if="avatar" class="bw-skeleton__avatar" :class="`bw-skeleton__avatar--${avatarShape}`" :style="{ width: avatarSize, height: avatarSize }"></view>
    <view class="bw-skeleton__content">
      <view v-if="title" class="bw-skeleton__title" :style="{ width: titleWidth }"></view>
      <view class="bw-skeleton__rows">
        <view v-for="i in (rows || 3)" :key="i" class="bw-skeleton__row" :style="{ width: i === (rows || 3) ? lastRowWidth : '100%' }"></view>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  avatar: { type: Boolean, default: false },
  avatarShape: { type: String, default: 'round' },
  avatarSize: { type: String, default: '32px' },
  title: { type: Boolean, default: true },
  titleWidth: { type: String, default: '40%' },
  rows: { type: Number, default: 3 },
  lastRowWidth: { type: String, default: '60%' },
  animate: { type: Boolean, default: true }
});
</script>

<style scoped lang="scss">
.bw-skeleton {
  display: flex;
  &--animate {
    .bw-skeleton__avatar, .bw-skeleton__title, .bw-skeleton__row { animation: shimmer 1.5s infinite; background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%); background-size: 200% 100%; }
  }
  &__avatar {
    background: #f2f2f2;
    flex-shrink: 0;
    &--round { border-radius: 50%; }
    &--square { border-radius: 4px; }
  }
  &__content { flex: 1; margin-left: 12px; }
  &__title { height: 16px; background: #f2f2f2; border-radius: 4px; margin-bottom: 12px; }
  &__rows { }
  &__row { height: 14px; background: #f2f2f2; border-radius: 4px; margin-bottom: 8px; &:last-child { margin-bottom: 0; } }
}

@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
</style>
