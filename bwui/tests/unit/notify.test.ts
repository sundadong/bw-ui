import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Notify from '../../src/components/notify/index.vue'

describe('Notify 组件测试', () => {
  it('默认不显示通知', () => {
    const wrapper = mount(Notify)
    expect(wrapper.find('.bw-notify').exists()).toBe(false)
  })

  it('设置 modelValue=true 后应该显示通知', () => {
    const wrapper = mount(Notify, {
      props: { modelValue: true, message: '测试通知' }
    })
    expect(wrapper.find('.bw-notify').exists()).toBe(true)
  })

  it('应该正确渲染 message 内容', () => {
    const wrapper = mount(Notify, {
      props: { modelValue: true, message: '这是一条通知消息' }
    })
    expect(wrapper.find('.bw-notify__message').text()).toBe('这是一条通知消息')
  })

  it('默认 type 应该为 danger', () => {
    const wrapper = mount(Notify, {
      props: { modelValue: true, message: '通知' }
    })
    expect(wrapper.find('.bw-notify').classes()).toContain('bw-notify--danger')
  })

  it('应该正确应用 type=primary 样式', () => {
    const wrapper = mount(Notify, {
      props: { modelValue: true, type: 'primary', message: '通知' }
    })
    expect(wrapper.find('.bw-notify').classes()).toContain('bw-notify--primary')
  })

  it('应该正确应用 type=success 样式', () => {
    const wrapper = mount(Notify, {
      props: { modelValue: true, type: 'success', message: '通知' }
    })
    expect(wrapper.find('.bw-notify').classes()).toContain('bw-notify--success')
  })

  it('应该正确应用 type=warning 样式', () => {
    const wrapper = mount(Notify, {
      props: { modelValue: true, type: 'warning', message: '通知' }
    })
    expect(wrapper.find('.bw-notify').classes()).toContain('bw-notify--warning')
  })

  it('默认 position 应该为 top', () => {
    const wrapper = mount(Notify, {
      props: { modelValue: true, message: '通知' }
    })
    expect(wrapper.find('.bw-notify').classes()).toContain('bw-notify--top')
  })

  it('应该正确应用 position=bottom 样式', () => {
    const wrapper = mount(Notify, {
      props: { modelValue: true, position: 'bottom', message: '通知' }
    })
    expect(wrapper.find('.bw-notify').classes()).toContain('bw-notify--bottom')
  })

  it('默认 duration 应该为 3000', () => {
    const wrapper = mount(Notify, {
      props: { modelValue: true, message: '通知' }
    })
    expect(wrapper.props('duration')).toBe(3000)
  })

  it('duration 大于 0 时应该自动隐藏', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Notify, {
      props: { modelValue: true, message: '通知', duration: 1000 }
    })
    await nextTick()
    expect(wrapper.find('.bw-notify').exists()).toBe(true)
    vi.advanceTimersByTime(1000)
    await nextTick()
    expect(wrapper.find('.bw-notify').exists()).toBe(false)
    vi.useRealTimers()
  })

  it('duration=0 时不应该自动隐藏', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Notify, {
      props: { modelValue: true, message: '通知', duration: 0 }
    })
    await nextTick()
    expect(wrapper.find('.bw-notify').exists()).toBe(true)
    vi.advanceTimersByTime(10000)
    await nextTick()
    expect(wrapper.find('.bw-notify').exists()).toBe(true)
    vi.useRealTimers()
  })

  it('show() 方法应该显示通知', async () => {
    const wrapper = mount(Notify, {
      props: { message: '通知' }
    })
    expect(wrapper.find('.bw-notify').exists()).toBe(false)
    ;(wrapper.vm as any).show()
    await nextTick()
    expect(wrapper.find('.bw-notify').exists()).toBe(true)
  })

  it('hide() 方法应该隐藏通知', async () => {
    const wrapper = mount(Notify, {
      props: { modelValue: true, message: '通知' }
    })
    expect(wrapper.find('.bw-notify').exists()).toBe(true)
    ;(wrapper.vm as any).hide()
    await nextTick()
    expect(wrapper.find('.bw-notify').exists()).toBe(false)
  })

  it('modelValue 从 false 变为 true 时应该显示', async () => {
    const wrapper = mount(Notify, {
      props: { modelValue: false, message: '通知' }
    })
    expect(wrapper.find('.bw-notify').exists()).toBe(false)
    await wrapper.setProps({ modelValue: true })
    await nextTick()
    expect(wrapper.find('.bw-notify').exists()).toBe(true)
  })

  it('modelValue 从 true 变为 false 时应该隐藏', async () => {
    const wrapper = mount(Notify, {
      props: { modelValue: true, message: '通知' }
    })
    expect(wrapper.find('.bw-notify').exists()).toBe(true)
    await wrapper.setProps({ modelValue: false })
    await nextTick()
    expect(wrapper.find('.bw-notify').exists()).toBe(false)
  })

  it('hide() 应该触发 update:modelValue 事件', async () => {
    const wrapper = mount(Notify, {
      props: { modelValue: true, message: '通知' }
    })
    ;(wrapper.vm as any).hide()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('background 属性应该设置内联样式', () => {
    const wrapper = mount(Notify, {
      props: { modelValue: true, message: '通知', background: '#ff0000' }
    })
    expect(wrapper.find('.bw-notify').attributes('style')).toContain('background: #ff0000')
  })

  it('color 属性应该设置内联样式', () => {
    const wrapper = mount(Notify, {
      props: { modelValue: true, message: '通知', color: '#ffffff' }
    })
    expect(wrapper.find('.bw-notify').attributes('style')).toContain('color: #ffffff')
  })

  it('zIndex 默认值应该为 3000', () => {
    const wrapper = mount(Notify, {
      props: { modelValue: true, message: '通知' }
    })
    expect(wrapper.props('zIndex')).toBe(3000)
  })

  it('safeAreaInsetTop 应该应用对应样式', () => {
    const wrapper = mount(Notify, {
      props: { modelValue: true, message: '通知', safeAreaInsetTop: true }
    })
    expect(wrapper.find('.bw-notify').classes()).toContain('bw-notify--safe-area-inset-top')
  })

  it('不传 message 时应该正常渲染空消息', () => {
    const wrapper = mount(Notify, {
      props: { modelValue: true }
    })
    expect(wrapper.find('.bw-notify').exists()).toBe(true)
  })

  it('hide 后再次 show 应该重新显示', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Notify, {
      props: { modelValue: true, message: '通知', duration: 500 }
    })
    await nextTick()
    expect(wrapper.find('.bw-notify').exists()).toBe(true)
    ;(wrapper.vm as any).hide()
    await nextTick()
    expect(wrapper.find('.bw-notify').exists()).toBe(false)
    ;(wrapper.vm as any).show()
    await nextTick()
    expect(wrapper.find('.bw-notify').exists()).toBe(true)
    vi.useRealTimers()
  })

  it('duration 自动隐藏后再次设置 modelValue 应该重新显示', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Notify, {
      props: { modelValue: true, message: '通知', duration: 500 }
    })
    await nextTick()
    vi.advanceTimersByTime(500)
    await nextTick()
    expect(wrapper.find('.bw-notify').exists()).toBe(false)
    await wrapper.setProps({ modelValue: false })
    await nextTick()
    await wrapper.setProps({ modelValue: true })
    await nextTick()
    expect(wrapper.find('.bw-notify').exists()).toBe(true)
    vi.useRealTimers()
  })

  it('组件卸载时应该清除定时器', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Notify, {
      props: { modelValue: true, message: '通知', duration: 1000 }
    })
    await nextTick()
    wrapper.unmount()
    vi.advanceTimersByTime(2000)
    await nextTick()
    vi.useRealTimers()
  })
})