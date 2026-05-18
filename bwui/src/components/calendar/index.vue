<template>
  <div class="bw-calendar">
    <bw-popup
      :show="showPopup"
      :position="position"
      :round="round"
      :close-on-click-overlay="true"
      @update:show="handleClose"
    >
      <div class="bw-calendar__header">
        <div class="bw-calendar__header-title">{{ title || '选择日期' }}</div>
        <div v-if="showSubtitle" class="bw-calendar__header-subtitle">
          {{ subtitle }}
        </div>
      </div>

      <div class="bw-calendar__weekdays">
        <div
          v-for="day in weekdays"
          :key="day"
          class="bw-calendar__weekday"
        >
          {{ day }}
        </div>
      </div>

      <div
        class="bw-calendar__months"
        @touchstart="handleTouchStart"
        @touchmove.prevent="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div
          class="bw-calendar__months-track"
          :style="{
            transform: `translateY(${scrollOffset}px)`,
            transitionDuration: isScrolling ? '0s' : '0.3s'
          }"
        >
          <div
            v-for="month in monthList"
            :key="month.key"
            class="bw-calendar__month"
          >
            <div class="bw-calendar__month-title">
              {{ month.year }}年{{ month.month }}月
            </div>
            <div
              class="bw-calendar__days"
              :style="{ height: `${rowHeight * month.rows}px` }"
            >
              <div
                v-for="(day, dayIndex) in month.days"
                :key="dayIndex"
                class="bw-calendar__day"
                :class="getDayClass(day)"
                :style="{
                  height: `${rowHeight}px`,
                  lineHeight: `${rowHeight}px`,
                  marginLeft: dayIndex === 0 ? `${month.firstDayOffset * (100 / 7)}%` : '0'
                }"
                @click="() => handleDayClick(day)"
              >
                <div
                  v-if="day.type !== 'placeholder'"
                  class="bw-calendar__day-content"
                  :style="getDayStyle(day)"
                >
                  <div
                    v-if="isRangeStart(day)"
                    class="bw-calendar__day-range-start"
                    :style="{ backgroundColor: color }"
                  />
                  <div
                    v-if="isRangeEnd(day)"
                    class="bw-calendar__day-range-end"
                    :style="{ backgroundColor: color }"
                  />
                  <div
                    class="bw-calendar__day-text"
                    :style="getDayTextStyle(day)"
                  >
                    {{ day.text }}
                  </div>
                  <div
                    v-if="day.bottomInfo"
                    class="bw-calendar__day-bottom"
                    :style="{ color: getBottomInfoColor(day) }"
                  >
                    {{ day.bottomInfo }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showConfirm" class="bw-calendar__footer">
        <bw-button
          type="primary"
          :disabled="!hasValidSelection"
          block
          @click="handleConfirm"
        >
          {{ hasValidSelection ? confirmText : confirmDisabledText }}
        </bw-button>
      </div>
    </bw-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import BwPopup from '../popup/index.vue'
import BwButton from '../button/index.vue'

interface CalendarDay {
  type: 'current' | 'prev-month' | 'next-month' | 'placeholder'
  text: string
  date: Date
  bottomInfo?: string
  topInfo?: string
  className?: string
}

interface CalendarMonth {
  key: string
  year: number
  month: number
  days: CalendarDay[]
  rows: number
  firstDayOffset: number
}

interface FormatterResult {
  date: Date
  type?: string
  bottomInfo?: string
  topInfo?: string
  className?: string
}

interface Props {
  modelValue?: string | Date | (string | Date)[]
  type?: 'single' | 'range' | 'multiple'
  title?: string
  color?: string
  minDate?: string | Date
  maxDate?: string | Date
  defaultDate?: string | Date | (string | Date)[]
  rowHeight?: number
  formatter?: (day: FormatterResult) => FormatterResult
  showConfirm?: boolean
  confirmText?: string
  confirmDisabledText?: string
  firstDayOfWeek?: number
  position?: 'bottom' | 'right' | 'top' | 'left'
  round?: boolean
  allowSameDay?: boolean
  maxRange?: number
  rangePrompt?: string
  show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  type: 'single',
  title: '',
  color: '#1989fa',
  minDate: () => new Date(new Date().getFullYear() - 10, 0, 1),
  maxDate: () => new Date(new Date().getFullYear() + 10, 11, 31),
  defaultDate: undefined,
  rowHeight: 64,
  formatter: undefined,
  showConfirm: true,
  confirmText: '确定',
  confirmDisabledText: '确定',
  firstDayOfWeek: 0,
  position: 'bottom',
  round: true,
  allowSameDay: true,
  maxRange: undefined,
  rangePrompt: undefined,
  show: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | Date | (string | Date)[]]
  'update:show': [value: boolean]
  confirm: [value: Date | Date[]]
  select: [value: Date | Date[]]
  unselect: [value: Date]
  monthShow: [date: Date]
}>()

