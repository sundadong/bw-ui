import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Overlay from '../../src/components/overlay/index.vue'

describe('Overlay 组件测试', () => {
  it('show=false 时不渲染 overlay', () => {
    const wrapper = mount(Overlay, {
      props: { show: false }
    })
    expect(wrapper.find('.bw-overlay').exists()).toBe(false)
  })

  it('show=true 时渲染 overlay', () => {
    const wrapper = mount(Overlay, {
      props: { show: true }
    })
    expect(wrapper.find('.bw-overlay').exists()).toBe(true)
  })

  it('应该包含 bw-overlay 类', () => {
    const wrapper = mount(Overlay, {
      props: { show: true }
    })
    expect(wrapper.find('.bw-overlay').exists()).toBe(true)
    expect(wrapper.find('.bw-overlay').classes()).toContain('bw-overlay')
  })

  it('默认 zIndex 应该为 2000', () => {
    const wrapper = mount(Overlay, {
      props: { show: true }
    })
    expect(wrapper.props('zIndex')).toBe(2000)
  })

  it('默认 opacity 应该为 0.7', () => {
    const wrapper = mount(Overlay, {
      props: { show: true }
    })
    expect(wrapper.props('opacity')).toBe(0.7)
  })

  it('默认 color 应该为 black', () => {
    const wrapper = mount(Overlay, {
      props: { show: true }
    })
    expect(wrapper.props('color')).toBe('black')
  })

  it('默认 duration 应该为 0.3', () => {
    const wrapper = mount(Overlay, {
      props: { show: true }
    })
    expect(wrapper.props('duration')).toBe(0.3)
  })

  it('zIndex 应用为行内样式', () => {
    const wrapper = mount(Overlay, {
      props: { show: true, zIndex: 3000 }
    })
    const overlay = wrapper.find('.bw-overlay')
    expect(overlay.attributes('style')).toContain('z-index: 3000')
  })

  it('zIndex 为字符串时应用为行内样式', () => {
    const wrapper = mount(Overlay, {
      props: { show: true, zIndex: '2500' }
    })
    const overlay = wrapper.find('.bw-overlay')
    expect(overlay.attributes('style')).toContain('z-index: 2500')
  })

  it('color 为 hex 颜色 #000000 时正确转换为 rgba', () => {
    const wrapper = mount(Overlay, {
      props: { show: true, color: '#000000', opacity: 0.5 }
    })
    const overlay = wrapper.find('.bw-overlay')
    expect(overlay.attributes('style')).toContain('rgba(0, 0, 0, 0.5)')
  })

  it('自定义 color 为 hex 颜色时正确转换为 rgba', () => {
    const wrapper = mount(Overlay, {
      props: { show: true, color: '#ff0000', opacity: 0.8 }
    })
    const overlay = wrapper.find('.bw-overlay')
    expect(overlay.attributes('style')).toContain('rgba(255, 0, 0, 0.8)')
  })

  it('自定义 color 为非 hex 时直接使用颜色值', () => {
    const wrapper = mount(Overlay, {
      props: { show: true, color: 'blue', opacity: 0.5 }
    })
    const overlay = wrapper.find('.bw-overlay')
    expect(overlay.attributes('style')).toContain('blue')
  })

  it('点击 overlay 触发 click 事件', async () => {
    const wrapper = mount(Overlay, {
      props: { show: true }
    })
    await wrapper.find('.bw-overlay').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })

  it('多次点击触发多次 click 事件', async () => {
    const wrapper = mount(Overlay, {
      props: { show: true }
    })
    await wrapper.find('.bw-overlay').trigger('click')
    await wrapper.find('.bw-overlay').trigger('click')
    await wrapper.find('.bw-overlay').trigger('click')
    expect(wrapper.emitted('click')?.length).toBe(3)
  })

  it('show 从 true 变 false 后不渲染', async () => {
    const wrapper = mount(Overlay, {
      props: { show: true }
    })
    expect(wrapper.find('.bw-overlay').exists()).toBe(true)
    await wrapper.setProps({ show: false })
    expect(wrapper.find('.bw-overlay').exists()).toBe(false)
  })

  it('show 从 false 变 true 后渲染', async () => {
    const wrapper = mount(Overlay, {
      props: { show: false }
    })
    expect(wrapper.find('.bw-overlay').exists()).toBe(false)
    await wrapper.setProps({ show: true })
    expect(wrapper.find('.bw-overlay').exists()).toBe(true)
  })

  it('style 包含 backgroundColor', () => {
    const wrapper = mount(Overlay, {
      props: { show: true }
    })
    const overlay = wrapper.find('.bw-overlay')
    expect(overlay.attributes('style')).toContain('background-color')
  })

  it('color=black 时 backgroundColor 为 black', () => {
    const wrapper = mount(Overlay, {
      props: { show: true, color: 'black' }
    })
    const overlay = wrapper.find('.bw-overlay')
    expect(overlay.attributes('style')).toContain('background-color: black')
  })

  it('color 为 #ffffff 时正确转换', () => {
    const wrapper = mount(Overlay, {
      props: { show: true, color: '#ffffff', opacity: 0.3 }
    })
    const overlay = wrapper.find('.bw-overlay')
    expect(overlay.attributes('style')).toContain('rgba(255, 255, 255, 0.3)')
  })

  it('color 为 #abcdef 时正确转换', () => {
    const wrapper = mount(Overlay, {
      props: { show: true, color: '#abcdef', opacity: 0.6 }
    })
    const overlay = wrapper.find('.bw-overlay')
    expect(overlay.attributes('style')).toContain('rgba(171, 205, 239, 0.6)')
  })

  it('overlay 元素为 div 标签', () => {
    const wrapper = mount(Overlay, {
      props: { show: true }
    })
    expect(wrapper.find('.bw-overlay').element.tagName.toLowerCase()).toBe('div')
  })

  it('show=false 时不应触发点击事件', async () => {
    const wrapper = mount(Overlay, {
      props: { show: false }
    })
    expect(wrapper.find('.bw-overlay').exists()).toBe(false)
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('zIndex 默认值 2000 应用为样式', () => {
    const wrapper = mount(Overlay, {
      props: { show: true }
    })
    const overlay = wrapper.find('.bw-overlay')
    expect(overlay.attributes('style')).toContain('z-index: 2000')
  })

  it('color 为 #00ff00 且 opacity 为 0.2 时正确转换', () => {
    const wrapper = mount(Overlay, {
      props: { show: true, color: '#00ff00', opacity: 0.2 }
    })
    const overlay = wrapper.find('.bw-overlay')
    expect(overlay.attributes('style')).toContain('rgba(0, 255, 0, 0.2)')
  })
})