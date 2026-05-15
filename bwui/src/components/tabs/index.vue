<template>
  <view class="bw-tabs">
    <view class="bw-tabs__nav">
      <view
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['bw-tabs__tab', { 'bw-tabs__tab--active': index === currentIndex }]"
        @click="handleTabClick(index)"
      >
        {{ tab.title }}
      </view>
      <view v-if="lineWidth" class="bw-tabs__line" :style="lineStyle"></view>
    </view>
    <view class="bw-tabs__content">
      <slot :name="'tab' + currentIndex"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

export interface Tab {
  title: string
  disabled?: boolean
}

export interface TabsProps {
  modelValue?: number | string
  tabs?: Tab[]
  lineWidth?: number | string
  color?: string
  background?: string
  sticky?: boolean
  animated?: boolean
  swipeable?: boolean
}

const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: 0,
  tabs: () => [],
  lineWidth: 35,
  color: '#1989fa',
  background: '#fff',
  sticky: false,
  animated: false,
  swipeable: false
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [index: number]
}>()

const currentIndex = ref(props.modelValue as number)

watch(() => props.modelValue, (val) => {
  currentIndex.value = val as number
})

const lineStyle = computed(() => {
  const tabWidth = 100 / (props.tabs?.length || 1)
  const lineWidth = typeof props.lineWidth === 'number' ? props.lineWidth : parseInt(props.lineWidth as string)
  const offset = tabWidth / 2 - lineWidth / 2 + currentIndex.value * tabWidth

  return {
    width: `${props.lineWidth}px`,
    backgroundColor: props.color,
    transform: `translateX(${offset}%)`
  }
})

const handleTabClick = (index: number) => {
  if (props.tabs[index]?.disabled) return
  currentIndex.value = index
  emit('update:modelValue', index)
  emit('change', index)
}
</script>

<style lang="scss">
.bw-tabs {
  background-color: #fff;

  &__nav {
    position: relative;
    display: flex;
    height: 44px;
    background-color: #fff;
  }

  &__tab {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #646566;
    cursor: pointer;
    transition: color 0.3s ease;

    &--active {
      color: #323233;
      font-weight: 500;
    }

    &--disabled {
      color: #c8c9cc;
      cursor: not-allowed;
    }
  }

  &__line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    border-radius: 3px;
    transition: transform 0.3s ease;
  }

  &__content {
    padding: 16px;
  }
}
</style>
