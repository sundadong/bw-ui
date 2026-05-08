<template>
  <view
    class="bw-cell"
    :class="{
      'bw-cell--disabled': disabled,
      'bw-cell--no-border': border === false,
      'bw-cell--clickable': isClickable,
      'bw-cell--center': center,
    }"
    @click="handleClick"
  >
    <view v-if="$slots.icon || leftIcon" class="bw-cell__left-icon-wrap">
      <slot name="icon">
        <text :class="`bw-icon bw-icon-${leftIcon}`"></text>
      </slot>
    </view>
    <view v-if="$slots.thumb || thumb" class="bw-cell__left-thumb">
      <slot name="thumb">
        <image class="bw-cell__thumb" :src="thumb" mode="aspectFill"></image>
      </slot>
    </view>
    <view class="bw-cell__content">
      <view v-if="title || $slots.title" class="bw-cell__title">
        <slot name="title">
          <text>{{ title }}</text>
        </slot>
        <view v-if="label || $slots.label" class="bw-cell__label">
          <slot name="label">
            <text>{{ label }}</text>
          </slot>
        </view>
      </view>
      <view class="bw-cell__value">
        <slot>{{ value }}</slot>
      </view>
    </view>
    <view v-if="isLink || $slots['right-icon']" class="bw-cell__right-icon-wrap">
      <slot name="right-icon">
        <text :class="`bw-icon bw-icon-${rightIcon || 'chevron-right'}`"></text>
      </slot>
    </view>
    <view v-if="$slots.extra || extra" class="bw-cell__extra">
      <slot name="extra">{{ extra }}</slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

export interface CellProps {
  title?: string;
  value?: string;
  label?: string;
  center?: boolean;
  border?: boolean;
  isLink?: boolean;
  disabled?: boolean;
  clickable?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  thumb?: string;
  extra?: string;
}

const props = withDefaults(defineProps<CellProps>(), {
  center: false,
  border: true,
  isLink: false,
  disabled: false,
  clickable: false,
});

const emit = defineEmits<{
  click: [event: Event];
}>();

const isClickable = computed(() => {
  return props.clickable || props.isLink;
});

const handleClick = (event: Event) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style lang="scss" scoped>
.bw-cell {
  display: flex;
  align-items: center;
  width: 100%;
  padding: $padding-sm $padding-md;
  font-size: $font-size-md;
  color: $text-color;
  background-color: #ffffff;
  box-sizing: border-box;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: $padding-md;
    right: 0;
    height: 1px;
    background-color: $border-color;
  }

  &:last-child::after {
    display: none;
  }

  &--disabled {
    opacity: 0.6;
  }

  &--no-border::after {
    display: none;
  }

  &--clickable {
    cursor: pointer;

    &:active {
      background-color: #f6f6f6;
    }
  }

  &--center {
    align-items: center;
  }

  &__content {
    display: flex;
    flex: 1;
    align-items: center;
    min-width: 0;
    overflow: hidden;
  }

  &__title {
    flex: 1;
    min-width: 0;

    &:empty {
      display: none;
    }
  }

  &__value {
    flex: 1;
    color: $text-color-2;
    text-align: right;
    overflow: hidden;

    &:empty {
      display: none;
    }
  }

  &__label {
    margin-top: 4px;
    font-size: $font-size-sm;
    color: $text-color-3;
    line-height: 1.4;
  }

  &__left-icon-wrap,
  &__right-icon-wrap {
    display: flex;
    align-items: center;
  }

  &__left-icon-wrap {
    margin-right: $padding-xs;
    color: $text-color-2;
  }

  &__right-icon-wrap {
    margin-left: $padding-xs;
    color: $text-color-3;
  }

  &__left-thumb,
  &__right-thumb {
    width: 30px;
    height: 30px;
    border-radius: $border-radius-sm;
  }

  &__left-thumb {
    margin-right: $padding-sm;
  }

  &__right-thumb {
    margin-left: $padding-sm;
  }

  &__extra {
    margin-left: $padding-xs;
    flex-shrink: 0;
    color: $text-color-3;
    font-size: $font-size-sm;
  }
}
</style>
