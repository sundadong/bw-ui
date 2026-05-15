import { createVNode, render } from 'vue'
import type { App } from 'vue'
import ToastComponent from './index.vue'
import type { ToastProps } from './index.vue'

let toastInstance: ReturnType<typeof createVNode> | null = null

interface ToastOptions extends ToastProps {
  duration?: number
}

const defaultOptions: ToastOptions = {
  message: '',
  type: 'text',
  duration: 2000,
  position: 'center',
  forbidClick: false,
  overlay: false,
  zIndex: 3000
}

const toast = (options: ToastOptions = {}) => {
  const props = { ...defaultOptions, ...options }

  const container = document.createElement('view')
  document.body.appendChild(container)

  const instance = createVNode(ToastComponent, props)
  render(instance, container)

  const vm = instance.component?.exposed
  if (vm?.show) {
    vm.show()
  }

  if (props.duration && props.duration > 0) {
    setTimeout(() => {
      if (vm?.hide) {
        vm.hide()
      }
      setTimeout(() => {
        render(null, container)
        document.body.removeChild(container)
      }, 300)
    }, props.duration)
  }

  return {
    hide: () => {
      if (vm?.hide) {
        vm.hide()
      }
    }
  }
}

toast.loading = (message: string, options?: ToastOptions) => {
  return toast({ ...options, message, type: 'loading' } as ToastOptions)
}

toast.success = (message: string, options?: ToastOptions) => {
  return toast({ ...options, message, type: 'success', icon: 'success' } as ToastOptions)
}

toast.fail = (message: string, options?: ToastOptions) => {
  return toast({ ...options, message, type: 'fail', icon: 'fail' } as ToastOptions)
}

toast.warning = (message: string, options?: ToastOptions) => {
  return toast({ ...options, message, type: 'warning', icon: 'warning' } as ToastOptions)
}

toast.text = (message: string, options?: ToastOptions) => {
  return toast({ ...options, message, type: 'text' } as ToastOptions)
}

export default toast
