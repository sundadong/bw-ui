import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tag from '../../src/components/tag/index.vue'

describe('Tag 组件测试', () => {
  it('应该正确渲染标签组件', () => {
    const wrapper = mount(Tag, {
      slots: { default: '标签' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该包含 bw-tag 类', () => {
    const wrapper = mount(Tag, {
      slots: { default: '标签' }
    })
    expect(wrapper.classes()).toContain('bw-tag')
  })

  it('应该正确渲染默认插槽内容', () => {
    const wrapper = mount(Tag, {
      slots: { default: '测试标签' }
    })
    expect(wrapper.text()).toContain('测试标签')
  })

  it('应该正确应用 primary 类型', () => {
    const wrapper = mount(Tag, {
      props: { type: 'primary' },
      slots: { default: '标签' }
    })
    expect(wrapper.classes()).toContain('bw-tag--primary')
  })

  it('应该正确应用 success 类型', () => {
    const wrapper = mount(Tag, {
      props: { type: 'success' },
      slots: { default: '标签' }
    })
    expect(wrapper.classes()).toContain('bw-tag--success')
  })

  it('应该正确应用 warning 类型', () => {
    const wrapper = mount(Tag, {
      props: { type: 'warning' },
      slots: { default: '标签' }
    })
    expect(wrapper.classes()).toContain('bw-tag--warning')
  })

  it('应该正确应用 danger 类型', () => {
    const wrapper = mount(Tag, {
      props: { type: 'danger' },
      slots: { default: '标签' }
    })
    expect(wrapper.classes()).toContain('bw-tag--danger')
  })

  it('默认类型应该为 default', () => {
    const wrapper = mount(Tag, {
      slots: { default: '标签' }
    })
    expect(wrapper.classes()).toContain('bw-tag--default')
  })

  it('应该正确应用 small 尺寸', () => {
    const wrapper = mount(Tag, {
      props: { size: 'small' },
      slots: { default: '标签' }
    })
    expect(wrapper.classes()).toContain('bw-tag--small')
  })

  it('应该正确应用 medium 尺寸', () => {
    const wrapper = mount(Tag, {
      props: { size: 'medium' },
      slots: { default: '标签' }
    })
    expect(wrapper.classes()).toContain('bw-tag--medium')
  })

  it('朴素标签应该有 plain 样式', () => {
    const wrapper = mount(Tag, {
      props: { plain: true },
      slots: { default: '朴素标签' }
    })
    expect(wrapper.classes()).toContain('bw-tag--plain')
  })

  it('圆角标签应该有 round 样式', () => {
    const wrapper = mount(Tag, {
      props: { round: true },
      slots: { default: '圆角标签' }
    })
    expect(wrapper.classes()).toContain('bw-tag--round')
  })

  it('标记标签应该有 mark 样式', () => {
    const wrapper = mount(Tag, {
      props: { mark: true },
      slots: { default: '标记标签' }
    })
    expect(wrapper.classes()).toContain('bw-tag--mark')
  })

  it('可关闭标签应该有 closable 样式', () => {
    const wrapper = mount(Tag, {
      props: { closable: true },
      slots: { default: '可关闭标签' }
    })
    expect(wrapper.classes()).toContain('bw-tag--closable')
  })

  it('禁用标签应该有 disabled 样式', () => {
    const wrapper = mount(Tag, {
      props: { disabled: true },
      slots: { default: '禁用标签' }
    })
    expect(wrapper.classes()).toContain('bw-tag--disabled')
  })

  it('可关闭标签应该渲染关闭按钮', () => {
    const wrapper = mount(Tag, {
      props: { closable: true },
      slots: { default: '可关闭标签' }
    })
    expect(wrapper.find('.bw-tag__close').exists()).toBe(true)
  })

  it('不可关闭标签不应该渲染关闭按钮', () => {
    const wrapper = mount(Tag, {
      props: { closable: false },
      slots: { default: '标签' }
    })
    expect(wrapper.find('.bw-tag__close').exists()).toBe(false)
  })

  it('点击关闭按钮应该触发 close 事件', async () => {
    const wrapper = mount(Tag, {
      props: { closable: true },
      slots: { default: '可关闭标签' }
    })
    await wrapper.find('.bw-tag__close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('close')?.length).toBe(1)
  })

  it('禁用状态下点击关闭按钮不应该触发 close 事件', async () => {
    const wrapper = mount(Tag, {
      props: { closable: true, disabled: true },
      slots: { default: '禁用标签' }
    })
    await wrapper.find('.bw-tag__close').trigger('click')
    expect(wrapper.emitted('close')).toBeFalsy()
  })

  it('color 属性应该设置内联样式（非朴素模式）', () => {
    const wrapper = mount(Tag, {
      props: { color: '#ff0000' },
      slots: { default: '彩色标签' }
    })
    expect(wrapper.attributes('style')).toContain('color: #fff')
    expect(wrapper.attributes('style')).toContain('background-color: #ff0000')
    expect(wrapper.attributes('style')).toContain('border-color: #ff0000')
  })

  it('color 属性配合 plain 应该设置不同样式', () => {
    const wrapper = mount(Tag, {
      props: { color: '#ff0000', plain: true },
      slots: { default: '朴素彩色标签' }
    })
    expect(wrapper.attributes('style')).toContain('color: #ff0000')
    expect(wrapper.attributes('style')).toContain('background-color: #fff')
    expect(wrapper.attributes('style')).toContain('border-color: #ff0000')
  })

  it('无 color 属性时不应设置内联样式', () => {
    const wrapper = mount(Tag, {
      slots: { default: '标签' }
    })
    expect(wrapper.attributes('style')).toBeUndefined()
  })

  it('应该渲染为 div 元素', () => {
    const wrapper = mount(Tag, {
      slots: { default: '标签' }
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('应该支持多个布尔属性组合', () => {
    const wrapper = mount(Tag, {
      props: { plain: true, round: true, mark: true, closable: true },
      slots: { default: '组合标签' }
    })
    expect(wrapper.classes()).toContain('bw-tag--plain')
    expect(wrapper.classes()).toContain('bw-tag--round')
    expect(wrapper.classes()).toContain('bw-tag--mark')
    expect(wrapper.classes()).toContain('bw-tag--closable')
  })

  it('应该支持类型和尺寸组合', () => {
    const wrapper = mount(Tag, {
      props: { type: 'danger', size: 'small' },
      slots: { default: '小号危险标签' }
    })
    expect(wrapper.classes()).toContain('bw-tag--danger')
    expect(wrapper.classes()).toContain('bw-tag--small')
  })

  it('空插槽内容应该正常渲染', () => {
    const wrapper = mount(Tag, {
      slots: { default: '' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('无插槽内容应该正常渲染', () => {
    const wrapper = mount(Tag)
    expect(wrapper.exists()).toBe(true)
  })

  it('HTML 内容插槽应该正确渲染', () => {
    const wrapper = mount(Tag, {
      slots: { default: '<strong>加粗标签</strong>' }
    })
    expect(wrapper.find('strong').exists()).toBe(true)
  })
})