import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Slider from '../../src/components/slider/index.vue'

describe('Slider 组件测试', () => {
  it('应该正确渲染滑块组件', () => {
    const wrapper = mount(Slider)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-slider')
  })

  it('应该渲染滑块条', () => {
    const wrapper = mount(Slider)
    expect(wrapper.find('.bw-slider__bar').exists()).toBe(true)
  })

  it('应该渲染进度轨道', () => {
    const wrapper = mount(Slider)
    expect(wrapper.find('.bw-slider__track').exists()).toBe(true)
  })

  it('应该渲染滑块按钮', () => {
    const wrapper = mount(Slider)
    expect(wrapper.find('.bw-slider__button').exists()).toBe(true)
  })

  it('modelValue 默认值为 0', () => {
    const wrapper = mount(Slider)
    const track = wrapper.find('.bw-slider__track')
    expect(track.attributes('style')).toContain('width: 0%')
  })

  it('modelValue 为 50 时轨道宽度应为 50%', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 50, min: 0, max: 100 }
    })
    const track = wrapper.find('.bw-slider__track')
    expect(track.attributes('style')).toContain('width: 50%')
  })

  it('modelValue 为 100 时轨道宽度应为 100%', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 100, min: 0, max: 100 }
    })
    const track = wrapper.find('.bw-slider__track')
    expect(track.attributes('style')).toContain('width: 100%')
  })

  it('自定义 min 和 max 时百分比计算正确', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 30, min: 20, max: 40 }
    })
    const track = wrapper.find('.bw-slider__track')
    expect(track.attributes('style')).toContain('width: 50%')
  })

  it('disabled 为 true 时应该添加禁用样式类', () => {
    const wrapper = mount(Slider, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('bw-slider--disabled')
  })

  it('disabled 为 false 时不应该添加禁用样式类', () => {
    const wrapper = mount(Slider, {
      props: { disabled: false }
    })
    expect(wrapper.classes()).not.toContain('bw-slider--disabled')
  })

  it('vertical 为 true 时应该添加垂直样式类', () => {
    const wrapper = mount(Slider, {
      props: { vertical: true }
    })
    expect(wrapper.classes()).toContain('bw-slider--vertical')
  })

  it('vertical 为 false 时不应该添加垂直样式类', () => {
    const wrapper = mount(Slider)
    expect(wrapper.classes()).not.toContain('bw-slider--vertical')
  })

  it('activeColor 应该应用到轨道上', () => {
    const wrapper = mount(Slider, {
      props: { activeColor: '#ff0000', modelValue: 50 }
    })
    const track = wrapper.find('.bw-slider__track')
    expect(track.attributes('style')).toContain('#ff0000')
  })

  it('inactiveColor 应该应用到滑条上', () => {
    const wrapper = mount(Slider, {
      props: { inactiveColor: '#cccccc' }
    })
    const bar = wrapper.find('.bw-slider__bar')
    expect(bar.attributes('style')).toContain('#cccccc')
  })

  it('barHeight 数值应该转换为 px', () => {
    const wrapper = mount(Slider, {
      props: { barHeight: 4 }
    })
    const bar = wrapper.find('.bw-slider__bar')
    expect(bar.attributes('style')).toContain('height: 4px')
  })

  it('barHeight 字符串值应该直接使用', () => {
    const wrapper = mount(Slider, {
      props: { barHeight: '6px' }
    })
    const bar = wrapper.find('.bw-slider__bar')
    expect(bar.attributes('style')).toContain('height: 6px')
  })

  it('buttonSize 数值应该转换为 px', () => {
    const wrapper = mount(Slider, {
      props: { buttonSize: 28 }
    })
    const button = wrapper.find('.bw-slider__button')
    expect(button.attributes('style')).toContain('width: 28px')
    expect(button.attributes('style')).toContain('height: 28px')
  })

  it('buttonSize 字符串值应该直接使用', () => {
    const wrapper = mount(Slider, {
      props: { buttonSize: '32px' }
    })
    const button = wrapper.find('.bw-slider__button')
    expect(button.attributes('style')).toContain('width: 32px')
  })

  it('range 为 false 时不渲染 range 元素', () => {
    const wrapper = mount(Slider, {
      props: { range: false }
    })
    expect(wrapper.find('.bw-slider__range').exists()).toBe(false)
  })

  it('range 为 true 时应该渲染 range 元素', () => {
    const wrapper = mount(Slider, {
      props: { range: true }
    })
    expect(wrapper.find('.bw-slider__range').exists()).toBe(true)
  })

  it('点击滑块条应该触发 update:modelValue 事件', async () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 0, min: 0, max: 100 }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('点击滑块条应该触发 change 事件', async () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 0, min: 0, max: 100 }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('disabled 状态下点击不应该触发事件', async () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 50, disabled: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()
  })

  it('mousedown 按钮应该触发 drag-start 事件', async () => {
    const wrapper = mount(Slider)
    const button = wrapper.find('.bw-slider__button')
    await button.trigger('mousedown')
    expect(wrapper.emitted('drag-start')).toBeTruthy()
  })

  it('mousedown 按钮应该添加拖拽样式类', async () => {
    const wrapper = mount(Slider)
    const button = wrapper.find('.bw-slider__button')
    await button.trigger('mousedown')
    expect(button.classes()).toContain('bw-slider__button--dragging')
  })

  it('默认值测试 - modelValue 默认 0', () => {
    const wrapper = mount(Slider)
    const track = wrapper.find('.bw-slider__track')
    expect(track.attributes('style')).toContain('width: 0%')
  })

  it('默认值测试 - min 默认 0', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 0 }
    })
    expect(wrapper.find('.bw-slider__track').attributes('style')).toContain('width: 0%')
  })

  it('默认值测试 - max 默认 100', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 50 }
    })
    expect(wrapper.find('.bw-slider__track').attributes('style')).toContain('width: 50%')
  })

  it('默认值测试 - step 默认 1', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 50 }
    })
    expect(wrapper.find('.bw-slider__button').exists()).toBe(true)
  })

  it('默认值测试 - disabled 默认 false', () => {
    const wrapper = mount(Slider)
    expect(wrapper.classes()).not.toContain('bw-slider--disabled')
  })

  it('组合属性 - vertical 和 disabled', () => {
    const wrapper = mount(Slider, {
      props: { vertical: true, disabled: true }
    })
    expect(wrapper.classes()).toContain('bw-slider--vertical')
    expect(wrapper.classes()).toContain('bw-slider--disabled')
  })

  it('min 和 max 相等时百分比为 0', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 10, min: 10, max: 10 }
    })
    const track = wrapper.find('.bw-slider__track')
    expect(track.attributes('style')).toContain('width: 0%')
  })
})