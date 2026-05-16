import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NoticeBar from '../../src/components/notice-bar/index.vue'

describe('NoticeBar 组件测试', () => {
  it('应该正确渲染通知栏', () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '测试通知' }
    })
    expect(wrapper.find('.bw-notice-bar').exists()).toBe(true)
  })

  it('应该包含 bw-notice-bar 类', () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '测试通知' }
    })
    expect(wrapper.classes()).toContain('bw-notice-bar')
  })

  it('应该显示通知文本', () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '这是一条通知消息' }
    })
    expect(wrapper.find('.bw-notice-bar__text').text()).toBe('这是一条通知消息')
  })

  it('应该显示空文本', () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '' }
    })
    expect(wrapper.find('.bw-notice-bar__text').text()).toBe('')
  })

  it('默认应该显示左侧图标', () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '通知' }
    })
    expect(wrapper.find('.bw-notice-bar__left-icon').exists()).toBe(true)
  })

  it('应该支持自定义左侧图标', () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '通知', leftIcon: 'info' }
    })
    expect(wrapper.find('.bw-notice-bar__left-icon').exists()).toBe(true)
  })

  it('mode=closeable 时应该显示关闭图标', () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '通知', mode: 'closeable' }
    })
    expect(wrapper.find('.bw-notice-bar__right-icon').exists()).toBe(true)
  })

  it('mode=link 时应该显示箭头图标', () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '通知', mode: 'link' }
    })
    expect(wrapper.find('.bw-notice-bar__right-icon').exists()).toBe(true)
  })

  it('mode 为空时不应该显示右侧图标', () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '通知', mode: '', leftIcon: '' }
    })
    expect(wrapper.find('.bw-notice-bar__right-icon').exists()).toBe(false)
  })

  it('应该支持自定义颜色', () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '通知', color: '#1989fa' }
    })
    expect(wrapper.attributes('style')).toContain('color: #1989fa')
  })

  it('应该支持自定义背景色', () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '通知', background: '#e8f3ff' }
    })
    expect(wrapper.attributes('style')).toContain('background-color: #e8f3ff')
  })

  it('wrapable=true 应该有换行样式', () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '通知', wrapable: true }
    })
    expect(wrapper.classes()).toContain('bw-notice-bar--wrapable')
  })

  it('wrapable=false 不应该有换行样式', () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '通知', wrapable: false }
    })
    expect(wrapper.classes()).not.toContain('bw-notice-bar--wrapable')
  })

  it('scrollable=true 时内容应该可滚动', () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '通知', scrollable: true }
    })
    expect(wrapper.find('.bw-notice-bar__content--scrollable').exists()).toBe(true)
  })

  it('scrollable=false 时内容不应该可滚动', () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '通知', scrollable: false }
    })
    expect(wrapper.find('.bw-notice-bar__content--scrollable').exists()).toBe(false)
  })

  it('wrapable=true 时不应该有可滚动样式', () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '通知', wrapable: true, scrollable: true }
    })
    expect(wrapper.find('.bw-notice-bar__content--scrollable').exists()).toBe(false)
  })

  it('应该支持 delay 属性', () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '通知', delay: 2 }
    })
    expect(wrapper.find('.bw-notice-bar').exists()).toBe(true)
  })

  it('应该支持 speed 属性', () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '通知', speed: 60 }
    })
    expect(wrapper.find('.bw-notice-bar').exists()).toBe(true)
  })

  it('点击事件应该正常工作', async () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '通知' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('关闭时应该触发 close 事件', async () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '通知', mode: 'closeable' }
    })
    const closeIcon = wrapper.find('.bw-notice-bar__close-icon')
    await closeIcon.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('关闭时应该触发 update:modelValue 事件', async () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '通知', mode: 'closeable' }
    })
    const closeIcon = wrapper.find('.bw-notice-bar__close-icon')
    await closeIcon.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('应该支持 rightIcon 属性', () => {
    const wrapper = mount(NoticeBar, {
      props: { modelValue: '通知', mode: '', rightIcon: 'info' }
    })
    expect(wrapper.find('.bw-notice-bar__right-icon').exists()).toBe(true)
  })

  it('超长文本不应该导致崩溃', () => {
    const longText = 'A'.repeat(500)
    const wrapper = mount(NoticeBar, {
      props: { modelValue: longText }
    })
    expect(wrapper.find('.bw-notice-bar').exists()).toBe(true)
  })
})