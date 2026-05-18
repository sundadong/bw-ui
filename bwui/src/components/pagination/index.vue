<template>
  <div class="bw-pagination">
    <div
      class="bw-pagination__item bw-pagination__item--prev"
      :class="{ 'bw-pagination__item--disabled': isPrevDisabled }"
      @click="handlePrev"
    >
      <slot name="prev-text">{{ prevText }}</slot>
    </div>
    <div
      v-for="item in pageItems"
      :key="item.text"
      class="bw-pagination__item"
      :class="{
        'bw-pagination__item--active': item.type === 'page' && item.num === currentPage,
        'bw-pagination__item--disabled': item.type === 'page' && item.disabled,
        'bw-pagination__item--ellipsis': item.type === 'ellipsis'
      }"
      @click="item.type === 'page' && !item.disabled && handlePage(item.num)"
    >
      <span v-if="item.type === 'page'">{{ item.text }}</span>
      <span v-else-if="item.type === 'ellipsis'">...</span>
    </div>
    <div
      class="bw-pagination__item bw-pagination__item--next"
      :class="{ 'bw-pagination__item--disabled': isNextDisabled }"
      @click="handleNext"
    >
      <slot name="next-text">{{ nextText }}</slot>
    </div>
    <div v-if="showPageSize" class="bw-pagination__page-size">
      <span class="bw-pagination__page-size-text">{{ pageSize }}条/页</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface PaginationProps {
  modelValue?: number
  totalItems?: number
  itemsPerPage?: number
  showPageSize?: boolean
  pageSize?: number
  forceEllipses?: boolean
  prevText?: string
  nextText?: string
  showPrevButton?: boolean
  showNextButton?: boolean
}

const props = withDefaults(defineProps<PaginationProps>(), {
  modelValue: 1,
  totalItems: 0,
  itemsPerPage: 10,
  showPageSize: false,
  pageSize: 10,
  forceEllipses: false,
  prevText: '上一页',
  nextText: '下一页',
  showPrevButton: true,
  showNextButton: true
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(props.totalItems / props.itemsPerPage))
})

const currentPage = computed(() => {
  return Math.max(1, Math.min(props.modelValue, totalPages.value))
})

const isPrevDisabled = computed(() => {
  return currentPage.value <= 1
})

const isNextDisabled = computed(() => {
  return currentPage.value >= totalPages.value
})

interface PageItem {
  type: 'page' | 'ellipsis'
  num: number
  text: string
  disabled?: boolean
}

const pageItems = computed<PageItem[]>(() => {
  const items: PageItem[] = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7 || props.forceEllipses) {
    const showPages = total <= 7 ? total : 7
    const pages = generatePages(current, showPages, total)

    for (let i = 0; i < pages.length; i++) {
      items.push({
        type: 'page',
        num: pages[i],
        text: String(pages[i])
      })
    }
  } else {
    items.push({ type: 'page', num: 1, text: '1' })

    if (current > 4) {
      items.push({ type: 'ellipsis', num: -1, text: '...' })
    }

    let start = Math.max(2, current - 1)
    let end = Math.min(total - 1, current + 1)

    if (current <= 4) {
      end = Math.min(total - 1, 5)
    }

    if (current >= total - 3) {
      start = Math.max(2, total - 4)
    }

    for (let i = start; i <= end; i++) {
      items.push({ type: 'page', num: i, text: String(i) })
    }

    if (current < total - 3) {
      items.push({ type: 'ellipsis', num: -2, text: '...' })
    }

    items.push({ type: 'page', num: total, text: String(total) })
  }

  return items
})

function generatePages(current: number, showPages: number, total: number): number[] {
  const pages: number[] = []
  const half = Math.floor(showPages / 2)
  let start = current - half
  let end = current + half

  if (start < 1) {
    start = 1
    end = Math.min(showPages, total)
  }

  if (end > total) {
    end = total
    start = Math.max(1, total - showPages + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
}

const handlePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    emit('update:modelValue', page)
    emit('change', page)
  }
}

const handlePrev = () => {
  if (currentPage.value > 1) {
    handlePage(currentPage.value - 1)
  }
}

const handleNext = () => {
  if (currentPage.value < totalPages.value) {
    handlePage(currentPage.value + 1)
  }
}
</script>

<style lang="less">
@import '../../styles/variables.less';

.bw-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  font-size: @bw-font-size-md;
  gap: 0;

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 40px;
    padding: 0 4px;
    color: @bw-text-color;
    background-color: @bw-white;
    border-radius: @bw-border-radius-md;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
    transition: background-color  @bw-animation-duration-fast;

    &--active {
      color: @bw-white;
      background-color: @bw-primary-color;
    }

    &--disabled {
      cursor: not-allowed;
      opacity: @bw-disabled-opacity;
      color: @bw-text-color-3;
    }

    &--ellipsis {
      cursor: default;
      color: @bw-text-color-2;
    }

    &--prev,
    &--next {
      padding: 0 8px;
    }

    &:active:not(&--disabled):not(&--ellipsis):not(&--active) {
      background-color: @bw-active-color;
    }
  }

  &__page-size {
    display: flex;
    align-items: center;
    margin-left: 8px;
    height: 40px;
    color: @bw-text-color-2;
    font-size: @bw-font-size-sm;
  }

  &__page-size-text {
    padding: 0 4px;
  }
}
</style>