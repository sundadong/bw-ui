<template>
  <view class="bw-badge" :class="{ 'bw-badge--fixed': fixed }">
    <slot></slot>
    <view
      v-if="showBadge"
      class="bw-badge__content"
      :class="[`bw-badge__content--${type}`, { 'bw-badge__content--dot': dot }]"
    >
      <text v-if="!dot && content !== ''">{{ content }}</text>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  content: { type: [String, Number], default: '' },
  dot: { type: Boolean, default: false },
  max: { type: Number, default: 99 },
  type: { type: String, default: 'primary' },
  showZero: { type: Boolean, default: false },
  fixed: { type: Boolean, default: true }
});

const showBadge = computed(() => {
  if (props.dot) return true;
  if (props.content === '' || props.content === null || props.content === undefined) return false;
  if (!props.showZero && props.content === 0) return false;
  return true;
});

const displayContent = computed(() => {
  if (typeof props.content === 'number' && props.content > props.max) {
    return `${props.max}+`;
  }
  return props.content;
});
</script>

<style scoped lang="scss">
.bw-badge {
  position: relative;
  display: inline-block;
  
  &--fixed {
    .bw-badge__content { position: absolute; top: 0; right: 0; transform: translate(50%, -50%); }
  }
  
  &__content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    font-size: 10px;
    font-weight: 600;
    color: #fff;
    background: #1989fa;
    border-radius: 8px;
    
    &--dot {
      width: 8px;
      height: 8px;
      min-width: 0;
      padding: 0;
    }
    
    &--primary { background: #1989fa; }
    &--success { background: #07c160; }
    &--warning { background: #ff976a; }
    &--danger { background: #ee0a24; }
  }
}
</style>
