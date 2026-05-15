<template>
  <view
    class="bw-cell"
    :class="[
      { 'bw-cell--clickable': isClickable },
      { 'bw-cell--disabled': disabled },
      { 'bw-cell--center': center }
    ]"
    @click="handleClick"
  >
    <view v-if="$slots.icon || icon" class="bw-cell__left-icon">
      <slot name="icon">
        <bw-icon :name="icon" :size="iconSize" />
      </slot>
    </view>
    <view class="bw-cell__title">
      <view v-if="$slots.title || title" class="bw-cell__title-text">
        <slot name="title">{{ title }}</slot>
      </view>
      <view v-if="$slots.label || label" class="bw-cell__label">
        <slot name="label">{{ label }}</slot>
      </view>
    </view>
    <view class="bw-cell__value">
      <slot>{{ value }}</slot>
    </view>
    <view v-if="$slots.extra || isLink || arrow" class="bw-cell__right-icon">
      <slot name="extra">
        <bw-icon v-if="isLink || arrow" name="arrow" size="16px" />
      </slot>
    </view>
  </view>
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
}

const props = withDefaults(defineProps<CellProps>(), {
  iconSize: '16px',
  isLink: false,
  arrow: false,
  center: false,
  disabled: false,
  clickable: false
})

const emit = defineEmits<{
  click: [event: Event]
}>()

const isClickable = computed(() => {
  return props.clickable || props.isLink || props.arrow
})

const handleClick = (event: Event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
.bw-cell {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  min-height: $bw-cell-height;
  padding: $bw-cell-padding;
  font-size: $bw-cell-font-size;
  line-height: $bw-cell-line-height;
  color: $bw-text-color;
  background-color: $bw-bg-color;

  &--clickable {
    cursor: pointer;

    &:active {
      background-color: $bw-active-color;
    }
  }

  &--disabled {
    color: $bw-text-color-3;
    cursor: not-allowed;
  }

  &--center {
    align-items: center;
  }

  &__left-icon {
    display: flex;
    align-items: center;
    margin-right: $bw-padding-sm;
    color: $bw-text-color-2;
  }

  &__title {
    flex: 1;
    min-width: 0;

    &-text {
      color: $bw-text-color;
    }
  }

  &__label {
    margin-top: $bw-padding-xs;
    font-size: $bw-font-size-sm;
    color: $bw-text-color-2;
    line-height: $bw-line-height-sm;
  }

  &__value {
    flex: 1;
    min-width: 0;
    margin-right: $bw-padding-sm;
    color: $bw-text-color-2;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__right-icon {
    display: flex;
    align-items: center;
    margin-left: $bw-padding-xs;
    color: $bw-text-color-3;
  }
}
</style>
