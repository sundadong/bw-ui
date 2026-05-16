import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from '../../src/components/card/index.vue'

describe('Card 组件测试', () => {
  it('应该正确渲染 Card 组件', () => {
    const wrapper = mount(Card)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-card')
  })

  it('默认应该有 border 类', () => {
    const wrapper = mount(Card)
    expect(wrapper.classes()).toContain('bw-card--border')
  })

  it('border 为 false 时不应该有 border 类', () => {
    const wrapper = mount(Card, {
      props: { border: false }
    })
    expect(wrapper.classes()).not.toContain('bw-card--border')
  })

  it('应该正确渲染 title', () => {
    const wrapper = mount(Card, {
      props: { title: '商品标题' }
    })
    expect(wrapper.text()).toContain('商品标题')
  })

  it('应该正确渲染 desc', () => {
    const wrapper = mount(Card, {
      props: { desc: '商品描述信息' }
    })
    expect(wrapper.text()).toContain('商品描述信息')
  })

  it('应该正确渲染 price', () => {
    const wrapper = mount(Card, {
      props: { price: 99.99 }
    })
    expect(wrapper.text()).toContain('99.99')
  })

  it('应该正确渲染 originPrice', () => {
    const wrapper = mount(Card, {
      props: { price: 50, originPrice: 100 }
    })
    expect(wrapper.text()).toContain('100.00')
  })

  it('应该正确渲染 num', () => {
    const wrapper = mount(Card, {
      props: { num: 3 }
    })
    expect(wrapper.text()).toContain('x3')
  })

  it('num 为 0 时应该渲染', () => {
    const wrapper = mount(Card, {
      props: { num: 0 }
    })
    expect(wrapper.text()).toContain('x0')
  })

  it('price 为 0 时应该渲染', () => {
    const wrapper = mount(Card, {
      props: { price: 0 }
    })
    expect(wrapper.text()).toContain('0.00')
  })

  it('originPrice 为 0 时应该渲染', () => {
    const wrapper = mount(Card, {
      props: { price: 10, originPrice: 0 }
    })
    expect(wrapper.text()).toContain('0.00')
  })

  it('默认货币符号应该是 ¥', () => {
    const wrapper = mount(Card, {
      props: { price: 100 }
    })
    expect(wrapper.text()).toContain('¥')
  })

  it('应该支持自定义 currency', () => {
    const wrapper = mount(Card, {
      props: { price: 100, currency: '$' }
    })
    expect(wrapper.text()).toContain('$')
  })

  it('应该渲染 thumb 图片', () => {
    const wrapper = mount(Card, {
      props: { thumb: 'https://example.com/image.jpg' }
    })
    expect(wrapper.find('.bw-card__thumb-image').exists()).toBe(true)
  })

  it('无 thumb 时应该渲染 thumb 插槽', () => {
    const wrapper = mount(Card, {
      slots: { thumb: '<div class="custom-thumb">自定义缩略图</div>' }
    })
    expect(wrapper.find('.custom-thumb').exists()).toBe(true)
  })

  it('应该渲染 tag', () => {
    const wrapper = mount(Card, {
      props: { tag: '热卖' }
    })
    expect(wrapper.find('.bw-card__tag').exists()).toBe(true)
  })

  it('应该支持 lazyLoad', () => {
    const wrapper = mount(Card, {
      props: { thumb: 'https://example.com/image.jpg', lazyLoad: true }
    })
    const img = wrapper.find('.bw-card__thumb-image')
    expect(img.attributes('loading')).toBe('lazy')
  })

  it('lazyLoad 为 false 时不应设置 loading 属性', () => {
    const wrapper = mount(Card, {
      props: { thumb: 'https://example.com/image.jpg', lazyLoad: false }
    })
    const img = wrapper.find('.bw-card__thumb-image')
    expect(img.attributes('loading')).toBeUndefined()
  })

  it('点击 Card 应该触发 click 事件', async () => {
    const wrapper = mount(Card, {
      props: { title: '商品' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })

  it('应该支持 title 插槽', () => {
    const wrapper = mount(Card, {
      slots: { title: '<span class="custom-title">自定义标题</span>' }
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.text()).toContain('自定义标题')
  })

  it('应该支持 desc 插槽', () => {
    const wrapper = mount(Card, {
      slots: { desc: '<span class="custom-desc">自定义描述</span>' }
    })
    expect(wrapper.find('.custom-desc').exists()).toBe(true)
  })

  it('应该支持 num 插槽', () => {
    const wrapper = mount(Card, {
      slots: { num: '<span class="custom-num">x10</span>' }
    })
    expect(wrapper.find('.custom-num').exists()).toBe(true)
  })

  it('应该支持 tag 插槽', () => {
    const wrapper = mount(Card, {
      slots: { tag: '<span class="custom-tag">自定义标签</span>' }
    })
    expect(wrapper.find('.custom-tag').exists()).toBe(true)
  })

  it('应该支持 footer 插槽', () => {
    const wrapper = mount(Card, {
      slots: { footer: '<button class="footer-btn">购买</button>' }
    })
    expect(wrapper.find('.footer-btn').exists()).toBe(true)
  })

  it('应该支持 bottom 插槽', () => {
    const wrapper = mount(Card, {
      slots: { bottom: '<div class="bottom-content">底部内容</div>' }
    })
    expect(wrapper.find('.bottom-content').exists()).toBe(true)
  })
})