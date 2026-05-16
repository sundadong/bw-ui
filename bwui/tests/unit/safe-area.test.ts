import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SafeArea from '../../src/components/safe-area/index.vue'

describe('SafeArea 组件测试', () => {
  it('应该正确渲染 SafeArea 组件', () => {
    const wrapper = mount(SafeArea)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-safe-area')
  })

  it('默认 position 应该为 top', () => {
    const wrapper = mount(SafeArea)
    expect(wrapper.props('position')).toBe('top')
    expect(wrapper.classes()).toContain('bw-safe-area--top')
  })

  it('position=bottom 时应该应用 bottom 样式', () => {
    const wrapper = mount(SafeArea, {
      props: { position: 'bottom' }
    })
    expect(wrapper.classes()).toContain('bw-safe-area--bottom')
    expect(wrapper.classes()).not.toContain('bw-safe-area--top')
  })

  it('position=top 时应该应用 top 样式', () => {
    const wrapper = mount(SafeArea, {
      props: { position: 'top' }
    })
    expect(wrapper.classes()).toContain('bw-safe-area--top')
    expect(wrapper.classes()).not.toContain('bw-safe-area--bottom')
  })

  it('应该正确渲染插槽内容', () => {
    const wrapper = mount(SafeArea, {
      slots: { default: '<div class="content">内容区域</div>' }
    })
    expect(wrapper.find('.content').exists()).toBe(true)
    expect(wrapper.find('.content').text()).toBe('内容区域')
  })

  it('空插槽时应该正常渲染', () => {
    const wrapper = mount(SafeArea)
    expect(wrapper.exists()).toBe(true)
  })

  it('应该渲染为 div 元素', () => {
    const wrapper = mount(SafeArea)
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('position=top 时不应该有 bottom 样式', () => {
    const wrapper = mount(SafeArea, {
      props: { position: 'top' }
    })
    expect(wrapper.classes()).not.toContain('bw-safe-area--bottom')
  })

  it('position=bottom 时不应该有 top 样式', () => {
    const wrapper = mount(SafeArea, {
      props: { position: 'bottom' }
    })
    expect(wrapper.classes()).not.toContain('bw-safe-area--top')
  })

  it('应该支持多个子元素插槽', () => {
    const wrapper = mount(SafeArea, {
      slots: { default: '<span>A</span><span>B</span><span>C</span>' }
    })
    expect(wrapper.findAll('span').length).toBe(3)
  })

  it('切换 position 应该正确更新样式', async () => {
    const wrapper = mount(SafeArea, {
      props: { position: 'top' }
    })
    expect(wrapper.classes()).toContain('bw-safe-area--top')

    await wrapper.setProps({ position: 'bottom' })
    expect(wrapper.classes()).toContain('bw-safe-area--bottom')
    expect(wrapper.classes()).not.toContain('bw-safe-area--top')
  })

  it('多次切换 position 应该正确更新样式', async () => {
    const wrapper = mount(SafeArea, {
      props: { position: 'top' }
    })
    await wrapper.setProps({ position: 'bottom' })
    expect(wrapper.classes()).toContain('bw-safe-area--bottom')
    await wrapper.setProps({ position: 'top' })
    expect(wrapper.classes()).toContain('bw-safe-area--top')
    await wrapper.setProps({ position: 'bottom' })
    expect(wrapper.classes()).toContain('bw-safe-area--bottom')
  })

  it('应该包含 bw-safe-area 基础类', () => {
    const wrapper = mount(SafeArea)
    expect(wrapper.classes()).toContain('bw-safe-area')
  })

  it('HTML 内容插槽应该正确渲染', () => {
    const wrapper = mount(SafeArea, {
      slots: { default: '<strong>加粗文本</strong>' }
    })
    expect(wrapper.find('strong').exists()).toBe(true)
  })

  it('嵌套组件插槽应该正确渲染', () => {
    const wrapper = mount(SafeArea, {
      slots: { default: '<div class="inner"><span class="nested">嵌套内容</span></div>' }
    })
    expect(wrapper.find('.inner').exists()).toBe(true)
    expect(wrapper.find('.nested').text()).toBe('嵌套内容')
  })

  it('默认不应该有其他样式类', () => {
    const wrapper = mount(SafeArea)
    const classes = wrapper.classes()
    expect(classes.length).toBe(2)
    expect(classes).toContain('bw-safe-area')
    expect(classes).toContain('bw-safe-area--top')
  })

  it('position=bottom 时 classes 数量应为 2', () => {
    const wrapper = mount(SafeArea, {
      props: { position: 'bottom' }
    })
    const classes = wrapper.classes()
    expect(classes.length).toBe(2)
    expect(classes).toContain('bw-safe-area')
    expect(classes).toContain('bw-safe-area--bottom')
  })

  it('不传 props 应该使用默认值 top', () => {
    const wrapper = mount(SafeArea)
    expect(wrapper.classes()).toContain('bw-safe-area--top')
  })

  it('position 保持不变时样式不应改变', async () => {
    const wrapper = mount(SafeArea, {
      props: { position: 'top' }
    })
    const classesBefore = wrapper.classes()
    await wrapper.setProps({ position: 'top' })
    const classesAfter = wrapper.classes()
    expect(classesAfter).toEqual(classesBefore)
  })

  it('应该支持在 safe area 区域放置内容', () => {
    const wrapper = mount(SafeArea, {
      props: { position: 'bottom' },
      slots: { default: '<button>底部按钮</button>' }
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('底部按钮')
  })

  it('动态改变插槽内容应该正确更新', async () => {
    const wrapper = mount(SafeArea, {
      slots: { default: '<span>旧内容</span>' }
    })
    expect(wrapper.text()).toBe('旧内容')

    await wrapper.setProps({ position: 'bottom' })
    expect(wrapper.text()).toBe('旧内容')
  })
})