<template>
  <div class="bw-date-picker">
    <bw-picker
      ref="pickerRef"
      :show="showPopup"
      :columns="pickerColumns"
      :title="title"
      :confirm-text="confirmText"
      :cancel-text="cancelText"
      :visible-option-num="visibleOptionNum"
      :option-height="optionHeight"
      :toolbar-position="toolbarPosition"
      :show-toolbar="showToolbar"
      :loading="loading"
      :readonly="readonly"
      @update:show="handleClose"
      @confirm="handlePickerConfirm"
      @cancel="handleCancel"
      @change="handlePickerChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import BwPicker from '../picker/index.vue'

interface ColumnOption {
  text: string
  value: string | number
  disabled?: boolean
}

interface FormatterResult {
  type: string
  value: string
  text: string
}

interface Props {
  modelValue?: Date | string
  type?: 'date' | 'time' | 'datetime' | 'year-month' | 'month-day' | 'year-month-day'
  title?: string
  minDate?: Date | string
  maxDate?: Date | string
  filter?: (type: string, values: string[]) => string[]
  formatter?: (type: string, value: string) => FormatterResult
  columnsOrder?: string[]
  confirmText?: string
  cancelText?: string
  visibleOptionNum?: number
  optionHeight?: number
  toolbarPosition?: 'top' | 'bottom'
  showToolbar?: boolean
  loading?: boolean
  readonly?: boolean
  show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  type: 'date',
  title: '',
  minDate: () => new Date(new Date().getFullYear() - 10, 0, 1),
  maxDate: () => new Date(new Date().getFullYear() + 10, 11, 31),
  filter: undefined,
  formatter: undefined,
  columnsOrder: undefined,
  confirmText: '确认',
  cancelText: '取消',
  visibleOptionNum: 6,
  optionHeight: 44,
  toolbarPosition: 'bottom',
  showToolbar: true,
  loading: false,
  readonly: false,
  show: false
})

const emit = defineEmits<{
  'update:modelValue': [value: Date]
  'update:show': [value: boolean]
  confirm: [value: Date]
  cancel: []
  change: [value: Date]
}>()

const showPopup = ref(false)
const pickerRef = ref<InstanceType<typeof BwPicker> | null>(null)

const toDate = (val: Date | string | undefined): Date => {
  if (!val) return new Date()
  if (val instanceof Date) return val
  return new Date(val)
}

const toMinDate = computed(() => toDate(props.minDate as Date | string))
const toMaxDate = computed(() => toDate(props.maxDate as Date | string))

const currentDate = ref(toDate(props.modelValue))

const padZero = (n: number): string => String(n).padStart(2, '0')

const range = (start: number, end: number): number[] => {
  const result: number[] = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

const getColumnType = computed(() => {
  const type = props.type
  if (type === 'datetime') return ['year', 'month', 'day', 'hour', 'minute']
  if (type === 'date') return ['year', 'month', 'day']
  if (type === 'year-month') return ['year', 'month']
  if (type === 'month-day') return ['month', 'day']
  if (type === 'year-month-day') return ['year', 'month', 'day']
  if (type === 'time') return ['hour', 'minute']
  return ['year', 'month', 'day']
})

const orderedColumnTypes = computed(() => {
  if (props.columnsOrder) {
    return props.columnsOrder.filter((t) => getColumnType.value.includes(t))
  }
  return getColumnType.value
})

const buildYearColumn = (): ColumnOption[] => {
  const minYear = toMinDate.value.getFullYear()
  const maxYear = toMaxDate.value.getFullYear()
  return range(minYear, maxYear).map((year) => {
    let text = String(year)
    if (props.formatter) {
      const result = props.formatter('year', text)
      text = result.text
    }
    return { text: text + '年', value: year }
  })
}

const buildMonthColumn = (): ColumnOption[] => {
  return range(1, 12).map((month) => {
    let text = padZero(month)
    if (props.formatter) {
      const result = props.formatter('month', text)
      text = result.text
    }
    return { text: text + '月', value: month }
  })
}

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate()
}

