<template>
  <div v-if="isShow" class="bw-popup-wrapper">
    <bw-overlay
      v-if="overlay"
      :show="isShow"
      :z-index="zIndex"
      :opacity="overlayOpacity"
      @click="handleOverlayClick"
    />
    <div
      v-if="lazyRender ? isShow : true"
      class="bw-popup"
      :class="[popupClass, { 'bw-popup--show': isShow }]"
      :style="popupStyle"
    >
      <div v-if="title || $slots.title" class="bw-popup__header">
        <slot name="title">
          <div class="bw-popup__title">{{ title }}</div>
        </slot>
        <div v-if="closeable" class="bw-popup__close" @click="handleClose">
          <bw-icon name="cross" size="18px" />
        </div>
      </div>
      <div class="bw-popup__content">
        <slot></slot>
      </div>
      <div v-if="$slots.footer" class="bw-popup__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import BwOverlay from '../overlay/index.vue'
import BwIcon from '../icon/index.vue'

export interface PopupProps {
  modelValue?: boolean
  show?: boolean
  position?: 'top' | 'bottom' | 'center' | 'left' | 'right'
  round?: boolean
  closeable?: boolean
  overlay?: boolean
  overlayOpacity?: number
  zIndex?: number
  duration?: number | string
  title?: string
  lazyRender?: boolean
  closeOnClickOverlay?: boolean
}

const props = withDefaults(defineProps<PopupProps>(), {
  modelValue: false,
  show: false,
  position: 'center',
  round: false,
  closeable: false,
  overlay: true,
  overlayOpacity: 0.7,
  zIndex: 2000,
  duration: 0.3,
  lazyRender: true,
  closeOnClickOverlay: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'update:show': [value: boolean]
  'click': [event: Event]
  'close': [event: Event]
  'open': []
  'closed': []
}>()

const isShow = computed(() => props.modelValue || props.show)

const showPopup = ref(isShow.value)

watch(isShow, (val) => {
  showPopup.value = val
  if (val) {
    emit('open')
  }
}, { immediate: true })

watch(() => props.modelValue, (val) => {
  showPopup.value = val
})

const popupClass = computed(() => {
  return [
    `bw-popup--${props.position}`,
    {
      'bw-popup--round': props.round,
      'bw-popup--closeable': props.closeable
    }
  ]
})

const popupStyle = computed(() => {
  const style: Record<string, string> = {
    zIndex: String(props.zIndex + 1),
    transitionDuration: `${props.duration}s`
  }
  return style
})

const handleOverlayClick = () => {
  if (props.closeOnClickOverlay) {
    close()
  }
}

const handleClose = () => {
  close()
}

const close = () => {
  emit('update:modelValue', false)
  emit('update:show', false)
  emit('close', new Event('close') as any)
  emit('closed')
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.bw-popup-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
}

.bw-popup {
  position: fixed;
  max-height: 100%;
  overflow-y: auto;
  background-color: $bw-bg-color;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;

  &--top {
    top: 0;
    left: 0;
    right: 0;
    transform: translateY(-100%);
    border-radius: 0 0 $bw-popup-border-radius $bw-popup-border-radius;
  }

  &--bottom {
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(100%);
    border-radius: $bw-popup-border-radius $bw-popup-border-radius 0 0;
  }

  &--center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0;
    border-radius: $bw-popup-border-radius;
  }

  &--left {
    top: 0;
    left: 0;
    bottom: 0;
    transform: translateX(-100%);
  }

  &--right {
    top: 0;
    right: 0;
    bottom: 0;
    transform: translateX(100%);
  }

  &--show {
    transform: translateY(0);
    opacity: 1;

    &.bw-popup--top,
    &.bw-popup--bottom {
      transform: translateY(0);
    }

    &.bw-popup--left {
      transform: translateX(0);
    }

    &.bw-popup--right {
      transform: translateX(0);
    }

    &.bw-popup--center {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }

  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $bw-padding-md;
  }

  &__title {
    font-size: $bw-font-size-lg;
    font-weight: 500;
    color: $bw-text-color;
  }

  &__close {
    position: absolute;
    top: 50%;
    right: $bw-padding-md;
    transform: translateY(-50%);
    color: $bw-text-color-2;
  }

  &__content {
    padding: $bw-padding-md;
  }

  &__footer {
    padding: $bw-padding-md;
  }
}
</style>
