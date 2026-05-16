import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Icon from '../../src/components/icon/index.vue'

describe('Icon 组件测试', () => {
  it('应该正确渲染图标组件', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该包含 bw-icon 类', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success' }
    })
    expect(wrapper.classes()).toContain('bw-icon')
  })

  it('应该包含 bw-icon--name 类', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success' }
    })
    expect(wrapper.classes()).toContain('bw-icon--success')
  })

  it('应该渲染 success 图标为 ✓', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success' }
    })
    expect(wrapper.text()).toBe('✓')
  })

  it('应该渲染 fail 图标为 ✕', () => {
    const wrapper = mount(Icon, {
      props: { name: 'fail' }
    })
    expect(wrapper.text()).toBe('✕')
  })

  it('应该渲染 warning 图标为 ⚠', () => {
    const wrapper = mount(Icon, {
      props: { name: 'warning' }
    })
    expect(wrapper.text()).toBe('⚠')
  })

  it('应该渲染 info 图标为 ℹ', () => {
    const wrapper = mount(Icon, {
      props: { name: 'info' }
    })
    expect(wrapper.text()).toBe('ℹ')
  })

  it('应该渲染 arrow 图标为 →', () => {
    const wrapper = mount(Icon, {
      props: { name: 'arrow' }
    })
    expect(wrapper.text()).toBe('→')
  })

  it('应该渲染 search 图标为 ⌕', () => {
    const wrapper = mount(Icon, {
      props: { name: 'search' }
    })
    expect(wrapper.text()).toBe('⌕')
  })

  it('应该渲染 star 图标为 ★', () => {
    const wrapper = mount(Icon, {
      props: { name: 'star' }
    })
    expect(wrapper.text()).toBe('★')
  })

  it('应该渲染 heart 图标为 ♥', () => {
    const wrapper = mount(Icon, {
      props: { name: 'heart' }
    })
    expect(wrapper.text()).toBe('♥')
  })

  it('应该渲染 clock 图标为 ⏰', () => {
    const wrapper = mount(Icon, {
      props: { name: 'clock' }
    })
    expect(wrapper.text()).toBe('⏰')
  })

  it('应该渲染 location 图标为 📍', () => {
    const wrapper = mount(Icon, {
      props: { name: 'location' }
    })
    expect(wrapper.text()).toBe('📍')
  })

  it('应该渲染 setting 图标为 ⚙', () => {
    const wrapper = mount(Icon, {
      props: { name: 'setting' }
    })
    expect(wrapper.text()).toBe('⚙')
  })

  it('应该渲染 plus 图标为 +', () => {
    const wrapper = mount(Icon, {
      props: { name: 'plus' }
    })
    expect(wrapper.text()).toBe('+')
  })

  it('应该渲染 minus 图标为 -', () => {
    const wrapper = mount(Icon, {
      props: { name: 'minus' }
    })
    expect(wrapper.text()).toBe('-')
  })

  it('应该渲染 close 图标为 ✕', () => {
    const wrapper = mount(Icon, {
      props: { name: 'close' }
    })
    expect(wrapper.text()).toBe('✕')
  })

  it('图片名称应该渲染 img 元素', () => {
    const wrapper = mount(Icon, {
      props: { name: 'icon.png' }
    })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('.bw-icon__image').exists()).toBe(true)
  })

  it('svg 图片名称应该渲染 img 元素', () => {
    const wrapper = mount(Icon, {
      props: { name: 'icon.svg' }
    })
    expect(wrapper.find('img').exists()).toBe(true)
  })

  it('非图片名称应该渲染 span 元素', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success' }
    })
    expect(wrapper.find('span.bw-icon__text').exists()).toBe(true)
  })

  it('应该应用 size 属性（数字类型）', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success', size: 24 }
    })
    expect(wrapper.attributes('style')).toContain('font-size: 24px')
  })

  it('应该应用 size 属性（字符串类型）', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success', size: '2em' }
    })
    expect(wrapper.attributes('style')).toContain('font-size: 2em')
  })

  it('默认 size 为 inherit 时不设置 font-size', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success' }
    })
    expect(wrapper.attributes('style')).toBeUndefined()
  })

  it('应该应用 color 属性', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success', color: '#ff0000' }
    })
    expect(wrapper.attributes('style')).toContain('color: #ff0000')
  })

  it('默认 color 为 inherit 时不设置 color', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success' }
    })
    expect(wrapper.attributes('style')).toBeUndefined()
  })

  it('应该同时应用 size 和 color', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success', size: 32, color: '#00ff00' }
    })
    expect(wrapper.attributes('style')).toContain('font-size: 32px')
    expect(wrapper.attributes('style')).toContain('color: #00ff00')
  })

  it('未知图标名称应该渲染空字符串', () => {
    const wrapper = mount(Icon, {
      props: { name: 'unknown-icon' }
    })
    expect(wrapper.text()).toBe('')
  })

  it('空名称应该渲染空字符串', () => {
    const wrapper = mount(Icon, {
      props: { name: '' }
    })
    expect(wrapper.text()).toBe('')
  })

  it('应该接受 classPrefix 属性', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success', classPrefix: 'custom' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('图片元素的 src 属性应该正确', () => {
    const wrapper = mount(Icon, {
      props: { name: 'test.jpg' }
    })
    expect(wrapper.find('img').attributes('src')).toBe('test.jpg')
  })

  it('应该渲染为 div 元素', () => {
    const wrapper = mount(Icon, {
      props: { name: 'success' }
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('不同图标的 class 应该不同', () => {
    const wrapper1 = mount(Icon, {
      props: { name: 'success' }
    })
    const wrapper2 = mount(Icon, {
      props: { name: 'warning' }
    })
    expect(wrapper1.classes()).toContain('bw-icon--success')
    expect(wrapper2.classes()).toContain('bw-icon--warning')
  })
})