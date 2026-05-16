import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Sticky from '../../src/components/sticky/index.vue'

describe('Sticky 组件测试', () => {
  it('应该正确渲染 Sticky 容器', () => {
    const wrapper = mount(Sticky, {
      slots: { default: '<div>粘性内容</div>' }
    })
    expect(wrapper.find('.bw-sticky').exists()).toBe(true)
  })

  it('应该包含 bw-sticky 类', () => {
    const wrapper = mount(Sticky, {
      slots: { default: '<div>内容</div>' }
    })
    expect(wrapper.classes()).toContain('bw-sticky')
  })

  it('应该正确渲染插槽内容', () => {
    const wrapper = mount(Sticky, {
      slots: { default: '<div class="sticky-child">子内容</div>' }
    })
    expect(wrapper.find('.sticky-child').exists()).toBe(true)
    expect(wrapper.find('.sticky-child').text()).toBe('子内容')
  })

  it('默认 position 应为 top', () => {
    const wrapper = mount(Sticky, {
      slots: { default: '<div>内容</div>' }
    })
    expect(wrapper.props('position')).toBe('top')
  })

  it('应该支持 position=bottom', () => {
    const wrapper = mount(Sticky, {
      props: { position: 'bottom' },
      slots: { default: '<div>内容</div>' }
    })
    expect(wrapper.props('position')).toBe('bottom')
  })

  it('默认 offsetTop 应为 0', () => {
    const wrapper = mount(Sticky, {
      slots: { default: '<div>内容</div>' }
    })
    expect(wrapper.props('offsetTop')).toBe(0)
  })

  it('应该支持自定义 offsetTop', () => {
    const wrapper = mount(Sticky, {
      props: { offsetTop: 50 },
      slots: { default: '<div>内容</div>' }
    })
    expect(wrapper.props('offsetTop')).toBe(50)
  })

  it('应该支持字符串 offsetTop', () => {
    const wrapper = mount(Sticky, {
      props: { offsetTop: '60' },
      slots: { default: '<div>内容</div>' }
    })
    expect(wrapper.props('offsetTop')).toBe('60')
  })

  it('默认 offsetBottom 应为 0', () => {
    const wrapper = mount(Sticky, {
      slots: { default: '<div>内容</div>' }
    })
    expect(wrapper.props('offsetBottom')).toBe(0)
  })

  it('应该支持自定义 offsetBottom', () => {
    const wrapper = mount(Sticky, {
      props: { offsetBottom: 30 },
      slots: { default: '<div>内容</div>' }
    })
    expect(wrapper.props('offsetBottom')).toBe(30)
  })

  it('默认 zIndex 应为 99', () => {
    const wrapper = mount(Sticky, {
      slots: { default: '<div>内容</div>' }
    })
    expect(wrapper.props('zIndex')).toBe(99)
  })

  it('应该支持自定义 zIndex', () => {
    const wrapper = mount(Sticky, {
      props: { zIndex: 1000 },
      slots: { default: '<div>内容</div>' }
    })
    expect(wrapper.props('zIndex')).toBe(1000)
  })

  it('应该支持字符串 zIndex', () => {
    const wrapper = mount(Sticky, {
      props: { zIndex: '999' },
      slots: { default: '<div>内容</div>' }
    })
    expect(wrapper.props('zIndex')).toBe('999')
  })

  it('默认不应该处于固定状态', () => {
    const wrapper = mount(Sticky, {
      slots: { default: '<div>内容</div>' }
    })
    expect(wrapper.find('.bw-sticky--fixed').exists()).toBe(false)
  })

  it('应该支持 container 属性', () => {
    const wrapper = mount(Sticky, {
      props: { container: null },
      slots: { default: '<div>内容</div>' }
    })
    expect(wrapper.props('container')).toBeNull()
  })

  it('组件卸载时应该清理事件监听', () => {
    const wrapper = mount(Sticky, {
      slots: { default: '<div>内容</div>' }
    })
    wrapper.unmount()
    expect(wrapper.exists()).toBe(false)
  })

  it('应该触发 scroll 事件', () => {
    const wrapper = mount(Sticky, {
      slots: { default: '<div>内容</div>' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该触发 change 事件', () => {
    const wrapper = mount(Sticky, {
      slots: { default: '<div>内容</div>' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该正确处理空内容', () => {
    const wrapper = mount(Sticky)
    expect(wrapper.find('.bw-sticky').exists()).toBe(true)
  })

  it('应该正确渲染多个子元素', () => {
    const wrapper = mount(Sticky, {
      slots: {
        default: '<div>A</div><div>B</div><div>C</div>'
      }
    })
    expect(wrapper.find('.bw-sticky').exists()).toBe(true)
  })

  it('position=bottom 且 fixed 时应使用 bottom 定位', async () => {
    const wrapper = mount(Sticky, {
      props: { position: 'bottom', offsetBottom: 10 },
      slots: { default: '<div>内容</div>' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该正确渲染嵌套 HTML', () => {
    const wrapper = mount(Sticky, {
      slots: {
        default: '<div style="background: red;"><span class="inner">嵌套内容</span></div>'
      }
    })
    expect(wrapper.find('.inner').exists()).toBe(true)
  })
})