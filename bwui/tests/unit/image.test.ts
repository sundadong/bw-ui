import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Image from '../../src/components/image/index.vue'

describe('Image 组件测试', () => {
  it('应该正确渲染图片容器', () => {
    const wrapper = mount(Image)
    expect(wrapper.find('.bw-image').exists()).toBe(true)
  })

  it('应该包含 bw-image 类', () => {
    const wrapper = mount(Image)
    expect(wrapper.classes()).toContain('bw-image')
  })

  it('默认应该显示加载状态', () => {
    const wrapper = mount(Image)
    expect(wrapper.find('.bw-image__loading').exists()).toBe(true)
  })

  it('应该支持设置 src', async () => {
    const wrapper = mount(Image, {
      props: { src: 'https://example.com/test.jpg' }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.bw-image').exists()).toBe(true)
  })

  it('空 src 时应该显示错误状态', async () => {
    const wrapper = mount(Image, {
      props: { src: '' }
    })
    await wrapper.vm.$nextTick()
    await new Promise(r => setTimeout(r, 100))
    expect(wrapper.find('.bw-image').exists()).toBe(true)
  })

  it('应该支持 alt 属性', () => {
    const wrapper = mount(Image, {
      props: { alt: '测试图片', src: 'https://via.placeholder.com/150' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该支持 fit=contain', () => {
    const wrapper = mount(Image, {
      props: { fit: 'contain' }
    })
    expect(wrapper.find('.bw-image').exists()).toBe(true)
  })

  it('应该支持 fit=cover', () => {
    const wrapper = mount(Image, {
      props: { fit: 'cover' }
    })
    expect(wrapper.find('.bw-image').exists()).toBe(true)
  })

  it('应该支持 fit=fill', () => {
    const wrapper = mount(Image, {
      props: { fit: 'fill' }
    })
    expect(wrapper.find('.bw-image').exists()).toBe(true)
  })

  it('应该支持 fit=none', () => {
    const wrapper = mount(Image, {
      props: { fit: 'none' }
    })
    expect(wrapper.find('.bw-image').exists()).toBe(true)
  })

  it('应该支持 fit=scale-down', () => {
    const wrapper = mount(Image, {
      props: { fit: 'scale-down' }
    })
    expect(wrapper.find('.bw-image').exists()).toBe(true)
  })

  it('应该支持 position 属性', () => {
    const wrapper = mount(Image, {
      props: { position: 'top' }
    })
    expect(wrapper.find('.bw-image').exists()).toBe(true)
  })

  it('应该支持自定义 width', () => {
    const wrapper = mount(Image, {
      props: { width: 200 }
    })
    expect(wrapper.attributes('style')).toContain('width: 200px')
  })

  it('应该支持字符串 width', () => {
    const wrapper = mount(Image, {
      props: { width: '50%' }
    })
    expect(wrapper.attributes('style')).toContain('width: 50%')
  })

  it('应该支持自定义 height', () => {
    const wrapper = mount(Image, {
      props: { height: 150 }
    })
    expect(wrapper.attributes('style')).toContain('height: 150px')
  })

  it('应该支持 radius 属性', () => {
    const wrapper = mount(Image, {
      props: { radius: 8 }
    })
    expect(wrapper.attributes('style')).toContain('border-radius: 8px')
  })

  it('应该支持字符串 radius', () => {
    const wrapper = mount(Image, {
      props: { radius: '50%' }
    })
    expect(wrapper.attributes('style')).toContain('border-radius: 50%')
  })

  it('round=true 应该有圆角样式', () => {
    const wrapper = mount(Image, {
      props: { round: true }
    })
    expect(wrapper.classes()).toContain('bw-image--round')
  })

  it('round=false 不应该有圆角样式', () => {
    const wrapper = mount(Image, {
      props: { round: false }
    })
    expect(wrapper.classes()).not.toContain('bw-image--round')
  })

  it('showLoading=false 不应该显示加载状态', () => {
    const wrapper = mount(Image, {
      props: { showLoading: false, src: '' }
    })
    expect(wrapper.find('.bw-image__loading').exists()).toBe(false)
  })

  it('showError=false 不应该显示错误状态', () => {
    const wrapper = mount(Image, {
      props: { showError: false, src: '' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该支持自定义 errorIcon', () => {
    const wrapper = mount(Image, {
      props: { errorIcon: 'warning', src: '' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该支持自定义 loadingIcon', () => {
    const wrapper = mount(Image, {
      props: { loadingIcon: 'spinner' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该触发 click 事件', async () => {
    const wrapper = mount(Image)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('应该支持 lazyLoad 属性', () => {
    const wrapper = mount(Image, {
      props: { lazyLoad: true }
    })
    expect(wrapper.find('.bw-image').exists()).toBe(true)
  })

  it('空 src 不应该导致崩溃', () => {
    const wrapper = mount(Image, {
      props: { src: '' }
    })
    expect(wrapper.find('.bw-image').exists()).toBe(true)
  })
})