import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Stepper from '../../src/components/stepper/index.vue'

describe('Stepper 组件测试', () => {
  it('应该正确渲染步进器组件', () => {
    const wrapper = mount(Stepper)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-stepper')
  })

  it('应该渲染减号按钮', () => {
    const wrapper = mount(Stepper)
    expect(wrapper.find('.bw-stepper__minus').exists()).toBe(true)
  })

  it('应该渲染加号按钮', () => {
    const wrapper = mount(Stepper)
    expect(wrapper.find('.bw-stepper__plus').exists()).toBe(true)
  })

  it('应该渲染输入框', () => {
    const wrapper = mount(Stepper)
    expect(wrapper.find('.bw-stepper__input').exists()).toBe(true)
  })

  it('modelValue 默认值为 1', () => {
    const wrapper = mount(Stepper)
    const input = wrapper.find('.bw-stepper__input')
    expect(input.element.value).toBe('1')
  })

  it('modelValue 应该绑定到输入框', () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 5 }
    })
    expect(wrapper.find('.bw-stepper__input').element.value).toBe('5')
  })

  it('点击加号应该增加值', async () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 3 }
    })
    await wrapper.find('.bw-stepper__plus').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4])
  })

  it('点击减号应该减少值', async () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 5, min: 1 }
    })
    await wrapper.find('.bw-stepper__minus').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4])
  })

  it('点击加号应该触发 plus 事件', async () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 3 }
    })
    await wrapper.find('.bw-stepper__plus').trigger('click')
    expect(wrapper.emitted('plus')).toBeTruthy()
  })

  it('点击减号应该触发 minus 事件', async () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 5, min: 1 }
    })
    await wrapper.find('.bw-stepper__minus').trigger('click')
    expect(wrapper.emitted('minus')).toBeTruthy()
  })

  it('点击加号应该触发 change 事件', async () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 3 }
    })
    await wrapper.find('.bw-stepper__plus').trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]).toEqual([4])
  })

  it('达到最小值时减号按钮应该有禁用样式类', () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 1, min: 1 }
    })
    expect(wrapper.find('.bw-stepper__minus').classes()).toContain('bw-stepper__minus--disabled')
  })

  it('未达到最小值时减号按钮不应该有禁用样式类', () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 3, min: 1 }
    })
    expect(wrapper.find('.bw-stepper__minus').classes()).not.toContain('bw-stepper__minus--disabled')
  })

  it('达到最大值时加号按钮应该有禁用样式类', () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 10, max: 10 }
    })
    expect(wrapper.find('.bw-stepper__plus').classes()).toContain('bw-stepper__plus--disabled')
  })

  it('未达到最大值时加号按钮不应该有禁用样式类', () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 5, max: 10 }
    })
    expect(wrapper.find('.bw-stepper__plus').classes()).not.toContain('bw-stepper__plus--disabled')
  })

  it('disabled 为 true 时所有按钮和输入框应该禁用', () => {
    const wrapper = mount(Stepper, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('bw-stepper--disabled')
    expect(wrapper.find('.bw-stepper__minus').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.bw-stepper__plus').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.bw-stepper__input').attributes('disabled')).toBeDefined()
  })

  it('step 自定义步长加操作', async () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 0, min: 0, step: 5 }
    })
    await wrapper.find('.bw-stepper__plus').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([5])
  })

  it('step 自定义步长减操作', async () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 10, min: 0, step: 5 }
    })
    await wrapper.find('.bw-stepper__minus').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([5])
  })

  it('integer 为 true 时应该取整', async () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 1, integer: true, step: 0.5 }
    })
    await wrapper.find('.bw-stepper__plus').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
  })

  it('integer 为 false 时允许小数', async () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 1, integer: false, step: 0.5 }
    })
    await wrapper.find('.bw-stepper__plus').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1.5])
  })

  it('theme 默认值为 default', () => {
    const wrapper = mount(Stepper)
    expect(wrapper.classes()).toContain('bw-stepper--default')
  })

  it('theme 为 round 时应该有对应样式类', () => {
    const wrapper = mount(Stepper, {
      props: { theme: 'round' }
    })
    expect(wrapper.classes()).toContain('bw-stepper--round')
  })

  it('inputWidth 字符串值应该应用到输入框', () => {
    const wrapper = mount(Stepper, {
      props: { inputWidth: '60px' }
    })
    expect(wrapper.find('.bw-stepper__input').attributes('style')).toContain('width: 60px')
  })

  it('inputWidth 数值应该转换为 px', () => {
    const wrapper = mount(Stepper, {
      props: { inputWidth: 50 }
    })
    expect(wrapper.find('.bw-stepper__input').attributes('style')).toContain('width: 50px')
  })

  it('buttonSize 数值应该转换为 px', () => {
    const wrapper = mount(Stepper, {
      props: { buttonSize: 36 }
    })
    expect(wrapper.find('.bw-stepper__minus').attributes('style')).toContain('width: 36px')
    expect(wrapper.find('.bw-stepper__minus').attributes('style')).toContain('height: 36px')
  })

  it('buttonSize 字符串值应该应用到按钮', () => {
    const wrapper = mount(Stepper, {
      props: { buttonSize: '40px' }
    })
    expect(wrapper.find('.bw-stepper__minus').attributes('style')).toContain('width: 40px')
  })

  it('输入框 blur 时空值应重置为 min', async () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 3, min: 2 }
    })
    const input = wrapper.find('.bw-stepper__input')
    input.element.value = ''
    await input.trigger('blur')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
  })

  it('输入框 blur 时无效值应重置为 min', async () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 3, min: 2 }
    })
    const input = wrapper.find('.bw-stepper__input')
    input.element.value = '-'
    await input.trigger('blur')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
  })

  it('超过最大值时触发 overlimit 事件', async () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 10, max: 10, min: 1 }
    })
    await wrapper.find('.bw-stepper__plus').trigger('click')
    expect(wrapper.emitted('overlimit')).toBeTruthy()
    expect(wrapper.emitted('overlimit')?.[0]).toEqual(['plus'])
  })

  it('低于最小值时触发 overlimit 事件', async () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 1, min: 1, max: 10 }
    })
    await wrapper.find('.bw-stepper__minus').trigger('click')
    expect(wrapper.emitted('overlimit')).toBeTruthy()
    expect(wrapper.emitted('overlimit')?.[0]).toEqual(['minus'])
  })

  it('默认值测试 - min 默认 1', () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 1 }
    })
    expect(wrapper.find('.bw-stepper__minus').classes()).toContain('bw-stepper__minus--disabled')
  })

  it('默认值测试 - disabled 默认 false', () => {
    const wrapper = mount(Stepper)
    expect(wrapper.classes()).not.toContain('bw-stepper--disabled')
  })

  it('默认值测试 - integer 默认 false', () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 1, step: 0.5 }
    })
    wrapper.find('.bw-stepper__plus').trigger('click')
  })
})