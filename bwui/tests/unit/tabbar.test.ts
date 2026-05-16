import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Tabbar from '../../src/components/tabbar/index.vue'
import TabbarItem from '../../src/components/tabbar-item/index.vue'

describe('Tabbar 组件测试', () => {
  it('应该正确渲染 Tabbar 容器', () => {
    const wrapper = mount(Tabbar)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-tabbar')
  })

  it('应该渲染插槽中的子组件', () => {
    const wrapper = mount(Tabbar, {
      slots: {
        default: '<div class="test-child">Child</div>'
      }
    })
    expect(wrapper.find('.test-child').exists()).toBe(true)
  })

  it('默认应该应用 fixed 类', () => {
    const wrapper = mount(Tabbar)
    expect(wrapper.classes()).toContain('bw-tabbar--fixed')
  })

  it('fixed 为 false 时不应该有 fixed 类', () => {
    const wrapper = mount(Tabbar, {
      props: { fixed: false }
    })
    expect(wrapper.classes()).not.toContain('bw-tabbar--fixed')
  })

  it('默认应该应用 border 类', () => {
    const wrapper = mount(Tabbar)
    expect(wrapper.classes()).toContain('bw-tabbar--border')
  })

  it('border 为 false 时不应该有 border 类', () => {
    const wrapper = mount(Tabbar, {
      props: { border: false }
    })
    expect(wrapper.classes()).not.toContain('bw-tabbar--border')
  })

  it('safeAreaInsetBottom 应该添加对应类', () => {
    const wrapper = mount(Tabbar, {
      props: { safeAreaInsetBottom: true }
    })
    expect(wrapper.classes()).toContain('bw-tabbar--safe-area-inset-bottom')
  })

  it('应该正确应用 zIndex 样式', () => {
    const wrapper = mount(Tabbar, {
      props: { zIndex: 200 }
    })
    expect(wrapper.attributes('style')).toContain('z-index: 200')
  })

  it('应该正确接收 modelValue prop', () => {
    const wrapper = mount(Tabbar, {
      props: { modelValue: 'home' }
    })
    expect(wrapper.props('modelValue')).toBe('home')
  })

  it('TabbarItem 应该正确渲染', () => {
    const wrapper = mount(TabbarItem, {
      props: { name: 'home' }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-tabbar-item')
  })

  it('TabbarItem 应该渲染默认插槽文本', () => {
    const wrapper = mount(TabbarItem, {
      props: { name: 'home' },
      slots: { default: '首页' }
    })
    expect(wrapper.text()).toContain('首页')
  })

  it('TabbarItem 应该渲染 icon', () => {
    const wrapper = mount(TabbarItem, {
      props: { name: 'home', icon: 'home' }
    })
    expect(wrapper.find('.bw-tabbar-item__icon').exists()).toBe(true)
  })

  it('TabbarItem 应该渲染 dot', () => {
    const wrapper = mount(TabbarItem, {
      props: { name: 'home', dot: true }
    })
    expect(wrapper.find('.bw-tabbar-item__dot').exists()).toBe(true)
  })

  it('TabbarItem dot 为 false 时不应该渲染 dot', () => {
    const wrapper = mount(TabbarItem, {
      props: { name: 'home', dot: false }
    })
    expect(wrapper.find('.bw-tabbar-item__dot').exists()).toBe(false)
  })

  it('TabbarItem 应该渲染 badge', () => {
    const wrapper = mount(TabbarItem, {
      props: { name: 'home', badge: '3' }
    })
    expect(wrapper.find('.bw-tabbar-item__badge').exists()).toBe(true)
  })

  it('TabbarItem badge 为 0 时应该渲染', () => {
    const wrapper = mount(TabbarItem, {
      props: { name: 'home', badge: 0 }
    })
    expect(wrapper.find('.bw-tabbar-item__badge').exists()).toBe(true)
  })

  it('TabbarItem 应该支持 href 渲染为 a 标签', () => {
    const wrapper = mount(TabbarItem, {
      props: { name: 'home', href: 'https://example.com' }
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('a')
    expect(wrapper.attributes('href')).toBe('https://example.com')
  })

  it('TabbarItem 应该支持 to 渲染为 router-link', () => {
    const wrapper = mount(TabbarItem, {
      props: { name: 'home', to: '/home' }
    })
    expect(wrapper.attributes('to')).toBe('/home')
  })

  it('TabbarItem 默认应该渲染为 div', () => {
    const wrapper = mount(TabbarItem, {
      props: { name: 'home' }
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('TabbarItem 点击应该触发 click 事件', async () => {
    const wrapper = mount(TabbarItem, {
      props: { name: 'home' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })

  it('TabbarItem 多次点击应该触发多次事件', async () => {
    const wrapper = mount(TabbarItem, {
      props: { name: 'home' }
    })
    await wrapper.trigger('click')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')?.length).toBe(2)
  })

  it('Tabbar 应该支持多个 TabbarItem 子项', () => {
    const wrapper = mount(Tabbar, {
      slots: {
        default: `
          <div class="item">首页</div>
          <div class="item">消息</div>
          <div class="item">我的</div>
        `
      }
    })
    expect(wrapper.findAll('.item').length).toBe(3)
  })

  it('TabbarItem 无 name 时应该正常渲染', () => {
    const wrapper = mount(TabbarItem)
    expect(wrapper.exists()).toBe(true)
  })

  it('Tabbar 应该支持 activeColor prop', () => {
    const wrapper = mount(Tabbar, {
      props: { activeColor: '#1989fa' }
    })
    expect(wrapper.props('activeColor')).toBe('#1989fa')
  })

  it('Tabbar 应该支持 inactiveColor prop', () => {
    const wrapper = mount(Tabbar, {
      props: { inactiveColor: '#969799' }
    })
    expect(wrapper.props('inactiveColor')).toBe('#969799')
  })
})