<template>
  <view class="bw-divider" :class="[`bw-divider--${contentPosition}`]">
    <view v-if=" dashed" class="bw-divider__line bw-divider__line--dashed"></view>
    <view v-else class="bw-divider__line"></view>
    <text v-if="$slots.default" class="bw-divider__content"><slot></slot></text>
    <view v-if=" dashed" class="bw-divider__line bw-divider__line--dashed"></view>
    <view v-else class="bw-divider__line"></view>
  </view>
</template>

<script setup>
defineProps({
  dashed: { type: Boolean, default: false },
  hairline: { type: Boolean, default: true },
  contentPosition: { type: String, default: 'center' },
  color: { type: String, default: '#ebedf0' }
});
</script>

<style scoped lang="scss">
.bw-divider {
  display: flex;
  align-items: center;
  margin: 16px 0;

  &__line {
    flex: 1;
    height: 1px;
    background: #ebedf0;

    &--dashed {
      background: none;
      border-top: 1px dashed #ebedf0;
    }
  }

  &__content {
    padding: 0 16px;
    font-size: 12px;
    color: #969799;
  }

  &--left &__content { padding-left: 0; }
  &--right &__content { padding-right: 0; }
}
</style>
