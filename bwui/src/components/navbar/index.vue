<template>
  <view class="bw-navbar" :class="{ 'bw-navbar--fixed': fixed }" :style="navbarStyle">
    <view class="bw-navbar__left" @click="handleBack">
      <view v-if="leftArrow || showBack" class="bw-navbar__arrow">
        <bw-icon name="arrow-left" size="20px" />
      </view>
      <view v-if="$slots.left || leftText" class="bw-navbar__text">
        <slot name="left">{{ leftText }}</slot>
      </view>
    </view>
    <view class="bw-navbar__title">
      <slot name="title">
        <span class="bw-navbar__title-text">{{ title }}</span>
      </slot>
    </view>
    <view class="bw-navbar__right">
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BwIcon from '../icon/index.vue'

export interface NavbarProps {
  title?: string
  leftText?: string
  leftArrow?: boolean
  fixed?: boolean
  placeholder?: boolean
  zIndex?: number | string
  safeAreaInsetTop?: boolean
}

const props = withDefaults(defineProps<NavbarProps>(), {
  leftArrow: false,
  fixed: false,
  placeholder: false,
  zIndex: 100,
  safeAreaInsetTop: true,
  showBack: false
})

const emit = defineEmits<{
  clickLeft: [event: Event]
}>()

const navbarStyle = computed(() => {
  const style: Record<string, string> = {
    zIndex: String(props.zIndex)
  }
  if (props.safeAreaInsetTop) {
    style.paddingTop = 'env(safe-area-inset-top, 0px)'
  }
  return style
})

const handleBack = (event: Event) => {
  emit('clickLeft', event)
}
</script>

<style lang="scss">
.bw-navbar {
  position: relative;
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 16px;
  font-size: 16px;
  background-color: #fff;
  box-sizing: border-box;

  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  &__left {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    cursor: pointer;

    &:active {
      opacity: 0.7;
    }
  }

  &__arrow {
    display: flex;
    align-items: center;
  }

  &__text {
    margin-left: 4px;
    font-size: 14px;
    color: #323233;
  }

  &__title {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    &-text {
      font-size: 16px;
      font-weight: 500;
      color: #323233;
      max-width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &__right {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }
}
</style>
