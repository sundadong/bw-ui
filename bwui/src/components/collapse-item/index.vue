<template>
  <div class="bw-collapse-item" :class="[sizeClass, { 'bw-collapse-item--border': border, 'bw-collapse-item--disabled': disabled }]">
    <div
      class="bw-collapse-item__title"
      :class="{ 'bw-collapse-item__title--disabled': disabled, 'bw-collapse-item__title--readonly': readonly, 'bw-collapse-item__title--active': isExpanded }"
      @click="handleToggle"
    >
      <div class="bw-collapse-item__title-left">
        <slot v-if="$slots.icon" name="icon"></slot>
        <bw-icon v-else-if="icon" :name="icon" class="bw-collapse-item__icon" />
        <span class="bw-collapse-item__title-text">{{ title }}<slot name="title"></slot></span>
      </div>
      <div class="bw-collapse-item__title-right">
        <slot name="value"></slot>
        <div v-if="isLink" class="bw-collapse-item__arrow" :class="{ 'bw-collapse-item__arrow--expanded': isExpanded }">
          <bw-icon name="arrow-down" size="14px" />
        </div>
      </div>
    </div>
    <div class="bw-collapse-item__wrapper" :class="{ 'bw-collapse-item__wrapper--expanded': isExpanded }">
      <div class="bw-collapse-item__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import BwIcon from '../icon/index.vue'

export interface CollapseItemProps {
  name: string | number
  title?: string
  icon?: string
  disabled?: boolean
  readonly?: boolean
  size?: 'large'
  border?: boolean
  isLink?: boolean
}

const props = withDefaults(defineProps<CollapseItemProps>(), {
  name: '',
  title: '',
  icon: '',
  disabled: false,
  readonly: false,
  size: undefined,
  border: true,
  isLink: true
})

const collapse = inject<{
  toggleItem: (name: string | number) => void
  isActive: (name: string | number) => boolean
  activeNames: ReturnType<typeof import('vue').ref<(string | number)[]>>
}>('collapse')

const isExpanded = computed(() => {
  if (!collapse) return false
  return collapse.isActive(props.name)
})

const sizeClass = computed(() => {
  if (props.size === 'large') {
    return 'bw-collapse-item--large'
  }
  return ''
})

const handleToggle = () => {
  if (props.disabled || props.readonly) return
  if (collapse) {
    collapse.toggleItem(props.name)
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.bw-collapse-item {
  &--large {
    .bw-collapse-item__title {
      height: $bw-cell-large-height;
    }
  }

  &--border {
    & + .bw-collapse-item {
      border-top: 1px solid $bw-border-color;
    }
  }

  &--disabled {
    opacity: $bw-disabled-opacity;
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $bw-cell-height;
    padding: 0 $bw-padding-md;
    font-size: $bw-font-size-md;
    color: $bw-text-color;
    cursor: pointer;
    transition: background-color $bw-animation-duration-fast;

    &:active {
      background-color: $bw-active-color;
    }

    &--disabled {
      cursor: not-allowed;

      &:active {
        background-color: transparent;
      }
    }

    &--readonly {
      cursor: default;

      &:active {
        background-color: transparent;
      }
    }

    &--active {
      .bw-collapse-item__title-text {
        font-weight: 500;
      }
    }

    &-left {
      display: flex;
      align-items: center;
      flex: 1;
      min-width: 0;
    }

    &-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &-right {
      display: flex;
      align-items: center;
      margin-left: $bw-padding-xs;
      color: $bw-text-color-2;
      font-size: $bw-font-size-sm;
    }
  }

  &__icon {
    margin-right: $bw-padding-xs;
    font-size: $bw-font-size-lg;
  }

  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform $bw-animation-duration-base;
    color: $bw-text-color-3;

    &--expanded {
      transform: rotate(180deg);
    }
  }

  &__wrapper {
    height: 0;
    overflow: hidden;
    transition: height $bw-animation-duration-base $bw-animation-timing-function-base;
  }

  &__content {
    padding: $bw-padding-sm $bw-padding-md;
    font-size: $bw-font-size-sm;
    color: $bw-text-color-2;
    line-height: $bw-line-height-md;
    background-color: $bw-white;
  }
}
</style>