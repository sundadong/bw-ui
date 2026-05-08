<template>
  <view class="bw-tag" :class="tagClass" @click="handleClick">
    <slot></slot>
    <text v-if="closable" class="bw-tag__close" @click.stop="handleClose">
      <text class="bw-icon bw-icon-close"></text>
    </text>
  </view>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

export interface TagProps {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium';
  plain?: boolean;
  round?: boolean;
  closable?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<TagProps>(), {
  type: 'default',
  size: 'medium',
  plain: false,
  round: false,
  closable: false,
  disabled: false,
});

const emit = defineEmits<{
  click: [event: Event];
  close: [];
}>();

const tagClass = computed(() => {
  return [
    `bw-tag--${props.type}`,
    `bw-tag--${props.size}`,
    {
      'bw-tag--plain': props.plain,
      'bw-tag--round': props.round,
      'bw-tag--disabled': props.disabled,
    },
  ];
});

const handleClick = (event: Event) => {
  if (!props.disabled) {
    emit('click', event);
  }
};

const handleClose = () => {
  emit('close');
};
</script>

<style lang="scss" scoped>
.bw-tag {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 8px;
  font-size: $font-size-sm;
  color: $text-color;
  line-height: 24px;
  background-color: #ffffff;
  border: 1px solid $border-color;
  border-radius: $border-radius-sm;
  box-sizing: border-box;

  & + & {
    margin-left: $padding-xs;
  }

  &--small {
    height: 16px;
    padding: 0 4px;
    font-size: $font-size-xs;
    line-height: 16px;
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
    border: 1px solid currentColor;
  }

  &--primary.bw-tag--plain {
    color: $primary-color;
  }

  &--success.bw-tag--plain {
    color: $success-color;
  }

  &--warning.bw-tag--plain {
    color: $warning-color;
  }

  &--danger.bw-tag--plain {
    color: $danger-color;
  }

  &--round {
    border-radius: 12px;
  }

  &--disabled {
    opacity: 0.5;
  }

  &__close {
    margin-left: 4px;
    font-size: 12px;
    opacity: 0.7;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
