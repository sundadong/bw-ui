<template>
  <view class="bw-button" :class="buttonClass" @click="handleClick">
    <view v-if="loading" class="bw-button__loading"></view>
    <slot></slot>
  </view>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'default' },
  size: { type: String, default: 'medium' },
  plain: Boolean,
  round: Boolean,
  block: Boolean,
  disabled: Boolean,
  loading: Boolean
});

const buttonClass = computed(() => ({
  [`bw-button--${props.type}`]: true,
  [`bw-button--${props.size}`]: true,
  'bw-button--plain': props.plain,
  'bw-button--round': props.round,
  'bw-button--block': props.block,
  'bw-button--disabled': props.disabled,
  'bw-button--loading': props.loading
}));

const props = defineProps({
  type: { type: String, default: 'default' },
  size: { type: String, default: 'medium' },
  plain: Boolean,
  round: Boolean,
  block: Boolean,
  disabled: Boolean,
  loading: Boolean
});

const handleClick = () => {
  if (!props.disabled && !props.loading) {
    emit('click');
  }
};

const emit = defineEmits(['click']);
</script>

<style lang="scss">
.bw-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 16px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  
  &--primary { color: #fff; background: #1989fa; border-color: #1989fa; }
  &--success { color: #fff; background: #07c160; border-color: #07c160; }
  &--warning { color: #fff; background: #ff976a; border-color: #ff976a; }
  &--danger { color: #fff; background: #ee0a24; border-color: #ee0a24; }
  &--default { color: #323233; background: #fff; border-color: #d9d9d9; }
  
  &--small { height: 28px; padding: 0 12px; font-size: 12px; }
  &--large { height: 44px; padding: 0 24px; font-size: 16px; }
  &--block { display: flex; width: 100%; }
  &--round { border-radius: 999px; }
  &--plain.bw-button--primary { color: #1989fa; background: transparent; }
  &--disabled { opacity: 0.4; cursor: not-allowed; }
  &--loading { cursor: wait; }
  
  &__loading {
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 6px;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
