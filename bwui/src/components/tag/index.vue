<template>
  <view class="bw-tag" :class="tagClass" :style="tagStyle">
    <slot></slot>
    <view v-if="closable" class="bw-tag__close" @click="handleClose">
      <bw-icon name="cross" size="12px" />
    </view>
  </view>
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
  size: 'medium',
  plain: false,
  round: false,
  mark: false,
  closable: false,
  disabled: false
})

const emit = defineEmits<{
  close: [event: Event]
}>()

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
      backgroundColor: props.plain ? '#fff' : props.color,
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

<style lang="scss">
.bw-tag {
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 4px;
  font-size: 12px;
  line-height: 1.2;
  border-radius: 2px;
  border: 1px solid transparent;

  &--small {
    height: 18px;
    font-size: 10px;
  }

  &--medium {
    height: 22px;
    font-size: 12px;
  }

  &--plain {
    background-color: #fff;
    border-color: currentColor;
  }

  &--round {
    border-radius: 999px;
  }

  &--mark {
    border-radius: 999px 0 0 999px;
    padding-left: 6px;
  }

  &--closable {
    padding-right: 18px;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--default {
    color: #969799;
    background-color: #f2f3f5;
    border-color: #ebedf0;
  }

  &--primary {
    color: #fff;
    background-color: #1989fa;
    border-color: #1989fa;
  }

  &--success {
    color: #fff;
    background-color: #07c160;
    border-color: #07c160;
  }

  &--warning {
    color: #fff;
    background-color: #ff976a;
    border-color: #ff976a;
  }

  &--danger {
    color: #fff;
    background-color: #ee0a24;
    border-color: #ee0a24;
  }

  &__close {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    cursor: pointer;
  }
}
</style>
