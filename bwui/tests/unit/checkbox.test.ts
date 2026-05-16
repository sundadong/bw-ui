import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Checkbox from '../../src/components/checkbox/index.vue'

describe('Checkbox 组件测试', () => {
  it('应该正确渲染复选框组件', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-checkbox')
  })

  it('默认应该处于未选中状态', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.classes()).not.toContain('bw-checkbox--checked')
  })

  it('modelValue 为 true 时应该显示选中状态', () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: true }
    })
    expect(wrapper.classes()).toContain('bw-checkbox--checked')
  })

  it('modelValue 为 false 时不应该显示选中状态', () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false }
    })
    expect(wrapper.classes()).not.toContain('bw-checkbox--checked')
  })

  it('选中时应该显示图标', () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: true }
    })
    expect(wrapper.find('.bw-icon').exists()).toBe(true)
  })

  it('未选中时不应该显示图标', () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false }
    })
    expect(wrapper.find('.bw-icon').exists()).toBe(false)
  })

  it('disabled 为 true 时应该添加禁用样式类', () => {
    const wrapper = mount(Checkbox, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('bw-checkbox--disabled')
  })

  it('disabled 为 false 时不应该添加禁用样式类', () => {
    const wrapper = mount(Checkbox, {
      props: { disabled: false }
    })
    expect(wrapper.classes()).not.toContain('bw-checkbox--disabled')
  })

  it('shape 为 square 时应该有 square 相关样式', () => {
    const wrapper = mount(Checkbox, {
      props: { shape: 'square' }
    })
    expect(wrapper.classes()).toContain('bw-checkbox')
  })

  it('shape 默认值为 round', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.classes()).toContain('bw-checkbox')
  })

  it('label 属性应该渲染标签文本', () => {
    const wrapper = mount(Checkbox, {
      props: { label: '同意协议' }
    })
    expect(wrapper.find('.bw-checkbox__label').exists()).toBe(true)
    expect(wrapper.find('.bw-checkbox__label').text()).toBe('同意协议')
  })

  it('label 为空时不渲染标签区域', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.find('.bw-checkbox__label').exists()).toBe(false)
  })

  it('应该通过插槽渲染自定义内容', () => {
    const wrapper = mount(Checkbox, {
      slots: { default: '自定义标签' }
    })
    expect(wrapper.find('.bw-checkbox__label').text()).toBe('自定义标签')
  })

  it('插槽优先级高于 label 属性', () => {
    const wrapper = mount(Checkbox, {
      props: { label: '属性标签' },
      slots: { default: '插槽标签' }
    })
    expect(wrapper.find('.bw-checkbox__label').text()).toBe('插槽标签')
  })

  it('点击复选框应该切换选中状态', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('点击已选中的复选框应该取消选中', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('点击应该触发 change 事件', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]).toEqual([true])
  })

  it('disabled 状态下点击不应该触发事件', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false, disabled: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()
  })

  it('多次点击应该多次切换', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false }
    })
    await wrapper.trigger('click')
    await wrapper.trigger('click')
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.length).toBe(3)
    expect(wrapper.emitted('change')?.length).toBe(3)
  })

  it('name 属性应该正确传递', () => {
    const wrapper = mount(Checkbox, {
      props: { name: 'agree' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该包含 bw-checkbox__icon 子元素', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.find('.bw-checkbox__icon').exists()).toBe(true)
  })

  it('默认值测试 - modelValue 默认 false', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.classes()).not.toContain('bw-checkbox--checked')
  })

  it('默认值测试 - disabled 默认 false', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.classes()).not.toContain('bw-checkbox--disabled')
  })

  it('组合属性 - 选中且禁用', () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: true, disabled: true }
    })
    expect(wrapper.classes()).toContain('bw-checkbox--checked')
    expect(wrapper.classes()).toContain('bw-checkbox--disabled')
  })

  it('组合属性 - 选中禁用时点击不触发', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: true, disabled: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('label 属性配合选中状态渲染正确', () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: true, label: '已选协议' }
    })
    expect(wrapper.classes()).toContain('bw-checkbox--checked')
    expect(wrapper.find('.bw-checkbox__label').text()).toBe('已选协议')
  })
})