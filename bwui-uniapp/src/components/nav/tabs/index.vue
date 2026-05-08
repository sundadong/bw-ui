<template>
  <view class="bw-tabs" :class="{ 'bw-tabs--fixed': fixed }">
    <view class="bw-tabs__body" :class="{ 'bw-tabs__body--scroll': scroll }">
      <view
        v-for="(tab, index) in tabs"
        :key="index"
        class="bw-tabs__item"
        :class="{
          'is-active': index === currentIndex,
          'is-disabled': tab.disabled,
        }"
        @click="handleTabClick(index)"
      >
        <text>{{ tab.title }}</text>
        <view v-if="index === currentIndex && line" class="bw-tabs__line"></view>
      </view>
    </view>
    <view v-if="$slots.content" class="bw-tabs__content">
      <slot name="content"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

export interface Tab {
  title: string;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  currentIndex?: number;
  fixed?: boolean;
  scroll?: boolean;
  line?: boolean;
}

const props = withDefaults(defineProps<TabsProps>(), {
  currentIndex: 0,
  fixed: false,
  scroll: false,
  line: true,
});

const emit = defineEmits<{
  'update:currentIndex': [index: number];
  'change': [index: number];
}>();

const handleTabClick = (index: number) => {
  if (props.tabs[index].disabled) {
    return;
  }
  emit('update:currentIndex', index);
  emit('change', index);
};
</script>

<style lang="scss" scoped>
.bw-tabs {
  background-color: #ffffff;

  &--fixed {
    .bw-tabs__body {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 99;
    }
  }

  &__body {
    position: relative;
    display: flex;
    height: 44px;
    background-color: #ffffff;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background-color: $border-color;
    }

    &--scroll {
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar {
        display: none;
      }

      .bw-tabs__item {
        flex: 0 0 auto;
      }
    }
  }

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 0 12px;
    font-size: $font-size-lg;
    color: $text-color;
    text-align: center;
    cursor: pointer;

    &.is-active {
      color: $primary-color;
      font-weight: 500;
    }

    &.is-disabled {
      opacity: 0.4;
    }
  }

  &__line {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 30px;
    height: 2px;
    background-color: $primary-color;
    transform: translateX(-50%);
    border-radius: 1px;
  }

  &__content {
    padding-top: 44px;
  }
}
</style>