const buildDayColumn = (year: number, month: number): ColumnOption[] => {
  const days = getDaysInMonth(year, month)
  return range(1, days).map((day) => {
    let text = padZero(day)
    if (props.formatter) {
      const result = props.formatter('day', text)
      text = result.text
    }
    return { text: text + '日', value: day }
  })
}

const buildHourColumn = (): ColumnOption[] => {
  return range(0, 23).map((hour) => {
    let text = padZero(hour)
    if (props.formatter) {
      const result = props.formatter('hour', text)
      text = result.text
    }
    return { text: text + '时', value: hour }
  })
}

const buildMinuteColumn = (): ColumnOption[] => {
  return range(0, 59).map((minute) => {
    let text = padZero(minute)
    if (props.formatter) {
      const result = props.formatter('minute', text)
      text = result.text
    }
    return { text: text + '分', value: minute }
  })
}

const pickerColumns = computed(() => {
  const cols: ColumnOption[][] = []
  const date = currentDate.value

  for (const colType of orderedColumnTypes.value) {
    switch (colType) {
      case 'year':
        cols.push(buildYearColumn())
        break
      case 'month':
        cols.push(buildMonthColumn())
        break
      case 'day':
        cols.push(buildDayColumn(date.getFullYear(), date.getMonth() + 1))
        break
      case 'hour':
        cols.push(buildHourColumn())
        break
      case 'minute':
        cols.push(buildMinuteColumn())
        break
    }
  }

  return cols
})

const pickerValue = computed(() => {
  const values: (string | number)[] = []
  const date = currentDate.value

  for (const colType of orderedColumnTypes.value) {
    switch (colType) {
      case 'year':
        values.push(date.getFullYear())
        break
      case 'month':
        values.push(date.getMonth() + 1)
        break
      case 'day':
        values.push(date.getDate())
        break
      case 'hour':
        values.push(date.getHours())
        break
      case 'minute':
        values.push(date.getMinutes())
        break
    }
  }

  return values
})

const buildDateFromValues = (values: (string | number)[]): Date => {
  const date = new Date(currentDate.value)
  let valueIdx = 0

  for (const colType of orderedColumnTypes.value) {
    const val = Number(values[valueIdx++])
    switch (colType) {
      case 'year':
        date.setFullYear(val)
        break
      case 'month':
        date.setMonth(val - 1)
        break
      case 'day':
        date.setDate(val)
        break
      case 'hour':
        date.setHours(val)
        break
      case 'minute':
        date.setMinutes(val)
        break
    }
  }

  if (date < toMinDate.value) return new Date(toMinDate.value)
  if (date > toMaxDate.value) return new Date(toMaxDate.value)

  return date
}

const clampDate = (date: Date): Date => {
  if (date < toMinDate.value) return new Date(toMinDate.value)
  if (date > toMaxDate.value) return new Date(toMaxDate.value)
  return date
}

const handlePickerChange = (value: string | number | (string | number)[]) => {
  const values = Array.isArray(value) ? value : [value]
  currentDate.value = buildDateFromValues(values)
  emit('change', new Date(currentDate.value))
}

const handlePickerConfirm = (value: string | number | (string | number)[]) => {
  const values = Array.isArray(value) ? value : [value]
  currentDate.value = buildDateFromValues(values)
  const date = new Date(currentDate.value)
  emit('update:modelValue', date)
  emit('confirm', date)
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

watch(() => props.show, (val) => {
  showPopup.value = val
  if (val) {
    nextTick(() => {
      currentDate.value = clampDate(toDate(props.modelValue))
    })
  }
}, { immediate: true })

watch(() => props.modelValue, (val) => {
  if (val) {
    currentDate.value = clampDate(toDate(val))
  }
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.bw-date-picker {
  width: 100%;
}
</style>