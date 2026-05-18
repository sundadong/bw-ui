<template>
  <div class="bw-picker">
    <bw-popup
      :show="showPopup"
      :position="toolbarPosition"
      :round="true"
      :close-on-click-overlay="true"
      @update:show="handleClose"
      @close="handleClose"
    >
      <div v-if="showToolbar" class="bw-picker__toolbar">
        <div class="bw-picker__cancel" @click="handleCancel">{{ cancelText }}</div>
        <div class="bw-picker__title">{{ title }}</div>
        <div class="bw-picker__confirm" @click="handleConfirm">{{ confirmText }}</div>
      </div>
      <div
        v-if="loading"
        class="bw-picker__loading"
      >
        <bw-loading color="#1989fa" />
      </div>
      <div
        v-else
        class="bw-picker__columns"
        :style="{ height: `${optionHeight * visibleOptionNum}px` }"
      >
        <div
          v-for="(column, colIndex) in resolvedColumns"
          :key="colIndex"
          class="bw-picker__column"
        >
          <div
            class="bw-picker__mask"
            :style="{ backgroundSize: `100% ${(visibleOptionNum - 1) * optionHeight / 2}px` }"
          />
          <div
            class="bw-picker__indicator"
            :style="{
              height: `${optionHeight}px`,
              top: `${Math.floor(visibleOptionNum / 2) * optionHeight}px`
            }"
          />
          <div
            ref="columnRefs"
            class="bw-picker__column-list"
            :style="{
              transform: `translate3d(0, ${getColumnOffset(colIndex)}px, 0)`,
              transitionDuration: transitionDuration
            }"
            @touchstart="(e) => handleTouchStart(e, colIndex)"
            @touchmove.prevent="(e) => handleTouchMove(e, colIndex)"
            @touchend="(e) => handleTouchEnd(e, colIndex)"
          >
            <div
              v-for="(item, itemIndex) in column"
              :key="itemIndex"
              class="bw-picker__option"
              :class="{
                'bw-picker__option--selected': selectedIndices[colIndex] === itemIndex,
                'bw-picker__option--disabled': item.disabled
              }"
              :style="{
                height: `${optionHeight}px`,
                lineHeight: `${optionHeight}px`
              }"
              @click="() => handleOptionClick(colIndex, itemIndex, item)"
            >
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </bw-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import BwPopup from '../popup/index.vue'
import BwLoading from '../loading/index.vue'

interface PickerOption {
  text: string
  value: string | number
  disabled?: boolean
  children?: PickerOption[]
}

interface Props {
  modelValue?: string | number | (string | number)[]
  columns?: PickerOption[] | PickerOption[][]
  title?: string
  toolbarPosition?: 'top' | 'bottom'
  showToolbar?: boolean
  confirmText?: string
  cancelText?: string
  visibleOptionNum?: number
  optionHeight?: number
  loading?: boolean
  readonly?: boolean
  show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  columns: () => [],
  title: '',
  toolbarPosition: 'bottom',
  showToolbar: true,
  confirmText: '确认',
  cancelText: '取消',
  visibleOptionNum: 6,
  optionHeight: 44,
  loading: false,
  readonly: false,
  show: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | (string | number)[]]
  'update:show': [value: boolean]
  confirm: [value: string | number | (string | number)[], selectedOptions: PickerOption | PickerOption[]]
  cancel: []
  change: [value: string | number | (string | number)[], selectedOptions: PickerOption | PickerOption[]]
}>()

const showPopup = ref(false)
const selectedIndices = ref<number[]>([])
const columnRefs = ref<HTMLElement[]>([])

const transitionDuration = ref('0.3s')
const touchStartY = ref(0)
const touchCurrentY = ref(0)
const touchOffset = ref<number[]>([])
const isTouching = ref(false)

const isCascade = computed(() => {
  if (!props.columns || props.columns.length === 0) return false
  if (Array.isArray(props.columns[0])) return false
  return !!(props.columns[0] as PickerOption).children
})

const resolvedColumns = computed(() => {
  if (!props.columns || props.columns.length === 0) return []
  if (Array.isArray(props.columns[0])) {
    return props.columns as PickerOption[][]
  }
  if (isCascade.value) {
    const result: PickerOption[][] = []
    let currentOptions = props.columns as PickerOption[]
    for (let i = 0; i < (selectedIndices.value.length || 1); i++) {
      result.push(currentOptions)
      const idx = selectedIndices.value[i]
      if (idx !== undefined && idx >= 0 && currentOptions[idx]?.children) {
        currentOptions = currentOptions[idx].children!
      }
    }
    return result
  }
  return [props.columns as PickerOption[]]
})

