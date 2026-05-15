import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Cell from '../../src/components/cell/index.vue'

describe('Cell 组件测试', () => {
  // 1. 基本渲染测试
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

  // 2. Props 测试
  it('链接单元格应该有可点击样式', () => {
    const wrapper = mount(Cell, {
      props: { 
        title: '链接单元格', 
        isLink: true 
      }
    })
    expect(wrapper.classes()).toContain('bw-cell--clickable')
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

  it('居中对齐应该有对应样式', () => {
    const wrapper = mount(Cell, {
      props: { 
        title: '居中', 
        center: true 
      }
    })
    expect(wrapper.classes()).toContain('bw-cell--center')
  })

  it('大型单元格应该有对应样式', () => {
    const wrapper = mount(Cell, {
      props: { 
        title: '大型', 
        large: true 
      }
    })
    expect(wrapper.classes()).toContain('bw-cell--large')
  })

  it('必填字段应该有必填标记', () => {
    const wrapper = mount(Cell, {
      props: { 
        title: '必填项', 
        required: true 
      }
    })
    expect(wrapper.classes()).toContain('bw-cell--required')
  })

  it('箭头方向应该正确设置', () => {
    const wrapper = mount(Cell, {
      props: { 
        title: '链接', 
        isLink: true,
        arrowDirection: 'down'
      }
    })
    expect(wrapper.find('.bw-cell__right-icon').exists()).toBe(true)
  })

  // 3. 事件测试
  it('点击事件应该正常工作', async () => {
    const wrapper = mount(Cell, {
      props: { title: '可点击单元格' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('多次点击应该触发多次事件', async () => {
    const wrapper = mount(Cell, {
      props: { title: '单元格' }
    })
    await wrapper.trigger('click')
    await wrapper.trigger('click')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')?.length).toBe(3)
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

  // 4. Slots 测试
  it('应该正确渲染默认插槽', () => {
    const wrapper = mount(Cell, {
      props: { title: '单元格' },
      slots: { default: '<span class="custom-content">自定义内容</span>' }
    })
    expect(wrapper.find('.custom-content').exists()).toBe(true)
  })

  it('应该正确渲染标题插槽', () => {
    const wrapper = mount(Cell, {
      slots: { title: '<span class="custom-title">自定义标题</span>' }
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
  })

  it('应该正确渲染值插槽', () => {
    const wrapper = mount(Cell, {
      props: { title: '标题' },
      slots: { default: '<span class="custom-value">自定义值</span>' }
    })
    expect(wrapper.find('.custom-value').exists()).toBe(true)
  })

  it('应该正确渲染左侧图标插槽', () => {
    const wrapper = mount(Cell, {
      props: { title: '标题' },
      slots: { 'left-icon': '<span class="custom-left-icon">★</span>' }
    })
    expect(wrapper.find('.custom-left-icon').exists()).toBe(true)
  })

  it('应该正确渲染右侧图标插槽', () => {
    const wrapper = mount(Cell, {
      props: { title: '标题', isLink: true },
      slots: { 'right-icon': '<span class="custom-right-icon">→</span>' }
    })
    expect(wrapper.find('.custom-right-icon').exists()).toBe(true)
  })

  it('应该正确渲染额外插槽', () => {
    const wrapper = mount(Cell, {
      props: { title: '标题' },
      slots: { extra: '<span class="custom-extra">额外内容</span>' }
    })
    expect(wrapper.find('.custom-extra').exists()).toBe(true)
  })

  // 5. 边界条件测试
  it('应该正确处理空标题', () => {
    const wrapper = mount(Cell, {
      props: { title: '' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该正确处理空值', () => {
    const wrapper = mount(Cell, {
      props: { title: '标题', value: '' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该正确处理空标签', () => {
    const wrapper = mount(Cell, {
      props: { title: '标题', label: '' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该正确处理特殊字符标题', () => {
    const wrapper = mount(Cell, {
      props: { title: '<script>alert(1)</script>' }
    })
    expect(wrapper.text()).toContain('alert(1)')
  })

  it('应该正确处理 HTML 标签的值', () => {
    const wrapper = mount(Cell, {
      props: { title: '标题', value: '<strong>加粗</strong>' }
    })
    expect(wrapper.text()).toContain('加粗')
  })

  // 6. 组合属性测试
  it('应该正确组合多个属性', () => {
    const wrapper = mount(Cell, {
      props: { 
        title: '单元格',
        value: '值',
        label: '描述',
        isLink: true,
        center: true,
        large: true
      }
    })
    expect(wrapper.classes()).toContain('bw-cell--clickable')
    expect(wrapper.classes()).toContain('bw-cell--center')
    expect(wrapper.classes()).toContain('bw-cell--large')
  })

  it('应该正确处理标签和值的组合', () => {
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

  // 7. 样式和基础结构测试
  it('应该包含基础类名', () => {
    const wrapper = mount(Cell, {
      props: { title: '单元格' }
    })
    expect(wrapper.classes()).toContain('bw-cell')
  })

  it('应该正确支持通过 attrs 传递原生属性', () => {
    const wrapper = mount(Cell, {
      props: { title: '单元格' },
      attrs: { 'data-testid': 'custom-cell' }
    })
    expect(wrapper.attributes('data-testid')).toBe('custom-cell')
  })

  it('应该正确处理鼠标进入离开事件', async () => {
    const onMouseenter = vi.fn()
    const onMouseleave = vi.fn()
    const wrapper = mount(Cell, {
      props: { title: '单元格' },
      attrs: {
        onMouseenter,
        onMouseleave
      }
    })
    await wrapper.trigger('mouseenter')
    expect(onMouseenter).toHaveBeenCalledTimes(1)
    await wrapper.trigger('mouseleave')
    expect(onMouseleave).toHaveBeenCalledTimes(1)
  })
})
