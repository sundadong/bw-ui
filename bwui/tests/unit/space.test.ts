import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Space from '../../src/components/space/index.vue'

describe('Space 组件测试', () => {
  it('应该正确渲染 Space 组件', () => {
    const wrapper = mount(Space, {
      slots: { default: '<span>A</span><span>B</span>' }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-space')
  })

  it('默认 direction 应该为 horizontal', () => {
    const wrapper = mount(Space, {
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.classes()).toContain('bw-space--horizontal')
  })

  it('direction=vertical 时应该应用对应样式', () => {
    const wrapper = mount(Space, {
      props: { direction: 'vertical' },
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.classes()).toContain('bw-space--vertical')
  })

  it('默认 size 应该为 small', () => {
    const wrapper = mount(Space, {
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.props('size')).toBe('small')
    expect(wrapper.attributes('style')).toContain('gap: 8px')
  })

  it('size=medium 时 gap 应该为 16px', () => {
    const wrapper = mount(Space, {
      props: { size: 'medium' },
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.attributes('style')).toContain('gap: 16px')
  })

  it('size=large 时 gap 应该为 24px', () => {
    const wrapper = mount(Space, {
      props: { size: 'large' },
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.attributes('style')).toContain('gap: 24px')
  })

  it('size 为数字时 gap 应该为对应 px 值', () => {
    const wrapper = mount(Space, {
      props: { size: 20 },
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.attributes('style')).toContain('gap: 20px')
  })

  it('size 为字符串时 gap 应该使用该值', () => {
    const wrapper = mount(Space, {
      props: { size: '2rem' },
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.attributes('style')).toContain('gap: 2rem')
  })

  it('wrap 为 true 时应该应用 wrap 样式', () => {
    const wrapper = mount(Space, {
      props: { wrap: true },
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.classes()).toContain('bw-space--wrap')
  })

  it('fill 为 true 时应该应用 fill 样式', () => {
    const wrapper = mount(Space, {
      props: { fill: true },
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.classes()).toContain('bw-space--fill')
  })

  it('align=center 时应该应用对应样式', () => {
    const wrapper = mount(Space, {
      props: { align: 'center' },
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.classes()).toContain('bw-space--align-center')
  })

  it('align=end 时应该应用对应样式', () => {
    const wrapper = mount(Space, {
      props: { align: 'end' },
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.classes()).toContain('bw-space--align-end')
  })

  it('align=baseline 时应该应用对应样式', () => {
    const wrapper = mount(Space, {
      props: { align: 'baseline' },
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.classes()).toContain('bw-space--align-baseline')
  })

  it('align=start 时不应该有额外 align 样式', () => {
    const wrapper = mount(Space, {
      props: { align: 'start' },
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.classes()).not.toContain('bw-space--align-center')
    expect(wrapper.classes()).not.toContain('bw-space--align-end')
    expect(wrapper.classes()).not.toContain('bw-space--align-baseline')
  })

  it('justify=center 时应该应用对应样式', () => {
    const wrapper = mount(Space, {
      props: { justify: 'center' },
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.classes()).toContain('bw-space--justify-center')
  })

  it('justify=end 时应该应用对应样式', () => {
    const wrapper = mount(Space, {
      props: { justify: 'end' },
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.classes()).toContain('bw-space--justify-end')
  })

  it('justify=between 时应该应用对应样式', () => {
    const wrapper = mount(Space, {
      props: { justify: 'between' },
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.classes()).toContain('bw-space--justify-between')
  })

  it('justify=around 时应该应用对应样式', () => {
    const wrapper = mount(Space, {
      props: { justify: 'around' },
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.classes()).toContain('bw-space--justify-around')
  })

  it('justify=start 时不应该有额外 justify 样式', () => {
    const wrapper = mount(Space, {
      props: { justify: 'start' },
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.classes()).not.toContain('bw-space--justify-center')
    expect(wrapper.classes()).not.toContain('bw-space--justify-end')
    expect(wrapper.classes()).not.toContain('bw-space--justify-between')
    expect(wrapper.classes()).not.toContain('bw-space--justify-around')
  })

  it('应该正确渲染插槽内容', () => {
    const wrapper = mount(Space, {
      slots: { default: '<span class="child">子元素</span>' }
    })
    expect(wrapper.find('.child').exists()).toBe(true)
    expect(wrapper.find('.child').text()).toBe('子元素')
  })

  it('多个子元素应该被正确渲染', () => {
    const wrapper = mount(Space, {
      slots: { default: '<span>A</span><span>B</span><span>C</span>' }
    })
    expect(wrapper.findAll('span').length).toBe(3)
  })

  it('wrap 和 fill 组合应该正确应用样式', () => {
    const wrapper = mount(Space, {
      props: { wrap: true, fill: true },
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.classes()).toContain('bw-space--wrap')
    expect(wrapper.classes()).toContain('bw-space--fill')
  })

  it('direction=vertical 与 size 组合应该正确', () => {
    const wrapper = mount(Space, {
      props: { direction: 'vertical', size: 'large' },
      slots: { default: '<span>A</span>' }
    })
    expect(wrapper.classes()).toContain('bw-space--vertical')
    expect(wrapper.attributes('style')).toContain('gap: 24px')
  })

  it('无插槽内容时应该正常渲染空组件', () => {
    const wrapper = mount(Space)
    expect(wrapper.exists()).toBe(true)
  })
})