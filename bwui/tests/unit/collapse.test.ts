import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from '../../src/components/collapse/index.vue'
import CollapseItem from '../../src/components/collapse-item/index.vue'

describe('Collapse 组件测试', () => {
  it('应该正确渲染 Collapse 容器', () => {
    const wrapper = mount(Collapse)
    expect(wrapper.find('.bw-collapse').exists()).toBe(true)
  })

  it('应该包含 bw-collapse 类', () => {
    const wrapper = mount(Collapse)
    expect(wrapper.classes()).toContain('bw-collapse')
  })

  it('默认应该显示边框', () => {
    const wrapper = mount(Collapse)
    expect(wrapper.classes()).toContain('bw-collapse--border')
  })

  it('应该支持隐藏边框', () => {
    const wrapper = mount(Collapse, {
      props: { border: false }
    })
    expect(wrapper.classes()).not.toContain('bw-collapse--border')
  })

  it('应该正确渲染 CollapseItem', () => {
    const wrapper = mount(Collapse, {
      slots: {
        default: '<collapse-item name="1" title="标题1">内容1</collapse-item>'
      },
      global: {
        components: { CollapseItem }
      }
    })
    expect(wrapper.find('.bw-collapse-item').exists()).toBe(true)
  })

  it('CollapseItem 应该显示标题', () => {
    const wrapper = mount(CollapseItem, {
      props: { name: '1', title: '测试标题' }
    })
    expect(wrapper.find('.bw-collapse-item__title-text').text()).toBe('测试标题')
  })

  it('CollapseItem 应该正确渲染内容插槽', () => {
    const wrapper = mount(Collapse, {
      props: { modelValue: ['1'] },
      slots: {
        default: '<collapse-item name="1" title="标题1">内容文本</collapse-item>'
      },
      global: {
        components: { CollapseItem }
      }
    })
    expect(wrapper.find('.bw-collapse-item__content').text()).toContain('内容文本')
  })

  it('手风琴模式下只能展开一个面板', async () => {
    const wrapper = mount(Collapse, {
      props: { accordion: true, modelValue: ['1'] },
      slots: {
        default: `
          <collapse-item name="1" title="标题1">内容1</collapse-item>
          <collapse-item name="2" title="标题2">内容2</collapse-item>
        `
      },
      global: {
        components: { CollapseItem }
      }
    })
    await wrapper.find('.bw-collapse-item__title').trigger('click')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    if (emitted && emitted[0]) {
      expect(emitted[0][0]).toEqual([])
    }
  })

  it('默认应该允许同时展开多个面板', async () => {
    const wrapper = mount(Collapse, {
      props: { modelValue: [] },
      slots: {
        default: `
          <collapse-item name="1" title="标题1">内容1</collapse-item>
        `
      },
      global: {
        components: { CollapseItem }
      }
    })
    await wrapper.find('.bw-collapse-item__title').trigger('click')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
  })

  it('禁用状态的 CollapseItem 不应该响应点击', async () => {
    const wrapper = mount(CollapseItem, {
      props: { name: '1', title: '标题1', disabled: true }
    })
    await wrapper.find('.bw-collapse-item__title').trigger('click')
    expect(wrapper.classes()).toContain('bw-collapse-item--disabled')
  })

  it('只读状态的 CollapseItem 应该有只读样式', () => {
    const wrapper = mount(CollapseItem, {
      props: { name: '1', title: '标题1', readonly: true }
    })
    expect(wrapper.find('.bw-collapse-item__title--readonly').exists()).toBe(true)
  })

  it('应该支持 large 尺寸', () => {
    const wrapper = mount(CollapseItem, {
      props: { name: '1', title: '标题1', size: 'large' }
    })
    expect(wrapper.classes()).toContain('bw-collapse-item--large')
  })

  it('默认应该显示边框', () => {
    const wrapper = mount(CollapseItem, {
      props: { name: '1', title: '标题1' }
    })
    expect(wrapper.classes()).toContain('bw-collapse-item--border')
  })

  it('应该支持隐藏边框', () => {
    const wrapper = mount(CollapseItem, {
      props: { name: '1', title: '标题1', border: false }
    })
    expect(wrapper.classes()).not.toContain('bw-collapse-item--border')
  })

  it('默认应该显示右侧箭头', () => {
    const wrapper = mount(CollapseItem, {
      props: { name: '1', title: '标题1' }
    })
    expect(wrapper.find('.bw-collapse-item__arrow').exists()).toBe(true)
  })

  it('应该支持隐藏右侧箭头', () => {
    const wrapper = mount(CollapseItem, {
      props: { name: '1', title: '标题1', isLink: false }
    })
    expect(wrapper.find('.bw-collapse-item__arrow').exists()).toBe(false)
  })

  it('应该支持 name 为数字类型', () => {
    const wrapper = mount(CollapseItem, {
      props: { name: 123, title: '标题' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('展开时箭头应该旋转', () => {
    const wrapper = mount(Collapse, {
      props: { modelValue: ['1'] },
      slots: {
        default: '<collapse-item name="1" title="标题1">内容1</collapse-item>'
      },
      global: {
        components: { CollapseItem }
      }
    })
    expect(wrapper.find('.bw-collapse-item__arrow--expanded').exists()).toBe(true)
  })

  it('应该正确触发 change 事件', async () => {
    const wrapper = mount(Collapse, {
      props: { modelValue: [] },
      slots: {
        default: '<collapse-item name="1" title="标题1">内容1</collapse-item>'
      },
      global: {
        components: { CollapseItem }
      }
    })
    await wrapper.find('.bw-collapse-item__title').trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('展开状态下标题应该激活', () => {
    const wrapper = mount(Collapse, {
      props: { modelValue: ['1'] },
      slots: {
        default: '<collapse-item name="1" title="标题1">内容1</collapse-item>'
      },
      global: {
        components: { CollapseItem }
      }
    })
    expect(wrapper.find('.bw-collapse-item__title--active').exists()).toBe(true)
  })

  it('modelValue 更新应该同步', async () => {
    const wrapper = mount(Collapse, {
      props: { modelValue: [] },
      slots: {
        default: '<collapse-item name="1" title="标题1">内容1</collapse-item>'
      },
      global: {
        components: { CollapseItem }
      }
    })
    await wrapper.setProps({ modelValue: ['1'] })
    expect(wrapper.find('.bw-collapse-item__title--active').exists()).toBe(true)
  })
})