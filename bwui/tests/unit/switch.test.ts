import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Switch from '../../src/components/switch/index.vue'

describe('Switch 组件测试', () => {
  it('应该正确渲染开关组件', () => {
    const wrapper = mount(Switch)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-switch')
  })

  it('默认应该处于关闭状态', () => {
    const wrapper = mount(Switch)
    expect(wrapper.classes()).not.toContain('bw-switch--on')
  })

  it('modelValue 为 true 时应该显示开启状态', () => {
    const wrapper = mount(Switch, {
      props: { modelValue: true }
    })
    expect(wrapper.classes()).toContain('bw-switch--on')
  })

  it('modelValue 为 false 时应该显示关闭状态', () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false }
    })
    expect(wrapper.classes()).not.toContain('bw-switch--on')
  })

  it('loading 为 true 时应该显示加载元素', () => {
    const wrapper = mount(Switch, {
      props: { loading: true }
    })
    expect(wrapper.find('.bw-switch__loading').exists()).toBe(true)
  })

  it('loading 为 false 时不应该显示加载元素', () => {
    const wrapper = mount(Switch, {
      props: { loading: false }
    })
    expect(wrapper.find('.bw-switch__loading').exists()).toBe(false)
  })

  it('disabled 为 true 时应该添加禁用样式类', () => {
    const wrapper = mount(Switch, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('bw-switch--disabled')
  })

  it('disabled 为 false 时不应该添加禁用样式类', () => {
    const wrapper = mount(Switch, {
      props: { disabled: false }
    })
    expect(wrapper.classes()).not.toContain('bw-switch--disabled')
  })

  it('activeColor 应该通过 style 绑定到组件上', () => {
    const wrapper = mount(Switch, {
      props: { activeColor: '#ff0000', modelValue: true }
    })
    expect(wrapper.classes()).toContain('bw-switch--on')
  })

  it('inactiveColor 在关闭状态时应用', () => {
    const wrapper = mount(Switch, {
      props: { inactiveColor: '#cccccc', modelValue: false }
    })
    expect(wrapper.classes()).not.toContain('bw-switch--on')
  })

  it('点击开关应该切换状态', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('点击开关应该触发 update:modelValue 事件', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.length).toBe(1)
  })

  it('点击开关应该触发 change 事件', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]).toEqual([true])
  })

  it('开启状态点击应该切换为关闭', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('disabled 状态下点击不应该触发事件', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false, disabled: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()
  })

  it('loading 状态下点击不应该触发事件', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false, loading: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()
  })

  it('disabled 和 loading 同时启用时点击不应该触发事件', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false, disabled: true, loading: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('自定义 activeValue 和 inactiveValue 应该正确切换', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: 'on', activeValue: 'on', inactiveValue: 'off' }
    })
    expect(wrapper.classes()).toContain('bw-switch--on')
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['off'])
  })

  it('自定义 activeValue 和 inactiveValue 来回切换', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: 'off', activeValue: 'on', inactiveValue: 'off' }
    })
    expect(wrapper.classes()).not.toContain('bw-switch--on')
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['on'])
  })

  it('多次点击应该多次触发事件', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false }
    })
    await wrapper.trigger('click')
    await wrapper.trigger('click')
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.length).toBe(3)
    expect(wrapper.emitted('change')?.length).toBe(3)
  })

  it('应该包含 bw-switch__node 子元素', () => {
    const wrapper = mount(Switch)
    expect(wrapper.find('.bw-switch__node').exists()).toBe(true)
  })

  it('数字类型的 activeValue 和 inactiveValue 应该正确工作', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: 1, activeValue: 1, inactiveValue: 0 }
    })
    expect(wrapper.classes()).toContain('bw-switch--on')
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([0])
  })

  it('默认值测试 - modelValue 默认 false', () => {
    const wrapper = mount(Switch)
    expect(wrapper.classes()).not.toContain('bw-switch--on')
  })

  it('默认值测试 - disabled 默认 false', () => {
    const wrapper = mount(Switch)
    expect(wrapper.classes()).not.toContain('bw-switch--disabled')
  })

  it('默认值测试 - loading 默认 false', () => {
    const wrapper = mount(Switch)
    expect(wrapper.find('.bw-switch__loading').exists()).toBe(false)
  })

  it('activeValue 为字符串时开启状态类名正确', () => {
    const wrapper = mount(Switch, {
      props: { modelValue: 'active', activeValue: 'active', inactiveValue: 'inactive' }
    })
    expect(wrapper.classes()).toContain('bw-switch--on')
  })
})