const showPopup = ref(false)
const selectedDates = ref<Date[]>([])
const rangeStart = ref<Date | null>(null)
const rangeEnd = ref<Date | null>(null)
const currentScrollDate = ref(new Date())
const scrollOffset = ref(0)
const isScrolling = ref(false)

const touchStartY = ref(0)
const touchCurrentY = ref(0)
const lastScrollOffset = ref(0)

const weekdays = computed(() => {
  const days = ['日', '一', '二', '三', '四', '五', '六']
  const start = props.firstDayOfWeek % 7
  const result: string[] = []
  for (let i = 0; i < 7; i++) {
    result.push(days[(start + i) % 7])
  }
  return result
})

const subtitle = computed(() => {
  if (props.type === 'range') {
    if (rangeStart.value && !rangeEnd.value) {
      return `请选择${props.rangePrompt || '结束日期'}`
    }
    if (rangeStart.value && rangeEnd.value) {
      return `${formatDate(rangeStart.value)} - ${formatDate(rangeEnd.value)}`
    }
    return '请选择起始日期'
  }
  return ''
})

const showSubtitle = computed(() => {
  return props.type === 'range' && subtitle.value
})

const hasValidSelection = computed(() => {
  if (props.type === 'range') {
    return rangeStart.value !== null && rangeEnd.value !== null
  }
  if (props.type === 'multiple') {
    return selectedDates.value.length > 0
  }
  return selectedDates.value.length > 0
})

const toDate = (val: string | Date): Date => {
  if (val instanceof Date) return val
  return new Date(val)
}

const toMinDate = computed(() => toDate(props.minDate as string | Date))
const toMaxDate = computed(() => toDate(props.maxDate as string | Date))

