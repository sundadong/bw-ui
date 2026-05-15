<template>
  <view v-if="isShow" class="bw-toast" :class="[`bw-toast--${type}`]">
    <view v-if="type === 'loading'" class="bw-toast__loading">
      <bw-loading type="circular" :size="loadingSize" />
    </view>
    <view v-else-if="icon" class="bw-toast__icon">
      <bw-icon :name="icon" :size="iconSize" />
    </view>
    <view v-if="message" class="bw-toast__text">{{ message }}</view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BwLoading from '../loading/index.vue'
import BwIcon from '../icon/index.vue'

export interface ToastProps {
  message?: string
  type?: 'text' | 'loading' | 'success' | 'fail' | 'warning' | 'loading'
  icon?: string
  iconSize?: string
  loadingSize?: string
  duration?: number
  position?: 'top' | 'center' | 'bottom'
  forbidClick?: boolean
  overlay?: boolean
  zIndex?: number
}

const props = withDefaults(defineProps<ToastProps>(), {
  type: 'text',
  iconSize: '40px',
  loadingSize: '40px',
  duration: 2000,
  position: 'center',
  forbidClick: false,
  overlay: false,
  zIndex: 3000
})

const isShow = ref(false)

const show = () => {
  isShow.value = true
  if (props.duration > 0) {
    setTimeout(() => {
      hide()
    }, props.duration)
  }
}

const hide = () => {
  isShow.value = false
}

defineExpose({
  show,
  hide
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.bw-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: $bw-toast-max-width;
  padding: $bw-padding-md $bw-padding-lg;
  font-size: $bw-font-size-md;
  line-height: $bw-line-height-md;
  color: $bw-white;
  text-align: center;
  word-break: break-all;
  background-color: rgba(50, 50, 51, 0.9);
  border-radius: $bw-border-radius-lg;
  transform: translate(-50%, -50%);

  &--top {
    top: $bw-toast-offset-y;
    transform: translate(-50%, 0);
  }

  &--bottom {
    top: auto;
    bottom: $bw-toast-offset-y;
    transform: translate(-50%, 0);
  }

  &--success,
  &--fail,
  &--warning {
    .bw-toast__icon {
      margin-bottom: $bw-padding-xs;
    }
  }

  &__loading {
    margin-bottom: $bw-padding-xs;
  }

  &__icon {
    margin-bottom: $bw-padding-xs;
  }

  &__text {
    word-break: normal;
  }
}
