import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Circle from '../../src/components/circle/index.vue'

describe('Circle 组件测试', () => {
  it('应该正确渲染环形进度条组件', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50 }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该包含 bw-circle 类', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50 }
    })
    expect(wrapper.classes()).toContain('bw-circle')
  })

  it('应该包含 SVG 元素', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50 }
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('应该包含轨道圆和进度圆', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50 }
    })
    const circles = wrapper.findAll('circle')
    expect(circles.length).toBe(2)
  })

  it('默认 size 为 100', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50 }
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('100')
    expect(svg.attributes('height')).toBe('100')
  })

  it('应该支持自定义 size', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50, size: 200 }
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('200')
    expect(svg.attributes('height')).toBe('200')
  })

  it('应该支持 size 为字符串', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50, size: '150' }
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('150')
  })

  it('默认 color 为 #1989fa', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50 }
    })
    const progressCircle = wrapper.findAll('circle')[1]
    expect(progressCircle.attributes('stroke')).toBe('#1989fa')
  })

  it('应该支持自定义 color 字符串', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50, color: '#07c160' }
    })
    const progressCircle = wrapper.findAll('circle')[1]
    expect(progressCircle.attributes('stroke')).toBe('#07c160')
  })

  it('应该支持 color 对象', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50, color: { '50': '#ff0000', default: '#1989fa' } }
    })
    const progressCircle = wrapper.findAll('circle')[1]
    expect(progressCircle.attributes('stroke')).toBe('#ff0000')
  })

  it('默认 layerColor 为 #ebedf0', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50 }
    })
    const trackCircle = wrapper.findAll('circle')[0]
    expect(trackCircle.attributes('stroke')).toBe('#ebedf0')
  })

  it('应该支持自定义 layerColor', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50, layerColor: '#cccccc' }
    })
    const trackCircle = wrapper.findAll('circle')[0]
    expect(trackCircle.attributes('stroke')).toBe('#cccccc')
  })

  it('默认 strokeWidth 为 4', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50 }
    })
    const circles = wrapper.findAll('circle')
    expect(circles[0].attributes('stroke-width')).toBe('4')
    expect(circles[1].attributes('stroke-width')).toBe('4')
  })

  it('应该支持自定义 strokeWidth', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50, strokeWidth: 8 }
    })
    const circles = wrapper.findAll('circle')
    expect(circles[0].attributes('stroke-width')).toBe('8')
    expect(circles[1].attributes('stroke-width')).toBe('8')
  })

  it('默认顺时针方向', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50 }
    })
    const progressCircle = wrapper.findAll('circle')[1]
    expect(progressCircle.attributes('transform')).toContain('rotate(-90')
  })

  it('clockwise 为 false 时应逆时针', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50, clockwise: false }
    })
    const progressCircle = wrapper.findAll('circle')[1]
    expect(progressCircle.attributes('transform')).toContain('rotate(90')
  })

  it('应该渲染进度文字', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 75 }
    })
    expect(wrapper.find('.bw-circle__text').exists()).toBe(true)
  })

  it('进度文字应该显示百分比', async () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 75, speed: 0 }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.bw-circle__text').text()).toBe('75%')
  })

  it('应该支持自定义 text', async () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 75, text: '已完成', speed: 0 }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.bw-circle__text').text()).toBe('已完成')
  })

  it('应该支持默认插槽', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50 },
      slots: { default: '<span>自定义内容</span>' }
    })
    expect(wrapper.find('.bw-circle__text span').text()).toBe('自定义内容')
  })

  it('应该渲染为 div 元素', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50 }
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('modelValue 为 0 时应正常渲染', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 0 }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('modelValue 为 100 时应正常渲染', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 100 }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该使用 currentRate 作为目标值', () => {
    const wrapper = mount(Circle, {
      props: { currentRate: 60, speed: 0 }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('fill 属性默认为 none', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50 }
    })
    const circles = wrapper.findAll('circle')
    expect(circles[0].attributes('fill')).toBe('none')
    expect(circles[1].attributes('fill')).toBe('none')
  })

  it('应该支持 fill 属性', () => {
    const wrapper = mount(Circle, {
      props: { modelValue: 50, fill: '#ffffff' }
    })
    expect(wrapper.exists()).toBe(true)
  })
})