const formatDate = (date: Date): string => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}/${m}/${d}`
}

const isSameDay = (d1: Date, d2: Date): boolean => {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
}

const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
  const t = date.getTime()
  return t >= start.getTime() && t <= end.getTime()
}

const isRangeStart = (day: CalendarDay): boolean => {
  if (props.type !== 'range' || !rangeStart.value) return false
  return isSameDay(day.date, rangeStart.value)
}

const isRangeEnd = (day: CalendarDay): boolean => {
  if (props.type !== 'range' || !rangeEnd.value) return false
  return isSameDay(day.date, rangeEnd.value)
}

const isInRange = (day: CalendarDay): boolean => {
  if (props.type !== 'range' || !rangeStart.value) return false
  if (!rangeEnd.value) return false
  if (isRangeStart(day) || isRangeEnd(day)) return false
  return isDateInRange(day.date, rangeStart.value, rangeEnd.value)
}

const isSelected = (day: CalendarDay): boolean => {
  if (day.type === 'placeholder') return false
  return selectedDates.value.some((d) => isSameDay(d, day.date))
}

const isDisabled = (day: CalendarDay): boolean => {
  if (day.type !== 'current') return true
  const t = day.date.getTime()
  return t < toMinDate.value.getTime() || t > toMaxDate.value.getTime()
}

const getDayClass = (day: CalendarDay) => {
  return {
    'bw-calendar__day--selected': isSelected(day),
    'bw-calendar__day--disabled': isDisabled(day),
    'bw-calendar__day--range-start': isRangeStart(day),
    'bw-calendar__day--range-end': isRangeEnd(day),
    'bw-calendar__day--in-range': isInRange(day),
    'bw-calendar__day--placeholder': day.type === 'placeholder',
    'bw-calendar__day--prev-month': day.type === 'prev-month',
    'bw-calendar__day--next-month': day.type === 'next-month'
  }
}

const getDayStyle = (day: CalendarDay) => {
  const style: Record<string, string> = {}
  if (isSelected(day)) {
    style.backgroundColor = props.color
    style.borderRadius = '50%'
  }
  if (isInRange(day)) {
    style.backgroundColor = `${props.color}1a`
  }
  return style
}

const getDayTextStyle = (day: CalendarDay) => {
  const style: Record<string, string> = {}
  if (isSelected(day) || isRangeStart(day) || isRangeEnd(day)) {
    style.color = '#ffffff'
  }
  return style
}

const getBottomInfoColor = (day: CalendarDay) => {
  if (isSelected(day) || isRangeStart(day) || isRangeEnd(day)) {
    return '#ffffff'
  }
  return ''
}

const getMonthList = (): CalendarMonth[] => {
  const months: CalendarMonth[] = []
  const minYear = toMinDate.value.getFullYear()
  const minMonth = toMinDate.value.getMonth()
  const maxYear = toMaxDate.value.getFullYear()
  const maxMonth = toMaxDate.value.getMonth()

  for (let year = minYear; year <= maxYear; year++) {
    const startM = year === minYear ? minMonth : 0
    const endM = year === maxYear ? maxMonth : 11
    for (let month = startM; month <= endM; month++) {
      const days = buildMonthDays(year, month)
      months.push({
        key: `${year}-${month}`,
        year,
        month: month + 1,
        days,
        rows: Math.ceil((days.filter(d => d.type !== 'placeholder').length + getFirstDayOfMonth(year, month)) / 7),
        firstDayOffset: getFirstDayOfMonth(year, month)
      })
    }
  }

  return months
}

const getFirstDayOfMonth = (year: number, month: number): number => {
  const firstDay = new Date(year, month, 1).getDay()
  return (firstDay - props.firstDayOfWeek + 7) % 7
}

const buildMonthDays = (year: number, month: number): CalendarDay[] => {
  const days: CalendarDay[] = []
  const firstDayOffset = getFirstDayOfMonth(year, month)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  for (let i = firstDayOffset - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, daysInPrevMonth - i)
    days.push({
      type: 'prev-month',
      text: String(daysInPrevMonth - i),
      date
    })
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i)
    let day: CalendarDay = {
      type: 'current',
      text: String(i),
      date
    }
    if (props.formatter) {
      const result = props.formatter({ date, type: day.type, bottomInfo: day.bottomInfo, topInfo: day.topInfo, className: day.className })
      day = { ...day, ...result }
    }
    days.push(day)
  }

  const remaining = 7 - (days.length % 7)
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i)
      days.push({
        type: 'next-month',
        text: String(i),
        date
      })
    }
  }

  return days
}

const monthList = ref<CalendarMonth[]>([])

const initCalendar = () => {
  monthList.value = getMonthList()
  resetSelection()
}

const resetSelection = () => {
  selectedDates.value = []
  rangeStart.value = null
  rangeEnd.value = null

  if (props.modelValue) {
    if (props.type === 'range' && Array.isArray(props.modelValue)) {
      if (props.modelValue.length >= 1) {
        rangeStart.value = toDate(props.modelValue[0] as string | Date)
      }
      if (props.modelValue.length >= 2) {
        rangeEnd.value = toDate(props.modelValue[1] as string | Date)
      }
      selectedDates.value = [rangeStart.value, rangeEnd.value].filter(Boolean) as Date[]
    } else if (props.type === 'multiple' && Array.isArray(props.modelValue)) {
      selectedDates.value = (props.modelValue as (string | Date)[]).map(toDate)
    } else if (props.modelValue) {
      selectedDates.value = [toDate(props.modelValue as string | Date)]
    }
  } else if (props.defaultDate) {
    if (Array.isArray(props.defaultDate)) {
      selectedDates.value = (props.defaultDate as (string | Date)[]).map(toDate)
    } else {
      selectedDates.value = [toDate(props.defaultDate as string | Date)]
    }
  }
}

const handleDayClick = (day: CalendarDay) => {
  if (isDisabled(day) || day.type === 'placeholder') return

  if (props.type === 'single') {
    selectedDates.value = [day.date]
    emit('select', day.date)
  } else if (props.type === 'multiple') {
    const idx = selectedDates.value.findIndex((d) => isSameDay(d, day.date))
    if (idx >= 0) {
      selectedDates.value.splice(idx, 1)
      emit('unselect', day.date)
    } else {
      selectedDates.value.push(day.date)
      emit('select', selectedDates.value)
    }
  } else if (props.type === 'range') {
    if (!rangeStart.value) {
      rangeStart.value = day.date
      rangeEnd.value = null
      selectedDates.value = [day.date]
      emit('select', [day.date])
    } else if (!rangeEnd.value) {
      if (day.date.getTime() < rangeStart.value.getTime()) {
        rangeEnd.value = rangeStart.value
        rangeStart.value = day.date
      } else if (!props.allowSameDay && isSameDay(day.date, rangeStart.value)) {
        return
      } else if (props.maxRange) {
        const diffDays = Math.ceil((day.date.getTime() - rangeStart.value.getTime()) / (1000 * 60 * 60 * 24))
        if (diffDays > props.maxRange) {
          return
        }
        rangeEnd.value = day.date
      } else {
        rangeEnd.value = day.date
      }
      selectedDates.value = [rangeStart.value, rangeEnd.value].filter(Boolean) as Date[]
      emit('select', selectedDates.value)
    } else {
      rangeStart.value = day.date
      rangeEnd.value = null
      selectedDates.value = [day.date]
      emit('select', [day.date])
    }
  }
}

const handleConfirm = () => {
  if (!hasValidSelection.value) return

  if (props.type === 'range') {
    const value = [rangeStart.value, rangeEnd.value].filter(Boolean) as Date[]
    emit('update:modelValue', value)
    emit('confirm', value)
  } else if (props.type === 'multiple') {
    emit('update:modelValue', selectedDates.value)
    emit('confirm', selectedDates.value)
  } else {
    emit('update:modelValue', selectedDates.value[0])
    emit('confirm', selectedDates.value[0])
  }
  showPopup.value = false
  emit('update:show', false)
}

const handleClose = () => {
  showPopup.value = false
  emit('update:show', false)
}

const handleTouchStart = (e: TouchEvent) => {
  touchStartY.value = e.touches[0].clientY
  touchCurrentY.value = e.touches[0].clientY
  lastScrollOffset.value = scrollOffset.value
  isScrolling.value = true
}

const handleTouchMove = (e: TouchEvent) => {
  touchCurrentY.value = e.touches[0].clientY
  const diff = touchCurrentY.value - touchStartY.value
  scrollOffset.value = lastScrollOffset.value + diff
}

const handleTouchEnd = () => {
  isScrolling.value = false
  const diff = touchCurrentY.value - touchStartY.value
  const movedMonths = Math.round(-diff / (props.rowHeight * 6))
  scrollOffset.value = lastScrollOffset.value - movedMonths * props.rowHeight * 6
}

watch(() => props.show, (val) => {
  showPopup.value = val
  if (val) {
    nextTick(() => {
      initCalendar()
    })
  }
}, { immediate: true })

watch(() => props.modelValue, () => {
  resetSelection()
})
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.bw-calendar {
  &__header {
    padding: @bw-padding-md;
    text-align: center;
    border-bottom: 1px solid  @bw-border-color;
  }

  &__header-title {
    font-size: @bw-font-size-lg;
    font-weight: 500;
    color: @bw-text-color;
  }

  &__header-subtitle {
    font-size: @bw-font-size-sm;
    color: @bw-primary-color;
    margin-top: 4px;
  }

  &__weekdays {
    display: flex;
    padding: 8px 0;
    border-bottom: 1px solid  @bw-border-color;
  }

  &__weekday {
    flex: 1;
    text-align: center;
    font-size: @bw-font-size-sm;
    color: @bw-text-color-2;
    font-weight: 500;
  }

  &__months {
    height: 400px;
    overflow: hidden;
    position: relative;
  }

  &__months-track {
    will-change: transform;
  }

  &__month {
    padding: 0  @bw-padding-sm;
  }

  &__month-title {
    font-size: @bw-font-size-md;
    font-weight: 500;
    color: @bw-text-color;
    padding: 12px 0;
    text-align: center;
  }

  &__days {
    display: flex;
    flex-wrap: wrap;
  }

  &__day {
    width: calc(100% / 7);
    text-align: center;
    cursor: pointer;
    position: relative;

    &--placeholder {
      pointer-events: none;
    }

    &--disabled {
      color: @bw-text-color-3;
      cursor: not-allowed;
      pointer-events: none;
    }

    &--prev-month,
    &--next-month {
      color: @bw-text-color-3;
    }

    &--in-range {
      background-color: rgba(25, 137, 250, 0.1);
    }
  }

  &__day-content {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  &__day-range-start,
  &__day-range-end {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    z-index: 0;
  }

  &__day-text {
    position: relative;
    z-index: 1;
    font-size: @bw-font-size-md;
  }

  &__day-bottom {
    position: relative;
    z-index: 1;
    font-size: @bw-font-size-xs;
    line-height: 1;
    margin-top: 2px;
  }

  &__footer {
    padding: @bw-padding-md;
    border-top: 1px solid  @bw-border-color;
  }
}
</style>