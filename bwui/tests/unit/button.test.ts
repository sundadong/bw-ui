import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../../src/components/button/index.vue'

describe('Button 组件测试', () => {
  it('应该正确渲染按钮文本', () => {
    const wrapper = mount(Button, {
      slots: {
        default: '主要按钮'
      }
    })
    expect(wrapper.text()).toBe('主要按钮')
  })

  it('应该应用正确的类型样式', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'default']
    
    types.forEach(type => {
      const wrapper = mount(Button, {
        props: { type },
        slots: { default: type }
      })
      expect(wrapper.classes()).toContain(`bw-button--${type}`)
    })
  })

  it('应该应用正确的大小样式', () => {
    const sizes = ['small', 'medium', 'large']
    
    sizes.forEach(size => {
      const wrapper = mount(Button, {
        props: { size },
        slots: { default: size }
      })
      expect(wrapper.classes()).toContain(`bw-button--${size}`)
    })
  })

  it('朴素按钮应该有朴素样式', () => {
    const wrapper = mount(Button, {
      props: { plain: true },
      slots: { default: '朴素按钮' }
    })
    expect(wrapper.classes()).toContain('bw-button--plain')
  })

  it('圆角按钮应该有圆角样式', () => {
    const wrapper = mount(Button, {
      props: { round: true },
      slots: { default: '圆角按钮' }
    })
    expect(wrapper.classes()).toContain('bw-button--round')
  })

  it('禁用按钮应该有禁用样式', () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: '禁用按钮' }
    })
    expect(wrapper.classes()).toContain('bw-button--disabled')
  })

  it('加载状态按钮应该有加载样式', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: '加载中' }
    })
    expect(wrapper.classes()).toContain('bw-button--loading')
  })

  it('点击事件应该正常工作', async () => {
    const wrapper = mount(Button, {
      slots: { default: '按钮' }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('禁用状态应该阻止点击事件', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: '禁用按钮' }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('加载状态应该阻止点击事件', async () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: '加载中' }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('应该有正确的标签', () => {
    const wrapper = mount(Button, {
      slots: { default: '按钮' }
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('button')
  })

  it('应该包含 bw-button 类', () => {
    const wrapper = mount(Button, {
      slots: { default: '按钮' }
    })
    expect(wrapper.classes()).toContain('bw-button')
  })

  it('不同类型应该渲染不同的背景色', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary' },
      slots: { default: '主要按钮' }
    })
    expect(wrapper.attributes('style')).toContain('background-color')
  })

  it('块级按钮应该占满宽度', () => {
    const wrapper = mount(Button, {
      props: { block: true },
      slots: { default: '块级按钮' }
    })
    expect(wrapper.classes()).toContain('bw-button--block')
  })

  it('图标按钮应该包含图标', () => {
    const wrapper = mount(Button, {
      props: { icon: 'success' },
      slots: { default: '图标按钮' }
    })
    expect(wrapper.find('.bw-button__icon').exists()).toBe(true)
  })
})
