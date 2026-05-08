<template>
  <button
    class="bw-button"
    :class="[
      `bw-button--${type}`,
      `bw-button--${size}`,
      { 'bw-button--plain': plain },
      { 'bw-button--round': round },
      { 'bw-button--square': square },
      { 'bw-button--disabled': disabled },
      { 'bw-button--loading': loading }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <view v-if="loading" class="bw-button__loading"></view>
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: 'default' },
  size: { type: String, default: 'medium' },
  plain: Boolean,
  round: Boolean,
  square: Boolean,
  disabled: Boolean,
  loading: Boolean
});

const emit = defineEmits(['click']);
const handleClick = (e) => {
  if (!props.disabled && !props.loading) {
    emit('click', e);
  }
};
</script>

<style scoped lang="scss">
$primary: #1989fa;
$success: #07c160;
$warning: #ff976a;
$danger: #ee0a24;
$text: #323233;
$border: #ebedf0;
$sm: 12px;
$md: 14px;
$lg: 16px;

.bw-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: $md;
  transition: all 0.2s;

  &--default {
    background: #fff;
    border-color: $border;
    color: $text;
  }

  &--primary {
    background: $primary;
    border-color: $primary;
    color: #fff;
    &.bw-button--plain {
      background: #e6f4ff;
      border-color: $primary;
      color: $primary;
    }
  }

  &--success {
    background: $success;
    border-color: $success;
    color: #fff;
  }

  &--warning {
    background: $warning;
    border-color: $warning;
    color: #fff;
  }

  &--danger {
    background: $danger;
    border-color: $danger;
    color: #fff;
  }

  &--small { height: 28px; font-size: $sm; }
  &--medium { height: 36px; }
  &--large { height: 44px; font-size: $lg; }
  &--round { border-radius: 999px; }
  &--square { border-radius: 0; }
  &--disabled { opacity: 0.5; cursor: not-allowed; }
  &--loading { cursor: wait; }

  &__loading {
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 4px;
  }
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
