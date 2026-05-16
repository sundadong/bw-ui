<template>
  <div class="bw-area-picker">
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

interface AreaItem {
  text: string
  value: string
}

interface AreaList {
  province_list: Record<string, string>
  city_list: Record<string, string>
  county_list: Record<string, string>
}

interface PickerColumnItem {
  text: string
  value: string | number
}

interface Props {
  modelValue?: string
  title?: string
  areaList?: AreaList
  columnsNum?: number
  columnsPlaceholder?: string[]
  visibleOptionNum?: number
  optionHeight?: number
  toolbarPosition?: 'top' | 'bottom'
  showToolbar?: boolean
  confirmText?: string
  cancelText?: string
  loading?: boolean
  readonly?: boolean
  show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  title: '请选择所在地区',
  areaList: () => ({
    province_list: {},
    city_list: {},
    county_list: {}
  }),
  columnsNum: 3,
  columnsPlaceholder: () => ['请选择', '请选择', '请选择'],
  visibleOptionNum: 6,
  optionHeight: 44,
  toolbarPosition: 'bottom',
  showToolbar: true,
  confirmText: '确认',
  cancelText: '取消',
  loading: false,
  readonly: false,
  show: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:show': [value: boolean]
  confirm: [result: { code: string; province: string; city: string; county: string }]
  cancel: []
  change: [result: { code: string; province: string; city: string; county: string }]
}>()

const showPopup = ref(false)

const parseAreaList = (list: Record<string, string>): AreaItem[] => {
  return Object.entries(list).map(([value, text]) => ({ value, text }))
}

const provinces = computed(() => parseAreaList(props.areaList?.province_list || {}))

const allCities = computed(() => parseAreaList(props.areaList?.city_list || {}))

const allCounties = computed(() => parseAreaList(props.areaList?.county_list || {}))

const currentProvinceCode = ref('')
const currentCityCode = ref('')
const currentCountyCode = ref('')

const currentProvinceName = computed(() => {
  const item = provinces.value.find((p) => p.value === currentProvinceCode.value)
  return item?.text || ''
})

const currentCityName = computed(() => {
  const item = allCities.value.find((c) => c.value === currentCityCode.value)
  return item?.text || ''
})

const currentCountyName = computed(() => {
  const item = allCounties.value.find((c) => c.value === currentCountyCode.value)
  return item?.text || ''
})

const cityList = computed(() => {
  if (!currentProvinceCode.value) return []
  const prefix = currentProvinceCode.value.slice(0, 2)
  return allCities.value.filter((c) => c.value.startsWith(prefix))
})

const countyList = computed(() => {
  if (!currentCityCode.value) return []
  const prefix = currentCityCode.value.slice(0, 4)
  return allCounties.value.filter((c) => c.value.startsWith(prefix))
})

const pickerColumns = computed(() => {
  const cols: PickerColumnItem[][] = []

  if (props.columnsNum >= 1) {
    cols.push(
      provinces.value.length > 0
        ? provinces.value
        : [{ text: props.columnsPlaceholder?.[0] || '请选择', value: '' }]
    )
  }

  if (props.columnsNum >= 2) {
    cols.push(
      cityList.value.length > 0
        ? cityList.value
        : [{ text: props.columnsPlaceholder?.[1] || '请选择', value: '' }]
    )
  }

  if (props.columnsNum >= 3) {
    cols.push(
      countyList.value.length > 0
        ? countyList.value
        : [{ text: props.columnsPlaceholder?.[2] || '请选择', value: '' }]
    )
  }

  return cols
})

const pickerValue = computed(() => {
  const values: (string | number)[] = []

  if (props.columnsNum >= 1) {
    values.push(currentProvinceCode.value || '')
  }
  if (props.columnsNum >= 2) {
    values.push(currentCityCode.value || '')
  }
  if (props.columnsNum >= 3) {
    values.push(currentCountyCode.value || '')
  }

  return values
})

const getResultCode = (): string => {
  if (props.columnsNum === 1) return currentProvinceCode.value
  if (props.columnsNum === 2) return currentCityCode.value || currentProvinceCode.value
  return currentCountyCode.value || currentCityCode.value || currentProvinceCode.value
}

const getResult = () => {
  return {
    code: getResultCode(),
    province: currentProvinceName.value,
    city: currentCityName.value,
    county: currentCountyName.value
  }
}

const emitChange = () => {
  emit('change', getResult())
}

const findProvinceByCode = (code: string): string => {
  if (code.length >= 2) return code.slice(0, 2) + '0000'
  return code
}

const findCityByCode = (code: string): string => {
  if (code.length >= 4) return code.slice(0, 4) + '00'
  return code
}

const initFromCode = (code: string) => {
  if (!code) return
  currentProvinceCode.value = findProvinceByCode(code)
  currentCityCode.value = findCityByCode(code)
  currentCountyCode.value = code
}

const handlePickerChange = (value: string | number | (string | number)[]) => {
  const values = Array.isArray(value) ? value : [value]

  if (props.columnsNum >= 1 && values[0] !== undefined) {
    currentProvinceCode.value = String(values[0])
  }
  if (props.columnsNum >= 2 && values[1] !== undefined) {
    currentCityCode.value = String(values[1])
    currentCountyCode.value = ''
  }
  if (props.columnsNum >= 3 && values[2] !== undefined) {
    currentCountyCode.value = String(values[2])
  }

  nextTick(() => {
    emitChange()
  })
}

const handlePickerConfirm = (value: string | number | (string | number)[]) => {
  const values = Array.isArray(value) ? value : [value]

  if (props.columnsNum >= 1 && values[0] !== undefined) {
    currentProvinceCode.value = String(values[0])
  }
  if (props.columnsNum >= 2 && values[1] !== undefined) {
    currentCityCode.value = String(values[1])
  }
  if (props.columnsNum >= 3 && values[2] !== undefined) {
    currentCountyCode.value = String(values[2])
  }

  const result = getResult()
  emit('update:modelValue', result.code)
  emit('confirm', result)
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
      initFromCode(props.modelValue || '')
    })
  }
}, { immediate: true })

watch(() => props.modelValue, (val) => {
  if (val) {
    initFromCode(val)
  }
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.bw-area-picker {
  width: 100%;
}
</style>