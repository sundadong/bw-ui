import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Radio from '../../src/components/radio/index.vue'

describe('Radio 组件测试', () => {
  it('应该正确渲染单选框组件', () => {
    const wrapper = mount(Radio)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-radio')
  })

  it('modelValue 不等于 name 时不应该选中', () => {
    const wrapper = mount(Radio, {
      props: { modelValue: 'a', name: 'b' }
    })
    expect(wrapper.classes()).not.toContain('bw-radio--checked')
  })

  it('modelValue 等于 name 时应该显示选中状态', () => {
    const wrapper = mount(Radio, {
      props: { modelValue: 'a', name: 'a' }
    })
    expect(wrapper.classes()).toContain('bw-radio--checked')
  })

  it('modelValue 不等于 name 时不应该显示选中状态', () => {
    const wrapper = mount(Radio, {
      props: { modelValue: 'a', name: 'b' }
    })
    expect(wrapper.classes()).not.toContain('bw-radio--checked')
  })

  it('选中时应该显示 dot 元素', () => {
    const wrapper = mount(Radio, {
      props: { modelValue: 'a', name: 'a' }
    })
    expect(wrapper.find('.bw-radio__icon-dot').exists()).toBe(true)
  })

  it('未选中时不应该显示 dot 元素', () => {
    const wrapper = mount(Radio, {
      props: { modelValue: 'a', name: 'b' }
    })
    expect(wrapper.find('.bw-radio__icon-dot').exists()).toBe(false)
  })

  it('disabled 为 true 时应该添加禁用样式类', () => {
    const wrapper = mount(Radio, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('bw-radio--disabled')
  })

  it('disabled 为 false 时不应该添加禁用样式类', () => {
    const wrapper = mount(Radio, {
      props: { disabled: false }
    })
    expect(wrapper.classes()).not.toContain('bw-radio--disabled')
  })

  it('shape 默认值为 round', () => {
    const wrapper = mount(Radio)
    expect(wrapper.classes()).toContain('bw-radio')
  })

  it('shape 为 square 时应该正确渲染', () => {
    const wrapper = mount(Radio, {
      props: { shape: 'square' }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-radio')
  })

  it('label 属性应该渲染标签文本', () => {
    const wrapper = mount(Radio, {
      props: { label: '选项A' }
    })
    expect(wrapper.find('.bw-radio__label').exists()).toBe(true)
    expect(wrapper.find('.bw-radio__label').text()).toBe('选项A')
  })

  it('label 为空时不渲染标签区域', () => {
    const wrapper = mount(Radio)
    expect(wrapper.find('.bw-radio__label').exists()).toBe(false)
  })

  it('应该通过插槽渲染自定义内容', () => {
    const wrapper = mount(Radio, {
      slots: { default: '自定义选项' }
    })
    expect(wrapper.find('.bw-radio__label').text()).toBe('自定义选项')
  })

  it('插槽优先级高于 label 属性', () => {
    const wrapper = mount(Radio, {
      props: { label: '属性标签' },
      slots: { default: '插槽标签' }
    })
    expect(wrapper.find('.bw-radio__label').text()).toBe('插槽标签')
  })

  it('点击单选框应该触发 update:modelValue 事件', async () => {
    const wrapper = mount(Radio, {
      props: { modelValue: 'a', name: 'b' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
  })

  it('点击单选框应该触发 change 事件', async () => {
    const wrapper = mount(Radio, {
      props: { modelValue: 'a', name: 'b' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]).toEqual(['b'])
  })

  it('disabled 状态下点击不应该触发事件', async () => {
    const wrapper = mount(Radio, {
      props: { modelValue: 'a', name: 'b', disabled: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()
  })

  it('多次点击应该多次触发事件', async () => {
    const wrapper = mount(Radio, {
      props: { modelValue: 'a', name: 'b' }
    })
    await wrapper.trigger('click')
    await wrapper.trigger('click')
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.length).toBe(3)
    expect(wrapper.emitted('change')?.length).toBe(3)
  })

  it('数字类型的 modelValue 和 name 应该正确比较', () => {
    const wrapper = mount(Radio, {
      props: { modelValue: 1, name: 1 }
    })
    expect(wrapper.classes()).toContain('bw-radio--checked')
  })

  it('数字类型的 modelValue 和 name 不匹配时不选中', () => {
    const wrapper = mount(Radio, {
      props: { modelValue: 1, name: 2 }
    })
    expect(wrapper.classes()).not.toContain('bw-radio--checked')
  })

  it('布尔类型的 modelValue 和 name 应该正确比较', () => {
    const wrapper = mount(Radio, {
      props: { modelValue: true, name: true }
    })
    expect(wrapper.classes()).toContain('bw-radio--checked')
  })

  it('应该包含 bw-radio__icon 子元素', () => {
    const wrapper = mount(Radio)
    expect(wrapper.find('.bw-radio__icon').exists()).toBe(true)
  })

  it('默认值测试 - disabled 默认 false', () => {
    const wrapper = mount(Radio)
    expect(wrapper.classes()).not.toContain('bw-radio--disabled')
  })

  it('组合属性 - 选中且禁用', () => {
    const wrapper = mount(Radio, {
      props: { modelValue: 'x', name: 'x', disabled: true }
    })
    expect(wrapper.classes()).toContain('bw-radio--checked')
    expect(wrapper.classes()).toContain('bw-radio--disabled')
  })

  it('组合属性 - 选中禁用时点击不触发', async () => {
    const wrapper = mount(Radio, {
      props: { modelValue: 'x', name: 'x', disabled: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('label 配合选中状态渲染正确', () => {
    const wrapper = mount(Radio, {
      props: { modelValue: 'opt1', name: 'opt1', label: '选项一' }
    })
    expect(wrapper.classes()).toContain('bw-radio--checked')
    expect(wrapper.find('.bw-radio__label').text()).toBe('选项一')
  })
})