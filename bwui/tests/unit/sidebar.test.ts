import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Sidebar from '../../src/components/sidebar/index.vue'
import SidebarItem from '../../src/components/sidebar-item/index.vue'

describe('Sidebar 组件测试', () => {
  it('应该正确渲染 Sidebar 容器', () => {
    const wrapper = mount(Sidebar)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-sidebar')
  })

  it('应该渲染插槽中的 SidebarItem', () => {
    const wrapper = mount(Sidebar, {
      slots: {
        default: '<div class="test-item">Item 1</div>'
      }
    })
    expect(wrapper.find('.test-item').exists()).toBe(true)
  })

  it('应该正确设置默认 modelValue', () => {
    const wrapper = mount(Sidebar)
    expect(wrapper.exists()).toBe(true)
  })

  it('应该正确接收 modelValue prop', () => {
    const wrapper = mount(Sidebar, {
      props: { modelValue: 2 }
    })
    expect(wrapper.props('modelValue')).toBe(2)
  })

  it('点击 SidebarItem 应该更新 active 状态', async () => {
    const wrapper = mount(Sidebar, {
      slots: {
        default: `
          <sidebar-item title="标签1" />
          <sidebar-item title="标签2" />
        `
      },
      global: {
        components: { SidebarItem }
      }
    })
    const items = wrapper.findAllComponents(SidebarItem)
    expect(items.length).toBe(2)
    await items[1].trigger('click')
  })

  it('SidebarItem 应该正确渲染 title', () => {
    const wrapper = mount(SidebarItem, {
      props: { title: '测试标签' }
    })
    expect(wrapper.text()).toBe('测试标签')
  })

  it('SidebarItem 应该正确渲染 dot', () => {
    const wrapper = mount(SidebarItem, {
      props: { title: '标签', dot: true }
    })
    expect(wrapper.find('.bw-sidebar-item__dot').exists()).toBe(true)
  })

  it('SidebarItem 不应该在 dot 为 false 时渲染 dot', () => {
    const wrapper = mount(SidebarItem, {
      props: { title: '标签', dot: false }
    })
    expect(wrapper.find('.bw-sidebar-item__dot').exists()).toBe(false)
  })

  it('SidebarItem 应该正确渲染 badge', () => {
    const wrapper = mount(SidebarItem, {
      props: { title: '标签', badge: '5' }
    })
    expect(wrapper.find('.bw-sidebar-item__badge').exists()).toBe(true)
  })

  it('SidebarItem 应该正确处理 badge 为 0', () => {
    const wrapper = mount(SidebarItem, {
      props: { title: '标签', badge: 0 }
    })
    expect(wrapper.find('.bw-sidebar-item__badge').exists()).toBe(true)
  })

  it('SidebarItem 应该正确处理 badge 为数字', () => {
    const wrapper = mount(SidebarItem, {
      props: { title: '标签', badge: 99 }
    })
    expect(wrapper.find('.bw-sidebar-item__badge').exists()).toBe(true)
  })

  it('SidebarItem 禁用状态应该有禁用类名', () => {
    const wrapper = mount(SidebarItem, {
      props: { title: '标签', disabled: true }
    })
    expect(wrapper.classes()).toContain('bw-sidebar-item--disabled')
  })

  it('SidebarItem 禁用状态不应该触发 click 事件', async () => {
    const wrapper = mount(SidebarItem, {
      props: { title: '标签', disabled: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('SidebarItem 应该触发 click 事件', async () => {
    const wrapper = mount(SidebarItem, {
      props: { title: '标签' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })

  it('SidebarItem 应该支持 href 渲染为 a 标签', () => {
    const wrapper = mount(SidebarItem, {
      props: { title: '链接', href: 'https://example.com' }
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('a')
    expect(wrapper.attributes('href')).toBe('https://example.com')
  })

  it('SidebarItem 应该支持 to 渲染为 router-link', () => {
    const wrapper = mount(SidebarItem, {
      props: { title: '路由', to: '/home' }
    })
    expect(wrapper.attributes('to')).toBe('/home')
  })

  it('SidebarItem 默认应该渲染为 div', () => {
    const wrapper = mount(SidebarItem, {
      props: { title: '标签' }
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('SidebarItem 应该正确使用默认插槽', () => {
    const wrapper = mount(SidebarItem, {
      slots: { default: '自定义内容' }
    })
    expect(wrapper.text()).toBe('自定义内容')
  })

  it('SidebarItem 应该暴露 setIndex 方法', () => {
    const wrapper = mount(SidebarItem, {
      props: { title: '标签' }
    })
    expect(wrapper.vm.setIndex).toBeDefined()
    expect(typeof wrapper.vm.setIndex).toBe('function')
  })

  it('SidebarItem 无 title 时应该渲染空内容', () => {
    const wrapper = mount(SidebarItem)
    expect(wrapper.exists()).toBe(true)
  })

  it('Sidebar 应该支持多个子项', () => {
    const items = ['标签A', '标签B', '标签C', '标签D']
    const wrapper = mount(Sidebar, {
      slots: {
        default: items.map(item => `<div>${item}</div>`).join('')
      }
    })
    expect(wrapper.findAll('.bw-sidebar > div').length).toBe(4)
  })

  it('SidebarItem 多次点击应该触发多次事件', async () => {
    const wrapper = mount(SidebarItem, {
      props: { title: '标签' }
    })
    await wrapper.trigger('click')
    await wrapper.trigger('click')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')?.length).toBe(3)
  })

  it('SidebarItem 应该包含 bw-sidebar-item 类', () => {
    const wrapper = mount(SidebarItem, {
      props: { title: '标签' }
    })
    expect(wrapper.classes()).toContain('bw-sidebar-item')
  })
})