<template>
  <div v-if="visible" class="bw-notify-wrapper">
    <bw-overlay
      v-if="overlay"
      :show="visible"
      :z-index="zIndex"
      @click="handleOverlayClick"
    />
    <div
      class="bw-notify"
      :class="[`bw-notify--${type}`, `bw-notify--${position}`, { 'bw-notify--safe-area-inset-top': safeAreaInsetTop }]"
      :style="notifyStyle"
    >
      <div class="bw-notify__content">
        <span class="bw-notify__message">{{ message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import BwOverlay from '../overlay/index.vue'

export interface NotifyProps {
  modelValue?: boolean | string
  type?: 'primary' | 'success' | 'warning' | 'danger'
  message?: string
  duration?: number
  background?: string
  color?: string
  position?: 'top' | 'bottom'
  zIndex?: number
  safeAreaInsetTop?: boolean
  overlay?: boolean
  closeOnClickOverlay?: boolean
}

const props = withDefaults(defineProps<NotifyProps>(), {
  modelValue: false,
  type: 'danger',
  message: '',
  duration: 3000,
  position: 'top',
  zIndex: 3000,
  safeAreaInsetTop: false,
  overlay: false,
  closeOnClickOverlay: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

const hide = () => {
  visible.value = false
  emit('update:modelValue', false)
  clearTimer()
}

const startTimer = () => {
  clearTimer()
  if (props.duration > 0) {
    timer = setTimeout(() => {
      hide()
    }, props.duration)
  }
}

const show = (msg?: string) => {
  visible.value = true
  startTimer()
}

watch(
  () => props.modelValue,
  (val) => {
    if (typeof val === 'string') {
      show(val)
    } else if (val === true) {
      visible.value = true
      startTimer()
    } else {
      visible.value = false
      clearTimer()
    }
  },
  { immediate: true }
)

const notifyStyle = computed(() => {
  const style: Record<string, string> = {
    zIndex: String(props.zIndex + 1)
  }
  if (props.background) {
    style.background = props.background
  }
  if (props.color) {
    style.color = props.color
  }
  return style
})

const handleOverlayClick = () => {
  if (props.closeOnClickOverlay) {
    hide()
  }
}

onUnmounted(() => {
  clearTimer()
})

defineExpose({
  show,
  hide
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.bw-notify-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $bw-z-index-notify;
}

.bw-notify {
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 8px 16px;
  font-size: $bw-font-size-md;
  line-height: $bw-line-height-md;
  color: $bw-white;
  text-align: center;
  word-wrap: break-word;
  box-sizing: border-box;

  &--top {
    top: 0;
  }

  &--bottom {
    bottom: 0;
  }

  &--safe-area-inset-top {
    padding-top: calc(8px + constant(safe-area-inset-top));
    padding-top: calc(8px + env(safe-area-inset-top));
  }

  &--primary {
    background-color: $bw-primary-color;
  }

  &--success {
    background-color: $bw-success-color;
  }

  &--warning {
    background-color: $bw-warning-color;
  }

  &--danger {
    background-color: $bw-danger-color;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  &__message {
    flex: 1;
    word-break: break-all;
  }
}
</style>