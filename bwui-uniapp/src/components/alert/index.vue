<template>
  <view
    v-if="show"
    class="bw-alert"
    :class="[
      `bw-alert--${type}`,
      { 'bw-alert--fixed': fixed },
      { 'bw-alert--plain': plain },
    ]"
  >
    <view class="bw-alert__left">
      <slot name="icon">
        <text v-if="showIcon" :class="`bw-icon bw-icon-${iconName}`" class="bw-alert__icon"></text>
      </slot>
    </view>
    <view class="bw-alert__content">
      <view v-if="title" class="bw-alert__title">{{ title }}</view>
      <view v-if="$slots.default" class="bw-alert__description">
        <slot></slot>
      </view>
    </view>
    <view v-if="closable" class="bw-alert__right" @click="handleClose">
      <slot name="close">
        <text class="bw-icon bw-icon-close"></text>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

export interface AlertProps {
  show?: boolean;
  type?: 'primary' | 'success' | 'warning' | 'danger';
  title?: string;
  closable?: boolean;
  showIcon?: boolean;
  fixed?: boolean;
  plain?: boolean;
}

const props = withDefaults(defineProps<AlertProps>(), {
  show: true,
  type: 'primary',
  closable: false,
  showIcon: true,
  fixed: false,
  plain: false,
});

const emit = defineEmits<{
  'close': [];
}>();

const iconName = computed(() => {
  const icons: Record<string, string> = {
    primary: 'alert-fill',
    success: 'check-circle',
    warning: 'alert',
    danger: 'alert-fill',
  };
  return icons[props.type] || 'alert-fill';
});

const handleClose = () => {
  emit('close');
};
</script>

<style lang="scss" scoped>
.bw-alert {
  display: flex;
  align-items: flex-start;
  padding: $padding-sm $padding-md;
  background-color: #fef4d2;
  border-radius: $border-radius-md;

  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }

  &--primary {
    color: $primary-color;
    background-color: lighten($primary-color, 40%);
  }

  &--success {
    color: $success-color;
    background-color: lighten($success-color, 40%);
  }

  &--warning {
    color: darken($warning-color, 10%);
    background-color: lighten($warning-color, 20%);
  }

  &--danger {
    color: $danger-color;
    background-color: lighten($danger-color, 40%);
  }

  &--plain {
    border: 1px solid currentColor;
    background-color: transparent;
  }

  &__left {
    margin-right: $padding-xs;
  }

  &__right {
    margin-left: $padding-xs;
    cursor: pointer;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-size: $font-size-sm;
    font-weight: 500;
  }

  &__description {
    margin-top: 4px;
    font-size: $font-size-sm;
  }

  &__icon {
    font-size: $font-size-lg;
  }
}
</style>
