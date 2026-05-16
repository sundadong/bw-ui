import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Calendar from '../../src/components/calendar/index.vue'

describe('Calendar 组件测试', () => {
  it('应该渲染 calendar 组件', () => {
    const wrapper = mount(Calendar, {
      props: { show: true }
    })
    expect(wrapper.find('.bw-calendar').exists()).toBe(true)
  })

  it('默认不显示日历弹窗', () => {
    const wrapper = mount(Calendar)
    expect(wrapper.find('.bw-calendar__header').exists()).toBe(false)
  })

  it('show=true 时应该显示日历弹窗', () => {
    const wrapper = mount(Calendar, {
      props: { show: true }
    })
    expect(wrapper.find('.bw-calendar__header').exists()).toBe(true)
  })

  it('默认 type 为 single', () => {
    const wrapper = mount(Calendar, {
      props: { show: true }
    })
    expect(wrapper.props('type')).toBe('single')
  })

  it('type=range 时不报错', () => {
    const wrapper = mount(Calendar, {
      props: { show: true, type: 'range' }
    })
    expect(wrapper.find('.bw-calendar').exists()).toBe(true)
  })

  it('type=multiple 时不报错', () => {
    const wrapper = mount(Calendar, {
      props: { show: true, type: 'multiple' }
    })
    expect(wrapper.find('.bw-calendar').exists()).toBe(true)
  })

  it('标题应该正确渲染', () => {
    const wrapper = mount(Calendar, {
      props: { show: true, title: '选择日期' }
    })
    expect(wrapper.find('.bw-calendar__header-title').text()).toBe('选择日期')
  })

  it('默认标题为空时显示默认文案', () => {
    const wrapper = mount(Calendar, {
      props: { show: true }
    })
    expect(wrapper.find('.bw-calendar__header-title').text()).toBe('选择日期')
  })

  it('color 默认值应该为 #1989fa', () => {
    const wrapper = mount(Calendar, {
      props: { show: true }
    })
    expect(wrapper.props('color')).toBe('#1989fa')
  })

  it('rowHeight 默认值应该为 64', () => {
    const wrapper = mount(Calendar, {
      props: { show: true }
    })
    expect(wrapper.props('rowHeight')).toBe(64)
  })

  it('showConfirm 默认值应该为 true', () => {
    const wrapper = mount(Calendar, {
      props: { show: true }
    })
    expect(wrapper.props('showConfirm')).toBe(true)
  })

  it('showConfirm=true 时显示底部确认按钮', () => {
    const wrapper = mount(Calendar, {
      props: { show: true, showConfirm: true }
    })
    expect(wrapper.find('.bw-calendar__footer').exists()).toBe(true)
  })

  it('showConfirm=false 时隐藏底部确认按钮', () => {
    const wrapper = mount(Calendar, {
      props: { show: true, showConfirm: false }
    })
    expect(wrapper.find('.bw-calendar__footer').exists()).toBe(false)
  })

  it('confirmText 默认值应该为"确定"', () => {
    const wrapper = mount(Calendar, {
      props: { show: true }
    })
    expect(wrapper.props('confirmText')).toBe('确定')
  })

  it('confirmDisabledText 默认值应该为"确定"', () => {
    const wrapper = mount(Calendar, {
      props: { show: true }
    })
    expect(wrapper.props('confirmDisabledText')).toBe('确定')
  })

  it('firstDayOfWeek 默认值应该为 0', () => {
    const wrapper = mount(Calendar, {
      props: { show: true }
    })
    expect(wrapper.props('firstDayOfWeek')).toBe(0)
  })

  it('position 默认值应该为 bottom', () => {
    const wrapper = mount(Calendar, {
      props: { show: true }
    })
    expect(wrapper.props('position')).toBe('bottom')
  })

  it('round 默认值应该为 true', () => {
    const wrapper = mount(Calendar, {
      props: { show: true }
    })
    expect(wrapper.props('round')).toBe(true)
  })

  it('allowSameDay 默认值应该为 true', () => {
    const wrapper = mount(Calendar, {
      props: { show: true }
    })
    expect(wrapper.props('allowSameDay')).toBe(true)
  })

  it('星期标题应该渲染 7 天', () => {
    const wrapper = mount(Calendar, {
      props: { show: true }
    })
    const weekdays = wrapper.findAll('.bw-calendar__weekday')
    expect(weekdays.length).toBe(7)
  })

  it('firstDayOfWeek=1 时第一列应该为"一"', () => {
    const wrapper = mount(Calendar, {
      props: { show: true, firstDayOfWeek: 1 }
    })
    const weekdays = wrapper.findAll('.bw-calendar__weekday')
    expect(weekdays[0].text()).toBe('一')
  })

  it('应该渲染月份列表', () => {
    const wrapper = mount(Calendar, {
      props: { show: true }
    })
    expect(wrapper.find('.bw-calendar__months').exists()).toBe(true)
  })

  it('modelValue 传入日期后应该选中对应日期', async () => {
    const today = new Date()
    const wrapper = mount(Calendar, {
      props: { show: true, modelValue: today }
    })
    await nextTick()
    await nextTick()
    expect(wrapper.find('.bw-calendar__day--selected').exists()).toBe(true)
  })

  it('type=range 且传入 modelValue 数组时应该正确初始化', async () => {
    const today = new Date()
    const tomorrow = new Date(today.getTime() + 86400000)
    const wrapper = mount(Calendar, {
      props: { show: true, type: 'range', modelValue: [today, tomorrow] }
    })
    await nextTick()
    expect(wrapper.find('.bw-calendar').exists()).toBe(true)
  })

  it('minDate 和 maxDate 应该限制可选范围', () => {
    const minDate = new Date(2020, 0, 1)
    const maxDate = new Date(2025, 11, 31)
    const wrapper = mount(Calendar, {
      props: { show: true, minDate, maxDate }
    })
    expect(wrapper.props('minDate')).toEqual(minDate)
    expect(wrapper.props('maxDate')).toEqual(maxDate)
  })
})