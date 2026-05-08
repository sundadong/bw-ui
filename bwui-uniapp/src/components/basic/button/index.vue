<template>
  <button
    :class="[
      'bw-button',
      `bw-button--${type}`,
      `bw-button--${size}`,
      { 'bw-button--plain': plain },
      { 'bw-button--round': round },
      { 'bw-button--block': block },
      { 'bw-button--disabled': disabled },
      { 'bw-button--loading': loading },
    ]"
    :disabled="disabled || loading"
    :loading="loading"
    :form-type="formType"
    :open-type="openType"
    @click="handleClick"
    @getphonenumber="handlePhoneNumber"
    @getuserinfo="handleUserInfo"
    @error="handleError"
    @opensetting="handleOpenSetting"
  >
    <view class="bw-button__content">
      <view v-if="loading" class="bw-button__loading">
        <view class="bw-button__loading-ring"></view>
      </view>
      <view v-if="icon && !loading" class="bw-button__icon">
        <text :class="`bw-icon-${icon}`"></text>
      </view>
      <view v-if="!block" class="bw-button__text">
        <slot></slot>
      </view>
    </view>
    <view v-if="block" class="bw-button__text">
      <slot></slot>
    </view>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

export interface ButtonProps {
  type?: 'primary' | 'default' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  plain?: boolean;
  round?: boolean;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  formType?: 'submit' | 'reset';
  openType?: 'share' | 'getPhoneNumber' | 'getUserInfo' | 'openSetting' | 'feedback' | 'contact';
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'medium',
  plain: false,
  round: false,
  block: false,
  disabled: false,
  loading: false,
});

const emit = defineEmits<{
  click: [event: Event];
  getphonenumber: [event: Event];
  getuserinfo: [event: Event];
  error: [event: Event];
  opensetting: [event: Event];
}>();

const handleClick = (event: Event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};

const handlePhoneNumber = (event: Event) => {
  emit('getphonenumber', event);
};

const handleUserInfo = (event: Event) => {
  emit('getuserinfo', event);
};

const handleError = (event: Event) => {
  emit('error', event);
};

const handleOpenSetting = (event: Event) => {
  emit('opensetting', event);
};
</script>

<style lang="scss" scoped>
.bw-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: $button-height-md;
  padding: 0 $padding-md;
  font-size: $font-size-md;
  color: $text-color;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: $border-radius-md;
  box-sizing: border-box;
  cursor: pointer;
  transition: all $animation-duration-fast;
  -webkit-tap-highlight-color: transparent;

  &::after {
    border: none;
  }

  &:active {
    opacity: 0.8;
  }

  &--small {
    height: $button-height-sm;
    padding: 0 $padding-sm;
    font-size: $font-size-sm;
  }

  &--large {
    height: $button-height-lg;
    padding: 0 $padding-lg;
    font-size: $font-size-lg;
  }

  &--primary {
    color: #ffffff;
    background-color: $primary-color;
    border-color: $primary-color;
  }

  &--success {
    color: #ffffff;
    background-color: $success-color;
    border-color: $success-color;
  }

  &--warning {
    color: #ffffff;
    background-color: $warning-color;
    border-color: $warning-color;
  }

  &--danger {
    color: #ffffff;
    background-color: $danger-color;
    border-color: $danger-color;
  }

  &--plain {
    background-color: transparent;
  }

  &--primary.bw-button--plain {
    color: $primary-color;
    background-color: transparent;
    border-color: $primary-color;
  }

  &--success.bw-button--plain {
    color: $success-color;
    background-color: transparent;
    border-color: $success-color;
  }

  &--warning.bw-button--plain {
    color: $warning-color;
    background-color: transparent;
    border-color: $warning-color;
  }

  &--danger.bw-button--plain {
    color: $danger-color;
    background-color: transparent;
    border-color: $danger-color;
  }

  &--default.bw-button--plain {
    color: $text-color;
    background-color: transparent;
    border-color: $border-color;
  }

  &--round {
    border-radius: $border-radius-round;
  }

  &--block {
    display: flex;
    width: 100%;
    border-radius: 0;
  }

  &--disabled {
    opacity: $opacity-disabled;
    cursor: not-allowed;
  }

  &--loading {
    cursor: wait;
  }

  &__content {
    display: inline-flex;
    align-items: center;
  }

  &__icon {
    margin-right: 4px;
  }

  &__loading {
    display: flex;
    align-items: center;
    margin-right: 4px;
  }

  &__loading-ring {
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
