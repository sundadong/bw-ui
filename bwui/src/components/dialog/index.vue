<template>
  <div>
    <bw-popup :show="showPopup" position="center" :overlay="true" :close-on-click-overlay="false" :z-index="zIndex">
      <div class="bw-dialog">
        <div v-if="title || $slots.title" class="bw-dialog__header">
          <slot name="title">
            <div class="bw-dialog__title">{{ title }}</div>
          </slot>
        </div>
        <div class="bw-dialog__content">
          <slot>
            <div v-if="message" class="bw-dialog__message" :class="{ 'bw-dialog__message--has-title': title }">
              {{ message }}
            </div>
          </slot>
        </div>
        <div v-if="!hideFooter" class="bw-dialog__footer" :class="[`bw-dialog__footer--${buttonLayout}`]">
          <div v-if="showCancelButton" class="bw-dialog__cancel" @click="handleCancel">
            <slot name="cancel-button">
              {{ cancelButtonText }}
            </slot>
          </div>
          <div v-if="showConfirmButton" class="bw-dialog__confirm" @click="handleConfirm">
            <slot name="confirm-button">
              {{ confirmButtonText }}
            </slot>
          </div>
        </div>
      </div>
    </bw-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BwPopup from '../popup/index.vue'

export interface DialogProps {
  show?: boolean
  title?: string
  message?: string
  messageAlign?: 'left' | 'center' | 'right'
  showConfirmButton?: boolean
  showCancelButton?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  buttonLayout?: 'horizontal' | 'vertical'
  hideFooter?: boolean
  zIndex?: number
  beforeClose?: (action: 'cancel' | 'confirm') => Promise<boolean> | boolean
}

const props = withDefaults(defineProps<DialogProps>(), {
  show: false,
  title: '',
  message: '',
  messageAlign: 'center',
  showConfirmButton: true,
  showCancelButton: true,
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  buttonLayout: 'horizontal',
  hideFooter: false,
  zIndex: 2000
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'update:show': [value: boolean]
  'confirm': []
  'cancel': []
  'open': []
  'close': []
}>()

const showPopup = ref(props.show)

watch(() => props.show, (newVal) => {
  showPopup.value = newVal
})

const handleConfirm = async () => {
  if (props.beforeClose) {
    const result = await props.beforeClose('confirm')
    if (result === false) return
  }
  showPopup.value = false
  emit('update:modelValue', false)
  emit('update:show', false)
  emit('confirm')
}

const handleCancel = async () => {
  if (props.beforeClose) {
    const result = await props.beforeClose('cancel')
    if (result === false) return
  }
  showPopup.value = false
  emit('update:modelValue', false)
  emit('update:show', false)
  emit('cancel')
}

defineExpose({
  open: () => {
    showPopup.value = true
    emit('open')
  },
  close: () => {
    showPopup.value = false
    emit('update:modelValue', false)
    emit('close')
  }
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.bw-dialog {
  width: $bw-dialog-width;
  padding: $bw-dialog-padding;
  font-size: $bw-font-size-md;
  border-radius: $bw-dialog-border-radius;

  &__header {
    padding-top: 0;
  }

  &__title {
    font-size: $bw-font-size-lg;
    font-weight: 500;
    color: $bw-text-color;
    text-align: center;
  }

  &__content {
    padding: $bw-padding-md 0;
  }

  &__message {
    color: $bw-text-color-1;
    text-align: center;
    word-wrap: break-word;
    line-height: $bw-line-height-lg;

    &--has-title {
      margin-top: $bw-padding-sm;
      color: $bw-text-color-2;
    }
  }

  &__footer {
    display: flex;

    &--horizontal {
      .bw-dialog__cancel {
        flex: 1;
        border-right: 1px solid $bw-border-color;
      }
      .bw-dialog__confirm {
        flex: 1;
      }
    }

    &--vertical {
      flex-direction: column;

      .bw-dialog__cancel {
        border-top: 1px solid $bw-border-color;
      }
      .bw-dialog__confirm {
        border-top: 1px solid $bw-border-color;
      }
    }
  }

  &__cancel,
  &__confirm {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $bw-button-height-md;
    font-size: $bw-font-size-md;
    color: $bw-primary-color;
    cursor: pointer;
  }

  &__cancel {
    color: $bw-text-color-2;
  }
}
</style>
