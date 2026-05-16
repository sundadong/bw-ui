import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Progress from '../../src/components/progress/index.vue'

describe('Progress 组件测试', () => {
  it('应该正确渲染进度条组件', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50 }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该包含 bw-progress 类', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50 }
    })
    expect(wrapper.classes()).toContain('bw-progress')
  })

  it('应该包含 bw-progress__portion 元素', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50 }
    })
    expect(wrapper.find('.bw-progress__portion').exists()).toBe(true)
  })

  it('默认不显示 pivot 文字', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50 }
    })
    expect(wrapper.find('.bw-progress__pivot').exists()).toBe(false)
  })

  it('showPivot 为 true 时应该显示 pivot 元素', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50, showPivot: true }
    })
    expect(wrapper.find('.bw-progress__pivot').exists()).toBe(true)
  })

  it('showPivot 为 true 时应该显示 pivotText', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50, showPivot: true, pivotText: '50%' }
    })
    expect(wrapper.find('.bw-progress__pivot').text()).toBe('50%')
  })

  it('默认 pivotText 为空字符串', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50, showPivot: true }
    })
    expect(wrapper.find('.bw-progress__pivot').text()).toBe('')
  })

  it('pivot 应该有正确的宽度样式', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 75, showPivot: true, pivotText: '75%' }
    })
    const pivot = wrapper.find('.bw-progress__pivot')
    expect(pivot.attributes('style')).toContain('width: 75%')
  })

  it('pivot 应该有正确的背景色', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50, showPivot: true, pivotText: '50%', color: '#07c160' }
    })
    const pivot = wrapper.find('.bw-progress__pivot')
    expect(pivot.attributes('style')).toContain('background-color: #07c160')
  })

  it('默认 percentage 为 0', () => {
    const wrapper = mount(Progress)
    const pivot = wrapper.find('.bw-progress__pivot')
    expect(pivot.exists()).toBe(false)
  })

  it('应该支持自定义 percentage', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 80, showPivot: true, pivotText: '80%' }
    })
    const pivot = wrapper.find('.bw-progress__pivot')
    expect(pivot.attributes('style')).toContain('width: 80%')
  })

  it('应该支持自定义 color', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 60, color: '#ff0000', showPivot: true, pivotText: '60%' }
    })
    const pivot = wrapper.find('.bw-progress__pivot')
    expect(pivot.attributes('style')).toContain('background-color: #ff0000')
  })

  it('应该接受 trackColor 属性', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50, trackColor: '#cccccc' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该接受 strokeWidth 属性', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50, strokeWidth: 8 }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该接受 strokeWidth 字符串属性', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50, strokeWidth: '8px' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('percentage 为 100 时应该正常渲染', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 100, showPivot: true, pivotText: '100%' }
    })
    const pivot = wrapper.find('.bw-progress__pivot')
    expect(pivot.attributes('style')).toContain('width: 100%')
  })

  it('percentage 为 0 时 pivot 宽度应为 0%', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 0, showPivot: true, pivotText: '0%' }
    })
    const pivot = wrapper.find('.bw-progress__pivot')
    expect(pivot.attributes('style')).toContain('width: 0%')
  })

  it('自定义 pivotText 应该正确显示', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 70, showPivot: true, pivotText: '已完成' }
    })
    expect(wrapper.find('.bw-progress__pivot').text()).toBe('已完成')
  })

  it('应该渲染为 div 元素', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50 }
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('所有属性组合应该正常工作', () => {
    const wrapper = mount(Progress, {
      props: {
        percentage: 85,
        color: '#07c160',
        trackColor: '#f0f0f0',
        strokeWidth: 6,
        pivotText: '85%',
        showPivot: true
      }
    })
    const pivot = wrapper.find('.bw-progress__pivot')
    expect(pivot.exists()).toBe(true)
    expect(pivot.text()).toBe('85%')
    expect(pivot.attributes('style')).toContain('width: 85%')
    expect(pivot.attributes('style')).toContain('background-color: #07c160')
  })

  it('showPivot 为 false 且设置了 pivotText 也不应显示 pivot', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50, showPivot: false, pivotText: '50%' }
    })
    expect(wrapper.find('.bw-progress__pivot').exists()).toBe(false)
  })
})