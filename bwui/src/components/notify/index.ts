import { createVNode, render } from 'vue'
import NotifyComponent from './index.vue'
import type { NotifyProps } from './index.vue'

interface NotifyOptions extends Partial<NotifyProps> {
  message?: string
  duration?: number
  type?: 'primary' | 'success' | 'warning' | 'danger'
}

const defaultOptions: NotifyOptions = {
  type: 'danger',
  message: '',
  duration: 3000,
  position: 'top',
  zIndex: 3000,
  safeAreaInsetTop: false,
  overlay: false,
  closeOnClickOverlay: false
}

export const createNotify = (options: NotifyOptions | string) => {
  const opts: NotifyOptions = typeof options === 'string' ? { message: options } : options
  const props = { ...defaultOptions, ...opts, modelValue: true } as NotifyProps

  const container = document.createElement('div')
  document.body.appendChild(container)

  const instance = createVNode(NotifyComponent, props)
  render(instance, container)

  if (props.duration && props.duration > 0) {
    setTimeout(() => {
      render(null, container)
      document.body.removeChild(container)
    }, props.duration + 300)
  }

  return {
    hide: () => {
      render(null, container)
      document.body.removeChild(container)
    }
  }
}

export default createNotify