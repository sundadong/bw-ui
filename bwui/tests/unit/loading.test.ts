import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Loading from '../../src/components/loading/index.vue'

describe('Loading 组件测试', () => {
  it('应该包含 bw-loading 基础类', () => {
    const wrapper = mount(Loading)
    expect(wrapper.classes()).toContain('bw-loading')
  })

  it('默认 type 为 circular', () => {
    const wrapper = mount(Loading)
    expect(wrapper.props('type')).toBe('circular')
  })

  it('默认 type 应用 bw-loading--circular 类', () => {
    const wrapper = mount(Loading)
    expect(wrapper.classes()).toContain('bw-loading--circular')
  })

  it('type=spinner 应用 bw-loading--spinner 类', () => {
    const wrapper = mount(Loading, {
      props: { type: 'spinner' }
    })
    expect(wrapper.classes()).toContain('bw-loading--spinner')
  })

  it('type=circular 时渲染 circular 元素', () => {
    const wrapper = mount(Loading, {
      props: { type: 'circular' }
    })
    expect(wrapper.find('.bw-loading__circular').exists()).toBe(true)
  })

  it('type=spinner 时渲染 spinner 元素', () => {
    const wrapper = mount(Loading, {
      props: { type: 'spinner' }
    })
    expect(wrapper.find('.bw-loading__spinner').exists()).toBe(true)
  })

  it('type=spinner 时渲染 12 个 spinner-item', () => {
    const wrapper = mount(Loading, {
      props: { type: 'spinner' }
    })
    expect(wrapper.findAll('.bw-loading__spinner-item').length).toBe(12)
  })

  it('spinner-item 有正确的 animationDelay', () => {
    const wrapper = mount(Loading, {
      props: { type: 'spinner' }
    })
    const items = wrapper.findAll('.bw-loading__spinner-item')
    expect(items[0].attributes('style')).toContain('animation-delay: 0s')
    expect(items[1].attributes('style')).toContain('animation-delay: 0.083s')
    expect(items[11].attributes('style')).toContain('animation-delay: 0.913s')
  })

  it('size=small 应用 bw-loading--small 类', () => {
    const wrapper = mount(Loading, {
      props: { size: 'small' }
    })
    expect(wrapper.classes()).toContain('bw-loading--small')
  })

  it('size=medium 应用 bw-loading--medium 类', () => {
    const wrapper = mount(Loading, {
      props: { size: 'medium' }
    })
    expect(wrapper.classes()).toContain('bw-loading--medium')
  })

  it('size=large 应用 bw-loading--large 类', () => {
    const wrapper = mount(Loading, {
      props: { size: 'large' }
    })
    expect(wrapper.classes()).toContain('bw-loading--large')
  })

  it('默认 vertical 为 false', () => {
    const wrapper = mount(Loading)
    expect(wrapper.props('vertical')).toBe(false)
  })

  it('vertical 属性可以设置为 true', () => {
    const wrapper = mount(Loading, {
      props: { vertical: true }
    })
    expect(wrapper.props('vertical')).toBe(true)
  })

  it('默认 slot 渲染文本内容', () => {
    const wrapper = mount(Loading, {
      slots: { default: '加载中...' }
    })
    expect(wrapper.find('.bw-loading__text').text()).toBe('加载中...')
  })

  it('不传 slot 时不渲染 text 区域', () => {
    const wrapper = mount(Loading)
    expect(wrapper.find('.bw-loading__text').exists()).toBe(false)
  })

  it('color prop 默认值为空字符串', () => {
    const wrapper = mount(Loading)
    expect(wrapper.props('color')).toBe('')
  })

  it('size prop 默认值为 30px', () => {
    const wrapper = mount(Loading)
    expect(wrapper.props('size')).toBe('30px')
  })

  it('组合 type+size 同时应用多个 class', () => {
    const wrapper = mount(Loading, {
      props: { type: 'spinner', size: 'large' }
    })
    expect(wrapper.classes()).toContain('bw-loading--spinner')
    expect(wrapper.classes()).toContain('bw-loading--large')
  })

  it('circular-circle 子元素存在', () => {
    const wrapper = mount(Loading, {
      props: { type: 'circular' }
    })
    expect(wrapper.find('.bw-loading__circular-circle').exists()).toBe(true)
  })

  it('slot 内容可以包含 HTML', () => {
    const wrapper = mount(Loading, {
      slots: { default: '<strong>拼命加载中</strong>' }
    })
    expect(wrapper.find('.bw-loading__text strong').exists()).toBe(true)
  })

  it('type=circular 时不渲染 spinner 元素', () => {
    const wrapper = mount(Loading, {
      props: { type: 'circular' }
    })
    expect(wrapper.find('.bw-loading__spinner').exists()).toBe(false)
  })

  it('type=spinner 时不渲染 circular 元素', () => {
    const wrapper = mount(Loading, {
      props: { type: 'spinner' }
    })
    expect(wrapper.find('.bw-loading__circular').exists()).toBe(false)
  })

  it('默认应该渲染', () => {
    const wrapper = mount(Loading)
    expect(wrapper.exists()).toBe(true)
  })

  it('默认 type 为 circular 时 circular-circle 存在', () => {
    const wrapper = mount(Loading)
    expect(wrapper.find('.bw-loading__circular-circle').exists()).toBe(true)
  })
})