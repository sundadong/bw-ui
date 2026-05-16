import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Skeleton from '../../src/components/skeleton/index.vue'

describe('Skeleton 组件测试', () => {
  it('应该正确渲染骨架屏', () => {
    const wrapper = mount(Skeleton)
    expect(wrapper.find('.bw-skeleton').exists()).toBe(true)
  })

  it('应该包含 bw-skeleton 类', () => {
    const wrapper = mount(Skeleton)
    expect(wrapper.classes()).toContain('bw-skeleton')
  })

  it('默认应该渲染3行占位', () => {
    const wrapper = mount(Skeleton)
    const rows = wrapper.findAll('.bw-skeleton__row')
    expect(rows.length).toBe(3)
  })

  it('应该支持自定义行数', () => {
    const wrapper = mount(Skeleton, {
      props: { row: 5 }
    })
    const rows = wrapper.findAll('.bw-skeleton__row')
    expect(rows.length).toBe(5)
  })

  it('row=0 时不应该渲染任何行', () => {
    const wrapper = mount(Skeleton, {
      props: { row: 0 }
    })
    const rows = wrapper.findAll('.bw-skeleton__row')
    expect(rows.length).toBe(0)
  })

  it('row=1 时应该渲染1行', () => {
    const wrapper = mount(Skeleton, {
      props: { row: 1 }
    })
    const rows = wrapper.findAll('.bw-skeleton__row')
    expect(rows.length).toBe(1)
  })

  it('默认应该显示动画效果', () => {
    const wrapper = mount(Skeleton)
    expect(wrapper.classes()).toContain('bw-skeleton--animate')
  })

  it('应该支持关闭动画效果', () => {
    const wrapper = mount(Skeleton, {
      props: { animate: false }
    })
    expect(wrapper.classes()).not.toContain('bw-skeleton--animate')
  })

  it('应该支持显示标题', () => {
    const wrapper = mount(Skeleton, {
      props: { title: true }
    })
    expect(wrapper.find('.bw-skeleton__title').exists()).toBe(true)
  })

  it('默认不应该显示标题', () => {
    const wrapper = mount(Skeleton)
    expect(wrapper.find('.bw-skeleton__title').exists()).toBe(false)
  })

  it('应该支持自定义标题宽度', () => {
    const wrapper = mount(Skeleton, {
      props: { title: true, titleWidth: '60%' }
    })
    const title = wrapper.find('.bw-skeleton__title')
    expect(title.attributes('style')).toContain('width: 60%')
  })

  it('应该支持数字类型的标题宽度', () => {
    const wrapper = mount(Skeleton, {
      props: { title: true, titleWidth: 200 }
    })
    const title = wrapper.find('.bw-skeleton__title')
    expect(title.attributes('style')).toContain('width: 200px')
  })

  it('应该支持显示头像', () => {
    const wrapper = mount(Skeleton, {
      props: { avatar: true }
    })
    expect(wrapper.find('.bw-skeleton__avatar').exists()).toBe(true)
  })

  it('默认头像形状为 round', () => {
    const wrapper = mount(Skeleton, {
      props: { avatar: true }
    })
    expect(wrapper.find('.bw-skeleton__avatar--round').exists()).toBe(true)
  })

  it('应该支持方形头像', () => {
    const wrapper = mount(Skeleton, {
      props: { avatar: true, avatarShape: 'square' }
    })
    expect(wrapper.find('.bw-skeleton__avatar--square').exists()).toBe(true)
  })

  it('应该支持自定义头像尺寸', () => {
    const wrapper = mount(Skeleton, {
      props: { avatar: true, avatarSize: 48 }
    })
    const avatar = wrapper.find('.bw-skeleton__avatar')
    expect(avatar.attributes('style')).toContain('width: 48px')
    expect(avatar.attributes('style')).toContain('height: 48px')
  })

  it('应该支持字符串类型的头像尺寸', () => {
    const wrapper = mount(Skeleton, {
      props: { avatar: true, avatarSize: '3rem' }
    })
    const avatar = wrapper.find('.bw-skeleton__avatar')
    expect(avatar.attributes('style')).toContain('width: 3rem')
    expect(avatar.attributes('style')).toContain('height: 3rem')
  })

  it('应该支持自定义行宽数组', () => {
    const wrapper = mount(Skeleton, {
      props: { row: 3, rowWidth: ['80%', '60%', '40%'] }
    })
    const rows = wrapper.findAll('.bw-skeleton__row')
    expect(rows[0].attributes('style')).toContain('width: 80%')
    expect(rows[1].attributes('style')).toContain('width: 60%')
    expect(rows[2].attributes('style')).toContain('width: 40%')
  })

  it('应该支持数字类型的行宽', () => {
    const wrapper = mount(Skeleton, {
      props: { row: 2, rowWidth: [200, 150] }
    })
    const rows = wrapper.findAll('.bw-skeleton__row')
    expect(rows[0].attributes('style')).toContain('width: 200px')
    expect(rows[1].attributes('style')).toContain('width: 150px')
  })

  it('最后一行默认宽度应为60%', () => {
    const wrapper = mount(Skeleton, {
      props: { row: 3 }
    })
    const rows = wrapper.findAll('.bw-skeleton__row')
    expect(rows[2].attributes('style')).toContain('width: 60%')
  })

  it('loading=false 时应该显示插槽内容', () => {
    const wrapper = mount(Skeleton, {
      props: { loading: false },
      slots: { default: '<div class="loaded-content">已加载内容</div>' }
    })
    expect(wrapper.find('.bw-skeleton').exists()).toBe(false)
    expect(wrapper.find('.loaded-content').exists()).toBe(true)
  })

  it('loading=true 时不应该显示插槽内容', () => {
    const wrapper = mount(Skeleton, {
      props: { loading: true },
      slots: { default: '<div class="loaded-content">已加载内容</div>' }
    })
    expect(wrapper.find('.bw-skeleton').exists()).toBe(true)
    expect(wrapper.find('.loaded-content').exists()).toBe(false)
  })

  it('round=true 时行元素应该有圆角样式', () => {
    const wrapper = mount(Skeleton, {
      props: { round: true }
    })
    const rows = wrapper.findAll('.bw-skeleton__row')
    rows.forEach(row => {
      expect(row.classes()).toContain('bw-skeleton__row--round')
    })
  })

  it('round=false 时行元素不应该有圆角样式', () => {
    const wrapper = mount(Skeleton, {
      props: { round: false }
    })
    const rows = wrapper.findAll('.bw-skeleton__row')
    rows.forEach(row => {
      expect(row.classes()).not.toContain('bw-skeleton__row--round')
    })
  })

  it('应该同时支持标题和头像', () => {
    const wrapper = mount(Skeleton, {
      props: { title: true, avatar: true }
    })
    expect(wrapper.find('.bw-skeleton__title').exists()).toBe(true)
    expect(wrapper.find('.bw-skeleton__avatar').exists()).toBe(true)
  })

  it('无 props 传入时应该使用默认值', () => {
    const wrapper = mount(Skeleton)
    expect(wrapper.find('.bw-skeleton').exists()).toBe(true)
    expect(wrapper.findAll('.bw-skeleton__row').length).toBe(3)
  })
})