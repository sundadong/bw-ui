<template>
  <component
    :is="to ? 'router-link' : href ? 'a' : 'div'"
    :to="to"
    :href="href"
    class="bw-tabbar-item"
    :class="{ 'bw-tabbar-item--active': isActive }"
    :style="itemStyle"
    @click="handleClick"
  >
    <div class="bw-tabbar-item__icon">
      <div v-if="dot" class="bw-tabbar-item__dot"></div>
      <bw-badge
        v-else-if="badge || badge === 0"
        :content="badge"
        v-bind="badgeProps"
        class="bw-tabbar-item__badge"
      >
        <slot name="icon">
          <bw-icon v-if="icon" :name="icon" :class-prefix="iconPrefix" />
        </slot>
      </bw-badge>
      <slot v-else name="icon">
        <bw-icon v-if="icon" :name="icon" :class-prefix="iconPrefix" />
      </slot>
    </div>
    <div class="bw-tabbar-item__text">
      <slot></slot>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import BwBadge from '../badge/index.vue'
import BwIcon from '../icon/index.vue'

export interface TabbarItemProps {
  name?: number | string
  icon?: string
  iconPrefix?: string
  dot?: boolean
  badge?: string | number
  badgeProps?: Record<string, unknown>
  href?: string
  to?: string
}

const props = withDefaults(defineProps<TabbarItemProps>(), {
  iconPrefix: 'bwicon',
  dot: false
})

const emit = defineEmits<{
  click: [event: Event]
}>()

const parent = inject<{
  activeName: { value: number | string }
  updateActive: (name: number | string) => void
  activeColor: { value: string | undefined }
  inactiveColor: { value: string | undefined }
} | null>('tabbar', null)

const isActive = computed(() => {
  if (!parent) return false
  return parent.activeName.value === props.name
})

const itemStyle = computed(() => {
  const style: Record<string, string> = {}
  if (parent) {
    if (isActive.value && parent.activeColor.value) {
      style.color = parent.activeColor.value
    } else if (!isActive.value && parent.inactiveColor.value) {
      style.color = parent.inactiveColor.value
    }
  }
  return style
})

const handleClick = (event: Event) => {
  if (parent) {
    parent.updateActive(props.name!)
  }
  emit('click', event)
}
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.bw-tabbar-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $bw-text-color-2;
  font-size: $bw-font-size-sm;
  line-height: 1;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  transition: color $bw-animation-duration-fast;

  &--active {
    color: $bw-primary-color;
  }

  &__icon {
    position: relative;
    margin-bottom: 4px;
    font-size: 22px;
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
    font-size: inherit;
  }

  &__text {
    font-size: $bw-font-size-sm;
  }
}
</style>