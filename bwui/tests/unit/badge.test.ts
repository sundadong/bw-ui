import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from '../../src/components/badge/index.vue'

describe('Badge 组件测试', () => {
  it('应该正确渲染徽标组件', () => {
    const wrapper = mount(Badge)
    expect(wrapper.exists()).toBe(true)
  })

  it('应该包含 bw-badge 类', () => {
    const wrapper = mount(Badge)
    expect(wrapper.classes()).toContain('bw-badge')
  })

  it('应该包含 bw-badge--fixed 类', () => {
    const wrapper = mount(Badge)
    expect(wrapper.classes()).toContain('bw-badge--fixed')
  })

  it('默认 modelValue 为 true 时应该显示徽标', () => {
    const wrapper = mount(Badge)
    expect(wrapper.find('.bw-badge__content').exists()).toBe(true)
  })

  it('modelValue 为 false 时应该隐藏徽标', () => {
    const wrapper = mount(Badge, {
      props: { modelValue: false }
    })
    expect(wrapper.find('.bw-badge__content').exists()).toBe(false)
  })

  it('应该显示 content 文本内容', () => {
    const wrapper = mount(Badge, {
      props: { content: '新' }
    })
    expect(wrapper.find('.bw-badge__content').text()).toBe('新')
  })

  it('应该显示 content 数字内容', () => {
    const wrapper = mount(Badge, {
      props: { content: 5 }
    })
    expect(wrapper.find('.bw-badge__content').text()).toBe('5')
  })

  it('dot 模式应该显示圆点样式', () => {
    const wrapper = mount(Badge, {
      props: { dot: true }
    })
    expect(wrapper.classes()).toContain('bw-badge--dot')
    expect(wrapper.find('.bw-badge__content--dot').exists()).toBe(true)
  })

  it('dot 模式下不应显示 content 文本', () => {
    const wrapper = mount(Badge, {
      props: { dot: true, content: '99' }
    })
    expect(wrapper.find('.bw-badge__content').text()).toBe('')
  })

  it('非 dot 且有 content 时应该有 has-content 类', () => {
    const wrapper = mount(Badge, {
      props: { content: '5' }
    })
    expect(wrapper.classes()).toContain('bw-badge--has-content')
  })

  it('非 dot 且无 content 时仍会有 has-content 类（因为 modelValue 默认有值）', () => {
    const wrapper = mount(Badge)
    expect(wrapper.classes()).toContain('bw-badge--has-content')
  })

  it('dot 模式不应有 has-content 类', () => {
    const wrapper = mount(Badge, {
      props: { dot: true, content: '5' }
    })
    expect(wrapper.classes()).not.toContain('bw-badge--has-content')
  })

  it('应该正确渲染默认插槽内容', () => {
    const wrapper = mount(Badge, {
      slots: { default: '<button>按钮</button>' }
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('按钮')
  })

  it('content 为 0 且 showZero 为 true 时应该显示', () => {
    const wrapper = mount(Badge, {
      props: { content: 0, showZero: true }
    })
    expect(wrapper.find('.bw-badge__content').exists()).toBe(true)
  })

  it('showZero 为 true 且 modelValue 为 true 时应该显示徽标', () => {
    const wrapper = mount(Badge, {
      props: { modelValue: true, showZero: true }
    })
    expect(wrapper.find('.bw-badge__content').exists()).toBe(true)
  })

  it('showZero 为 false 且 modelValue 为 false 时应该隐藏徽标', () => {
    const wrapper = mount(Badge, {
      props: { modelValue: false, showZero: false }
    })
    expect(wrapper.find('.bw-badge__content').exists()).toBe(false)
  })

  it('modelValue 为 true 时应该显示徽标', () => {
    const wrapper = mount(Badge, {
      props: { modelValue: true }
    })
    expect(wrapper.find('.bw-badge__content').exists()).toBe(true)
  })

  it('modelValue 为 false 时应该隐藏徽标', () => {
    const wrapper = mount(Badge, {
      props: { modelValue: false }
    })
    expect(wrapper.find('.bw-badge__content').exists()).toBe(false)
  })

  it('应该接受 max 属性', () => {
    const wrapper = mount(Badge, {
      props: { max: 10, content: '15' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该接受 color 属性', () => {
    const wrapper = mount(Badge, {
      props: { color: '#07c160' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('dot 和 modelValue false 组合时不应显示徽标', () => {
    const wrapper = mount(Badge, {
      props: { dot: true, modelValue: false }
    })
    expect(wrapper.find('.bw-badge__content').exists()).toBe(false)
  })

  it('大数字 content 超过 max 时应该显示 max+', () => {
    const wrapper = mount(Badge, {
      props: { content: 9999 }
    })
    expect(wrapper.find('.bw-badge__content').text()).toBe('99+')
  })

  it('应该渲染为 div 元素', () => {
    const wrapper = mount(Badge)
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('徽标内容区域应该有 bw-badge__content 类', () => {
    const wrapper = mount(Badge, {
      props: { content: '1' }
    })
    const contentEl = wrapper.find('.bw-badge__content')
    expect(contentEl.exists()).toBe(true)
    expect(contentEl.classes()).toContain('bw-badge__content')
  })
})
