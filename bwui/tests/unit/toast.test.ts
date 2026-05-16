import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Toast from '../../src/components/toast/index.vue'

describe('Toast 组件测试', () => {
  it('默认不显示 toast', () => {
    const wrapper = mount(Toast)
    expect(wrapper.find('.bw-toast').exists()).toBe(false)
  })

  it('设置 show=true 后应该显示 toast', () => {
    const wrapper = mount(Toast, {
      props: { show: true, message: '测试消息' }
    })
    expect(wrapper.find('.bw-toast').exists()).toBe(true)
  })

  it('应该正确渲染 message 内容', () => {
    const wrapper = mount(Toast, {
      props: { show: true, message: '这是一条提示' }
    })
    expect(wrapper.find('.bw-toast__text').text()).toBe('这是一条提示')
  })

  it('默认 type 应该为 text', () => {
    const wrapper = mount(Toast, {
      props: { show: true, message: '提示' }
    })
    expect(wrapper.find('.bw-toast').classes()).toContain('bw-toast--text')
  })

  it('应该正确应用 type=success 样式', () => {
    const wrapper = mount(Toast, {
      props: { show: true, type: 'success', message: '成功' }
    })
    expect(wrapper.find('.bw-toast').classes()).toContain('bw-toast--success')
  })

  it('应该正确应用 type=fail 样式', () => {
    const wrapper = mount(Toast, {
      props: { show: true, type: 'fail', message: '失败' }
    })
    expect(wrapper.find('.bw-toast').classes()).toContain('bw-toast--fail')
  })

  it('应该正确应用 type=warning 样式', () => {
    const wrapper = mount(Toast, {
      props: { show: true, type: 'warning', message: '警告' }
    })
    expect(wrapper.find('.bw-toast').classes()).toContain('bw-toast--warning')
  })

  it('type=loading 时应该渲染 loading 组件', () => {
    const wrapper = mount(Toast, {
      props: { show: true, type: 'loading', message: '加载中' }
    })
    expect(wrapper.find('.bw-toast__loading').exists()).toBe(true)
  })

  it('type=loading 时应该应用 loading 样式', () => {
    const wrapper = mount(Toast, {
      props: { show: true, type: 'loading', message: '加载中' }
    })
    expect(wrapper.find('.bw-toast').classes()).toContain('bw-toast--loading')
  })

  it('设置 icon 属性时应该渲染 icon 区域', () => {
    const wrapper = mount(Toast, {
      props: { show: true, type: 'success', icon: 'check', message: '成功' }
    })
    expect(wrapper.find('.bw-toast__icon').exists()).toBe(true)
  })

  it('type=text 且无 icon 时不渲染 icon 区域', () => {
    const wrapper = mount(Toast, {
      props: { show: true, type: 'text', message: '纯文本' }
    })
    expect(wrapper.find('.bw-toast__icon').exists()).toBe(false)
  })

  it('iconSize 默认值应该为 40px', () => {
    const wrapper = mount(Toast, {
      props: { show: true, type: 'success', icon: 'check', message: '成功' }
    })
    expect(wrapper.props('iconSize')).toBe('40px')
  })

  it('loadingSize 默认值应该为 40px', () => {
    const wrapper = mount(Toast, {
      props: { show: true, type: 'loading', message: '加载中' }
    })
    expect(wrapper.props('loadingSize')).toBe('40px')
  })

  it('默认 duration 应该为 2000', () => {
    const wrapper = mount(Toast, {
      props: { show: true, message: '提示' }
    })
    expect(wrapper.props('duration')).toBe(2000)
  })

  it('duration 大于 0 时应该自动隐藏', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Toast, {
      props: { show: false, message: '提示', duration: 1000 }
    })
    await wrapper.setProps({ show: true })
    await nextTick()
    expect(wrapper.find('.bw-toast').exists()).toBe(true)
    vi.advanceTimersByTime(1000)
    await nextTick()
    expect(wrapper.find('.bw-toast').exists()).toBe(false)
    vi.useRealTimers()
  })

  it('show() 方法应该显示 toast', async () => {
    const wrapper = mount(Toast, {
      props: { message: '提示' }
    })
    expect(wrapper.find('.bw-toast').exists()).toBe(false)
    ;(wrapper.vm as any).show()
    await nextTick()
    expect(wrapper.find('.bw-toast').exists()).toBe(true)
  })

  it('hide() 方法应该隐藏 toast', async () => {
    const wrapper = mount(Toast, {
      props: { show: true, message: '提示' }
    })
    expect(wrapper.find('.bw-toast').exists()).toBe(true)
    ;(wrapper.vm as any).hide()
    await nextTick()
    expect(wrapper.find('.bw-toast').exists()).toBe(false)
  })

  it('show prop 从 false 变为 true 时应该显示', async () => {
    const wrapper = mount(Toast, {
      props: { show: false, message: '提示' }
    })
    expect(wrapper.find('.bw-toast').exists()).toBe(false)
    await wrapper.setProps({ show: true })
    expect(wrapper.find('.bw-toast').exists()).toBe(true)
  })

  it('show prop 从 true 变为 false 时应该隐藏', async () => {
    const wrapper = mount(Toast, {
      props: { show: true, message: '提示' }
    })
    expect(wrapper.find('.bw-toast').exists()).toBe(true)
    await wrapper.setProps({ show: false })
    expect(wrapper.find('.bw-toast').exists()).toBe(false)
  })

  it('zIndex 默认值应该为 3000', () => {
    const wrapper = mount(Toast, {
      props: { show: true, message: '提示' }
    })
    expect(wrapper.props('zIndex')).toBe(3000)
  })

  it('forbidClick 默认值应该为 false', () => {
    const wrapper = mount(Toast, {
      props: { show: true, message: '提示' }
    })
    expect(wrapper.props('forbidClick')).toBe(false)
  })

  it('overlay 默认值应该为 false', () => {
    const wrapper = mount(Toast, {
      props: { show: true, message: '提示' }
    })
    expect(wrapper.props('overlay')).toBe(false)
  })

  it('不传 message 时不应该渲染文本区域', () => {
    const wrapper = mount(Toast, {
      props: { show: true }
    })
    expect(wrapper.find('.bw-toast__text').exists()).toBe(false)
  })

  it('show() 后 duration 到期自动调用 hide', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Toast, {
      props: { message: '提示', duration: 500 }
    })
    ;(wrapper.vm as any).show()
    await nextTick()
    expect(wrapper.find('.bw-toast').exists()).toBe(true)
    vi.advanceTimersByTime(500)
    await nextTick()
    expect(wrapper.find('.bw-toast').exists()).toBe(false)
    vi.useRealTimers()
  })

  it('多次调用 show 和 hide 应该正确切换', async () => {
    const wrapper = mount(Toast, {
      props: { message: '提示' }
    })
    const vm = wrapper.vm as any
    expect(wrapper.find('.bw-toast').exists()).toBe(false)
    vm.show()
    await nextTick()
    expect(wrapper.find('.bw-toast').exists()).toBe(true)
    vm.hide()
    await nextTick()
    expect(wrapper.find('.bw-toast').exists()).toBe(false)
    vm.show()
    await nextTick()
    expect(wrapper.find('.bw-toast').exists()).toBe(true)
  })

  it('应该包含 bw-toast 基础类', () => {
    const wrapper = mount(Toast, {
      props: { show: true, message: '提示' }
    })
    expect(wrapper.find('.bw-toast').exists()).toBe(true)
  })

  it('show=false 时即使有 message 也不渲染', () => {
    const wrapper = mount(Toast, {
      props: { show: false, message: '不可见' }
    })
    expect(wrapper.find('.bw-toast').exists()).toBe(false)
  })
})