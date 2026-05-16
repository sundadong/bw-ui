import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BackTop from '../../src/components/back-top/index.vue'

describe('BackTop 组件测试', () => {
  beforeEach(() => {
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 0,
      writable: true
    })
    Object.defineProperty(window, 'pageYOffset', {
      value: 0,
      writable: true
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('应该正确渲染返回顶部组件', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该包含 bw-back-top 类', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true }
    })
    expect(wrapper.classes()).toContain('bw-back-top')
  })

  it('modelValue 为 true 时应该显示', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true }
    })
    expect(wrapper.find('.bw-back-top').exists()).toBe(true)
  })

  it('modelValue 为 false 时应该隐藏', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: false }
    })
    const el = wrapper.find('.bw-back-top')
    expect(el.attributes('style')).toContain('display: none')
  })

  it('默认不传 modelValue 时应根据滚动位置决定显示', () => {
    const wrapper = mount(BackTop)
    expect(wrapper.exists()).toBe(true)
  })

  it('应该包含图标元素', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true }
    })
    expect(wrapper.find('.bw-back-top__icon').exists()).toBe(true)
  })

  it('应该包含 SVG 图标', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true }
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('默认 visibilityHeight 为 200', () => {
    const wrapper = mount(BackTop)
    expect(wrapper.props('visibilityHeight')).toBe(200)
  })

  it('应该支持自定义 visibilityHeight', () => {
    const wrapper = mount(BackTop, {
      props: { visibilityHeight: 500 }
    })
    expect(wrapper.props('visibilityHeight')).toBe(500)
  })

  it('默认 right 为 16', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true }
    })
    const el = wrapper.find('.bw-back-top')
    expect(el.attributes('style')).toContain('right: 16px')
  })

  it('应该支持自定义 right', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true, right: 30 }
    })
    const el = wrapper.find('.bw-back-top')
    expect(el.attributes('style')).toContain('right: 30px')
  })

  it('应该支持 right 为字符串', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true, right: '20px' }
    })
    const el = wrapper.find('.bw-back-top')
    expect(el.attributes('style')).toContain('right: 20px')
  })

  it('默认 bottom 为 100', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true }
    })
    const el = wrapper.find('.bw-back-top')
    expect(el.attributes('style')).toContain('bottom: 100px')
  })

  it('应该支持自定义 bottom', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true, bottom: 50 }
    })
    const el = wrapper.find('.bw-back-top')
    expect(el.attributes('style')).toContain('bottom: 50px')
  })

  it('应该支持 bottom 为字符串', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true, bottom: '80px' }
    })
    const el = wrapper.find('.bw-back-top')
    expect(el.attributes('style')).toContain('bottom: 80px')
  })

  it('默认 zIndex 为 100', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true }
    })
    const el = wrapper.find('.bw-back-top')
    expect(el.attributes('style')).toContain('z-index: 100')
  })

  it('应该支持自定义 zIndex', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true, zIndex: 999 }
    })
    const el = wrapper.find('.bw-back-top')
    expect(el.attributes('style')).toContain('z-index: 999')
  })

  it('默认 duration 为 300', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true }
    })
    expect(wrapper.props('duration')).toBe(300)
  })

  it('应该支持自定义 duration', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true, duration: 500 }
    })
    expect(wrapper.props('duration')).toBe(500)
  })

  it('点击时应该触发 click 事件', async () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true }
    })
    await wrapper.find('.bw-back-top').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })

  it('应该渲染为 div 元素', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true }
    })
    expect(wrapper.find('.bw-back-top').element.tagName.toLowerCase()).toBe('div')
  })

  it('应该支持默认插槽', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true },
      slots: { default: '<span>回到顶部</span>' }
    })
    expect(wrapper.find('.bw-back-top span').text()).toBe('回到顶部')
  })

  it('使用插槽时不应显示默认图标', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true },
      slots: { default: '<span>TOP</span>' }
    })
    expect(wrapper.find('.bw-back-top__icon').exists()).toBe(false)
  })

  it('应该支持 target 属性为字符串', () => {
    const wrapper = mount(BackTop, {
      props: { modelValue: true, target: '#app' }
    })
    expect(wrapper.props('target')).toBe('#app')
  })

  it('应该支持 target 属性为 HTMLElement', () => {
    const div = document.createElement('div')
    const wrapper = mount(BackTop, {
      props: { modelValue: true, target: div }
    })
    expect(wrapper.props('target')).toBe(div)
  })
})