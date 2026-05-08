<template>
  <view
    v-if="show"
    class="bw-popup"
    :class="[`bw-popup--${position}`, { 'is-active': show }]"
    @click="handleMaskClick"
  >
    <view class="bw-popup__mask" @click="handleMaskClick"></view>
    <view
      class="bw-popup__container"
      :style="containerStyle"
      @click.stop="handleContainerClick"
    >
      <view v-if="title || $slots.title" class="bw-popup__header">
        <slot name="title">
          <text>{{ title }}</text>
        </slot>
        <text
          v-if="closeable"
          class="bw-popup__close"
          @click="handleClose"
        >
          <text class="bw-icon bw-icon-close"></text>
        </text>
      </view>
      <view class="bw-popup__body">
        <slot></slot>
      </view>
      <view v-if="$slots.footer" class="bw-popup__footer">
        <slot name="footer"></slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

export interface PopupProps {
  show: boolean;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  title?: string;
  closeable?: boolean;
  maskClosable?: boolean;
  round?: boolean;
  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<PopupProps>(), {
  position: 'center',
  closeable: false,
  maskClosable: true,
  round: false,
});

const emit = defineEmits<{
  'update:show': [value: boolean];
  'close': [];
  'maskClick': [];
}>();

const containerStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.width) {
    style.width = props.width;
  }
  if (props.height) {
    style.height = props.height;
  }
  if (props.round) {
    style.borderRadius = '12px';
  }
  return style;
});

const handleMaskClick = () => {
  if (props.maskClosable) {
    emit('update:show', false);
    emit('close');
    emit('maskClick');
  }
};

const handleContainerClick = () => {};

const handleClose = () => {
  emit('update:show', false);
  emit('close');
};
</script>

<style lang="scss" scoped>
.bw-popup {
  visibility: hidden;

  &.is-active {
    visibility: visible;

    .bw-popup__mask {
      display: block;
    }

    .bw-popup__container {
      opacity: 1;
    }
  }

  &__mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.5);
    display: none;
  }

  &__container {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 110;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    transform: translate(-50%, -50%);
    transition: all $animation-duration-normal;
    opacity: 0;
    max-height: 80vh;
    overflow: hidden;
  }

  &--top,
  &--left,
  &--right,
  &--bottom {
    &.is-active {
      .bw-popup__container {
        opacity: 1;
      }
    }
  }

  &--top {
    .bw-popup__container {
      top: 0;
      left: 0;
      right: 0;
      bottom: auto;
      width: 100% !important;
      max-width: 100%;
      transform: translateY(-100%);
      border-radius: 0 0 12px 12px;
    }

    &.is-active {
      .bw-popup__container {
        transform: translateY(0);
      }
    }
  }

  &--bottom {
    .bw-popup__container {
      top: auto;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100% !important;
      max-width: 100%;
      transform: translateY(100%);
      border-radius: 12px 12px 0 0;
    }

    &.is-active {
      .bw-popup__container {
        transform: translateY(0);
      }
    }
  }

  &--left {
    .bw-popup__container {
      top: 0;
      left: 0;
      bottom: 0;
      right: auto;
      height: 100% !important;
      max-height: 100%;
      transform: translateX(-100%);
      border-radius: 0 12px 12px 0;
    }

    &.is-active {
      .bw-popup__container {
        transform: translateX(0);
      }
    }
  }

  &--right {
    .bw-popup__container {
      top: 0;
      right: 0;
      bottom: 0;
      left: auto;
      height: 100% !important;
      max-height: 100%;
      transform: translateX(100%);
      border-radius: 12px 0 0 12px;
    }

    &.is-active {
      .bw-popup__container {
        transform: translateX(0);
      }
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $padding-md;
    font-size: $font-size-lg;
    font-weight: 500;
    border-bottom: 1px solid $border-color;
  }

  &__close {
    padding: 4px;
    color: $text-color-3;

    &:active {
      opacity: 0.7;
    }
  }

  &__body {
    flex: 1;
    padding: $padding-md;
    overflow-y: auto;
  }

  &__footer {
    padding: $padding-md;
    border-top: 1px solid $border-color;
  }
}
</style>
