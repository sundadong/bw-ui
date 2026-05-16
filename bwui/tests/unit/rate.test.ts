import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Rate from '../../src/components/rate/index.vue'

describe('Rate 组件测试', () => {
  it('应该正确渲染评分组件', () => {
    const wrapper = mount(Rate)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-rate')
  })

  it('默认应该渲染 5 个星星', () => {
    const wrapper = mount(Rate)
    const items = wrapper.findAll('.bw-rate__item')
    expect(items.length).toBe(5)
  })

  it('count 属性应该控制星星数量', () => {
    const wrapper = mount(Rate, {
      props: { count: 10 }
    })
    const items = wrapper.findAll('.bw-rate__item')
    expect(items.length).toBe(10)
  })

  it('count 为 3 时渲染 3 个星星', () => {
    const wrapper = mount(Rate, {
      props: { count: 3 }
    })
    expect(wrapper.findAll('.bw-rate__item').length).toBe(3)
  })

  it('modelValue 默认值为 0', () => {
    const wrapper = mount(Rate)
    const voidIcons = wrapper.findAll('.bw-rate__icon--void')
    expect(voidIcons.length).toBe(5)
  })

  it('modelValue 为 3 时应该显示 3 个完整星星', () => {
    const wrapper = mount(Rate, {
      props: { modelValue: 3 }
    })
    const fullIcons = wrapper.findAll('.bw-rate__icon--full')
    expect(fullIcons.length).toBe(3)
  })

  it('modelValue 为 5 时应该显示 5 个完整星星', () => {
    const wrapper = mount(Rate, {
      props: { modelValue: 5 }
    })
    const fullIcons = wrapper.findAll('.bw-rate__icon--full')
    expect(fullIcons.length).toBe(5)
  })

  it('modelValue 超出 count 时只显示 count 个完整星星', () => {
    const wrapper = mount(Rate, {
      props: { modelValue: 10, count: 5 }
    })
    const fullIcons = wrapper.findAll('.bw-rate__icon--full')
    expect(fullIcons.length).toBe(5)
  })

  it('点击星星应该触发 update:modelValue 事件', async () => {
    const wrapper = mount(Rate, {
      props: { modelValue: 0 }
    })
    const firstStar = wrapper.findAll('.bw-rate__item')[0]
    await firstStar.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1])
  })

  it('点击第三颗星星应该触发值为 3', async () => {
    const wrapper = mount(Rate, {
      props: { modelValue: 0 }
    })
    const stars = wrapper.findAll('.bw-rate__item')
    await stars[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3])
  })

  it('点击星星应该触发 change 事件', async () => {
    const wrapper = mount(Rate, {
      props: { modelValue: 0 }
    })
    const firstStar = wrapper.findAll('.bw-rate__item')[0]
    await firstStar.trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]).toEqual([1])
  })

  it('disabled 为 true 时应该添加禁用样式类', () => {
    const wrapper = mount(Rate, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('bw-rate--disabled')
  })

  it('disabled 状态下点击不应该触发事件', async () => {
    const wrapper = mount(Rate, {
      props: { modelValue: 0, disabled: true }
    })
    const firstStar = wrapper.findAll('.bw-rate__item')[0]
    await firstStar.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()
  })

  it('readonly 为 true 时应该添加只读样式类', () => {
    const wrapper = mount(Rate, {
      props: { readonly: true }
    })
    expect(wrapper.classes()).toContain('bw-rate--readonly')
  })

  it('readonly 状态下点击不应该触发事件', async () => {
    const wrapper = mount(Rate, {
      props: { modelValue: 0, readonly: true }
    })
    const firstStar = wrapper.findAll('.bw-rate__item')[0]
    await firstStar.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()
  })

  it('color 应该应用到已选中星星的颜色', () => {
    const wrapper = mount(Rate, {
      props: { modelValue: 1, color: '#ff0000' }
    })
    const firstItem = wrapper.findAll('.bw-rate__item')[0]
    expect(firstItem.attributes('style')).toContain('#ff0000')
  })

  it('voidColor 应该应用到未选中星星的颜色', () => {
    const wrapper = mount(Rate, {
      props: { modelValue: 0, voidColor: '#dddddd' }
    })
    const lastItem = wrapper.findAll('.bw-rate__item')[4]
    expect(lastItem.attributes('style')).toContain('#dddddd')
  })

  it('size 数值应该转换为 px', () => {
    const wrapper = mount(Rate, {
      props: { size: 24 }
    })
    const firstItem = wrapper.findAll('.bw-rate__item')[0]
    expect(firstItem.attributes('style')).toContain('font-size: 24px')
  })

  it('size 字符串值应该直接使用', () => {
    const wrapper = mount(Rate, {
      props: { size: '30px' }
    })
    const firstItem = wrapper.findAll('.bw-rate__item')[0]
    expect(firstItem.attributes('style')).toContain('font-size: 30px')
  })

  it('gutter 数值应该转换为 px', () => {
    const wrapper = mount(Rate, {
      props: { gutter: 8 }
    })
    const firstItem = wrapper.findAll('.bw-rate__item')[0]
    expect(firstItem.attributes('style')).toContain('margin-right: 8px')
  })

  it('allowHalf 为 true 时 item 应该有 allow-half 类', () => {
    const wrapper = mount(Rate, {
      props: { allowHalf: true }
    })
    const firstItem = wrapper.findAll('.bw-rate__item')[0]
    expect(firstItem.classes()).toContain('bw-rate__item--allow-half')
  })

  it('allowHalf 为 true 且 modelValue 为 2.5 时应该显示半星', () => {
    const wrapper = mount(Rate, {
      props: { modelValue: 2.5, allowHalf: true }
    })
    const halfIcons = wrapper.findAll('.bw-rate__icon--half')
    expect(halfIcons.length).toBe(1)
  })

  it('allowHalf 为 true 且 modelValue 为整数时不显示半星', () => {
    const wrapper = mount(Rate, {
      props: { modelValue: 3, allowHalf: true }
    })
    const halfIcons = wrapper.findAll('.bw-rate__icon--half')
    expect(halfIcons.length).toBe(0)
  })

  it('默认值测试 - modelValue 默认 0', () => {
    const wrapper = mount(Rate)
    const fullIcons = wrapper.findAll('.bw-rate__icon--full')
    expect(fullIcons.length).toBe(0)
  })

  it('默认值测试 - count 默认 5', () => {
    const wrapper = mount(Rate)
    expect(wrapper.findAll('.bw-rate__item').length).toBe(5)
  })

  it('默认值测试 - disabled 默认 false', () => {
    const wrapper = mount(Rate)
    expect(wrapper.classes()).not.toContain('bw-rate--disabled')
  })

  it('默认值测试 - readonly 默认 false', () => {
    const wrapper = mount(Rate)
    expect(wrapper.classes()).not.toContain('bw-rate--readonly')
  })

  it('默认值测试 - allowHalf 默认 false', () => {
    const wrapper = mount(Rate)
    const firstItem = wrapper.findAll('.bw-rate__item')[0]
    expect(firstItem.classes()).not.toContain('bw-rate__item--allow-half')
  })

  it('组合属性 - disabled 和 readonly 同时启用', () => {
    const wrapper = mount(Rate, {
      props: { modelValue: 3, disabled: true, readonly: true }
    })
    expect(wrapper.classes()).toContain('bw-rate--disabled')
    expect(wrapper.classes()).toContain('bw-rate--readonly')
    const fullIcons = wrapper.findAll('.bw-rate__icon--full')
    expect(fullIcons.length).toBe(3)
  })

  it('组合属性 - allowHalf 且 modelValue 为小数', () => {
    const wrapper = mount(Rate, {
      props: { modelValue: 3.5, allowHalf: true, count: 5 }
    })
    const fullIcons = wrapper.findAll('.bw-rate__icon--full')
    const halfIcons = wrapper.findAll('.bw-rate__icon--half')
    expect(fullIcons.length).toBe(3)
    expect(halfIcons.length).toBe(1)
  })
})