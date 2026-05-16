import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Navbar from '../../src/components/navbar/index.vue'

describe('Navbar 组件测试', () => {
  it('应该正确渲染 title 文本', () => {
    const wrapper = mount(Navbar, {
      props: { title: '页面标题' }
    })
    expect(wrapper.find('.bw-navbar__title-text').text()).toBe('页面标题')
  })

  it('leftArrow 为 true 时同时 leftText 显示返回箭头和文字', () => {
    const wrapper = mount(Navbar, {
      props: { leftArrow: true, leftText: '返回', title: '标题' }
    })
    expect(wrapper.find('.bw-navbar__arrow').exists()).toBe(true)
    expect(wrapper.find('.bw-navbar__text').exists()).toBe(true)
  })

  it('leftArrow 为 false 时不应该显示返回箭头', () => {
    const wrapper = mount(Navbar, {
      props: { leftArrow: false, title: '标题' }
    })
    expect(wrapper.find('.bw-navbar__arrow').exists()).toBe(false)
  })

  it('leftArrow 为 true 时应该显示返回箭头', () => {
    const wrapper = mount(Navbar, {
      props: { leftArrow: true, title: '标题' }
    })
    expect(wrapper.find('.bw-navbar__arrow').exists()).toBe(true)
  })

  it('leftText 应该显示左侧文字', () => {
    const wrapper = mount(Navbar, {
      props: { leftText: '返回', title: '标题' }
    })
    expect(wrapper.find('.bw-navbar__text').text()).toBe('返回')
  })

  it('fixed 为 true 时应该有固定定位样式', () => {
    const wrapper = mount(Navbar, {
      props: { fixed: true, title: '标题' }
    })
    expect(wrapper.classes()).toContain('bw-navbar--fixed')
  })

  it('fixed 为 false 时不应该有固定定位样式', () => {
    const wrapper = mount(Navbar, {
      props: { fixed: false, title: '标题' }
    })
    expect(wrapper.classes()).not.toContain('bw-navbar--fixed')
  })

  it('safeAreaInsetTop 默认开启，zIndex 样式应正确', () => {
    const wrapper = mount(Navbar, {
      props: { title: '标题' }
    })
    expect(wrapper.attributes('style')).toContain('z-index: 100')
  })

  it('safeAreaInsetTop 为 false 时 zIndex 样式仍应正确', () => {
    const wrapper = mount(Navbar, {
      props: { safeAreaInsetTop: false, title: '标题' }
    })
    expect(wrapper.attributes('style')).toContain('z-index: 100')
  })

  it('点击左侧区域应该触发 clickLeft 事件', async () => {
    const wrapper = mount(Navbar, {
      props: { leftArrow: true, title: '标题' }
    })
    await wrapper.find('.bw-navbar__left').trigger('click')
    expect(wrapper.emitted('clickLeft')).toBeTruthy()
    expect(wrapper.emitted('clickLeft')?.length).toBe(1)
  })

  it('多次点击左侧区域应该多次触发 clickLeft 事件', async () => {
    const wrapper = mount(Navbar, {
      props: { leftArrow: true, title: '标题' }
    })
    const left = wrapper.find('.bw-navbar__left')
    await left.trigger('click')
    await left.trigger('click')
    await left.trigger('click')
    expect(wrapper.emitted('clickLeft')?.length).toBe(3)
  })

  it('没有 leftArrow 和 showBack 时点击左侧仍应触发事件', async () => {
    const wrapper = mount(Navbar, {
      props: { leftText: '返回', title: '标题' }
    })
    await wrapper.find('.bw-navbar__left').trigger('click')
    expect(wrapper.emitted('clickLeft')).toBeTruthy()
  })

  it('应该正确渲染 left 插槽内容', () => {
    const wrapper = mount(Navbar, {
      props: { title: '标题' },
      slots: {
        left: '<span class="custom-left">自定义左侧</span>'
      }
    })
    expect(wrapper.find('.custom-left').exists()).toBe(true)
    expect(wrapper.find('.custom-left').text()).toBe('自定义左侧')
  })

  it('应该正确渲染 title 插槽内容', () => {
    const wrapper = mount(Navbar, {
      props: { title: '默认标题' },
      slots: {
        title: '<span class="custom-title">自定义标题</span>'
      }
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.find('.custom-title').text()).toBe('自定义标题')
    expect(wrapper.find('.bw-navbar__title-text').exists()).toBe(false)
  })

  it('应该正确渲染 right 插槽内容', () => {
    const wrapper = mount(Navbar, {
      props: { title: '标题' },
      slots: {
        right: '<span class="custom-right">右侧按钮</span>'
      }
    })
    expect(wrapper.find('.custom-right').exists()).toBe(true)
    expect(wrapper.find('.custom-right').text()).toBe('右侧按钮')
  })

  it('同时使用 leftArrow 和 leftText 应该都渲染', () => {
    const wrapper = mount(Navbar, {
      props: { leftArrow: true, leftText: '返回', title: '标题' }
    })
    expect(wrapper.find('.bw-navbar__arrow').exists()).toBe(true)
    expect(wrapper.find('.bw-navbar__text').text()).toBe('返回')
  })

  it('同时使用 leftArrow、leftText 和 left 插槽，插槽应优先', () => {
    const wrapper = mount(Navbar, {
      props: { leftArrow: true, leftText: '返回文字', title: '标题' },
      slots: {
        left: '<span class="slot-left">插槽左侧</span>'
      }
    })
    expect(wrapper.find('.slot-left').text()).toBe('插槽左侧')
  })

  it('应该包含 bw-navbar 根样式类', () => {
    const wrapper = mount(Navbar, {
      props: { title: '标题' }
    })
    expect(wrapper.classes()).toContain('bw-navbar')
  })

  it('应该包含 bw-navbar__left 区域', () => {
    const wrapper = mount(Navbar, {
      props: { title: '标题' }
    })
    expect(wrapper.find('.bw-navbar__left').exists()).toBe(true)
  })

  it('应该包含 bw-navbar__title 区域', () => {
    const wrapper = mount(Navbar, {
      props: { title: '标题' }
    })
    expect(wrapper.find('.bw-navbar__title').exists()).toBe(true)
  })

  it('应该包含 bw-navbar__right 区域', () => {
    const wrapper = mount(Navbar, {
      props: { title: '标题' }
    })
    expect(wrapper.find('.bw-navbar__right').exists()).toBe(true)
  })

  it('zIndex 应该应用正确的层级样式', () => {
    const wrapper = mount(Navbar, {
      props: { zIndex: 200, title: '标题' }
    })
    expect(wrapper.attributes('style')).toContain('z-index: 200')
  })

  it('zIndex 支持字符串类型', () => {
    const wrapper = mount(Navbar, {
      props: { zIndex: '150', title: '标题' }
    })
    expect(wrapper.attributes('style')).toContain('z-index: 150')
  })

  it('title 为空时应该正常渲染', () => {
    const wrapper = mount(Navbar)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.bw-navbar__title').exists()).toBe(true)
  })

  it('placeholder 属性应该正常接受', () => {
    const wrapper = mount(Navbar, {
      props: { placeholder: true, title: '标题' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('所有插槽同时使用时应该都正常渲染', () => {
    const wrapper = mount(Navbar, {
      props: { title: '标题' },
      slots: {
        left: '<span class="left-slot">左</span>',
        title: '<span class="title-slot">中</span>',
        right: '<span class="right-slot">右</span>'
      }
    })
    expect(wrapper.find('.left-slot').exists()).toBe(true)
    expect(wrapper.find('.title-slot').exists()).toBe(true)
    expect(wrapper.find('.right-slot').exists()).toBe(true)
  })

  it('leftArrow 为 true 时箭头只渲染一次', () => {
    const wrapper = mount(Navbar, {
      props: { leftArrow: true, title: '标题' }
    })
    const arrows = wrapper.findAll('.bw-navbar__arrow')
    expect(arrows.length).toBe(1)
  })
})