<template>
  <div class="bw-tag" :class="tagClass" :style="tagStyle">
    <slot></slot>
    <div v-if="closable" class="bw-tag__close" @click="handleClose">
      <bw-icon name="cross" :size="closeSize" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BwIcon from '../icon/index.vue'

export interface TagProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'default'
  size?: 'small' | 'medium'
  color?: string
  plain?: boolean
  round?: boolean
  mark?: boolean
  closable?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<TagProps>(), {
  type: 'default',
  size: 'small',
  plain: false,
  round: false,
  mark: false,
  closable: false,
  disabled: false
})

const emit = defineEmits<{
  close: [event: Event]
}>()

const closeSize = computed(() => props.size === 'small' ? '10px' : '12px')

const tagClass = computed(() => {
  return [
    `bw-tag--${props.type}`,
    `bw-tag--${props.size}`,
    {
      'bw-tag--plain': props.plain,
      'bw-tag--round': props.round,
      'bw-tag--mark': props.mark,
      'bw-tag--closable': props.closable,
      'bw-tag--disabled': props.disabled
    }
  ]
})

const tagStyle = computed(() => {
  if (props.color) {
    return {
      color: props.plain ? props.color : '#fff',
      backgroundColor: props.plain ? 'transparent' : props.color,
      borderColor: props.color
    }
  }
  return {}
})

const handleClose = (event: Event) => {
  if (!props.disabled) {
    emit('close', event)
  }
}
</script>

<style lang="less">
@import '../../styles/variables.less';

.bw-tag {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 8px;
  height: 24px;
  font-size: @bw-tag-font-size;
  line-height: 1.5;
  border-radius: @bw-tag-border-radius;
  border: 1px solid transparent;
  white-space: nowrap;
  vertical-align: middle;

  &--small {
    height: 20px;
    padding: 0 6px;
    font-size: @bw-font-size-xs;
  }

  &--medium {
    height: 28px;
    padding: 0 8px;
    font-size: @bw-tag-font-size;
  }

  &--plain {
    background-color: transparent;
    border-color: currentColor;
  }

  &--round {
    border-radius: @bw-border-radius-round;
  }

  &--mark {
    border-radius: 0  @bw-border-radius-round  @bw-border-radius-round 0;
  }

  &--closable {
    padding-right: 20px;
  }

  &--disabled {
    opacity: @bw-disabled-opacity;
    cursor: not-allowed;
  }

  &--default {
    color: @bw-text-color-2;
    background-color: @bw-gray-6;
    border-color: @bw-gray-6;
  }

  &--primary {
    color: @bw-white;
    background-color: @bw-primary-color;
    border-color: @bw-primary-color;
  }

  &--success {
    color: @bw-white;
    background-color: @bw-success-color;
    border-color: @bw-success-color;
  }

  &--warning {
    color: @bw-white;
    background-color: @bw-warning-color;
    border-color: @bw-warning-color;
  }

  &--danger {
    color: @bw-white;
    background-color: @bw-danger-color;
    border-color: @bw-danger-color;
  }

  &--plain {
    &.bw-tag--default {
      color: @bw-text-color-2;
      background-color: transparent;
      border-color: @bw-text-color-2;
    }
    &.bw-tag--primary {
      color: @bw-primary-color;
      background-color: transparent;
      border-color: @bw-primary-color;
    }
    &.bw-tag--success {
      color: @bw-success-color;
      background-color: transparent;
      border-color: @bw-success-color;
    }
    &.bw-tag--warning {
      color: @bw-warning-color;
      background-color: transparent;
      border-color: @bw-warning-color;
    }
    &.bw-tag--danger {
      color: @bw-danger-color;
      background-color: transparent;
      border-color: @bw-danger-color;
    }
  }

  &__close {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    cursor: pointer;
  }
}
</style>
