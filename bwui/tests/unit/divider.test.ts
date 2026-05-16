import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Divider from '../../src/components/divider/index.vue'

describe('Divider 组件测试', () => {
  it('应该正确渲染分割线组件', () => {
    const wrapper = mount(Divider)
    expect(wrapper.exists()).toBe(true)
  })

  it('应该包含 bw-divider 类', () => {
    const wrapper = mount(Divider)
    expect(wrapper.classes()).toContain('bw-divider')
  })

  it('默认 contentPosition 为 center', () => {
    const wrapper = mount(Divider)
    expect(wrapper.classes()).toContain('bw-divider--center')
  })

  it('应该包含两条分割线元素', () => {
    const wrapper = mount(Divider)
    const lines = wrapper.findAll('.bw-divider__line')
    expect(lines.length).toBe(2)
  })

  it('默认没有内容区域', () => {
    const wrapper = mount(Divider)
    expect(wrapper.find('.bw-divider__content').exists()).toBe(false)
  })

  it('应该渲染默认插槽内容', () => {
    const wrapper = mount(Divider, {
      slots: { default: '<span>文本</span>' }
    })
    expect(wrapper.find('.bw-divider__content').exists()).toBe(true)
    expect(wrapper.find('.bw-divider__content span').text()).toBe('文本')
  })

  it('应该支持 dashed 属性', () => {
    const wrapper = mount(Divider, {
      props: { dashed: true }
    })
    const lines = wrapper.findAll('.bw-divider__line--dashed')
    expect(lines.length).toBe(2)
  })

  it('默认 hairline 为 true', () => {
    const wrapper = mount(Divider)
    const lines = wrapper.findAll('.bw-divider__line--hairline')
    expect(lines.length).toBe(2)
  })

  it('hairline 为 false 时不应有 hairline 类', () => {
    const wrapper = mount(Divider, {
      props: { hairline: false }
    })
    const lines = wrapper.findAll('.bw-divider__line--hairline')
    expect(lines.length).toBe(0)
  })

  it('应该支持 contentPosition left', () => {
    const wrapper = mount(Divider, {
      props: { contentPosition: 'left' }
    })
    expect(wrapper.classes()).toContain('bw-divider--left')
  })

  it('应该支持 contentPosition right', () => {
    const wrapper = mount(Divider, {
      props: { contentPosition: 'right' }
    })
    expect(wrapper.classes()).toContain('bw-divider--right')
  })

  it('应该支持 vertical 属性', () => {
    const wrapper = mount(Divider, {
      props: { vertical: true }
    })
    expect(wrapper.classes()).toContain('bw-divider--vertical')
  })

  it('vertical 模式下不应渲染分割线', () => {
    const wrapper = mount(Divider, {
      props: { vertical: true }
    })
    expect(wrapper.find('.bw-divider__line').exists()).toBe(false)
  })

  it('vertical 模式下不应渲染内容区域', () => {
    const wrapper = mount(Divider, {
      props: { vertical: true },
      slots: { default: '<span>文本</span>' }
    })
    expect(wrapper.find('.bw-divider__content').exists()).toBe(false)
  })

  it('应该支持自定义 color', () => {
    const wrapper = mount(Divider, {
      props: { color: '#ff0000' }
    })
    const line = wrapper.find('.bw-divider__line')
    expect(line.attributes('style')).toContain('background-color: #ff0000')
  })

  it('dashed 模式下自定义 color 应该应用到 border', () => {
    const wrapper = mount(Divider, {
      props: { dashed: true, color: '#00ff00' }
    })
    const line = wrapper.find('.bw-divider__line--dashed')
    expect(line.attributes('style')).toContain('border-top-color: #00ff00')
  })

  it('内容区域应该支持自定义 color', () => {
    const wrapper = mount(Divider, {
      props: { color: '#ff0000' },
      slots: { default: '<span>文本</span>' }
    })
    const content = wrapper.find('.bw-divider__content')
    expect(content.attributes('style')).toContain('color: #ff0000')
  })

  it('vertical 模式下应该应用 border 样式', () => {
    const wrapper = mount(Divider, {
      props: { vertical: true }
    })
    expect(wrapper.attributes('style')).toContain('border-left')
  })

  it('vertical + dashed 模式应该应用虚线 border', () => {
    const wrapper = mount(Divider, {
      props: { vertical: true, dashed: true }
    })
    expect(wrapper.attributes('style')).toContain('dashed')
  })

  it('应该渲染为 div 元素', () => {
    const wrapper = mount(Divider)
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('默认 color 应该为 #ebedf0', () => {
    const wrapper = mount(Divider)
    const line = wrapper.find('.bw-divider__line')
    expect(line.attributes('style')).toContain('#ebedf0')
  })

  it('contentPosition 为 center 时两端线都显示', () => {
    const wrapper = mount(Divider, {
      props: { contentPosition: 'center' },
      slots: { default: '<span>文本</span>' }
    })
    const lines = wrapper.findAll('.bw-divider__line')
    expect(lines.length).toBe(2)
  })

  it('dashed 和 hairline 可以同时使用', () => {
    const wrapper = mount(Divider, {
      props: { dashed: true, hairline: true }
    })
    const lines = wrapper.findAll('.bw-divider__line--dashed')
    expect(lines.length).toBe(2)
    const hairlineLines = wrapper.findAll('.bw-divider__line--hairline')
    expect(hairlineLines.length).toBe(2)
  })
})