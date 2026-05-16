import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../../src/components/button/index.vue'

describe('Button 组件测试', () => {
  // 1. 基本渲染测试
  it('应该正确渲染按钮文本', () => {
    const wrapper = mount(Button, {
      slots: {
        default: '主要按钮'
      }
    })
    expect(wrapper.text()).toBe('主要按钮')
  })

  // 2. Props 测试
  it('应该正确应用 primary 类型', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary' },
      slots: { default: '按钮' }
    })
    expect(wrapper.classes()).toContain('bw-button--primary')
  })

  it('应该正确应用 success 类型', () => {
    const wrapper = mount(Button, {
      props: { type: 'success' },
      slots: { default: '按钮' }
    })
    expect(wrapper.classes()).toContain('bw-button--success')
  })

  it('应该正确应用 warning 类型', () => {
    const wrapper = mount(Button, {
      props: { type: 'warning' },
      slots: { default: '按钮' }
    })
    expect(wrapper.classes()).toContain('bw-button--warning')
  })

  it('应该正确应用 danger 类型', () => {
    const wrapper = mount(Button, {
      props: { type: 'danger' },
      slots: { default: '按钮' }
    })
    expect(wrapper.classes()).toContain('bw-button--danger')
  })

  it('应该正确应用 default 类型', () => {
    const wrapper = mount(Button, {
      props: { type: 'default' },
      slots: { default: '按钮' }
    })
    expect(wrapper.classes()).toContain('bw-button--default')
  })

  it('应该正确应用 small 尺寸', () => {
    const wrapper = mount(Button, {
      props: { size: 'small' },
      slots: { default: '按钮' }
    })
    expect(wrapper.classes()).toContain('bw-button--small')
  })

  it('应该正确应用 medium 尺寸', () => {
    const wrapper = mount(Button, {
      props: { size: 'medium' },
      slots: { default: '按钮' }
    })
    expect(wrapper.classes()).toContain('bw-button--medium')
  })

  it('应该正确应用 large 尺寸', () => {
    const wrapper = mount(Button, {
      props: { size: 'large' },
      slots: { default: '按钮' }
    })
    expect(wrapper.classes()).toContain('bw-button--large')
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

  it('块级按钮应该有块级样式', () => {
    const wrapper = mount(Button, {
      props: { block: true },
      slots: { default: '块级按钮' }
    })
    expect(wrapper.classes()).toContain('bw-button--block')
  })

  // 3. 事件测试
  it('点击事件应该正常工作', async () => {
    const wrapper = mount(Button, {
      slots: { default: '按钮' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })

  it('多次点击应该触发多次事件', async () => {
    const wrapper = mount(Button, {
      slots: { default: '按钮' }
    })
    await wrapper.trigger('click')
    await wrapper.trigger('click')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')?.length).toBe(3)
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

  it('禁用状态和加载状态同时启用时也阻止点击', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true, loading: true },
      slots: { default: '按钮' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  // 4. Slots 测试
  it('应该正确渲染默认插槽', () => {
    const wrapper = mount(Button, {
      slots: { default: '自定义按钮内容' }
    })
    expect(wrapper.text()).toBe('自定义按钮内容')
  })

  it('应该正确渲染图标插槽', () => {
    const wrapper = mount(Button, {
      slots: { 
        icon: '<span class="custom-icon">★</span>',
        default: '带图标' 
      }
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  // 5. 边界条件测试
  it('应该正确处理空字符串内容', () => {
    const wrapper = mount(Button, {
      slots: { default: '' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该正确处理无内容', () => {
    const wrapper = mount(Button)
    expect(wrapper.exists()).toBe(true)
  })

  it('应该正确渲染 HTML 内容', () => {
    const wrapper = mount(Button, {
      slots: { default: '<strong>加粗文字</strong>' }
    })
    expect(wrapper.find('strong').exists()).toBe(true)
  })

  // 6. 样式和属性测试
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

  it('不同类型应该可以同时组合使用', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary', size: 'large', round: true },
      slots: { default: '组合按钮' }
    })
    expect(wrapper.classes()).toContain('bw-button--primary')
    expect(wrapper.classes()).toContain('bw-button--large')
    expect(wrapper.classes()).toContain('bw-button--round')
  })

  it('应该支持通过 attrs 传递原生属性', () => {
    const wrapper = mount(Button, {
      attrs: { 'data-testid': 'custom-button' },
      slots: { default: '按钮' }
    })
    expect(wrapper.attributes('data-testid')).toBe('custom-button')
  })

  it('应该支持设置原生按钮类型', () => {
    const wrapper = mount(Button, {
      props: { nativeType: 'submit' },
      slots: { default: '提交' }
    })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('应该正确处理鼠标事件', async () => {
    const onMouseenter = vi.fn()
    const onMouseleave = vi.fn()
    const wrapper = mount(Button, {
      slots: { default: '按钮' },
      attrs: {
        onMouseenter,
        onMouseleave
      }
    })
    await wrapper.trigger('mouseenter')
    expect(onMouseenter).toHaveBeenCalledTimes(1)
    await wrapper.trigger('mouseleave')
    expect(onMouseleave).toHaveBeenCalledTimes(1)
  })
})
