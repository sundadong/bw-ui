<template>
  <div class="bw-tabs">
    <div class="bw-tabs__nav">
      <div
        v-for="(tab, index) in tabList"
        :key="index"
        :ref="el => { if (el) tabRefs[index] = el as HTMLElement }"
        :class="['bw-tabs__tab', { 'bw-tabs__tab--active': index === currentIndex, 'bw-tabs__tab--disabled': tab.disabled }]"
        @click="handleTabClick(index)"
      >
        {{ tab.title }}
      </div>
      <div
        ref="lineRef"
        class="bw-tabs__line"
        :style="{ width: typeof lineWidth === 'number' ? lineWidth + 'px' : lineWidth, backgroundColor: color }"
      ></div>
    </div>
    <div class="bw-tabs__content">
      <div v-for="(tab, index) in tabList" :key="index" v-show="index === currentIndex">
        <slot :name="'tab' + index"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, useSlots, nextTick, onMounted } from 'vue'

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

const slots = useSlots()
const lineRef = ref<HTMLElement | null>(null)
const tabRefs = ref<HTMLElement[]>([])

const tabList = computed(() => {
  if (props.tabs && props.tabs.length > 0) {
    return props.tabs
  }
  
  const tabSlots: Tab[] = []
  let index = 0
  while (slots[`tab${index}`]) {
    tabSlots.push({ title: `标签 ${index + 1}` })
    index++
  }
  return tabSlots
})

const currentIndex = ref(props.modelValue as number)

watch(() => props.modelValue, (val) => {
  currentIndex.value = val as number
})

const updateLinePosition = () => {
  const currentTabEl = tabRefs.value[currentIndex.value]
  if (currentTabEl && lineRef.value) {
    const tabRect = currentTabEl.getBoundingClientRect()
    const parentRect = currentTabEl.parentElement?.getBoundingClientRect() || { left: 0 }
    const lineWidthVal = typeof props.lineWidth === 'number' ? props.lineWidth : parseInt(props.lineWidth as string) || 35
    const left = tabRect.left - parentRect.left + (tabRect.width - lineWidthVal) / 2
    lineRef.value.style.left = `${left}px`
  }
}

watch(currentIndex, () => {
  nextTick(() => {
    updateLinePosition()
  })
})

onMounted(() => {
  nextTick(() => {
    updateLinePosition()
  })
})

const handleTabClick = (index: number) => {
  if (tabList.value[index]?.disabled) return
  currentIndex.value = index
  emit('update:modelValue', index)
  emit('change', index)
}
</script>

<style lang="less">
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
