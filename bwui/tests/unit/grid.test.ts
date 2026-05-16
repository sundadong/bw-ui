import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Grid from '../../src/components/grid/index.vue'
import GridItem from '../../src/components/grid-item/index.vue'

describe('Grid 组件测试', () => {
  it('应该正确渲染 Grid 组件', () => {
    const wrapper = mount(Grid)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-grid')
  })

  it('应该正确渲染 GridItem 组件', () => {
    const wrapper = mount(GridItem, {
      props: { text: '文字' }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-grid-item')
  })

  it('默认 columnNum 应该为 4', () => {
    const wrapper = mount(Grid)
    expect(wrapper.props('columnNum')).toBe(4)
  })

  it('默认 border 应该为 true', () => {
    const wrapper = mount(Grid)
    expect(wrapper.props('border')).toBe(true)
    expect(wrapper.classes()).toContain('bw-grid--border')
  })

  it('border=false 时不应该有 border 样式', () => {
    const wrapper = mount(Grid, {
      props: { border: false }
    })
    expect(wrapper.classes()).not.toContain('bw-grid--border')
  })

  it('center 为 true 时应该应用 center 样式', () => {
    const wrapper = mount(Grid, {
      props: { center: true }
    })
    expect(wrapper.classes()).toContain('bw-grid--center')
  })

  it('square 为 true 时应该应用 square 样式', () => {
    const wrapper = mount(Grid, {
      props: { square: true }
    })
    expect(wrapper.classes()).toContain('bw-grid--square')
  })

  it('clickable 为 true 时应该应用 clickable 样式', () => {
    const wrapper = mount(Grid, {
      props: { clickable: true }
    })
    expect(wrapper.classes()).toContain('bw-grid--clickable')
  })

  it('reverse 为 true 时应该应用 reverse 样式', () => {
    const wrapper = mount(Grid, {
      props: { reverse: true }
    })
    expect(wrapper.classes()).toContain('bw-grid--reverse')
  })

  it('gutter 应该设置 padding 样式', () => {
    const wrapper = mount(Grid, {
      props: { gutter: 10 }
    })
    expect(wrapper.attributes('style')).toContain('padding-left: 10px')
  })

  it('GridItem 应该正确渲染 text 内容', () => {
    const wrapper = mount(GridItem, {
      props: { text: '测试文字' }
    })
    expect(wrapper.find('.bw-grid-item__text').text()).toBe('测试文字')
  })

  it('GridItem 应该正确渲染 icon', () => {
    const wrapper = mount(GridItem, {
      props: { icon: 'star', text: '收藏' }
    })
    expect(wrapper.find('.bw-grid-item__icon').exists()).toBe(true)
  })

  it('GridItem 的 iconColor 应该生效', () => {
    const wrapper = mount(GridItem, {
      props: { icon: 'star', iconColor: '#ff0000', text: '收藏' }
    })
    expect(wrapper.props('iconColor')).toBe('#ff0000')
  })

  it('GridItem dot 属性为 true 时应该渲染徽标点', () => {
    const wrapper = mount(GridItem, {
      props: { text: '消息', dot: true }
    })
    expect(wrapper.find('.bw-grid-item__badge').exists()).toBe(true)
  })

  it('GridItem badge 属性应该渲染数字徽标', () => {
    const wrapper = mount(GridItem, {
      props: { text: '消息', badge: '99' }
    })
    expect(wrapper.find('.bw-grid-item__badge').exists()).toBe(true)
  })

  it('GridItem href 属性应该渲染为 a 标签', () => {
    const wrapper = mount(GridItem, {
      props: { text: '链接', href: 'https://example.com' }
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('a')
    expect(wrapper.attributes('href')).toBe('https://example.com')
  })

  it('GridItem 点击应该触发 click 事件', async () => {
    const wrapper = mount(GridItem, {
      props: { text: '点击' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('GridItem 默认 slot 应该覆盖 text', () => {
    const wrapper = mount(GridItem, {
      props: { text: '默认文字' },
      slots: { default: '自定义内容' }
    })
    expect(wrapper.text()).toContain('自定义内容')
  })

  it('GridItem icon slot 应该覆盖默认 icon', () => {
    const wrapper = mount(GridItem, {
      props: { icon: 'star', text: '图标' },
      slots: { icon: '<span class="custom-icon">C</span>' }
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  it('Grid 应该支持传入 GridItem 子组件', () => {
    const wrapper = mount(Grid, {
      slots: {
        default: `
          <div class="bw-grid-item">1</div>
          <div class="bw-grid-item">2</div>
        `
      }
    })
    expect(wrapper.findAll('.bw-grid-item').length).toBe(2)
  })

  it('Grid direction 默认值应该为 vertical', () => {
    const wrapper = mount(Grid)
    expect(wrapper.props('direction')).toBe('vertical')
  })

  it('Grid iconSize 默认值应该为 28', () => {
    const wrapper = mount(Grid)
    expect(wrapper.props('iconSize')).toBe(28)
  })

  it('GridItem 无 text 和 slot 时应正常渲染', () => {
    const wrapper = mount(GridItem)
    expect(wrapper.exists()).toBe(true)
  })

  it('GridItem 应该支持 iconPrefix 属性', () => {
    const wrapper = mount(GridItem, {
      props: { icon: 'star', iconPrefix: 'custom', text: '图标' }
    })
    expect(wrapper.props('iconPrefix')).toBe('custom')
  })
})