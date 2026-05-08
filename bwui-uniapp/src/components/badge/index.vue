<template>
  <view class="bw-badge">
    <slot></slot>
    <view v-if="content || dot" class="bw-badge__content" :class="[`bw-badge--${type}`, { 'bw-badge--dot': dot }]">
      {{ dot ? '' : content }}
    </view>
  </view>
</template>

<script setup>
defineProps({
  content: { type: [String, Number], default: '' },
  dot: { type: Boolean, default: false },
  type: { type: String, default: 'danger' }
});
</script>

<style scoped lang="scss">
.bw-badge {
  display: inline-block;
  position: relative;
  &__content {
    position: absolute;
    top: -6px;
    right: -8px;
    padding: 0 6px;
    min-width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    font-size: 10px;
    color: #fff;
    border-radius: 9px;
    transform: translate(50%, -50%);
    &.bw-badge--dot { width: 8px; height: 8px; min-width: 0; padding: 0; border-radius: 50%; }
    &.bw-badge--primary { background: #1989fa; }
    &.bw-badge--success { background: #07c160; }
    &.bw-badge--warning { background: #ff976a; }
    &.bw-badge--danger { background: #ee0a24; }
  }
}
</style>
