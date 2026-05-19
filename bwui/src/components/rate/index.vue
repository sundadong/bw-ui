<template>
  <div class="bw-rate" :class="{ 'bw-rate--disabled': disabled, 'bw-rate--readonly': readonly }">
    <div
      v-for="index in count"
      :key="index"
      class="bw-rate__item"
      :class="{ 'bw-rate__item--allow-half': allowHalf }"
      :style="{
        marginRight: index < count ? gutterPx : '0',
        fontSize: sizePx,
        width: sizePx,
        height: sizePx,
        color: getItemColor(index)
      }"
      @click="handleClick(index, $event)"
    >
      <span
        v-if="showVoidIcon(index)"
        class="bw-rate__icon bw-rate__icon--void"
      >★</span>
      <span
        v-if="showFullIcon(index)"
        class="bw-rate__icon bw-rate__icon--full"
      >★</span>
      <span
        v-if="showHalfIcon(index)"
        class="bw-rate__icon bw-rate__icon--half"
        :style="{ color: color }"
      >★</span>
      <span
        v-if="showHalfIcon(index)"
        class="bw-rate__icon bw-rate__icon--half-void"
        :style="{ color: voidColor }"
      >★</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface RateProps {
  modelValue?: number
  count?: number
  size?: number | string
  color?: string
  voidColor?: string
  disabled?: boolean
  readonly?: boolean
  allowHalf?: boolean
  icon?: string
  voidIcon?: string
  gutter?: number | string
}

const props = withDefaults(defineProps<RateProps>(), {
  modelValue: 0,
  count: 5,
  size: 20,
  color: '#ee0a24',
  voidColor: '#c8c9cc',
  disabled: false,
  readonly: false,
  allowHalf: false,
  icon: 'star',
  voidIcon: 'star-o',
  gutter: 4
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'change': [value: number]
}>()

const sizePx = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`
  }
  return props.size
})

const gutterPx = computed(() => {
  if (typeof props.gutter === 'number') {
    return `${props.gutter}px`
  }
  return props.gutter
})

const getItemColor = (index: number): string => {
  if (index <= Math.floor(props.modelValue)) {
    return props.color
  }
  if (props.allowHalf && index === Math.ceil(props.modelValue) && props.modelValue % 1 !== 0) {
    return props.color
  }
  return props.voidColor
}

const showFullIcon = (index: number): boolean => {
  if (!props.allowHalf) {
    return index <= props.modelValue
  }
  return index <= Math.floor(props.modelValue)
}

const showHalfIcon = (index: number): boolean => {
  if (!props.allowHalf) return false
  return index === Math.ceil(props.modelValue) && props.modelValue % 1 !== 0
}

const showVoidIcon = (index: number): boolean => {
  if (!props.allowHalf) {
    return index > props.modelValue
  }
  return index > Math.ceil(props.modelValue) || (index === Math.ceil(props.modelValue) && props.modelValue % 1 === 0 && index > props.modelValue)
}

const handleClick = (index: number, event: MouseEvent) => {
  if (props.disabled || props.readonly) return

  let value: number = index

  if (props.allowHalf) {
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    if (offsetX < rect.width / 2) {
      value = index - 0.5
    }
  }

  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.bw-rate {
  display: inline-flex;
  align-items: center;

  &--disabled {
    opacity: @bw-disabled-opacity;
  }

  &--readonly {
    cursor: default;
  }

  &__item {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;

    &--allow-half {
      .bw-rate__icon--half {
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        overflow: hidden;
        z-index: 1;
      }
      .bw-rate__icon--half-void {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 0;
      }
    }

    .bw-rate--disabled &,
    .bw-rate--readonly & {
      cursor: default;
    }
  }

  &__icon {
    line-height: 1;
    user-select: none;

    &--void {
      opacity: 1;
    }

    &--half {
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      overflow: hidden;
    }
  }
}
</style>