const totalColumns = computed(() => resolvedColumns.value.length)

const getColumnOffset = (colIndex: number) => {
  if (isTouching.value && touchOffset.value[colIndex] !== undefined) {
    return touchOffset.value[colIndex]
  }
  const idx = selectedIndices.value[colIndex] || 0
  const baseOffset = Math.floor(props.visibleOptionNum / 2) * props.optionHeight
  return baseOffset - idx * props.optionHeight
}

const findIndexInColumn = (column: PickerOption[], value: string | number | undefined): number => {
  if (value === undefined || value === null) return 0
  const idx = column.findIndex((item) => item.value === value)
  return idx >= 0 ? idx : 0
}

const initSelectedIndices = () => {
  const indices: number[] = []
  if (!props.columns || props.columns.length === 0) return

  if (isCascade.value) {
    const cascadeColumns = props.columns as PickerOption[]
    if (Array.isArray(props.modelValue)) {
      const values = props.modelValue as (string | number)[]
      let currentOptions = cascadeColumns
      for (let i = 0; i < values.length; i++) {
        const idx = findIndexInColumn(currentOptions, values[i])
        indices.push(idx)
        if (currentOptions[idx]?.children) {
          currentOptions = currentOptions[idx].children!
        }
      }
    } else {
      const idx = findIndexInColumn(cascadeColumns, props.modelValue as string | number)
      indices.push(idx)
    }
  } else {
    const columns = props.columns as PickerOption[][]
    if (columns.length > 0 && Array.isArray(columns[0])) {
      const values = Array.isArray(props.modelValue)
        ? (props.modelValue as (string | number)[])
        : [props.modelValue as string | number]
      for (let i = 0; i < columns.length; i++) {
        indices.push(findIndexInColumn(columns[i], values[i]))
      }
    } else {
      const flatColumn = columns as unknown as PickerOption[]
      indices.push(findIndexInColumn(flatColumn, props.modelValue as string | number))
    }
  }

  selectedIndices.value = indices
  touchOffset.value = new Array(indices.length).fill(0)
}

watch(() => props.modelValue, () => {
  initSelectedIndices()
}, { immediate: true })

watch(() => props.columns, () => {
  initSelectedIndices()
}, { deep: true })

watch(() => props.show, (val) => {
  showPopup.value = val
  if (val) {
    nextTick(() => {
      initSelectedIndices()
    })
  }
}, { immediate: true })

const getSelectedValue = (): string | number | (string | number)[] => {
  if (isCascade.value) {
    const cascadeColumns = props.columns as PickerOption[]
    const values: (string | number)[] = []
    let currentOptions = cascadeColumns
    for (let i = 0; i < selectedIndices.value.length; i++) {
      const idx = selectedIndices.value[i]
      if (currentOptions[idx]) {
        values.push(currentOptions[idx].value)
        if (currentOptions[idx].children) {
          currentOptions = currentOptions[idx].children!
        }
      }
    }
    return values.length === 1 ? values[0] : values
  }

  const columns = props.columns as PickerOption[][]
  if (columns.length > 0 && Array.isArray(columns[0])) {
    const values = selectedIndices.value.map((idx, i) => columns[i]?.[idx]?.value ?? '')
    return values
  }
  const flatColumn = columns as unknown as PickerOption[]
  const idx = selectedIndices.value[0] || 0
  return flatColumn[idx]?.value ?? ''
}

const getSelectedOptions = (): PickerOption | PickerOption[] => {
  if (isCascade.value) {
    const cascadeColumns = props.columns as PickerOption[]
    const options: PickerOption[] = []
    let currentOptions = cascadeColumns
    for (let i = 0; i < selectedIndices.value.length; i++) {
      const idx = selectedIndices.value[i]
      if (currentOptions[idx]) {
        options.push(currentOptions[idx])
        if (currentOptions[idx].children) {
          currentOptions = currentOptions[idx].children!
        }
      }
    }
    return options.length === 1 ? options[0] : options
  }

  const columns = props.columns as PickerOption[][]
  if (columns.length > 0 && Array.isArray(columns[0])) {
    return selectedIndices.value.map((idx, i) => columns[i]?.[idx] ?? { text: '', value: '' })
  }
  const flatColumn = columns as unknown as PickerOption[]
  const idx = selectedIndices.value[0] || 0
  return flatColumn[idx] ?? { text: '', value: '' }
}

