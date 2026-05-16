import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Textarea from '../../src/components/textarea/index.vue'

describe('Textarea 组件测试', () => {
  it('应该正确渲染文本域组件', () => {
    const wrapper = mount(Textarea)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-textarea')
  })

  it('应该渲染 textarea 元素', () => {
    const wrapper = mount(Textarea)
    expect(wrapper.find('.bw-textarea__inner').exists()).toBe(true)
  })

  it('modelValue 应该绑定到 textarea 的 value', () => {
    const wrapper = mount(Textarea, {
      props: { modelValue: '测试文本' }
    })
    const textarea = wrapper.find('.bw-textarea__inner')
    expect(textarea.element.value).toBe('测试文本')
  })

  it('默认 modelValue 为空字符串', () => {
    const wrapper = mount(Textarea)
    expect(wrapper.find('.bw-textarea__inner').element.value).toBe('')
  })

  it('placeholder 应该设置到 textarea 上', () => {
    const wrapper = mount(Textarea, {
      props: { placeholder: '请输入内容' }
    })
    expect(wrapper.find('.bw-textarea__inner').attributes('placeholder')).toBe('请输入内容')
  })

  it('disabled 为 true 时 textarea 应该被禁用', () => {
    const wrapper = mount(Textarea, {
      props: { disabled: true }
    })
    expect(wrapper.find('.bw-textarea__inner').attributes('disabled')).toBeDefined()
  })

  it('disabled 为 true 时应该添加禁用样式类', () => {
    const wrapper = mount(Textarea, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('bw-textarea--disabled')
  })

  it('disabled 为 false 时不应该添加禁用样式类', () => {
    const wrapper = mount(Textarea, {
      props: { disabled: false }
    })
    expect(wrapper.classes()).not.toContain('bw-textarea--disabled')
  })

  it('readonly 为 true 时 textarea 应该为只读', () => {
    const wrapper = mount(Textarea, {
      props: { readonly: true }
    })
    expect(wrapper.find('.bw-textarea__inner').attributes('readonly')).toBeDefined()
  })

  it('readonly 为 false 时 textarea 不应该为只读', () => {
    const wrapper = mount(Textarea, {
      props: { readonly: false }
    })
    expect(wrapper.find('.bw-textarea__inner').attributes('readonly')).toBeUndefined()
  })

  it('maxlength 应该设置到 textarea 上', () => {
    const wrapper = mount(Textarea, {
      props: { maxlength: 50 }
    })
    expect(wrapper.find('.bw-textarea__inner').attributes('maxlength')).toBe('50')
  })

  it('rows 属性应该设置到 textarea 上', () => {
    const wrapper = mount(Textarea, {
      props: { rows: 5 }
    })
    expect(wrapper.find('.bw-textarea__inner').attributes('rows')).toBe('5')
  })

  it('rows 默认值为 3', () => {
    const wrapper = mount(Textarea)
    expect(wrapper.find('.bw-textarea__inner').attributes('rows')).toBe('3')
  })

  it('showWordLimit 为 true 且 maxlength 有效时应该显示字数统计', () => {
    const wrapper = mount(Textarea, {
      props: { showWordLimit: true, maxlength: 100, modelValue: 'hello' }
    })
    expect(wrapper.find('.bw-textarea__word-limit').exists()).toBe(true)
    expect(wrapper.find('.bw-textarea__word-limit').text()).toBe('5/100')
  })

  it('showWordLimit 为 false 时不应该显示字数统计', () => {
    const wrapper = mount(Textarea, {
      props: { showWordLimit: false, maxlength: 100, modelValue: 'hello' }
    })
    expect(wrapper.find('.bw-textarea__word-limit').exists()).toBe(false)
  })

  it('maxlength 为 -1 时不显示字数统计', () => {
    const wrapper = mount(Textarea, {
      props: { showWordLimit: true, maxlength: -1, modelValue: 'hello' }
    })
    expect(wrapper.find('.bw-textarea__word-limit').exists()).toBe(false)
  })

  it('autosize 为 false 时默认行为', () => {
    const wrapper = mount(Textarea, {
      props: { autosize: false }
    })
    expect(wrapper.find('.bw-textarea__inner').exists()).toBe(true)
  })

  it('autosize 为 true 时应该设置 resize:none', () => {
    const wrapper = mount(Textarea, {
      props: { autosize: true }
    })
    const textarea = wrapper.find('.bw-textarea__inner')
    expect(textarea.attributes('style')).toContain('resize: none')
  })

  it('autosize 为对象时应设置 minHeight 和 maxHeight', () => {
    const wrapper = mount(Textarea, {
      props: { autosize: { minHeight: 100, maxHeight: 300 } }
    })
    const textarea = wrapper.find('.bw-textarea__inner')
    expect(textarea.attributes('style')).toContain('min-height: 100px')
    expect(textarea.attributes('style')).toContain('max-height: 300px')
  })

  it('输入时应该触发 update:modelValue 事件', async () => {
    const wrapper = mount(Textarea, {
      props: { modelValue: '' }
    })
    const textarea = wrapper.find('.bw-textarea__inner')
    textarea.element.value = '新内容'
    await textarea.trigger('input')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['新内容'])
  })

  it('输入时应该触发 change 事件', async () => {
    const wrapper = mount(Textarea, {
      props: { modelValue: '' }
    })
    const textarea = wrapper.find('.bw-textarea__inner')
    textarea.element.value = '变更内容'
    await textarea.trigger('input')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]).toEqual(['变更内容'])
  })

  it('focus 时应该触发 focus 事件', async () => {
    const wrapper = mount(Textarea)
    const textarea = wrapper.find('.bw-textarea__inner')
    await textarea.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()
    expect(wrapper.emitted('focus')?.length).toBe(1)
  })

  it('blur 时应该触发 blur 事件', async () => {
    const wrapper = mount(Textarea)
    const textarea = wrapper.find('.bw-textarea__inner')
    await textarea.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
    expect(wrapper.emitted('blur')?.length).toBe(1)
  })

  it('中文内容字数统计应该正确', () => {
    const wrapper = mount(Textarea, {
      props: { showWordLimit: true, maxlength: 20, modelValue: '你好世界' }
    })
    expect(wrapper.find('.bw-textarea__word-limit').text()).toBe('4/20')
  })

  it('默认值测试 - disabled 默认 false', () => {
    const wrapper = mount(Textarea)
    expect(wrapper.classes()).not.toContain('bw-textarea--disabled')
  })

  it('默认值测试 - readonly 默认 false', () => {
    const wrapper = mount(Textarea)
    expect(wrapper.find('.bw-textarea__inner').attributes('readonly')).toBeUndefined()
  })

  it('默认值测试 - showWordLimit 默认 false', () => {
    const wrapper = mount(Textarea, {
      props: { maxlength: 100, modelValue: 'test' }
    })
    expect(wrapper.find('.bw-textarea__word-limit').exists()).toBe(false)
  })

  it('组合属性 - disabled 且 readonly', () => {
    const wrapper = mount(Textarea, {
      props: { disabled: true, readonly: true, placeholder: '禁用只读' }
    })
    expect(wrapper.classes()).toContain('bw-textarea--disabled')
    expect(wrapper.find('.bw-textarea__inner').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.bw-textarea__inner').attributes('readonly')).toBeDefined()
  })

  it('组合属性 - showWordLimit 配合长文本', () => {
    const wrapper = mount(Textarea, {
      props: { showWordLimit: true, maxlength: 10, modelValue: '12345678901' }
    })
    expect(wrapper.find('.bw-textarea__word-limit').text()).toBe('11/10')
  })

  it('空字符串的字数统计显示 0', () => {
    const wrapper = mount(Textarea, {
      props: { showWordLimit: true, maxlength: 50, modelValue: '' }
    })
    expect(wrapper.find('.bw-textarea__word-limit').text()).toBe('0/50')
  })
})