import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Avatar from '../../src/components/avatar/index.vue'

describe('Avatar 组件测试', () => {
  it('应该正确渲染 Avatar 组件', () => {
    const wrapper = mount(Avatar)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-avatar')
  })

  it('默认形状应该是 circle', () => {
    const wrapper = mount(Avatar)
    expect(wrapper.classes()).toContain('bw-avatar--circle')
  })

  it('应该支持 square 形状', () => {
    const wrapper = mount(Avatar, {
      props: { shape: 'square' }
    })
    expect(wrapper.classes()).toContain('bw-avatar--square')
  })

  it('默认尺寸应该是 medium', () => {
    const wrapper = mount(Avatar)
    expect(wrapper.classes()).toContain('bw-avatar--medium')
  })

  it('应该支持 small 尺寸', () => {
    const wrapper = mount(Avatar, {
      props: { size: 'small' }
    })
    expect(wrapper.classes()).toContain('bw-avatar--small')
  })

  it('应该支持 large 尺寸', () => {
    const wrapper = mount(Avatar, {
      props: { size: 'large' }
    })
    expect(wrapper.classes()).toContain('bw-avatar--large')
  })

  it('应该支持自定义数字尺寸', () => {
    const wrapper = mount(Avatar, {
      props: { size: 60 }
    })
    const style = wrapper.attributes('style')
    expect(style).toContain('width: 60px')
    expect(style).toContain('height: 60px')
  })

  it('应该渲染图片', () => {
    const wrapper = mount(Avatar, {
      props: { modelValue: 'https://example.com/avatar.jpg' }
    })
    expect(wrapper.find('.bw-avatar__image').exists()).toBe(true)
  })

  it('图片加载失败时应该显示 fallback', async () => {
    const wrapper = mount(Avatar, {
      props: { modelValue: 'https://example.com/invalid.jpg' }
    })
    const img = wrapper.find('.bw-avatar__image')
    await img.trigger('error')
    expect(wrapper.find('.bw-avatar__fallback').exists()).toBe(true)
  })

  it('图片加载成功时不应该显示 fallback', async () => {
    const wrapper = mount(Avatar, {
      props: { modelValue: 'https://example.com/avatar.jpg' }
    })
    const img = wrapper.find('.bw-avatar__image')
    await img.trigger('load')
    expect(wrapper.find('.bw-avatar__fallback').exists()).toBe(false)
  })

  it('应该触发 error 事件', async () => {
    const wrapper = mount(Avatar, {
      props: { modelValue: 'https://example.com/invalid.jpg' }
    })
    const img = wrapper.find('.bw-avatar__image')
    await img.trigger('error')
    expect(wrapper.emitted('error')).toBeTruthy()
    expect(wrapper.emitted('error')?.length).toBe(1)
  })

  it('应该触发 load 事件', async () => {
    const wrapper = mount(Avatar, {
      props: { modelValue: 'https://example.com/avatar.jpg' }
    })
    const img = wrapper.find('.bw-avatar__image')
    await img.trigger('load')
    expect(wrapper.emitted('load')).toBeTruthy()
    expect(wrapper.emitted('load')?.length).toBe(1)
  })

  it('无图片时应该显示 fallback', () => {
    const wrapper = mount(Avatar)
    expect(wrapper.find('.bw-avatar__fallback').exists()).toBe(true)
  })

  it('应该渲染 icon', () => {
    const wrapper = mount(Avatar, {
      props: { icon: 'user' }
    })
    expect(wrapper.find('.bw-avatar__fallback').exists()).toBe(true)
  })

  it('应该正确设置 alt 属性', () => {
    const wrapper = mount(Avatar, {
      props: { modelValue: 'test.jpg', alt: '用户头像' }
    })
    const img = wrapper.find('.bw-avatar__image')
    expect(img.attributes('alt')).toBe('用户头像')
  })

  it('应该支持 fit 属性', () => {
    const wrapper = mount(Avatar, {
      props: { modelValue: 'test.jpg', fit: 'contain' }
    })
    const img = wrapper.find('.bw-avatar__image')
    expect(img.attributes('style')).toContain('object-fit: contain')
  })

  it('默认 fit 应该是 cover', () => {
    const wrapper = mount(Avatar, {
      props: { modelValue: 'test.jpg' }
    })
    const img = wrapper.find('.bw-avatar__image')
    expect(img.attributes('style')).toContain('object-fit: cover')
  })

  it('应该支持 color 属性', () => {
    const wrapper = mount(Avatar, {
      props: { color: '#ff0000' }
    })
    expect(wrapper.attributes('style')).toContain('color: #ff0000')
  })

  it('应该支持 background 属性', () => {
    const wrapper = mount(Avatar, {
      props: { background: '#1989fa' }
    })
    expect(wrapper.attributes('style')).toContain('background-color: #1989fa')
  })

  it('应该渲染 badge', () => {
    const wrapper = mount(Avatar, {
      props: { badge: '5' }
    })
    expect(wrapper.find('.bw-avatar__badge').exists()).toBe(true)
  })

  it('badge 为 0 时应该渲染', () => {
    const wrapper = mount(Avatar, {
      props: { badge: 0 }
    })
    expect(wrapper.find('.bw-avatar__badge').exists()).toBe(true)
  })

  it('应该渲染 dot', () => {
    const wrapper = mount(Avatar, {
      props: { dot: true }
    })
    expect(wrapper.find('.bw-avatar__badge').exists()).toBe(true)
  })

  it('无 badge 和 dot 时不应该渲染 badge', () => {
    const wrapper = mount(Avatar)
    expect(wrapper.find('.bw-avatar__badge').exists()).toBe(false)
  })

  it('应该支持默认插槽作为 fallback', () => {
    const wrapper = mount(Avatar, {
      slots: { default: '<span class="custom-fallback">A</span>' }
    })
    expect(wrapper.find('.custom-fallback').exists()).toBe(true)
  })
})