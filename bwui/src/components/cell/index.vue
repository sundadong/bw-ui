<template>
  <div
    class="bw-cell"
    :class="[
      { 'bw-cell--clickable': isClickable },
      { 'bw-cell--disabled': disabled },
      { 'bw-cell--center': center },
      { 'bw-cell--large': large },
      { 'bw-cell--required': required }
    ]"
    @click="handleClick"
  >
    <div v-if="$slots['left-icon'] ||  $slots.icon || icon" class="bw-cell__left-icon">
      <slot name="left-icon">
        <slot name="icon">
          <bw-icon :name="icon" :size="iconSize" />
        </slot>
      </slot>
    </div>
    <div class="bw-cell__title">
      <div v-if="$slots.title || title" class="bw-cell__title-text">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="$slots.label || label" class="bw-cell__label">
        <slot name="label">{{ label }}</slot>
      </div>
    </div>
    <div class="bw-cell__value">
      <slot>{{ value }}</slot>
    </div>
    <div v-if="$slots['right-icon'] ||  $slots.extra || isLink || arrow" class="bw-cell__right-icon">
      <slot name="right-icon">
        <slot name="extra">
          <bw-icon v-if="isLink || arrow" name="arrow" size="16px" />
        </slot>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BwIcon from '../icon/index.vue'

export interface CellProps {
  title?: string
  value?: string
  label?: string
  icon?: string
  iconSize?: string
  isLink?: boolean
  arrow?: boolean
  center?: boolean
  disabled?: boolean
  clickable?: boolean
  large?: boolean
  required?: boolean
  border?: boolean
}

const props = withDefaults(defineProps<CellProps>(), {
  iconSize: '16px',
  isLink: false,
  arrow: false,
  center: false,
  disabled: false,
  clickable: false,
  large: false,
  required: false,
  border: true
})

const emit = defineEmits<{
  click: [event: Event]
}>()

const isClickable = computed(() => {
  return (props.clickable || props.isLink || props.arrow) && !props.disabled
})

const handleClick = (event: Event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.bw-cell {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  min-height: @bw-cell-height;
  padding: @bw-cell-padding;
  padding-left: @bw-cell-padding-left;
  padding-right: @bw-cell-padding-right;
  font-size: @bw-cell-font-size;
  line-height: @bw-cell-line-height;
  color: @bw-text-color;
  background-color: inherit;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: @bw-cell-padding-left;
    right: 0;
    height: 1px;
    background-color: @bw-border-color;
    transform: scaleY(0.5);
  }

  &--clickable {
    cursor: pointer;

    &:active {
      background-color: @bw-active-color;
    }
  }

  &--disabled {
    color: @bw-text-color-3;
    cursor: not-allowed;
  }

  &--center {
    align-items: center;
  }

  &--large {
    min-height: @bw-cell-large-height;
    padding-top: @bw-padding-md;
    padding-bottom: @bw-padding-md;

    .bw-cell__title-text {
      font-size: @bw-font-size-lg;
    }

    .bw-cell__label {
      font-size: @bw-font-size-md;
    }
  }

  &--required {
    .bw-cell__title-text {
      &::before {
        content: '*';
        position: absolute;
        left: -8px;
        color: @bw-cell-required-color;
      }
    }
  }

  &__left-icon {
    display: flex;
    align-items: center;
    margin-right: @bw-padding-sm;
    color: @bw-text-color-2;
  }

  &__title {
    flex: 1;
    min-width: 0;
    position: relative;

    &-text {
      color: @bw-text-color;
      word-wrap: break-word;
    }
  }

  &__label {
    margin-top: @bw-padding-xs;
    font-size: @bw-font-size-sm;
    color: @bw-cell-label-color;
    line-height: @bw-line-height-sm;
  }

  &__value {
    flex: 1;
    min-width: 0;
    margin-right: @bw-padding-sm;
    color: @bw-cell-value-color;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__right-icon {
    display: flex;
    align-items: center;
    margin-left: @bw-padding-xs;
    color: @bw-cell-arrow-color;
  }
}
</style>
