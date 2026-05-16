import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Empty from '../../src/components/empty/index.vue'

describe('Empty 组件测试', () => {
  it('应该正确渲染空状态组件', () => {
    const wrapper = mount(Empty)
    expect(wrapper.exists()).toBe(true)
  })

  it('应该包含 bw-empty 类', () => {
    const wrapper = mount(Empty)
    expect(wrapper.classes()).toContain('bw-empty')
  })

  it('默认描述文本应该为"暂无数据"', () => {
    const wrapper = mount(Empty)
    expect(wrapper.find('.bw-empty__description').text()).toBe('暂无数据')
  })

  it('默认类型 empty 应该显示 📭 图标', () => {
    const wrapper = mount(Empty)
    expect(wrapper.find('.bw-empty__icon').text()).toBe('📭')
  })

  it('error 类型应该显示 ⚠ 图标', () => {
    const wrapper = mount(Empty, {
      props: { type: 'error' }
    })
    expect(wrapper.find('.bw-empty__icon').text()).toBe('⚠')
  })

  it('network 类型应该显示 📡 图标', () => {
    const wrapper = mount(Empty, {
      props: { type: 'network' }
    })
    expect(wrapper.find('.bw-empty__icon').text()).toBe('📡')
  })

  it('应该支持自定义 description 属性', () => {
    const wrapper = mount(Empty, {
      props: { description: '没有找到相关内容' }
    })
    expect(wrapper.find('.bw-empty__description').text()).toBe('没有找到相关内容')
  })

  it('应该支持自定义 image 属性', () => {
    const wrapper = mount(Empty, {
      props: { image: 'https://example.com/empty.png' }
    })
    const img = wrapper.find('.bw-empty__image-img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/empty.png')
  })

  it('无 image 属性时应该显示默认图标', () => {
    const wrapper = mount(Empty)
    expect(wrapper.find('.bw-empty__image-img').exists()).toBe(false)
    expect(wrapper.find('.bw-empty__image-default').exists()).toBe(true)
  })

  it('默认插槽应该渲染 footer 区域', () => {
    const wrapper = mount(Empty, {
      slots: { default: '<button>重试</button>' }
    })
    expect(wrapper.find('.bw-empty__footer').exists()).toBe(true)
    expect(wrapper.find('.bw-empty__footer button').text()).toBe('重试')
  })

  it('无默认插槽时不应渲染 footer 区域', () => {
    const wrapper = mount(Empty)
    expect(wrapper.find('.bw-empty__footer').exists()).toBe(false)
  })

  it('description 插槽应该覆盖 description 属性', () => {
    const wrapper = mount(Empty, {
      props: { description: '默认描述' },
      slots: { description: '<span>自定义描述内容</span>' }
    })
    expect(wrapper.find('.bw-empty__description').text()).toBe('自定义描述内容')
  })

  it('description 插槽支持 HTML 内容', () => {
    const wrapper = mount(Empty, {
      slots: { description: '<strong>加粗描述</strong>' }
    })
    expect(wrapper.find('.bw-empty__description strong').exists()).toBe(true)
  })

  it('空字符串 description 应该正常渲染', () => {
    const wrapper = mount(Empty, {
      props: { description: '' }
    })
    expect(wrapper.find('.bw-empty__description').text()).toBe('')
  })

  it('未知 type 应该回退到 empty 图标', () => {
    const wrapper = mount(Empty, {
      props: { type: 'unknown' as any }
    })
    expect(wrapper.find('.bw-empty__icon').text()).toBe('📭')
  })

  it('image 和 type 同时设置时 image 优先', () => {
    const wrapper = mount(Empty, {
      props: { image: 'https://example.com/img.png', type: 'error' }
    })
    expect(wrapper.find('.bw-empty__image-img').exists()).toBe(true)
    expect(wrapper.find('.bw-empty__image-default').exists()).toBe(false)
  })

  it('应该包含 bw-empty__image 区域', () => {
    const wrapper = mount(Empty)
    expect(wrapper.find('.bw-empty__image').exists()).toBe(true)
  })

  it('应该包含 bw-empty__description 区域', () => {
    const wrapper = mount(Empty)
    expect(wrapper.find('.bw-empty__description').exists()).toBe(true)
  })

  it('应该渲染为 div 元素', () => {
    const wrapper = mount(Empty)
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('所有类型组合应该正常工作', () => {
    const wrapper = mount(Empty, {
      props: { type: 'network', description: '网络连接失败' },
      slots: { default: '<button>重新连接</button>' }
    })
    expect(wrapper.find('.bw-empty__icon').text()).toBe('📡')
    expect(wrapper.find('.bw-empty__description').text()).toBe('网络连接失败')
    expect(wrapper.find('.bw-empty__footer').exists()).toBe(true)
  })

  it('description 插槽和默认插槽同时使用应该正常', () => {
    const wrapper = mount(Empty, {
      slots: {
        description: '<em>自定义描述</em>',
        default: '<button>操作按钮</button>'
      }
    })
    expect(wrapper.find('.bw-empty__description em').exists()).toBe(true)
    expect(wrapper.find('.bw-empty__footer button').exists()).toBe(true)
  })
})