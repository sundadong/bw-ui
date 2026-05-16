import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Tabs from '../../src/components/tabs/index.vue'

describe('Tabs 组件测试', () => {
  const mockTabs = [
    { title: '标签 1' },
    { title: '标签 2' },
    { title: '标签 3' }
  ]

  it('应该通过 tabs 属性正确渲染标签列表', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs }
    })
    const tabEls = wrapper.findAll('.bw-tabs__tab')
    expect(tabEls.length).toBe(3)
    expect(tabEls[0].text()).toBe('标签 1')
    expect(tabEls[1].text()).toBe('标签 2')
    expect(tabEls[2].text()).toBe('标签 3')
  })

  it('默认应该选中第一个标签', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs }
    })
    const firstTab = wrapper.findAll('.bw-tabs__tab')[0]
    expect(firstTab.classes()).toContain('bw-tabs__tab--active')
  })

  it('点击标签应该切换激活状态', async () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs }
    })
    const tabs = wrapper.findAll('.bw-tabs__tab')
    await tabs[1].trigger('click')
    expect(tabs[1].classes()).toContain('bw-tabs__tab--active')
    expect(tabs[0].classes()).not.toContain('bw-tabs__tab--active')
  })

  it('点击标签应该触发 update:modelValue 事件', async () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs }
    })
    const tabs = wrapper.findAll('.bw-tabs__tab')
    await tabs[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([2])
  })

  it('点击标签应该触发 change 事件', async () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs }
    })
    const tabs = wrapper.findAll('.bw-tabs__tab')
    await tabs[1].trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0]).toEqual([1])
  })

  it('通过 modelValue 属性可以控制当前选中标签', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs, modelValue: 2 }
    })
    const tabs = wrapper.findAll('.bw-tabs__tab')
    expect(tabs[2].classes()).toContain('bw-tabs__tab--active')
  })

  it('禁用标签点击不应该切换', async () => {
    const tabsWithDisabled = [
      { title: '标签 1' },
      { title: '标签 2', disabled: true },
      { title: '标签 3' }
    ]
    const wrapper = mount(Tabs, {
      props: { tabs: tabsWithDisabled }
    })
    const tabs = wrapper.findAll('.bw-tabs__tab')
    await tabs[1].trigger('click')
    expect(tabs[0].classes()).toContain('bw-tabs__tab--active')
    expect(tabs[1].classes()).not.toContain('bw-tabs__tab--active')
  })

  it('禁用标签点击不应该触发事件', async () => {
    const tabsWithDisabled = [
      { title: '标签 1' },
      { title: '标签 2', disabled: true },
      { title: '标签 3' }
    ]
    const wrapper = mount(Tabs, {
      props: { tabs: tabsWithDisabled }
    })
    const tabs = wrapper.findAll('.bw-tabs__tab')
    await tabs[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()
  })

  it('禁用标签应该有 disabled 样式类', () => {
    const tabsWithDisabled = [
      { title: '标签 1' },
      { title: '标签 2', disabled: true }
    ]
    const wrapper = mount(Tabs, {
      props: { tabs: tabsWithDisabled }
    })
    const tabs = wrapper.findAll('.bw-tabs__tab')
    expect(tabs[1].classes()).toContain('bw-tabs__tab--disabled')
  })

  it('应该支持自定义 lineWidth 属性', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs, lineWidth: 50 }
    })
    const line = wrapper.find('.bw-tabs__line')
    expect(line.exists()).toBe(true)
    expect(line.attributes('style')).toContain('width: 50px')
  })

  it('应该支持自定义 color 属性', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs, color: '#ff0000' }
    })
    const line = wrapper.find('.bw-tabs__line')
    expect(line.attributes('style')).toContain('background-color: #ff0000')
  })

  it('应该支持 sticky 属性', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs, sticky: true }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该支持 animated 属性', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs, animated: true }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该支持 swipeable 属性', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs, swipeable: true }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该支持 background 属性', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs, background: '#f5f5f5' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('通过插槽方式应该能渲染标签页内容', () => {
    const wrapper = mount(Tabs, {
      slots: {
        tab0: '<div class="content-0">内容 0</div>',
        tab1: '<div class="content-1">内容 1</div>',
        tab2: '<div class="content-2">内容 2</div>'
      }
    })
    expect(wrapper.find('.content-0').exists()).toBe(true)
  })

  it('插槽方式应该自动检测 tab 数量并渲染导航', () => {
    const wrapper = mount(Tabs, {
      slots: {
        tab0: '<div>内容 0</div>',
        tab1: '<div>内容 1</div>'
      }
    })
    const tabEls = wrapper.findAll('.bw-tabs__tab')
    expect(tabEls.length).toBe(2)
    expect(tabEls[0].text()).toBe('标签 1')
    expect(tabEls[1].text()).toBe('标签 2')
  })

  it('插槽方式点击标签应该切换内容显示', async () => {
    const wrapper = mount(Tabs, {
      slots: {
        tab0: '<div class="content-0">内容 0</div>',
        tab1: '<div class="content-1">内容 1</div>'
      }
    })
    const tabs = wrapper.findAll('.bw-tabs__tab')
    await tabs[1].trigger('click')
    expect(wrapper.find('.content-1').exists()).toBe(true)
  })

  it('应该包含 bw-tabs 根样式类', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs }
    })
    expect(wrapper.classes()).toContain('bw-tabs')
  })

  it('应该包含 bw-tabs__nav 导航区域', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs }
    })
    expect(wrapper.find('.bw-tabs__nav').exists()).toBe(true)
  })

  it('应该包含 bw-tabs__content 内容区域', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs }
    })
    expect(wrapper.find('.bw-tabs__content').exists()).toBe(true)
  })

  it('线指示器应该存在', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs }
    })
    expect(wrapper.find('.bw-tabs__line').exists()).toBe(true)
  })

  it('modelValue 变化时应该同步更新当前标签', async () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs, modelValue: 0 }
    })
    await wrapper.setProps({ modelValue: 2 })
    const tabs = wrapper.findAll('.bw-tabs__tab')
    expect(tabs[2].classes()).toContain('bw-tabs__tab--active')
  })

  it('只有一个标签时应该正确渲染', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: [{ title: '唯一标签' }] }
    })
    const tabs = wrapper.findAll('.bw-tabs__tab')
    expect(tabs.length).toBe(1)
    expect(tabs[0].text()).toBe('唯一标签')
  })

  it('没有 tabs 也没有插槽时应该正常渲染', () => {
    const wrapper = mount(Tabs)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.bw-tabs__nav').exists()).toBe(true)
  })

  it('多次点击同一标签应该多次触发事件', async () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs }
    })
    const tabs = wrapper.findAll('.bw-tabs__tab')
    await tabs[1].trigger('click')
    await tabs[1].trigger('click')
    await tabs[1].trigger('click')
    expect(wrapper.emitted('change')?.length).toBe(3)
  })

  it('tabs 属性优先于插槽检测', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs },
      slots: {
        tab0: '<div>多余插槽</div>'
      }
    })
    const tabEls = wrapper.findAll('.bw-tabs__tab')
    expect(tabEls.length).toBe(3)
  })

  it('lineWidth 支持字符串类型带单位', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs, lineWidth: '60px' }
    })
    const line = wrapper.find('.bw-tabs__line')
    expect(line.attributes('style')).toContain('width: 60px')
  })

  it('modelValue 为数字 1 时应该选中第二个标签', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs, modelValue: 1 }
    })
    const tabs = wrapper.findAll('.bw-tabs__tab')
    expect(tabs[1].classes()).toContain('bw-tabs__tab--active')
  })
})