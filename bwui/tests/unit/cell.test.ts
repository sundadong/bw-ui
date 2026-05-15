import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Cell from '../../src/components/cell/index.vue'

describe('Cell 组件测试', () => {
  it('应该正确渲染标题', () => {
    const wrapper = mount(Cell, {
      props: { title: '单元格标题' }
    })
    expect(wrapper.find('.bw-cell__title').text()).toBe('单元格标题')
  })

  it('应该正确渲染值', () => {
    const wrapper = mount(Cell, {
      props: { 
        title: '标题', 
        value: '单元格值' 
      }
    })
    expect(wrapper.find('.bw-cell__value').text()).toBe('单元格值')
  })

  it('应该正确渲染描述标签', () => {
    const wrapper = mount(Cell, {
      props: { 
        title: '标题', 
        label: '描述信息' 
      }
    })
    expect(wrapper.find('.bw-cell__label').text()).toBe('描述信息')
  })

  it('链接单元格应该有箭头图标', () => {
    const wrapper = mount(Cell, {
      props: { 
        title: '链接单元格', 
        isLink: true 
      }
    })
    expect(wrapper.find('.bw-cell--clickable').exists()).toBe(true)
  })

  it('应该包含基础类名', () => {
    const wrapper = mount(Cell, {
      props: { title: '单元格' }
    })
    expect(wrapper.classes()).toContain('bw-cell')
  })

  it('点击事件应该正常工作', async () => {
    const wrapper = mount(Cell, {
      props: { title: '可点击单元格' }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('禁用状态应该阻止点击事件', async () => {
    const wrapper = mount(Cell, {
      props: { 
        title: '禁用单元格',
        disabled: true 
      }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('禁用单元格应该有禁用样式', () => {
    const wrapper = mount(Cell, {
      props: { 
        title: '禁用单元格',
        disabled: true 
      }
    })
    expect(wrapper.classes()).toContain('bw-cell--disabled')
  })

  it('应该支持图标显示', () => {
    const wrapper = mount(Cell, {
      props: { 
        title: '带图标单元格',
        icon: 'success' 
      }
    })
    expect(wrapper.find('.bw-cell__left-icon').exists()).to(true)
  })

  it('应该支持自定义右侧图标', () => {
    const wrapper = mount(Cell, {
      props: { 
        title: '自定义图标',
        rightIcon: 'search' 
      }
    })
    expect(wrapper.find('.bw-cell__right-icon').exists()).toBe(true)
  })

  it('应该支持标签和值的组合', () => {
    const wrapper = mount(Cell, {
      props: { 
        title: '组合单元格',
        label: '这是描述',
        value: '这是值' 
      }
    })
    expect(wrapper.find('.bw-cell__title').exists()).toBe(true)
    expect(wrapper.find('.bw-cell__label').exists()).toBe(true)
    expect(wrapper.find('.bw-cell__value').exists()).toBe(true)
  })

  it('应该支持多行标题', () => {
    const wrapper = mount(Cell, {
      props: { 
        title: '多行标题',
        label: '这是第二行描述信息' 
      }
    })
    const title = wrapper.find('.bw-cell__title')
    expect(title.exists()).toBe(true)
  })

  it('isLink 属性应该使单元格可点击', () => {
    const wrapper = mount(Cell, {
      props: { 
        title: '链接单元格',
        isLink: true 
      }
    })
    expect(wrapper.classes()).toContain('bw-cell--clickable')
  })

  it('禁用状态不应该有可点击类', () => {
    const wrapper = mount(Cell, {
      props: { 
        title: '禁用单元格',
        disabled: true,
        isLink: true 
      }
    })
    expect(wrapper.classes()).not.toContain('bw-cell--clickable')
    expect(wrapper.classes()).toContain('bw-cell--disabled')
  })
})
