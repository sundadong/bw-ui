import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Field from '../../src/components/field/index.vue'

describe('Field 组件测试', () => {
  it('应该正确渲染输入框组件', () => {
    const wrapper = mount(Field)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-field')
  })

  it('应该渲染 input 元素', () => {
    const wrapper = mount(Field)
    expect(wrapper.find('.bw-field__input').exists()).toBe(true)
  })

  it('modelValue 应该绑定到 input 的 value', () => {
    const wrapper = mount(Field, {
      props: { modelValue: '测试文本' }
    })
    const input = wrapper.find('.bw-field__input')
    expect(input.element.value).toBe('测试文本')
  })

  it('type 默认为 text', () => {
    const wrapper = mount(Field)
    const input = wrapper.find('.bw-field__input')
    expect(input.attributes('type')).toBe('text')
  })

  it('type 为 number 时 input type 应为 number', () => {
    const wrapper = mount(Field, {
      props: { type: 'number' }
    })
    expect(wrapper.find('.bw-field__input').attributes('type')).toBe('number')
  })

  it('type 为 tel 时 input type 应为 tel', () => {
    const wrapper = mount(Field, {
      props: { type: 'tel' }
    })
    expect(wrapper.find('.bw-field__input').attributes('type')).toBe('tel')
  })

  it('type 为 password 时 input type 应为 password', () => {
    const wrapper = mount(Field, {
      props: { type: 'password' }
    })
    expect(wrapper.find('.bw-field__input').attributes('type')).toBe('password')
  })

  it('type 为 search 时 input type 应为 search', () => {
    const wrapper = mount(Field, {
      props: { type: 'search' }
    })
    expect(wrapper.find('.bw-field__input').attributes('type')).toBe('search')
  })

  it('label 属性应该渲染标签', () => {
    const wrapper = mount(Field, {
      props: { label: '用户名' }
    })
    expect(wrapper.find('.bw-field__label').exists()).toBe(true)
    expect(wrapper.find('.bw-field__label').text()).toBe('用户名')
  })

  it('label 为空时不渲染标签区域', () => {
    const wrapper = mount(Field)
    expect(wrapper.find('.bw-field__label').exists()).toBe(false)
  })

  it('label 插槽应该渲染自定义标签', () => {
    const wrapper = mount(Field, {
      slots: { label: '自定义标签' }
    })
    expect(wrapper.find('.bw-field__label').text()).toBe('自定义标签')
  })

  it('placeholder 应该设置到 input 上', () => {
    const wrapper = mount(Field, {
      props: { placeholder: '请输入内容' }
    })
    expect(wrapper.find('.bw-field__input').attributes('placeholder')).toBe('请输入内容')
  })

  it('disabled 为 true 时 input 应该被禁用', () => {
    const wrapper = mount(Field, {
      props: { disabled: true }
    })
    expect(wrapper.find('.bw-field__input').attributes('disabled')).toBeDefined()
  })

  it('disabled 为 true 时应该添加禁用样式类', () => {
    const wrapper = mount(Field, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('bw-field--disabled')
  })

  it('disabled 为 false 时不应该添加禁用样式类', () => {
    const wrapper = mount(Field, {
      props: { disabled: false }
    })
    expect(wrapper.classes()).not.toContain('bw-field--disabled')
  })

  it('readonly 为 true 时 input 应该为只读', () => {
    const wrapper = mount(Field, {
      props: { readonly: true }
    })
    expect(wrapper.find('.bw-field__input').attributes('readonly')).toBeDefined()
  })

  it('readonly 为 false 时 input 不应该为只读', () => {
    const wrapper = mount(Field, {
      props: { readonly: false }
    })
    expect(wrapper.find('.bw-field__input').attributes('readonly')).toBeUndefined()
  })

  it('maxlength 应该设置到 input 上', () => {
    const wrapper = mount(Field, {
      props: { maxlength: 10 }
    })
    expect(wrapper.find('.bw-field__input').attributes('maxlength')).toBe('10')
  })

  it('leftIcon 属性应该渲染左侧图标', () => {
    const wrapper = mount(Field, {
      props: { leftIcon: 'search' }
    })
    expect(wrapper.find('.bw-field__left-icon').exists()).toBe(true)
  })

  it('rightIcon 属性应该渲染右侧图标', () => {
    const wrapper = mount(Field, {
      props: { rightIcon: 'close' }
    })
    expect(wrapper.find('.bw-field__right-icon').exists()).toBe(true)
  })

  it('left-icon 插槽应该渲染自定义左侧图标', () => {
    const wrapper = mount(Field, {
      props: { leftIcon: 'search' },
      slots: { 'left-icon': '<span class="custom-left">L</span>' }
    })
    expect(wrapper.find('.bw-field__left-icon').exists()).toBe(true)
  })

  it('right-icon 插槽应该渲染自定义右侧图标', () => {
    const wrapper = mount(Field, {
      props: { rightIcon: 'close' },
      slots: { 'right-icon': '<span class="custom-right">R</span>' }
    })
    expect(wrapper.find('.bw-field__right-icon').exists()).toBe(true)
  })

  it('errorMessage 应该渲染错误信息', () => {
    const wrapper = mount(Field, {
      props: { errorMessage: '请输入有效内容' }
    })
    expect(wrapper.find('.bw-field__footer').exists()).toBe(true)
    expect(wrapper.find('.bw-field__footer').text()).toBe('请输入有效内容')
  })

  it('errorMessage 为空时不渲染 footer', () => {
    const wrapper = mount(Field)
    expect(wrapper.find('.bw-field__footer').exists()).toBe(false)
  })

  it('footer 插槽应该渲染自定义 footer 内容', () => {
    const wrapper = mount(Field, {
      slots: { footer: '<span class="custom-footer">提示信息</span>' }
    })
    expect(wrapper.find('.custom-footer').exists()).toBe(true)
  })

  it('输入时应该触发 update:modelValue 事件', async () => {
    const wrapper = mount(Field, {
      props: { modelValue: '' }
    })
    const input = wrapper.find('.bw-field__input')
    input.element.value = '新内容'
    await input.trigger('input')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['新内容'])
  })

  it('输入时应该触发 change 事件', async () => {
    const wrapper = mount(Field, {
      props: { modelValue: '' }
    })
    const input = wrapper.find('.bw-field__input')
    input.element.value = '变更内容'
    await input.trigger('input')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]).toEqual(['变更内容'])
  })

  it('focus 时应该触发 focus 事件', async () => {
    const wrapper = mount(Field)
    const input = wrapper.find('.bw-field__input')
    await input.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()
    expect(wrapper.emitted('focus')?.length).toBe(1)
  })

  it('blur 时应该触发 blur 事件', async () => {
    const wrapper = mount(Field)
    const input = wrapper.find('.bw-field__input')
    await input.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
    expect(wrapper.emitted('blur')?.length).toBe(1)
  })

  it('confirm 时应该触发 confirm 事件', async () => {
    const wrapper = mount(Field)
    const input = wrapper.find('.bw-field__input')
    input.element.value = '确认内容'
    await input.trigger('confirm')
    expect(wrapper.emitted('confirm')).toBeTruthy()
    expect(wrapper.emitted('confirm')?.[0]).toEqual(['确认内容'])
  })

  it('点击左侧图标应该触发 click-icon 事件', async () => {
    const wrapper = mount(Field, {
      props: { leftIcon: 'search' }
    })
    await wrapper.find('.bw-field__left-icon').trigger('click')
    expect(wrapper.emitted('click-icon')).toBeTruthy()
    expect(wrapper.emitted('click-icon')?.[0]).toEqual(['left'])
  })

  it('点击右侧图标应该触发 click-icon 事件', async () => {
    const wrapper = mount(Field, {
      props: { rightIcon: 'close' }
    })
    await wrapper.find('.bw-field__right-icon').trigger('click')
    expect(wrapper.emitted('click-icon')).toBeTruthy()
    expect(wrapper.emitted('click-icon')?.[0]).toEqual(['right'])
  })

  it('clearable 且有值且聚焦时应该显示清除按钮', async () => {
    const wrapper = mount(Field, {
      props: { modelValue: '内容', clearable: true }
    })
    const input = wrapper.find('.bw-field__input')
    await input.trigger('focus')
    expect(wrapper.find('.bw-field__clear').exists()).toBe(true)
  })

  it('clearable 但无值时不应该显示清除按钮', async () => {
    const wrapper = mount(Field, {
      props: { modelValue: '', clearable: true }
    })
    const input = wrapper.find('.bw-field__input')
    await input.trigger('focus')
    expect(wrapper.find('.bw-field__clear').exists()).toBe(false)
  })

  it('clearable 为 false 时不应该显示清除按钮', async () => {
    const wrapper = mount(Field, {
      props: { modelValue: '内容', clearable: false }
    })
    const input = wrapper.find('.bw-field__input')
    await input.trigger('focus')
    expect(wrapper.find('.bw-field__clear').exists()).toBe(false)
  })

  it('点击清除按钮应该清空值并触发事件', async () => {
    const wrapper = mount(Field, {
      props: { modelValue: '待清除', clearable: true }
    })
    const input = wrapper.find('.bw-field__input')
    await input.trigger('focus')
    await wrapper.find('.bw-field__clear').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(wrapper.emitted('change')?.[0]).toEqual([''])
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  it('blur 后清除按钮应该隐藏', async () => {
    const wrapper = mount(Field, {
      props: { modelValue: '内容', clearable: true }
    })
    const input = wrapper.find('.bw-field__input')
    await input.trigger('focus')
    expect(wrapper.find('.bw-field__clear').exists()).toBe(true)
    await input.trigger('blur')
    expect(wrapper.find('.bw-field__clear').exists()).toBe(false)
  })

  it('默认值测试 - modelValue 默认空字符串', () => {
    const wrapper = mount(Field)
    expect(wrapper.find('.bw-field__input').element.value).toBe('')
  })

  it('默认值测试 - disabled 默认 false', () => {
    const wrapper = mount(Field)
    expect(wrapper.classes()).not.toContain('bw-field--disabled')
  })

  it('组合属性 - disabled 且 readonly', () => {
    const wrapper = mount(Field, {
      props: { disabled: true, readonly: true }
    })
    expect(wrapper.classes()).toContain('bw-field--disabled')
    expect(wrapper.find('.bw-field__input').attributes('disabled')).toBeDefined()
  })

  it('组合属性 - 带标签带错误信息', () => {
    const wrapper = mount(Field, {
      props: { label: '邮箱', errorMessage: '格式不正确', modelValue: 'test' }
    })
    expect(wrapper.find('.bw-field__label').text()).toBe('邮箱')
    expect(wrapper.find('.bw-field__footer').text()).toBe('格式不正确')
  })
})
