<template>
  <view class="bw-timeline">
    <view v-for="(item, index) in items" :key="index" class="bw-timeline__item" :class="{ 'bw-timeline__item--last': index === items.length - 1 }">
      <view class="bw-timeline__dot" :class="{ 'bw-timeline__dot--pending': item.pending }"></view>
      <view class="bw-timeline__content">
        <view class="bw-timeline__time">{{ item.time }}</view>
        <view class="bw-timeline__title">{{ item.title }}</view>
        <view v-if="item.description" class="bw-timeline__desc">{{ item.description }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({ items: { type: Array, default: () => [] } });
</script>

<style scoped lang="scss">
.bw-timeline {
  padding: 16px;
  &__item {
    position: relative;
    padding-left: 24px;
    padding-bottom: 24px;
    &:not(&--last)::before {
      content: '';
      position: absolute;
      left: 5px;
      top: 12px;
      bottom: 0;
      width: 2px;
      background: #ebedf0;
    }
    &--last { padding-bottom: 0; }
  }
  &__dot {
    position: absolute;
    left: 0;
    top: 4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #1989fa;
    z-index: 1;
    &--pending { background: #ff976a; }
  }
  &__content { flex: 1; }
  &__time { font-size: 12px; color: #969799; margin-bottom: 4px; }
  &__title { font-size: 14px; color: #323233; font-weight: 500; margin-bottom: 4px; }
  &__desc { font-size: 12px; color: #646566; line-height: 1.6; }
}
</style>
