import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Popup from '../../src/components/popup/index.vue'

describe('Popup 组件测试', () => {
  it('默认不显示 popup', () => {
    const wrapper = mount(Popup)
    expect(wrapper.find('.bw-popup-wrapper').exists()).toBe(false)
  })

  it('modelValue=true 时应该显示 popup', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true }
    })
    expect(wrapper.find('.bw-popup-wrapper').exists()).toBe(true)
  })

  it('show=true 时应该显示 popup', () => {
    const wrapper = mount(Popup, {
      props: { show: true }
    })
    expect(wrapper.find('.bw-popup-wrapper').exists()).toBe(true)
  })

  it('position=top 时应用对应 class', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true, position: 'top' }
    })
    expect(wrapper.find('.bw-popup').classes()).toContain('bw-popup--top')
  })

  it('position=bottom 时应用对应 class', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true, position: 'bottom' }
    })
    expect(wrapper.find('.bw-popup').classes()).toContain('bw-popup--bottom')
  })

  it('position=center 时应用对应 class', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true, position: 'center' }
    })
    expect(wrapper.find('.bw-popup').classes()).toContain('bw-popup--center')
  })

  it('position=left 时应用对应 class', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true, position: 'left' }
    })
    expect(wrapper.find('.bw-popup').classes()).toContain('bw-popup--left')
  })

  it('position=right 时应用对应 class', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true, position: 'right' }
    })
    expect(wrapper.find('.bw-popup').classes()).toContain('bw-popup--right')
  })

  it('round=true 时应用 round class', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true, round: true }
    })
    expect(wrapper.find('.bw-popup').classes()).toContain('bw-popup--round')
  })

  it('closeable=true 时应用 closeable class', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true, closeable: true }
    })
    expect(wrapper.find('.bw-popup').classes()).toContain('bw-popup--closeable')
  })

  it('closeable=true 时显示关闭按钮', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true, closeable: true, title: '标题' }
    })
    expect(wrapper.find('.bw-popup__close').exists()).toBe(true)
  })

  it('overlay=false 时不渲染 overlay', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true, overlay: false }
    })
    expect(wrapper.find('.bw-overlay').exists()).toBe(false)
  })

  it('overlay=true 时渲染 overlay', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true, overlay: true }
    })
    expect(wrapper.find('.bw-overlay').exists()).toBe(true)
  })

  it('title prop 应该正确渲染', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true, title: '弹窗标题' }
    })
    expect(wrapper.find('.bw-popup__title').text()).toBe('弹窗标题')
  })

  it('title slot 应该正确渲染', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true },
      slots: { title: '<span class="slot-title">自定义标题</span>' }
    })
    expect(wrapper.find('.slot-title').exists()).toBe(true)
  })

  it('显示时触发 open 事件', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: false }
    })
    expect(wrapper.emitted('open')).toBeFalsy()
  })

  it('modelValue 从 false 变 true 时触发 open', async () => {
    const wrapper = mount(Popup, {
      props: { modelValue: false }
    })
    await wrapper.setProps({ modelValue: true })
    expect(wrapper.emitted('open')).toBeTruthy()
  })

  it('closeable 点击关闭触发 update:modelValue 为 false', async () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true, closeable: true, title: '标题' }
    })
    await wrapper.find('.bw-popup__close').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('关闭触发 update:show 为 false', async () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true, closeable: true, title: '标题' }
    })
    await wrapper.find('.bw-popup__close').trigger('click')
    expect(wrapper.emitted('update:show')).toBeTruthy()
    expect(wrapper.emitted('update:show')?.[0]).toEqual([false])
  })

  it('关闭触发 close 事件', async () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true, closeable: true, title: '标题' }
    })
    await wrapper.find('.bw-popup__close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('关闭触发 closed 事件', async () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true, closeable: true, title: '标题' }
    })
    await wrapper.find('.bw-popup__close').trigger('click')
    expect(wrapper.emitted('closed')).toBeTruthy()
  })

  it('zIndex 默认值应该为 2000', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true }
    })
    expect(wrapper.props('zIndex')).toBe(2000)
  })

  it('duration 默认值应该为 0.3', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true }
    })
    expect(wrapper.props('duration')).toBe(0.3)
  })

  it('overlayOpacity 默认值应该为 0.7', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true }
    })
    expect(wrapper.props('overlayOpacity')).toBe(0.7)
  })

  it('lazyRender 默认值应该为 true', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true }
    })
    expect(wrapper.props('lazyRender')).toBe(true)
  })

  it('closeOnClickOverlay 默认值应该为 true', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true }
    })
    expect(wrapper.props('closeOnClickOverlay')).toBe(true)
  })

  it('popup 样式包含 zIndex', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true, zIndex: 2500 }
    })
    const popup = wrapper.find('.bw-popup')
    expect(popup.attributes('style')).toContain('z-index: 2501')
  })

  it('popup 样式包含 transitionDuration', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true, duration: 0.5 }
    })
    const popup = wrapper.find('.bw-popup')
    expect(popup.attributes('style')).toContain('transition-duration: 0.5s')
  })

  it('默认 slot 应该正确渲染', () => {
    const wrapper = mount(Popup, {
      props: { modelValue: true },
      slots: { default: '<div class="popup-content">内容区域</div>' }
    })
    expect(wrapper.find('.popup-content').exists()).toBe(true)
  })
})