const handleTouchStart = (e: TouchEvent, colIndex: number) => {
  if (props.readonly) return
  touchStartY.value = e.touches[0].clientY
  touchCurrentY.value = e.touches[0].clientY
  isTouching.value = true
  transitionDuration.value = '0s'
}

const handleTouchMove = (e: TouchEvent, colIndex: number) => {
  if (props.readonly) return
  touchCurrentY.value = e.touches[0].clientY
  const diff = touchCurrentY.value - touchStartY.value
  const idx = selectedIndices.value[colIndex] || 0
  const baseOffset = Math.floor(props.visibleOptionNum / 2) * props.optionHeight
  const newOffset = baseOffset - idx * props.optionHeight + diff
  if (!touchOffset.value[colIndex]) touchOffset.value = [...touchOffset.value]
  touchOffset.value[colIndex] = newOffset
}

const handleTouchEnd = (e: TouchEvent, colIndex: number) => {
  if (props.readonly) return
  isTouching.value = false
  transitionDuration.value = '0.3s'
  const diff = touchCurrentY.value - touchStartY.value
  const column = resolvedColumns.value[colIndex]
  if (!column) return
  const idx = selectedIndices.value[colIndex] || 0
  const movedItems = Math.round(-diff / props.optionHeight)
  let newIndex = idx + movedItems
  newIndex = Math.max(0, Math.min(newIndex, column.length - 1))
  selectedIndices.value[colIndex] = newIndex
  touchOffset.value[colIndex] = 0

  if (isCascade.value) {
    nextTick(() => {
      emitChange()
    })
  } else {
    emitChange()
  }
}

const handleOptionClick = (colIndex: number, itemIndex: number, item: PickerOption) => {
  if (props.readonly || item.disabled) return
  selectedIndices.value[colIndex] = itemIndex
  emitChange()
}

const emitChange = () => {
  const value = getSelectedValue()
  const options = getSelectedOptions()
  emit('change', value, options)
}

const handleConfirm = () => {
  const value = getSelectedValue()
  const options = getSelectedOptions()
  emit('update:modelValue', value)
  emit('confirm', value, options)
  showPopup.value = false
  emit('update:show', false)
}

const handleCancel = () => {
  emit('cancel')
  showPopup.value = false
  emit('update:show', false)
}

const handleClose = () => {
  showPopup.value = false
  emit('update:show', false)
}

defineExpose({
  getSelectedValue,
  getSelectedOptions
})
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.bw-picker {
  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 0  @bw-padding-md;
    border-bottom: 1px solid  @bw-border-color;
  }

  &__cancel {
    font-size: @bw-font-size-lg;
    color: @bw-text-color-2;
    cursor: pointer;
    padding: 0  @bw-padding-xs;
  }

  &__title {
    font-size: @bw-font-size-lg;
    font-weight: 500;
    color: @bw-text-color;
    max-width: 50%;
    text-align: center;
  }

  &__confirm {
    font-size: @bw-font-size-lg;
    color: @bw-primary-color;
    cursor: pointer;
    padding: 0  @bw-padding-xs;
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 264px;
  }

  &__columns {
    display: flex;
    position: relative;
    overflow: hidden;
    background: @bw-bg-color;
  }

  &__column {
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4)),
      linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4));
    background-repeat: no-repeat;
    background-position: top, bottom;
    pointer-events: none;
    transform: translateZ(0);
  }

  &__indicator {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 3;
    border-top: 1px solid  @bw-border-color;
    border-bottom: 1px solid  @bw-border-color;
    pointer-events: none;
  }

  &__column-list {
    position: relative;
    z-index: 1;
    will-change: transform;
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: @bw-font-size-lg;
    color: @bw-text-color;
    padding: 0;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;

    &--selected {
      font-weight: 500;
      color: @bw-text-color;
    }

    &--disabled {
      color: @bw-text-color-3;
      cursor: not-allowed;
    }
  }
}
</style>