<template>
  <div v-if="visible" class="bw-action-sheet-wrapper">
    <bw-overlay
      :show="visible"
      :z-index="zIndex"
      @click="handleOverlayClick"
    />
    <div
      class="bw-action-sheet"
      :class="{
        'bw-action-sheet--round': round,
        'bw-action-sheet--safe-area-inset-bottom': safeAreaInsetBottom
      }"
      :style="actionSheetStyle"
    >
      <div v-if="description" class="bw-action-sheet__description">
        {{ description }}
      </div>
      <div class="bw-action-sheet__actions">
        <div
          v-for="(action, index) in actions"
          :key="index"
          class="bw-action-sheet__item"
          :class="{
            'bw-action-sheet__item--disabled': action.disabled,
            'bw-action-sheet__item--loading': action.loading
          }"
          :style="action.disabled ? {} : { color: action.color || '' }"
          @click="handleSelect(action, index)"
        >
          <bw-loading v-if="action.loading" :size="'20px'" class="bw-action-sheet__loading" />
          <span class="bw-action-sheet__name">{{ action.name }}</span>
          <span v-if="action.subname" class="bw-action-sheet__subname">{{ action.subname }}</span>
        </div>
      </div>
      <div v-if="cancelText" class="bw-action-sheet__cancel" @click="handleCancel">
        {{ cancelText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import BwOverlay from '../overlay/index.vue'
import BwLoading from '../loading/index.vue'

export interface ActionSheetAction {
  name: string
  color?: string
  subname?: string
  disabled?: boolean
  loading?: boolean
  callback?: (action: ActionSheetAction, index: number) => void
}

export interface ActionSheetProps {
  modelValue?: boolean
  actions?: ActionSheetAction[]
  title?: string
  cancelText?: string
  description?: string
  closeable?: boolean
  closeOnClickOverlay?: boolean
  round?: boolean
  safeAreaInsetBottom?: boolean
  zIndex?: number
}

const props = withDefaults(defineProps<ActionSheetProps>(), {
  modelValue: false,
  actions: () => [],
  cancelText: '',
  description: '',
  closeable: false,
  closeOnClickOverlay: true,
  round: true,
  safeAreaInsetBottom: true,
  zIndex: 2000
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'select': [action: ActionSheetAction, index: number]
  'cancel': []
  'close': []
}>()

const visible = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  visible.value = val
})

const actionSheetStyle = computed(() => {
  return {
    zIndex: String(props.zIndex + 1)
  }
})

const handleOverlayClick = () => {
  if (props.closeOnClickOverlay) {
    close()
  }
}

const handleSelect = (action: ActionSheetAction, index: number) => {
  if (action.disabled || action.loading) return

  if (action.callback) {
    action.callback(action, index)
  }
  emit('select', action, index)
  close()
}

const handleCancel = () => {
  emit('cancel')
  close()
}

const close = () => {
  visible.value = false
  emit('update:modelValue', false)
  emit('close')
}

defineExpose({
  close
})
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.bw-action-sheet-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: @bw-z-index-popup;
}

.bw-action-sheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: @bw-bg-color;
  border-radius: 0;

  &--round {
    border-radius: @bw-border-radius-xl  @bw-border-radius-xl 0 0;
  }

  &--safe-area-inset-bottom {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  &__description {
    padding: @bw-padding-md;
    font-size: @bw-font-size-md;
    color: @bw-text-color-2;
    text-align: center;
    line-height: @bw-line-height-md;
  }

  &__actions {
    max-height: 60vh;
    overflow-y: auto;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50px;
    font-size: @bw-font-size-lg;
    color: @bw-text-color;
    cursor: pointer;
    background-color: @bw-bg-color;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: @bw-padding-md;
      right: @bw-padding-md;
      height: 1px;
      background-color: @bw-border-color;
      transform: scaleY(0.5);
    }

    &--disabled {
      color: @bw-text-color-3;
      cursor: not-allowed;
    }

    &--loading {
      cursor: default;
    }

    &:active {
      background-color: @bw-active-color;
    }
  }

  &__loading {
    margin-bottom: 4px;
  }

  &__name {
    font-size: @bw-font-size-lg;
    line-height: @bw-line-height-md;
  }

  &__subname {
    font-size: @bw-font-size-sm;
    color: @bw-text-color-2;
    margin-top: 4px;
  }

  &__cancel {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    font-size: @bw-font-size-lg;
    color: @bw-text-color-1;
    cursor: pointer;
    background-color: @bw-bg-color;
    margin-top: 8px;

    &:active {
      background-color: @bw-active-color;
    }
  }
}
</style>