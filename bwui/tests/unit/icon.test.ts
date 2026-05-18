import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Icon from '../../src/components/icon/index.vue'

describe('Icon 组件测试', () => {
  it('应该正确渲染图标组件', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该包含 bw-icon 类', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success' }
    })
    expect(wrapper.classes()).toContain('bw-icon')
  })

  it('应该包含 van-icon 和 van-icon-name 类', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success' }
    })
    expect(wrapper.classes()).toContain('van-icon')
    expect(wrapper.classes()).toContain('van-icon-success')
  })

  it('图片名称应该渲染 img 元素', () => {
    const wrapper = mount(Icon, {
      props: { name: 'icon.png' }
    })
    expect(wrapper.find('img').exists()).toBe(true)
  })

  it('svg 图片名称应该渲染 img 元素', () => {
    const wrapper = mount(Icon, {
      props: { name: 'icon.svg' }
    })
    expect(wrapper.find('img').exists()).toBe(true)
  })

  it('非图片名称应该渲染 i 元素', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success' }
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('i')
  })

  it('应该应用 size 属性（数字类型）', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success', size: 24 }
    })
    expect(wrapper.attributes('style')).toContain('font-size: 24px')
  })

  it('应该应用 size 属性（字符串类型）', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success', size: '2em' }
    })
    expect(wrapper.attributes('style')).toContain('font-size: 2em')
  })

  it('默认 size 为 inherit 时不设置 font-size', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success' }
    })
    expect(wrapper.attributes('style')).toBeUndefined()
  })

  it('应该应用 color 属性', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success', color: '#ff0000' }
    })
    expect(wrapper.attributes('style')).toContain('color: #ff0000')
  })

  it('默认 color 为 inherit 时不设置 color', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success' }
    })
    expect(wrapper.attributes('style')).toBeUndefined()
  })

  it('应该同时应用 size 和 color', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success', size: 32, color: '#00ff00' }
    })
    expect(wrapper.attributes('style')).toContain('font-size: 32px')
    expect(wrapper.attributes('style')).toContain('color: #00ff00')
  })

  it('应该接受 classPrefix 属性', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success', classPrefix: 'custom' }
    })
    expect(wrapper.classes()).toContain('custom-icon')
    expect(wrapper.classes()).toContain('custom-icon-success')
  })

  it('图片元素的 src 属性应该正确', () => {
    const wrapper = mount(Icon, {
      props: { name: 'test.jpg' }
    })
    expect(wrapper.find('img').attributes('src')).toBe('test.jpg')
  })

  it('不同图标的 class 应该不同', () => {
    const wrapper1 = mount(Icon, {
      props: { name: 'success' }
    })
    const wrapper2 = mount(Icon, {
      props: { name: 'warning' }
    })
    expect(wrapper1.classes()).toContain('van-icon-success')
    expect(wrapper2.classes()).toContain('van-icon-warning')
  })
})