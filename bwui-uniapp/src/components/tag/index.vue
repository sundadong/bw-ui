<template>
  <view
    class="bw-tag"
    :class="[
      `bw-tag--${type}`,
      { 'bw-tag--plain': plain },
      { 'bw-tag--round': round },
      { 'bw-tag--disabled': disabled }
    ]"
    @tap="handleClick"
  >
    <slot></slot>
    <view v-if="closeable" class="bw-tag__close" @tap.stop="handleClose">✕</view>
  </view>
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: 'default' },
  plain: { type: Boolean, default: false },
  round: { type: Boolean, default: false },
  size: { type: String, default: 'medium' },
  closeable: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  color: { type: String, default: '' }
});

const emit = defineEmits(['click', 'close']);

const handleClick = () => {
  if (!props.disabled) {
    emit('click');
  }
};

const handleClose = () => {
  emit('close');
};
</script>

<style scoped lang="scss">
.bw-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid currentColor;
  background: currentColor;
  color: #fff;
  transition: all 0.2s;
  
  &--plain {
    background: #fff;
  }
  
  &--round {
    border-radius: 999px;
  }
  
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &--default {
    color: #969799;
    &.bw-tag--plain { color: #969799; }
  }
  
  &--primary {
    color: #1989fa;
    &.bw-tag--plain { color: #1989fa; }
  }
  
  &--success {
    color: #07c160;
    &.bw-tag--plain { color: #07c160; }
  }
  
  &--warning {
    color: #ff976a;
    &.bw-tag--plain { color: #ff976a; }
  }
  
  &--danger {
    color: #ee0a24;
    &.bw-tag--plain { color: #ee0a24; }
  }
  
  &__close {
    margin-left: 4px;
    font-size: 10px;
    cursor: pointer;
    opacity: 0.7;
    &:hover { opacity: 1; }
  }
}
</style>
