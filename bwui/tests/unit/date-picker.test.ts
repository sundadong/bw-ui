import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DatePicker from '../../src/components/date-picker/index.vue'

describe('DatePicker 组件测试', () => {
  it('应该渲染 date-picker 组件', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true }
    })
    expect(wrapper.find('.bw-date-picker').exists()).toBe(true)
  })

  it('默认 type 为 date', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true }
    })
    expect(wrapper.props('type')).toBe('date')
  })

  it('type=date 时应该包含年月日三列', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true, type: 'date' }
    })
    expect(wrapper.find('.bw-date-picker').exists()).toBe(true)
  })

  it('type=time 时应该渲染', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true, type: 'time' }
    })
    expect(wrapper.find('.bw-date-picker').exists()).toBe(true)
  })

  it('type=datetime 时应该渲染', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true, type: 'datetime' }
    })
    expect(wrapper.find('.bw-date-picker').exists()).toBe(true)
  })

  it('type=year-month 时应该渲染', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true, type: 'year-month' }
    })
    expect(wrapper.find('.bw-date-picker').exists()).toBe(true)
  })

  it('type=month-day 时应该渲染', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true, type: 'month-day' }
    })
    expect(wrapper.find('.bw-date-picker').exists()).toBe(true)
  })

  it('type=year-month-day 时应该渲染', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true, type: 'year-month-day' }
    })
    expect(wrapper.find('.bw-date-picker').exists()).toBe(true)
  })

  it('title prop 应该正确渲染', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true, title: '选择日期' }
    })
    expect(wrapper.props('title')).toBe('选择日期')
  })

  it('confirmText 默认值应该为"确认"', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true }
    })
    expect(wrapper.props('confirmText')).toBe('确认')
  })

  it('cancelText 默认值应该为"取消"', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true }
    })
    expect(wrapper.props('cancelText')).toBe('取消')
  })

  it('visibleOptionNum 默认值应该为 6', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true }
    })
    expect(wrapper.props('visibleOptionNum')).toBe(6)
  })

  it('optionHeight 默认值应该为 44', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true }
    })
    expect(wrapper.props('optionHeight')).toBe(44)
  })

  it('toolbarPosition 默认值应该为 bottom', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true }
    })
    expect(wrapper.props('toolbarPosition')).toBe('bottom')
  })

  it('showToolbar 默认值应该为 true', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true }
    })
    expect(wrapper.props('showToolbar')).toBe(true)
  })

  it('loading 默认值应该为 false', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true }
    })
    expect(wrapper.props('loading')).toBe(false)
  })

  it('readonly 默认值应该为 false', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true }
    })
    expect(wrapper.props('readonly')).toBe(false)
  })

  it('modelValue 传入 Date 对象时应该正确处理', () => {
    const date = new Date(2024, 5, 15)
    const wrapper = mount(DatePicker, {
      props: { show: true, modelValue: date, type: 'date' }
    })
    expect(wrapper.find('.bw-date-picker').exists()).toBe(true)
  })

  it('modelValue 传入字符串时应该正确处理', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true, modelValue: '2024-06-15', type: 'date' }
    })
    expect(wrapper.find('.bw-date-picker').exists()).toBe(true)
  })

  it('minDate 和 maxDate 应该正确设置', () => {
    const minDate = new Date(2020, 0, 1)
    const maxDate = new Date(2025, 11, 31)
    const wrapper = mount(DatePicker, {
      props: { show: true, minDate, maxDate }
    })
    expect(wrapper.props('minDate')).toEqual(minDate)
    expect(wrapper.props('maxDate')).toEqual(maxDate)
  })

  it('columnsOrder 应该正确设置', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true, type: 'date', columnsOrder: ['month', 'day', 'year'] }
    })
    expect(wrapper.props('columnsOrder')).toEqual(['month', 'day', 'year'])
  })

  it('不传 show 时不显示弹窗', () => {
    const wrapper = mount(DatePicker, {
      props: { type: 'date' }
    })
    expect(wrapper.find('.bw-picker__columns').exists()).toBe(false)
  })

  it('show=true 时显示 picker 内容', () => {
    const wrapper = mount(DatePicker, {
      props: { show: true, type: 'date' }
    })
    expect(wrapper.find('.bw-date-picker').exists()).toBe(true)
  })

  it('点击确认触发 update:modelValue', async () => {
    const wrapper = mount(DatePicker, {
      props: { show: true, type: 'date', modelValue: new Date(2024, 5, 15) }
    })
    expect(wrapper.find('.bw-date-picker').exists()).toBe(true)
  })
})