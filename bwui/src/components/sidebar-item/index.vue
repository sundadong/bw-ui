<template>
  <component
    :is="to ? 'router-link' : href ? 'a' : 'div'"
    :to="to"
    :href="href"
    class="bw-sidebar-item"
    :class="{ 'bw-sidebar-item--active': isActive, 'bw-sidebar-item--disabled': disabled }"
    @click="handleClick"
  >
    <div class="bw-sidebar-item__content">
      <div v-if="dot" class="bw-sidebar-item__dot"></div>
      <bw-badge
        v-else-if="badge || badge === 0"
        :content="badge"
        v-bind="badgeProps"
        class="bw-sidebar-item__badge"
      >
        <div class="bw-sidebar-item__text">
          <slot>{{ title }}</slot>
        </div>
      </bw-badge>
      <div v-else class="bw-sidebar-item__text">
        <slot>{{ title }}</slot>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import BwBadge from '../badge/index.vue'

export interface SidebarItemProps {
  title?: string
  dot?: boolean
  badge?: string | number
  badgeProps?: Record<string, unknown>
  disabled?: boolean
  href?: string
  to?: string
}

const props = withDefaults(defineProps<SidebarItemProps>(), {
  dot: false,
  disabled: false
})

const emit = defineEmits<{
  click: [event: Event]
}>()

const parent = inject<{
  activeIndex: { value: number | string }
  updateActive: (index: number | string) => void
} | null>('sidebar', null)

let uid = 0
let itemIndex: number | string = uid++

const setIndex = (index: number | string) => {
  itemIndex = index
}

const isActive = computed(() => {
  if (!parent) return false
  return parent.activeIndex.value === itemIndex
})

const handleClick = (event: Event) => {
  if (props.disabled) return
  if (parent) {
    parent.updateActive(itemIndex)
  }
  emit('click', event)
}

defineExpose({ setIndex })
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.bw-sidebar-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 20px 12px;
  font-size: $bw-font-size-md;
  line-height: $bw-line-height-md;
  color: $bw-text-color;
  background-color: $bw-bg-color-gray;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  transition: background-color $bw-animation-duration-fast;

  &--active {
    color: $bw-text-color;
    font-weight: 500;
    background-color: $bw-white;

    .bw-sidebar-item__text {
      color: $bw-text-color;
    }
  }

  &--disabled {
    cursor: not-allowed;
    opacity: $bw-disabled-opacity;
  }

  &__content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  &__dot {
    position: absolute;
    top: -2px;
    right: -8px;
    width: $bw-badge-dot-size;
    height: $bw-badge-dot-size;
    border-radius: 50%;
    background-color: $bw-danger-color;
  }

  &__badge {
    width: 100%;
  }

  &__text {
    text-align: center;
    word-break: break-all;
  }

  &:active:not(&--disabled) {
    background-color: $bw-active-color;
  }
}
</style>